const GoogleDriveApi = {
    data() {
        return {
            GoogleDriveApi: {
                CLIENT_ID: "451112835343-dfdk5iglpkorfmt3ouu5puogmvmvn22p.apps.googleusercontent.com",
                API_KEY: "AIzaSyAq4C0VCC3I88n7GdW1VilDmcZdYle-UoU",
                DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
                SCOPES: 'https://www.googleapis.com/auth/drive.file',
                gapiInited: false,
                gisInited: false,
                tokenClient: null,
                loggedin: false,
                files: [],
                CURRENT_FILE_OBJ: null,
                CURRENT_FILE_NAME: "",
                CURRENT_FILE_CONTENTS: "",
                loading:false
            }
        }
    },
    methods: {
        async GoogleDriveInitializeGapi() {
            console.log("GoogleDriveInitializeGapi")
            await window.gapi.client.init({
                apiKey: this.GoogleDriveApi.API_KEY,
                discoveryDocs: [this.GoogleDriveApi.DISCOVERY_DOC],
            });
            this.GoogleDriveApi.gapiInited = true;
            this.GoogleDriveCheckAuthStatus();
        },
        async GoogleDrivegisLoaded() {
            console.log("GoogleDrivegisLoaded")
            this.GoogleDriveApi.tokenClient = window.google.accounts.oauth2.initTokenClient({
                client_id: this.GoogleDriveApi.CLIENT_ID,
                scope: this.GoogleDriveApi.SCOPES,
                callback: '', // defined later
            });
            this.GoogleDriveApi.gisInited = true;
            this.GoogleDriveCheckAuthStatus();
        },
        GoogleDriveCheckAuthStatus() {
            console.log("GoogleDriveCheckAuthStatus")
            if (this.GoogleDriveApi.gapiInited && this.GoogleDriveApi.gisInited) {
                this.GoogleDriveAuthStart()
            }
        },
        /**
         *  Sign in the user upon button click.
         */
        async GoogleDriveAuthStart() {
            console.log("GoogleDriveAuthStart")
            this.GoogleDriveApi.tokenClient.callback =  (resp) => {
                console.log("GoogleDriveAuthStart" ,"callback", resp)
                if (resp.error !== undefined) {
                    throw (resp);
                }
                //  document.getElementById('authorize_button').innerText = 'Refresh';
                this.GoogleDriveApi.loggedin = true
            };

            if (window.gapi.client.getToken() === null) {
                // Prompt the user to select a Google Account and ask for consent to share their data
                // when establishing a new session.
                this.GoogleDriveApi.tokenClient.requestAccessToken({ prompt: 'consent' });
            } else {
                // Skip display of account chooser and consent dialog for an existing session.
                this.GoogleDriveApi.tokenClient.requestAccessToken({ prompt: '' });
            }
        },
        /**
         *  Sign out the user upon button click.
         */
        GoogleDriveSignOut() {
            const token = window.gapi.client.getToken();
            if (token !== null) {
                window.google.accounts.oauth2.revoke(token.access_token);
                window.gapi.client.setToken('');
                this.GoogleDriveApi.loggedin = false
                this.$root.$data.popup.name = null
            }
           
        },
        async GoogleDriveListFiles() {
            this.GoogleDriveApi.searching= true
            console.log("GoogleDriveListFiles")
            let response;
            try {
                response = await window.gapi.client.drive.files.list({
                    'pageSize': 10,
                    'fields': 'files(id, name, size,  modifiedTime)',
                    'q': "name contains '.wm4'"
                });
            } catch (err) {
                console.log(err.message);
                return;
            }
            const files = response.result.files;
            if (!files || files.length == 0) {
                console.log('No files found.');
                return;
            }
            this.GoogleDriveApi.files = files
            this.GoogleDriveApi.searching= false
            // Flatten to string to display
    /*         const output = files.reduce(
                (str, file) => `${str}${file.name} (${file.id}\n`,
                'Files:\n');
            console.log(output); */
        }
        ,
        GoogleDriveReadFile() {
            //console.log("Reading File");
            var request = window.gapi.client.drive.files.get({
                fileId: this.GoogleDriveApi.CURRENT_FILE_OBJ.id,
                alt: 'media'
            })
            request.then(async (response) => {
                // this.CURRENT_FILE_OBJ = response;
                //console.log(response.body)
                const mydata = new Blob([response.body], {
                    type: "text/json;charset=utf-8",
                  });
                  await this.$root.databaseImport(mydata)
                  this.$root.setupShadowDB()
             
            }, function (error) {
                console.error(error)
            })
            //console.log("Got" , CURRENT_FILE_OBJ);
            this.$root.$data.popup.name = null
            return request; //for batch request
        },
       async GoogleDriveWriteFile(callback) {
            this.GoogleDriveApi.loading = true;
            this.GoogleDriveApi.CURRENT_FILE_NAME = this.$root.$data.shadowDB.Settings[Object.keys(this.$root.$data.shadowDB.Settings)[0]].settings.ProjectName
            let blob  = await this.$root.databaseExport()
            console.log("blob" ,blob)
            let CURRENT_FILE_CONTENTS  = await blob.text()
            console.log("CURRENT_FILE_CONTENTS",CURRENT_FILE_CONTENTS)
            var filePath = "";
            console.log(this.GoogleDriveApi.CURRENT_FILE_OBJ);
            if (this.GoogleDriveApi.CURRENT_FILE_OBJ) {
                filePath = this.GoogleDriveApi.CURRENT_FILE_OBJ.id;

            }
            const boundary = '-------314159265358979323846';
            const delimiter = "\r\n--" + boundary + "\r\n";
            const close_delim = "\r\n--" + boundary + "--";
            const contentType = 'application/json';
            var metadata = { 'name': this.GoogleDriveApi.CURRENT_FILE_NAME + '.wm4', 'mimeType': contentType };
            var multipartRequestBody = delimiter + 'Content-Type: application/json\r\n\r\n' + JSON.stringify(metadata) + delimiter + 'Content-Type: ' + contentType + '\r\n\r\n' + CURRENT_FILE_CONTENTS + close_delim;
            var request
            if (filePath == "") {
                console.log("newfile")
                request = window.gapi.client.request({
                    'path': '/upload/drive/v3/files',
                    'method': 'POST',
                    'params': {
                        'uploadType': 'multipart'
                    },
                    'headers': {
                        'Content-Type': 'multipart/related; boundary="' + boundary + '"'
                    },
                    'body': multipartRequestBody
                });
            } else {
                request = window.gapi.client.request({
                    'path': '/upload/drive/v3/files/' + filePath,
                    'method': 'PATCH',
                    'params': {
                        'uploadType': 'multipart'
                    },
                    'headers': {
                        'Content-Type': 'multipart/related; boundary="' + boundary + '"'
                    },
                    'body': multipartRequestBody
                });
            }


            if (!callback) {
                callback = (file) => {
                    if (this.GoogleDriveApi.CURRENT_FILE_OBJ) {
                        console.log("Data Saved to GDrive", this.GoogleDriveApi.CURRENT_FILE_OBJ);
                    } else {
                        console.log("Data Created on GDrive");
                    }
                    this.GoogleDriveApi.CURRENT_FILE_OBJ = file;
                    this.GoogleDriveApi.loading = false;
                    this.$root.$data.popup.name = null
                };
            }
            request.execute(callback);
        },

         GoogleDriveSignIn() {
             window.gapi.load('client', this.GoogleDriveInitializeGapi);
             this.GoogleDrivegisLoaded()
        }
    },
}
export default GoogleDriveApi
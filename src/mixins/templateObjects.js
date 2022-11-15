const templateObjects = {
    data() {
        return {
            SettingsTemplate: {
                settings: {},
                documentprefs: {
                    align: "left",
                    fontsize: "2rem",
                    lspacing: "3rem",
                    indentation: "20px",
                    pspacing: "20px",
                    page: "800px",
                    font: "'Merriweather', 'Times New Roman', Times, serif",
                    color: "#424242",
                    bgcolor: "#fafafa",
                    h1align: "center",
                    h2align: "center",
                    h3align: "center",
                    h4align: "center"
                }
            }

        }
    },
    methods: {
        makeNewCard(existingid) {
            let newId = this.$root.uuid(); // use the same uuid to link them
            if (existingid) {
                newId = existingid
            }
            let obj = {};
            obj.uuid = newId
            obj.projectID = this.$root.$data.session.selectedProject;
            obj.title = "";
            obj.description = "";
            obj.showdesc = false;
            obj.content = "";
            obj.labels = [];
            obj.images = [];
            obj.style = "";
            obj.options = {};
            obj.color = "--card1"
            this.$root.AddRecord("Cards", obj);
            this.$root.$data.session.EditCard = obj.uuid
        }
    }
}
export default templateObjects
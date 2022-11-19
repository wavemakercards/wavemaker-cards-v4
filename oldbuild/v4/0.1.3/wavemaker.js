var typesound1 = new Audio('audio/type.mp3');
var typesound2 = new Audio('audio/type.mp3');
var typesound3 = new Audio('audio/type.mp3');
var typesound4 = new Audio('audio/type.mp3');
var typesound5 = new Audio('audio/type.mp3');
var typesound6 = new Audio('audio/type.mp3');
var typesound7 = new Audio('audio/type.mp3');
var typesound8 = new Audio('audio/type.mp3');
var typesound9 = new Audio('audio/type.mp3');


function Export2Word(newhtml, filename = '') {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + newhtml + postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });

    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + '.doc' : 'document.doc';

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}

// kill console
// TODO : make this a toggle thing? run off localstorage setting maybe
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
if (location.hostname === "localhost") {
    console.log("Running Wavemaker Offline so all console visible ")
} else {
    console.log("Running Wavemaker Online BUT IN DEBUG MODE so all console visible ")
    if (params.debug != 1) {
        //  console.log = function() {}
    } else {
        console.log("Running Wavemaker Online BUT IN DEBUG MODE so all console visible ")
    }
}

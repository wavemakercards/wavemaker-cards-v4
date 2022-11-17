const templateObjects = {
    data() {
        return {
            SettingsTemplate: {
                documentprefs: {
                    // need to trim a space from the formatted css
                    align: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--pageEditor-align')),
                    fontsize: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--pageEditor-fontsize')),
                    lspacing: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--pageEditor-lspacing')),
                    indentation: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--pageEditor-indentation')),
                    pspacing: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--pageEditor-pspacing')),
                    page: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--pageEditor-page')),
                    font: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--pageEditor-font')),
                    color: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--pageEditor-color')),
                    bgcolor: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--pageEditor-bgcolor')),
                    h1align: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--pageEditor-h1align')),
                    h2align: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--pageEditor-h2align')),
                    h3align: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--pageEditor-h3align')),
                    h4align: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--pageEditor-h4align')),
                    distractionfree_font: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--distractionfree-font')),
                    distractionfree_bg: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--distractionfree-bg')),
                    distractionfree_fg: this.dotrim(getComputedStyle(document.documentElement).getPropertyValue('--distractionfree-fg')),
                    typesound: false
                }
            }

        }
    },
    methods: {
        dotrim(result) {
            if (result[0] === " ") {
                result = result.substring(1);
            }

            return result
        },
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
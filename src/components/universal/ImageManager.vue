<template>
    <div class="backdrop"></div>
    <div class="imageWindow" v-if="imagesArray">
        <div class="imageScroller" v-if="!this.newimage.base64">
            <masonry-wall :items="imagesArray" :ssr-columns="1" :column-width="300" :gap="16">
                <template #default="{ item }">
                    <div class="imgBox">
                        <img :src="'data:image/png;base64,' + item.base64" />
                        <div style="margin-top:-10px; text-align: right;">
                            <button @click="pickImage(item.uuid)" class=" interfaceBtn chooseBtn"
                                v-if="this.$root.imagemanager.targetuuid">
                                <svg viewBox="0 0 24 24">
                                    <path
                                        d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z" />
                                </svg>
                                Link this Image
                            </button>
                            <button class="interfaceBtn deleteBtn" @click="deleteImage(item.uuid)">
                                <svg viewBox="0 0 24 24">
                                    <path
                                        d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                </svg>
                                &nbsp;
                            </button>
                        </div>

                    </div>
                </template>
            </masonry-wall>
        </div>


        <div v-if="this.newimage.base64" class="uploadFrame">
            <img :src="'data:image/png;base64,' + this.newimage.base64" style="max-width: 100%;" />
            <input v-model="this.newimage.title" class="formInput" placeholder="File Name" />


            <div>
                <button @click="addNewImage()" class="interfaceBtn saveBtn">
                    <svg viewBox="0 0 24 24">
                        <path
                            d="M12.18 17C12.54 15.5 13.43 14.16 14.68 13.25L13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H12.18M5 5V19H12.03C12.09 19.7 12.24 20.38 12.5 21H5C4.47 21 3.96 20.79 3.59 20.41C3.21 20.04 3 19.53 3 19V5C3 3.9 3.9 3 5 3H19C19.53 3 20.04 3.21 20.41 3.59C20.79 3.96 21 4.47 21 5V12.5C20.38 12.24 19.7 12.09 19 12.03V5H5M17.75 22L15 19L16.16 17.84L17.75 19.43L21.34 15.84L22.5 17.25L17.75 22Z" />
                    </svg>
                    Save
                </button>
                <button @click="this.newimage.title = null; this.newimage.base64 = null" class="interfaceBtn cancelBtn">
                    <svg viewBox="0 0 24 24">
                        <path
                            d="M13 19C13 19.7 13.13 20.37 13.35 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3H19C20.11 3 21 3.9 21 5V13.35C20.37 13.13 19.7 13 19 13V5H5V19H13M11.21 15.83L9.25 13.47L6.5 17H13.35C13.75 15.88 14.47 14.91 15.4 14.21L13.96 12.29L11.21 15.83M22.54 16.88L21.12 15.47L19 17.59L16.88 15.47L15.47 16.88L17.59 19L15.47 21.12L16.88 22.54L19 20.41L21.12 22.54L22.54 21.12L20.41 19L22.54 16.88Z" />
                    </svg>
                    Cancel
                </button>
            </div>


        </div>


        <div class="toolbar">

            <button class="interfaceBtn closeBtn topbar" @click="closeImageManager()">
                <svg viewBox="0 0 24 24">
                    <path
                        d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
                </svg>
            </button>

            <canvas id="imageCanvas" ref="imageCanvas" style="display:none"></canvas>
            <div v-if="!this.newimage.base64">
                <button @click="triggerUpload" class="interfaceBtn topbar">
                    <svg viewBox="0 0 24 24">
                        <path
                            d="M13 19C13 19.7 13.13 20.37 13.35 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3H19C20.11 3 21 3.9 21 5V13.35C20.37 13.13 19.7 13 19 13V5H5V19H13M13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H13.35C13.75 15.88 14.47 14.91 15.4 14.21L13.96 12.29M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" />
                    </svg>
                    Upload an Image
                </button>
                <input type="file" ref="imageloader" @change="updateCanvasImage" style="display: none;" />
            </div>
        </div>

    </div>
</template>

<script>
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { db } from "@/db.js";
import MasonryWall from '@yeger/vue-masonry-wall'
export default {
    name: "ImageViewer",
    components: {
        MasonryWall
    },
    data() {
        return {
            imagesArray: useObservable(liveQuery(async () => await db.ImageLibrary.toArray())),
            newimage: {
                title: null,
                base64: null
            }
        }
    },
    methods: {
        triggerUpload() {
            this.$refs.imageloader.click();

        },

        closeImageManager() {
            //clean up
            // hack for the card modal
            this.$root.EditCardrefresh = this.$root.uuid()
            this.$root.imagemanager = null;

        },

        updateCanvasImage(e) {
            var self = this;
            var files = e.target.files;

            var reader = new FileReader();
            reader.onload = (e) => {
                var img = new Image();
                img.onload = function () {
                    self.drawCanvasImage(img)
                }
                img.src = e.target.result;
                this.newimage.title = files[0].name
            };
            reader.readAsDataURL(files[0]);
        },
        drawCanvasImage(img) {

            var canvas = this.$refs.imageCanvas;
            canvas.width = 500;
            canvas.height = img.height / (img.width / 500);
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0,
                img.width,
                img.height,
                0,
                0,
                canvas.width,
                canvas.height);

            this.newimage.base64 = canvas.toDataURL("image/jpeg").split(';base64,')[1];
        },
        async addNewImage() {
            let uuid = this.$root.uuid()
            let o = {}
            o.uuid = uuid
            o.title = this.newimage.title
            o.base64 = this.newimage.base64
            await this.$root.AddRecord("ImageLibrary", o)
            this.newimage.title = null
            this.newimage.base64 = null

            // add the image uuid to the image list for this card

        },
        async deleteImage(uuid) {
            if (confirm("Delete this Image?")) {
                await this.$root.db.ImageLibrary.delete(uuid)
            }
        },
        pickImage(uuid) {
            if (this.$root.imagemanager.targetuuid) {
                if (confirm("Do you want to choose this image?")) {
                    console.log(this.$root.imagemanager.target)
                    if (!this.$root.imagemanager.target) {
                        alert("no target to update")
                    }

                    this.$root.imagemanager.target.push(uuid)
                    console.log("update", this.$root.imagemanager)
                    // do the DB update
                    this.$root.UpdateRecord(
                        this.$root.imagemanager.table,
                        this.$root.imagemanager.targetuuid,
                        this.$root.imagemanager.updateObj
                    );


                    this.closeImageManager()
                }
            }

        }
    },
}
</script>

<style scoped>
.closeBtn {
    position: absolute;
    top: 0px;
    right: 0px;
    margin-top: 0px;
}

.cancelBtn {
    background-color: var(--danger);
    color: var(--danger-f);
    fill: var(--danger-f);
    width: 50%;
    text-align: left;
}


.topbar {
    margin-top: 0px;
    /*
    background-color: inherit;
    color: inherit;
    fill: inherit;*/
    height: 40px;
}

.saveBtn {
    background-color: var(--success);
    color: var(--success-f);
    fill: var(--success-f);
    text-align: left;
    width: 50%;
}

.chooseBtn {
    width: 80%;
    text-align: left;
}

.deleteBtn {
    background-color: var(--danger);
    color: var(--danger-f);
    fill: var(--danger-f);
    width: 20%;
    text-align: left;
}

.deleteBtn svg {
    left: 25px;
}

.uploadFrame {
    margin: 0 auto;
    max-width: 500px;
    margin-top: 10px;
}

.backdrop {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: var(--popup-block);
    opacity: 0.93;
}

.imageWindow {
    position: fixed;
    top: 5%;
    bottom: 5%;
    left: 5%;
    right: 5%;
    background-color: var(--display-window);
    color: var(--display-window-f);
    fill: var(--display-window-f);
    overflow-y: none;

}

.imageScroller {
    position: absolute;
    top: 40px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    overflow-y: scroll;
    padding: 20px;
}

.imgBox {
    position: relative;
    border: 1px solid var(--display-window-f);
    padding: 10px;
}

.imgBox img {
    display: block;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
}

.toolbar {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: var(--window);
    color: var(--window-f);
    fill: var(--window-f);


}

@media only screen and (max-width : 500px) {
    .imageWindow {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

}
</style>



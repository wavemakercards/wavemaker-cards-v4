<template>
    <div class="backdrop"></div>
    <div class="imageWindow">
        <button class="interfaceBtn closeBtn" @click="closeImageManager()">
            <svg viewBox="0 0 24 24">
                <path
                    d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
            </svg>
        </button>

        <canvas id="imageCanvas" ref="imageCanvas" style="display:none"></canvas>

        <input type="file" id="imageLoader" @change="updateCanvasImage" v-if="!this.newimage.base64" />
        <div v-if="this.newimage.base64">
            <img :src="'data:image/png;base64,' + this.newimage.base64" />
            <input v-model="this.newimage.title" />
            <button @click="addNewImage()">Add</button>
            <button @click="this.newimage.title = null; this.newimage.base64 = null">close</button>

        </div>
        <masonry-wall :items="imagesArray" :ssr-columns="1" :column-width="300" :gap="16" v-if="!this.newimage.base64">
            <template #default="{ item }">
                <div class="imgBox">
                    <img :src="'data:image/png;base64,' + item.base64" @click="pickImage(item.uuid)" />
                </div>
            </template>
        </masonry-wall>



    </div>
</template>

<script>
import MasonryWall from '@yeger/vue-masonry-wall'
export default {
    name: "ImageViewer",
    components: {
        MasonryWall
    },
    data() {
        return {
            imagesArray: [],
            newimage: {
                title: null,
                base64: null
            }
        }
    },
    methods: {
        closeImageManager() {
            //clean up

            // hack for the card modal
            this.$root.EditCardrefresh = this.$root.uuid()
            this.$root.imagemanager = null;
            this.$root.imageUpdate = {
                table: null,
                targetuuid: null,
                target: null
            }

        },
        async getImages() {
            this.imagesArray = await this.$root.db.ImageLibrary.toArray()
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
            };
            reader.readAsDataURL(files[0]);
        },
        drawCanvasImage(img) {

            var canvas = this.$refs.imageCanvas;
            canvas.width = 300;
            canvas.height = img.height / (img.width / 300);
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
            this.getImages()
            // add the image uuid to the image list for this card

        },
        pickImage(uuid) {
            if (this.$root.imageUpdate.targetuuid) {
                if (confirm("Do you want to choose this image?")) {
                    alert(uuid)
                    if (!this.$root.imageUpdate.target) {
                        alert("no target to update")
                    }

                    this.$root.imageUpdate.target.push(uuid)

                    // do the DB update
                    this.$root.UpdateRecord(
                        this.$root.imageUpdate.table,
                        this.$root.imageUpdate.targetuuid,
                        this.$root.$data.shadowDB[this.$root.imageUpdate.table][this.$root.imageUpdate.targetuuid]
                    );


                    this.closeImageManager()
                }
            }

        }
    },
    mounted() {
        this.getImages()
    }
}
</script>

<style scoped>
.closeBtn {
    position: fixed;
    top: 0px;
    right: 0px;
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
    background-color: var(--paper);
    color: var(--paper-f);
    overflow-y: auto;
    padding: 20px;
}

.imgBox {
    border: 1px solid #222;
    padding: 0px;
    height: 200px;
    background-color: #ccc;
    display: flex;
    justify-content: center;
}

.imgBox img {
    display: block;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
}
</style>



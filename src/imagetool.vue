<template>
    <div class="journey">
        <input type="file" id="imageLoader" @change="updateCanvasImage" />
        <canvas id="imageCanvas" ref="imageCanvas"></canvas>
    </div>
</template>

<script>
export default {

    methods: {
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
        }
    }
}
</script>
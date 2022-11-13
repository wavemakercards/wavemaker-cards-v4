<template>
    <img :src="'data:image/png;base64,' + base64Url" v-if="base64Url" />
</template>

<script>
import { db } from "@/db.js";
export default {
    name: "MiniImage",
    props: ["uuid"],
    data() {
        return {
            base64Url: null
        }
    },
    async mounted() {
        let x = await db.ImageLibrary.get(this.uuid)
        this.base64Url = x.base64
    }
}
</script>
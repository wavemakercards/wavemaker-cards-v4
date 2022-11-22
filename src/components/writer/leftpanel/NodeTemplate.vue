<template>
    <template v-if="item">
        {{ item.title }}
    </template>
</template>

<script>
export default {
    name: "NodeTemplate",
    props: {
        nodeElement: Object
    },
    data() {
        return {
            item: this.$root.useObservable(
                this.$root.liveQuery(async () => await this.$root.db.Files.get(this.nodeElement.uuid))
            )
        };
    },

};

</script>

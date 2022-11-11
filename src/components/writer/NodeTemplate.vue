<template>

    <template v-if="item">
        <div class="itemTitle" :class="isSelected(item.uuid) ? 'chosen' : ''" @click="selectNode()">
            <span class="handle">
                <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                    <path
                        d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
                </svg>
            </span>
            <div class="title">
                {{ item.title }}
            </div>

        </div>
        <!--

    <div class="itemText">
            {{ previewText(item.content) }}
        </div>
      

        <div class="miniwordcount">{{ item.wordcount }} words</div>
          -->
    </template>
</template>

<script>
import { liveQuery } from "dexie";
import { db } from "@/db.js";
import { useObservable } from "@vueuse/rxjs";
export default {
    name: "NodeTemplate",
    props: {
        pageuuid: String,
        parent: Object
    },
    data() {
        return {
            db,
            item: useObservable(
                liveQuery(() => db.Files.get(this.pageuuid))
            )
        };
    },
    methods: {
        isSelected(id) {
            if (this.$root.session.writer.file) {
                if (this.$root.session.writer.file.uuid === id) {
                    return true
                }
            }
            return false
        },
        selectNode() {
            console.log("Selecting", this.parent)
            this.$root.session.writer.file = this.parent
        },
    }
};

</script>

<style scoped>
.itemTitle {
    position: relative;
    font-weight: bold;
    padding-left: 30px;
    padding-right: 10px;
    margin-bottom: 10px;
}


.itemTitle .title {
    font-family: inherit;
    background-color: inherit;
    color: inherit;
    border: 0px;
    width: calc(100% -20px);
    outline: none;
    height: 20px;
    margin: 0px;
    font-weight: normal;
}

.itemTitle input {
    font-family: inherit;
    background-color: inherit;
    color: inherit;
    border: 0px;
    width: 100%;

}

.handle {
    position: absolute;
    left: 0px;
    top: -4px;
    margin-bottom: 5px;
    cursor: move;
}

.itemText {
    font-size: 0.9rem;
    color: inherit;
    font-style: italic;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
}


.chosen .title {
    font-weight: bold;

}
</style>
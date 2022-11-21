<template>

    <template v-if="item">
        <div class="itemTitle" :class="isSelected(item.uuid) ? 'chosen' : ''" @click="chooseme">
            <span class="handle">

                <svg style="width: 24px; height: 24px" viewBox="0 0 24 24" v-if="isSelected(item.uuid)">
                    <path
                        d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
                </svg>

                <svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="!isSelected(item.uuid)">
                    <path
                        d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" />
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
    emits: ['selectNode', 'toggleFolder'],
    props: {
        nodeElement: Object
    },
    data() {
        return {
            db,
            item: useObservable(
                liveQuery(async () => await db.Files.get(this.nodeElement.uuid))
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
        chooseme() {
            this.$emit("selectNode")
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
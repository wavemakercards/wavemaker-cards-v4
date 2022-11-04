<template>
    {{Settings}}
</template>

<script>
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
export default {
    name :"TestApp",
    data(){
        return{
                Settings: useObservable(liveQuery(() => this.db.Settings.toArray())),
        }
    }
}
</script>
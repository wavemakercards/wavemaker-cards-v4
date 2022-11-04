<script>
/* eslint-disable */
/**
 * WHy is es lint diabled?  Because I WANT to mutate this prop - the whole point is that I can edit a deeply nested node
 */

import CardViewer from "@/components/universal/CardViewer";
export default {
  name: "FlakeItem",
  components: {
    CardViewer,
  },
  props: {
    item: Object,
    coltoggle : Boolean
  },
  methods: {
    showflake() {
      if (!this.item.cards.length) {
        this.item.cards.push({
          uuid: this.$root.uuid(),
          sub: false,
          cards: [],
        });
        this.item.cards.push({
          uuid: this.$root.uuid(),
          sub: false,
          cards: [],
        });
        this.item.cards.push({
          uuid: this.$root.uuid(),
          sub: false,
          cards: [],
        });
      }
      this.item.sub = true;
    },
    unflake() {
      this.$emit("undo");
    },
    undo() {
      this.item.sub = false;
    },
  },
};
</script>

<style scoped>
.row {
  display: block;
}
.col{
    width: 320px;
    display: inline-block;
    vertical-align: middle;
}
.holder {
width:50%;
  vertical-align: middle;
  width: 320px;
  height: 300px;
  margin: 0 auto;
  margin: 10px;
  background-color: antiquewhite;
}
.sub {
width:50%;

}
.coltoggle{
    background-color: var(--c7);
}
.colview{
    width:320px;
    margin: 0 auto;
}
</style>
<template>
  <div class="row" 
  :class="!$root.$data.session.snowflake.displaytree ? 'colview' : ''"
>
    <div class="col" v-if="!item.sub ||  $root.$data.session.snowflake.displaytree">
      <CardViewer :cardid="item.uuid" />
      <button @click="showflake" v-if="!item.cards.length">
        <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M14.25,12L16.27,11H23L22,9H18.03L20.42,5.83L19.43,3.83L15.37,9.2L13.35,10.21L13.75,8L17.83,2.62L15.64,2.22L12,7L8.4,2.2L6.2,2.6L10.26,8L10.66,10.21L8.82,9.29L8.66,9.21L4.6,3.8L3.6,5.8L6,9H2L1,11H7.77L9.75,12L7.73,13H1L2,15H5.97L3.58,18.17L4.57,20.17L8.63,14.8L10.65,13.79L10.25,16L6.17,21.38L8.36,21.79L12,17L15.6,21.8L17.8,21.4L13.74,16L13.34,13.79L15.34,14.79L19.4,20.2L20.4,18.2L18,15H22L23,13H16.23"
          />
        </svg>
      </button>
      <button @click="showflake" v-if="item.cards.length">
        <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M17.75 21.16L15 18.16L16.16 17L17.75 18.59L21.34 15L22.5 16.41L17.75 21.16M12 18C12 16.46 12.59 15.06 13.54 14L12 14.89L9.5 13.44V10.56L12 9.11L14.5 10.56V13.13C15.08 12.71 15.75 12.4 16.46 12.21V10.56L18.46 9.43L20.79 10.05L21.31 8.12L19.54 7.65L20 5.88L18.07 5.36L17.45 7.69L15.45 8.82L13 7.38V5.12L14.71 3.41L13.29 2L12 3.29L10.71 2L9.29 3.41L11 5.12V7.38L8.5 8.82L6.5 7.69L5.92 5.36L4 5.88L4.47 7.65L2.7 8.12L3.22 10.05L5.55 9.43L7.55 10.56V13.45L5.55 14.58L3.22 13.96L2.7 15.89L4.47 16.36L4 18.12L5.93 18.64L6.55 16.31L8.55 15.18L11 16.62V18.88L9.29 20.59L10.71 22L12 20.71L13.29 22L13.42 21.87C12.54 20.83 12 19.5 12 18Z"
          />
        </svg>
      </button>
      <button @click="unflake">
        <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M11 5.12L9.29 3.41L10.71 2L12 3.29L13.29 2L14.71 3.41L13 5.12V7.38L15.45 8.82L17.45 7.69L18.07 5.36L20 5.88L19.54 7.65L21.31 8.12L20.79 10.05L18.46 9.43L16.46 10.56V13.26L14.5 11.3V10.56L12.74 9.54L10.73 7.53L11 7.38V5.12M18.46 14.57L16.87 13.67L19.55 16.35L21.3 15.88L20.79 13.95L18.46 14.57M13 16.62V18.88L14.7 20.59L13.29 22L12 20.71L10.71 22L9.29 20.59L11 18.88V16.62L8.55 15.18L6.55 16.31L5.93 18.64L4 18.12L4.47 16.36L2.7 15.89L3.22 13.96L5.55 14.58L7.55 13.45V10.56L5.55 9.43L3.22 10.05L2.7 8.12L4.47 7.65L4 5.89L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73L14.1 16L13 16.62M12 14.89L12.63 14.5L9.5 11.39V13.44L12 14.89Z"
          />
        </svg>
      </button>
    </div>

    <div v-if="item.sub" class="col" :class="{coltoggle, coltoggle}" >
      <FlakeItem :item="item.cards[0]" @undo="undo" :coltoggle="!coltoggle" />
      <FlakeItem :item="item.cards[1]" @undo="undo" :coltoggle="!coltoggle"/>
      <FlakeItem :item="item.cards[2]" @undo="undo" :coltoggle="!coltoggle"/>
    </div>
  </div>
</template>
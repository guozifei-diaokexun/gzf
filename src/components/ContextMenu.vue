<template>
    <div class="context-menu" v-show="isShow" :style="contextStyle">
      <p @click="removeNode">删除</p>
    </div>
</template>

<script>
  export default {
    name: 'ContextMenu',
    props: {
      isShow: {
        type: Boolean,
        default: false,
      },
      anchorData: {
        type: Object,
        default: () => { return  null;}
      }
    },
    computed: {
      contextStyle() {
        if(this.anchorData) {
          const { left, top } = this.anchorData;
          return { left, top };
        }
      }
    },
    methods: {
      removeNode() {
        this.$store.dispatch('removeNode')
        this.$emit('update:isShow',false);
      }
    }
  }
</script>

<style scoped>
.context-menu {
  position: absolute;
  background: #fff;
  width: 120px;
  font-size: 12px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 12px 0;
  z-index: 2;
}
</style>

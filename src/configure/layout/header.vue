<template>
  <div class="header" id="header">
    <div class="title">
      <span>
        <slot name="title"></slot>
      </span>
    </div>
    <div class="operation">
      <slot name="operation"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "runHeader",
  data() {
    return {
      showHelp: false,
    };
  },
};
</script>
<style  scoped>
.header {
  position: fixed;
  top: 0;
  z-index: 1000;

  height: 50px;
  line-height: 50px;
  width: 100%;
  padding: 0 40px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  margin-bottom: 1px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.header .operation {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  font-size: 14px;
}
</style>

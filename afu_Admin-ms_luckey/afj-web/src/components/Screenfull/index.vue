<template>
  <div>
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="click"
    />
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "Screenfull",
  data() {
    return {
      isFullscreen: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning",
        });
        return false;
      }
      screenfull.toggle();
    },
    change() {
      var navbar = document.getElementById("navbar");
      navbar.style.height = screenfull.isFullscreen ? 0 + "px" : 50 + "px";
      //sidebar是侧边栏距离顶部距离，如果不设置，可能会空出一块，看自己代码是什么样的
      var sidebar = document.getElementById("sidebar");
      sidebar.style.height = screenfull.isFullscreen ? 0 + "px" : 100 + "%";
      //这个表示右边内容区，因为没有了顶部栏，我这里整体内容上移，下面会出现空白，所以将内容区放大到100%
      var main = document.getElementById("app-main");
      main.style.height = screenfull.isFullscreen
        ? 100 + "%"
        : "calc(100% - 46px)";
      main.style.paddingTop = screenfull.isFullscreen ? 0 : "50px";
      var dashboard = document.getElementById("dashboard");
      dashboard.style.top = screenfull.isFullscreen ? 0 : "50px";
      dashboard.style.height = screenfull.isFullscreen ? '100vh' : "calc(100vh - 50px)";
      this.isFullscreen = screenfull.isFullscreen;
      var main_content = document.getElementById("main_content");
      main_content.style.marginLeft = screenfull.isFullscreen ? 0 : "";
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off("change", this.change);
      }
    },
  },
};
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>

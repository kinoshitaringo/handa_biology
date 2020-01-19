<template>
  <div class="App">
    <div class="loading-blocker fadeIn animated" v-show="isLoading">
      <div class="spinner-grow bg-primary" role="status"></div>
      <div class="spinner-grow bg-primary" role="status"></div>
      <div class="spinner-grow bg-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="spinner-grow bg-primary" role="status"></div>
      <div class="spinner-grow bg-primary" role="status"></div>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, namespace } from "vuex-class";

const appStore = namespace("app");

@Component
export default class App extends Vue {
  @appStore.Getter isLoading!: boolean;

  @appStore.Action("loaded") initLoad!: () => void;
  private created() {
    // 防止在loading状态下刷新页面时一直卡在loading
    this.initLoad();
  }
}
</script>

<style lang="scss">
// CoreUI Icons Set
@import "~@coreui/icons/css/all.min.css";
/* Import Font Awesome Icons Set */
$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome.scss";
/* Import Simple Line Icons Set */
$simple-line-font-path: "~simple-line-icons/fonts/";
@import "~simple-line-icons/scss/simple-line-icons.scss";
/* Import Flag Icons Set */
@import "~flag-icon-css/css/flag-icon.min.css";
/* Import Bootstrap Vue Styles */
@import "~bootstrap-vue/dist/bootstrap-vue.css";
// Import Main styles for this application
@import "assets/scss/style";

.App {
  font-family: "Microsoft YaHei";
  .loading-blocker {
    background-color: #0005;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 10000;
  }
}
</style>

<template>
  <CFooter>
    <div>
      <a href="https://coreui.io" target="_blank">CoreUI</a>
      <span class="ml-1">&copy; 2019 creativeLabs.</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a href="https://coreui.io/vue" target="_blank">CoreUI for Vue</a>
    </div>
  </CFooter>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TheFooter extends Vue {}
</script>

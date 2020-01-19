<template>
  <div class="Prods">
    <div class="card">
      <span class="card-header">header</span>
      <div class="card-body">body</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Prods extends Vue {}
</script>

<style lang="less"></style>

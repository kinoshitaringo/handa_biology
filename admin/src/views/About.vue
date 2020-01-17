<template>
  <div class="about">
    <router-link to="/"
      >This is an about page
      <button @click.prevent.stop="onClick">
        button
      </button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class About extends Vue {
  public onClick() {
    console.log("hello world");
  }
}
</script>

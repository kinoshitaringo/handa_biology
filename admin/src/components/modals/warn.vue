<template>
  <b-modal
    class="ModalWarn"
    :title="title"
    variant="danger"
    header-bg-variant="danger"
    content-class="border-danger"
    v-model="isShow"
    @ok="confirm"
    ok-title="确定"
    @cancel="cancel"
    cancel-title="取消"
    ok-variant="danger"
    ><slot></slot
  ></b-modal>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class ModalWarn extends Vue {
  @Prop({ required: true }) readonly title!: string;

  private isShow: boolean = false;

  @Emit("show")
  private show(): void {
    this.isShow = true;
  }

  @Emit("cancel")
  private cancel(): void {
    this.close();
  }

  @Emit("close")
  private close(): void {
    this.isShow = false;
    console.log("close");
  }

  @Emit("ok")
  private confirm() {
    this.close();
  }
}
</script>

<style lang="less"></style>

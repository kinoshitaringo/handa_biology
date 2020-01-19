<template>
  <div class="ProdAdd animated fadeIn">
    <div class="card">
      <span class="card-header"
        >文本编辑器 <b-badge variant="primary">Quill</b-badge></span
      >
      <div class="card-body">
        <Editor
          v-model="content"
          @clean="$refs.discardPrompt.show()"
          @img="uploadImg"
        />

        <!-- footer -->
        <div class="footer mt-3 d-flex align-items-center">
          <div class="mr-auto w-50">
            <b-form-valid-feedback class="text-danger" :state="!isValidated">
              输入的内容太少了~
            </b-form-valid-feedback>
          </div>
          <b-button
            class="mr-3"
            :disabled="!isValidated"
            @click="submit"
            variant="primary"
            >提交</b-button
          ><b-button @click="cancel" variant="danger">取消</b-button>
        </div>
      </div>
    </div>

    <!-- modals -->
    <modal-warn
      ref="discardPrompt"
      title="确定清空输入吗"
      :active="discardPrompt"
      @ok="content = ``"
      >你会丢件未保存的数据，是否继续操作？</modal-warn
    >
  </div>
</template>

<script lang="ts">
import Editor from "@/components/editor/index.vue";
import ModalWarn from "@/components/modals/warn.vue";
import { Action, namespace, State } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";

const appStore = namespace("app");

@Component({
  components: { Editor, ModalWarn }
})
export default class ProdAdd extends Vue {
  private discardPrompt: boolean = false;

  private get content(): string {
    return this.quillContent;
  }

  private set content(payload: string) {
    this.setQuillContent(payload);
  }

  // 数据长度校验
  private get isValidated(): boolean {
    return this.content.length > 100;
  }

  // 提交文章
  private submit() {
    alert("submit");
  }

  // 放弃文章
  private cancel() {
    alert("cancel");
  }

  // 点击上传图片
  private uploadImg(e: Event) {
    console.log(e);
    this.loading();
    // 文件改变回调
    setTimeout(() => {
      this.content += `<img src="http://127.0.0.1:3001/static/img/first.jpg"/>`;
      let selection = (e as any).setSelection;
      this.loaded();
    }, 3000);
  }

  @appStore.State("quillContent") readonly quillContent!: string;
  @appStore.Mutation("setQuillContent") setQuillContent!: (
    payload: string
  ) => void;

  // 正在上传时可以调用loading状态
  @appStore.Action("load") loading!: () => void;
  @appStore.Action("loaded") loaded!: () => void;
}
</script>

<template>
  <div class="ProdAdd animated fadeIn">
    <div class="card">
      <span class="card-header">文本编辑器</span>
      <div class="card-body">
        <quill-editor
          id="quillEditor"
          v-model="content"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        >
        </quill-editor>
      </div>
    </div>

    <div class="card">
      <div class="card-header">source code</div>
      <div class="card-body">
        {{ content }}
      </div>
    </div>
    <!-- footer -->

    <!-- modals -->
    <modal-warn
      ref="discardPrompt"
      title="确定清空输入吗"
      :active="discardPrompt"
      @ok="discard"
      >你会丢件未保存的数据，是否继续操作？</modal-warn
    >
  </div>
</template>

<script lang="ts">
import ModalWarn from "@/components/modals/warn.vue";
import { Action, namespace, State } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
import { quillEditor } from "vue-quill-editor";

// quill编辑器的控件
const toolbars: any[] = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["clean"],
  ["link", "image", "video"]
];

const appStore = namespace("app");

@Component({
  components: { quillEditor, ModalWarn }
})
export default class ProdAdd extends Vue {
  private discardPrompt: boolean = false;

  // 编辑器设置
  private editorOption = {
    modules: {
      toolbar: {
        container: toolbars,
        handlers: {
          image: this.onBtnImgClick,
          clean: this.onBtnCleanClick
        }
      }
    },
    theme: "snow"
  };

  private get content(): string {
    return this.quillContent;
  }

  private set content(payload: string) {
    console.log(payload);
    this.setQuillContent(payload);
  }

  private created() {}

  private discard() {
    this.content = "";
  }
  // 编辑器初始化hook
  private onEditorReady(e: Event) {}

  // 失去焦点事件
  private onEditorBlur(e: Event) {}

  // 获得焦点事件
  private onEditorFocus(e: Event) {}

  // 点击上传图片
  private onBtnImgClick(e: Event) {
    let input = document.createElement("input");
    input.type = "file"; // 文件输入框
    input.accept = "image/*"; // 接收所有类型图片
    input.multiple = false;
    input.click();
    input.onchange = e => {
      this.loading();
      // 文件改变回调
      setTimeout(() => {
        this.content += `<img src="http://127.0.0.1:3001/static/img/first.jpg"/>`;
        this.loaded();
      }, 3000);
    };
  }

  private onBtnCleanClick(e: Event) {
    (this.$refs.discardPrompt as any).show();
  }

  @appStore.State("quillContent") readonly quillContent!: string;
  @appStore.Mutation("setQuillContent") setQuillContent!: (
    payload: string
  ) => void;

  @appStore.Action("load") loading!: () => void;
  @appStore.Action("loaded") loaded!: () => void;
}
</script>

<style lang="scss">
// 引入编辑器样式
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.snow.css";
@import "~quill/dist/quill.bubble.css";
#quillEditor .ql-editor {
  // 设置最小高度
  min-height: 50vh;
}
</style>

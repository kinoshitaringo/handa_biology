// 将quill编辑器组件进行封装
<template>
  <div class="QuillEditor">
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
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop, Watch } from "vue-property-decorator";
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

@Component({
  components: {
    quillEditor
  }
})
export default class QuillEditor extends Vue {
  @Prop({ required: true }) readonly value!: string;

  @Emit("input")
  private onInput(payload: string) {
    return payload;
  }

  private set content(payload: string) {
    this.onInput(payload);
  }
  private get content(): string {
    return this.value;
  }
  // 编辑器实例
  private quillInstance: any = null;

  private editorOption = {
    modules: {
      toolbar: {
        container: toolbars,
        handlers: {
          image: this.onBtnImgClick,
          video: this.onBtnVideoClick,
          clean: this.onBtnCleanClick
        }
      }
    },
    theme: "snow",
    placeholder: "请在此输入内容..."
  };

  // 编辑器初始化hook
  private onEditorReady(e: Event) {
    this.quillInstance = e;
  }

  // 失去焦点事件
  private onEditorBlur(e: Event) {}

  // 获得焦点事件
  private onEditorFocus(e: Event) {}

  @Emit("img")
  private onImgInput(e: Event) {
    return e;
  }

  private onBtnImgClick() {
    let input = document.createElement("input");
    input.type = "file"; // 文件输入框
    input.value = "";
    input.accept = "image/*"; // 接收所有类型图片
    input.multiple = false;
    input.click();
    input.onchange = e => {
      this.onImgInput(e);
      input.value = "";
    };
  }

  @Emit("video")
  private onBtnVideoClick() {
    let input = document.createElement("input");
    input.type = "file"; // 文件输入框
    input.accept = "image/*"; // 接收所有类型图片
    input.multiple = false;
    input.click();
    input.onchange = e => {
      input.value = "";
      return e;
    };
  }

  @Emit("clean")
  private onBtnCleanClick() {
    console.log("clean");
  }

  // 清空输入框
  private discard() {
    this.content = "";
  }
}
</script>

<style lang="scss">
#quilEditor {
  min-height: 500px;
}
</style>

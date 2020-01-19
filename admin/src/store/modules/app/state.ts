export interface State {
  loading: boolean;
  quillContent: string;
}

const state: State = {
  loading: false,
  // 保存文本编辑器中的内容
  quillContent: ""
};

export default state;

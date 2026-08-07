import { nextTick, onBeforeUnmount, ref } from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

export const useMonacoEditor = (language = 'javascript') => {
  let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null;
  let initReadOnly = false;
  let _pasteHandler: ((e: ClipboardEvent) => void) | null = null;
  const el = ref<HTMLElement | null>(null);

  // 格式化
  const onFormatDoc = async () => {
    await monacoEditor?.getAction('monacoEditor.action.formatDocument')?.run();
  };

  // 更新
  const updateVal = (val: string) => {
    nextTick(async () => {
      monacoEditor?.setValue(val);
      initReadOnly && monacoEditor?.updateOptions({ readOnly: false });
      await onFormatDoc();
      initReadOnly && monacoEditor?.updateOptions({ readOnly: true });
    });
  };

  // 创建实例
  const createEditor = (editorOption: monaco.editor.IStandaloneEditorConstructionOptions = {}) => {
    if (!el.value) {
      return;
    }
    const javascriptModel = monaco.editor.createModel('', language);
    initReadOnly = !!editorOption.readOnly;
    // 创建
    monacoEditor = monaco.editor.create(el.value, {
      model: javascriptModel,
      // 是否启用预览图
      minimap: { enabled: true },
      // 圆角
      roundedSelection: true,
      // 主题 'vs-dark': 'vs'
      theme: 'vs-dark',
      // 主键
      multiCursorModifier: 'ctrlCmd',
      // 滚动条
      scrollbar: {
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
      },
      // 行号
      lineNumbers: 'on',
      // tab大小
      tabSize: 2,
      // 字体大小
      fontSize: 16,
      // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
      autoIndent: 'advanced',
      // 自动布局
      automaticLayout: true,
      ...editorOption,
    });

    // Ensure paste via Ctrl+V works even if some global handlers intercept it.
    try {
      monacoEditor.onKeyDown((e) => {
        const browserKey = (e.browserEvent && e.browserEvent.key) || '';
        if ((e.ctrlKey || e.metaKey) && browserKey.toLowerCase() === 'v') {
          console.debug('Monaco onKeyDown caught Ctrl+V');
          // First try Monaco's built-in paste action (may fail if paste event is intercepted)
          monacoEditor.getAction && monacoEditor.getAction('editor.action.clipboardPasteAction')?.run();
          // If native paste event doesn't fire (observed in some environments),
          // read clipboard directly and insert into editor to ensure paste works.
          try {
            if (navigator && (navigator as any).clipboard && (navigator as any).clipboard.readText) {
              (navigator as any).clipboard
                .readText()
                .then((text: string) => {
                  if (!text) return;
                  const selection = monacoEditor.getSelection();
                  const range = selection || new monaco.Range(1, 1, 1, 1);
                  monacoEditor.executeEdits('clipboard', [
                    { range, text, forceMoveMarkers: true },
                  ]);
                  monacoEditor.pushUndoStop();
                })
                .catch(() => {
                  /* ignore clipboard read errors */
                });
            }
          } catch (err) {
            /* ignore */
          }
        }
      });
    } catch (err) {
      // defensive: ignore if onKeyDown isn't available for some reason
    }

    try {
      const dom = monacoEditor.getDomNode && monacoEditor.getDomNode();
      if (dom) {
        _pasteHandler = (ev: ClipboardEvent) => {
          console.debug('Monaco paste event fired', ev);
          // Let Monaco handle the paste via action
          monacoEditor.getAction && monacoEditor.getAction('editor.action.clipboardPasteAction')?.run();
          // no preventDefault here; allow normal paste flow too
        };
        dom.addEventListener('paste', _pasteHandler);
      }
    } catch (err) {
      /* ignore */
    }

    return monacoEditor;
  };

  // 卸载
  onBeforeUnmount(() => {
    if (monacoEditor) {
      try {
        const dom = monacoEditor.getDomNode && monacoEditor.getDomNode();
        if (dom && _pasteHandler) {
          dom.removeEventListener('paste', _pasteHandler);
        }
      } catch (err) {
        /* ignore */
      }
      monacoEditor.dispose();
    }
  });

  return {
    el,
    updateVal,
    getEditor: () => monacoEditor,
    createEditor,
    onFormatDoc,
  };
};

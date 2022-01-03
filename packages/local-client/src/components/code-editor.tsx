import "./code-editor.css";
import Editor, { OnMount, BeforeMount } from "@monaco-editor/react";
import { useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";


interface CodeEditorProps {
  initialValue: string;
  onChangeCode(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChangeCode,
}) => {
  const editorRef = useRef<any>();

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // insert the default code when the component render
    onChangeCode(initialValue);

    editor.onDidChangeModelContent(() => {
      onChangeCode(editor.getValue());
    });

    editor.getModel()?.updateOptions({ tabSize: 4 }); 
  };

  const handleFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();
    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    // set the formatted value back to the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-warning is-small"
        onClick={handleFormatClick}
      >
        Format
      </button>
      <Editor
        onMount={handleEditorDidMount}
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={initialValue}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: true,
          automaticLayout: true,
          lineDecorationsWidth: 25,
          cursorBlinking: "expand",
        }}
      />
    </div>
  );
};

export default CodeEditor;

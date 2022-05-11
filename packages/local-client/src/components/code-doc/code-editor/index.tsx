import "./index.css";
import Editor, { OnMount } from "@monaco-editor/react";
import { useRef, useEffect } from "react";
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
          scrollBeyondLastLine: false,
          automaticLayout: true,
          lineDecorationsWidth: 25,
          cursorBlinking: "expand",
        }}
      />
    </div>
  );
};

export default CodeEditor;

// declare global {
//   interface Window {
//     MonacoEnvironment: Environment;
//   }
// }

// window.MonacoEnvironment = {
//   getWorker(workerId, label) {
//     let MonacoWorker;

//     switch (label) {
//       case 'css':
//         MonacoWorker = require('monaco-editor/esm/vs/language/css/css.worker');
//         break;
//       case 'typescript':
//       case "javascript":
//         MonacoWorker = require('monaco-editor/esm/vs/language/typescript/ts.worker');
//         break;
//       default:
//         MonacoWorker = require('monaco-editor/esm/vs/editor/editor.worker');
//     }
//     return MonacoWorker;
//   }
// }

// =========================================================================================

// Lib that used for hightligting JSX syntax
// import { loadWASM } from 'onigasm'
// import { Registry } from 'monaco-textmate'
// import { wireTmGrammars } from 'monaco-editor-textmate'
// import { editor } from "monaco-editor";

// (async () => {
//   // load the onigasm file only once
//   await loadWASM(`./../../public/onigasm.wasm`)

// })()

// export async function liftOff(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
//   const registry = new Registry({
//       getGrammarDefinition: async (scopeName) => {
//           return {
//               format: 'json',
//               content: await (await fetch(`static/grammars/css.tmGrammar.json`)).text()
//           }
//       }
//   })
//   const grammars = new Map()
//   grammars.set('css', 'source.css')
//   grammars.set('html', 'text.html.basic')
//   grammars.set('typescript', 'source.ts')

//   await wireTmGrammars(monaco, registry, grammars, editor)
// }

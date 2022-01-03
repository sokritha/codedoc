import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
import { Cell } from "../state/cell";
import { useActions } from "../hooks/use-actions";
import { sourceCellEditor } from '../utils/source-cell-editor';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const mdEditorRef = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // Inside Textarea
      if (
        mdEditorRef.current &&
        event.target &&
        mdEditorRef.current.contains(event.target as Node)
      ) {
        return;
      }
      // Outside of TextArea
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={mdEditorRef}>
        <MDEditor
          className="text-editor"
          value={sourceCellEditor(cell, "text")}
          onChange={(v) => {
            updateCell(cell.id, v || "");
          }}
        />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown source={sourceCellEditor(cell, "text")} />
      </div>
    </div>
  );
};

export default TextEditor;

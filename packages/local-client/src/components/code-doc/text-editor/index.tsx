import "./index.css";
import { useState, useEffect, useRef } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { Cell } from "state/cell";
import { useActions } from "hooks/use-actions";
import { sourceCellEditor } from "utils/source-cell-editor";
import rehypeSanitize from "rehype-sanitize";

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
          value={cell.content || ""}
          previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
          onChange={(v) => {
            updateCell(cell.id, v || "");
          }}
          commands={[
            commands.bold,
            commands.italic,
            commands.hr,
            commands.group(
              [
                commands.title1,
                commands.title2,
                commands.title3,
                commands.title4,
                commands.title5,
                commands.title6,
              ],
              {
                name: "title",
                groupName: "title",
                buttonProps: {
                  "aria-label": "Insert title",
                },
              }
            ),
            commands.strikethrough,
            commands.divider,
            commands.link,
            commands.code,
            commands.quote,
            commands.divider,
            commands.orderedListCommand,
            commands.unorderedListCommand,
            commands.checkedListCommand,
            commands.divider,
            commands.codeEdit,
            commands.codeLive,
            commands.codePreview,
            commands.fullscreen,
            commands.divider,
            commands.group([], {
              name: "upload",
              groupName: "upload",
              keyCommand: "upload",
              buttonProps: {
                title: "Upload image",
              },
              icon: (
                <svg viewBox="0 0 1024 1024" width="12" height="12">
                  <path
                    fill="currentColor"
                    d="M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z"
                  />
                </svg>
              ),
              children: (handle: any) => {
                return <ImageUploadComponent handle={handle} />;
              },
            }),
          ]}
          extraCommands={[]}
        />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown
          source={sourceCellEditor(cell, "text")}
          rehypePlugins={[[rehypeSanitize]]}
        />
      </div>
    </div>
  );
};

const ImageUploadComponent = (props: any) => {
  return (
    <div className={`modal is-active`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Upload image</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {
              props.handle.close();
            }}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="tabs is-boxed">
            <ul>
              <li className="is-active is-medium">
                <a>
                  <span className="icon">
                    <i className="fas fa-file-image"></i>
                  </span>
                  <span>Files</span>
                </a>
              </li>
              <li>
                <a>
                  <span className="icon">
                    <i className="fas fa-link"></i>
                  </span>
                  <span>URL</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="field">
            <label className="label">Selected Files</label>
            <div className="control">
              <div className="file has-name is-fullwidth is-info">
                <label className="file-label">
                  <input className="file-input" type="file" name="resume" />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">Choose a file…</span>
                  </span>
                  <span className="file-name">
                    Screen Shot 2017-07-29 at 15.54.25.png
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Descriptions</label>
            <div className="control">
              <textarea className="textarea"></textarea>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">OK</button>
          <button className="button">Cancel</button>
        </footer>
      </div>
    </div>
  );
};

export default TextEditor;

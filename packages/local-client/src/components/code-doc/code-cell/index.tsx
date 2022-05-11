import { useEffect } from "react";
import "./index.css";

// Components
import CodeEditor from "components/code-doc/code-editor";
import Preview from "components/code-doc/preview";
import Resizable from "components/code-doc/resizable";
import { Cell } from "state/cell";

// Helper Functions
import { useActions } from "hooks/use-actions";
import { useTypedSelector } from "hooks/use-typed-selector";
import { useCumulativeCode } from "hooks/use-cumulative";
import { sourceCellEditor } from "utils/source-cell-editor";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(
    (state) => state.bundles && state.bundles[cell.id]
  );
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode as string);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode as string);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode as string, cell.id, createBundle]);

  return (
    <Resizable direction="vertical" min={50} max={0.9}>
      <div
        style={{
          height: "96%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal" min={0.2} max={0.55}>
          <CodeEditor
            initialValue={sourceCellEditor(cell, "code")}
            onChangeCode={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} bundlingStatus={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;

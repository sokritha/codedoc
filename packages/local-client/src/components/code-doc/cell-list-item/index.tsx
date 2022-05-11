import { Cell } from "state";
import CodeCell from "components/code-doc/code-cell";
import TextEditor from "components/code-doc/text-editor";
import ActionBar from "components/code-doc/action-bar";
import "./index.css";

interface CellListItemProps {
  cell: Cell;
  index: number;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;

  if (cell.type === "code") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );
  }
  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;

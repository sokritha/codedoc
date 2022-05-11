import { useTypedSelector } from "hooks/use-typed-selector";
import CellListItem from "components/code-doc/cell-list-item";
import AddCell from "components/code-doc/add-cell";
import { Fragment, useEffect } from "react";
import "./index.css";
import { useActions } from "hooks/use-actions";

const CellList: React.FC = () => {
  // Fetch All The Existing Cells From The Store
  const cells = useTypedSelector(({ cells }) => {
    return cells?.order.map((id: string) => cells.data[id]);
  });

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, [fetchCells]);

  const renderedCells = cells?.map((cell, index) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} key={cell.id} index={index} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div>
      <div className="cell-list">
        <AddCell previousCellId={null} forceVisible={cells?.length === 0} />
        {renderedCells}
      </div>
    </div>
  );
};

export default CellList;

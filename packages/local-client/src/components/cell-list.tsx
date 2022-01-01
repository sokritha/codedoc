import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment, useEffect } from "react";
import "./cell-list.css";
import { useActions } from "../hooks/use-actions";

const CellList: React.FC = () => {
  // Fetch All The Existing Cells From The Store
  const cells = useTypedSelector(({ cells }) => {
    return cells?.order.map((id: string) => cells.data[id]);
  });

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells()
  }, [fetchCells])

  const renderedCells = cells?.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} key={cell.id} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell previousCellId={null} forceVisible={cells?.length === 0} />
      {renderedCells}
    </div>
  );
};

export default CellList;

import "./index.css";
import { useActions } from "hooks/use-actions";
import { connect } from 'react-redux';
import { RootState } from 'state/reducers/index';
import { CellState } from "state/reducers/cellsReducer";

interface ActionBarProps {
  id: string;
  cells?: CellState;
}

const ActionBar: React.FC<ActionBarProps> = ({id, cells}) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, "up")}
        disabled={id === cells?.order[0]}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, "down")}
        disabled={id === cells?.order[cells.order.length-1]}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => deleteCell(id)}
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    cells: state.cells
  }
}

export default connect(mapStateToProps)(ActionBar);

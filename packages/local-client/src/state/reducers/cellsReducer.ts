import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import produce from "immer";

export interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SAVE_CELLS_ERROR:
      state.error = action.payload;
      return state;
    
    case ActionType.FETCH_CELLS:
      state.loading = true;
      state.error = null;
      return state;
    
    case ActionType.FETCH_CELLS_COMPLETE:
      state.order = action.payload.map((cell) => cell.id);
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellState["data"]);
      return state;
    
    case ActionType.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return state;
    
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    
    case ActionType.DELETE_CELL:
      // remove state of data
      delete state.data[action.payload];
      // remove state of order
      state.order = state.order.filter((foundId) => foundId !== action.payload);
      return state;
    
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;

      // up: targetIndex before index
      // down: targetIndex after index
      const index = state.order.findIndex(
        (foundId) => foundId === action.payload.id
      );
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }
      // swap cell
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state;
    
    case ActionType.INSERT_CELL_AFTER:
      // create new cell
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: randomId(),
      };
      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(
        (foundId) => foundId === action.payload.id
      );

      // In case foundIndex is not found, it will to the end of the array order
      // otherwise, insert that index before that foundIndex
      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }

      // Could just return because Imma function will return by itself;
      // However, typescript doesn't know that
      // so the return object or the store would be having two possible result
      // `CellState | undefine`
      return state;
    
    default:
      return state;
  }
});

const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

export default reducer;

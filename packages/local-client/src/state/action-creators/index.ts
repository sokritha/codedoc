import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import axios from "axios";
import {
  DeleteCellAction,
  UpdateCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Action,
} from "../actions";
import { Cell, CellTypes } from "../cell";
import { Direction } from "../actions/index";
import bundle from "../../bundler";
import { RootState } from "../reducers/index";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });
    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          code: result.code,
          err: result.err,
        },
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });

    try {
      const { data }: { data: Cell[] } = await axios.get("/api/v1/cells");
      dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
    } catch (err) {
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: (err as Error).message,
      });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { cells } = getState();
    if (cells) {
      const { data, order } = cells;

      const cellsData = order.map((id) => data[id]);
      try {
        await axios.post("/api/v1/cells", { cellsData });
      } catch (err) {
        dispatch({
          type: ActionType.SAVE_CELLS_ERROR,
          payload: (err as Error).message,
        });
      }
    }
  };
};

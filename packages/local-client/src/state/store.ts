import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { persistMiddleware } from "./middlewares/persist-middleware";
import { ActionType } from './action-types/index';

export const store = createStore(reducers, {}, applyMiddleware(persistMiddleware, thunk));

store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: "",
        type: "code"
    }
})

store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: "",
        type: "text"
    }
})

export const firstIndexTextCellOrder: string = store.getState().cells?.order[0] as string;
export const firstIndexCodeCellOrder: string = store.getState().cells?.order[1] as string;

// store.dispatch({
//     type: ActionType.UPDATE_CELL,
//     payload: {
//         id: firstIndexCodeCellOrder,
//         content: "show(<h1>Hi there!</h1>);"
//     }
// })




import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state";

// TypedUseSelectorHook : Generic Interface <Paramerter Type>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

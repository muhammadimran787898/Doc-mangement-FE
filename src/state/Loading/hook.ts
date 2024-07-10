import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLoding } from "./reducer";

export const useLoading = () => {
  const dispatch = useDispatch();

  const Loading = useCallback(
    () => dispatch(setLoding(data as any)),
    [dispatch],
  );

  return { Loading };
};

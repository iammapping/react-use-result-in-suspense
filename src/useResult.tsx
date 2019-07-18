import React, {
  DependencyList,
  useCallback,
  Suspense,
  FunctionComponent,
  ReactNode,
} from "react";
import useResultInSuspense, {
  ResultInSuspenseProps
} from "./useResultInSuspense";

export interface ResultProps<T> extends ResultInSuspenseProps<T> {
  fallback: NonNullable<ReactNode> | null;
};

export default function useResult<R = ReactNode | any>(
  fn: () => Promise<R> | R,
  deps: DependencyList = []
): FunctionComponent<ResultProps<R>> {
  const Result = useResultInSuspense<R>(fn, deps);
  return useCallback(
    (props => {
      const { fallback, ...rest } = props;
      return (
        <Suspense fallback={fallback}>
          <Result {...rest} />
        </Suspense>
      );
    }) as FunctionComponent<ResultProps<R>>,
    deps
  );
}

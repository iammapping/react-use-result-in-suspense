import {
  DependencyList,
  useCallback,
  FunctionComponent,
  ReactNode
} from "react";

type FnCache<T> = {
  Component?: FunctionComponent<ResultInSuspenseProps<any>>;
  loading?: boolean;
  promise?: Promise<T | void>;
  result?: T;
  error?: Error;
};

export interface ResultInSuspenseProps<T> {
  parse?: (arg: T) => ReactNode;
};

const fnCache = new WeakMap<Function, FnCache<any>>();

export default function useResultInSuspense<R = ReactNode | any>(
  fn: () => Promise<R> | R,
  deps: DependencyList = []
): FunctionComponent<ResultInSuspenseProps<R>> {
  fn = useCallback(fn, deps);
  if (!fnCache.has(fn)) {
    fnCache.set(fn, {} as FnCache<R>);
  }

  const cache = fnCache.get(fn) as FnCache<R>;
  cache.Component =
    cache.Component ||
    ((props => {
      if (cache.loading === true) throw cache.promise;
      if (cache.loading === false) {
        if (cache.result) {
          return props.parse ? props.parse(cache.result) : cache.result;
        } else {
          throw cache.error;
        }
      }

      const fnRes = fn();
      if (fnRes instanceof Promise) {
        cache.loading = true;
        cache.promise = fnRes
          .then(r => {
            cache.loading = false;
            cache.result = r;
          })
          .catch(e => {
            cache.loading = false;
            cache.error = e;
          });
        throw cache.promise;
      } else {
        cache.loading = false;
        cache.result = fnRes;
        return props.parse ? props.parse(cache.result) : cache.result;
      }
    }) as FunctionComponent<ResultInSuspenseProps<R>>);

  return cache.Component;
}



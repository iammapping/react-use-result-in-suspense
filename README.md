# useResultInSuspense

`useResultInSuspense` is a React hook that supports the React 16.6 Suspense component
implementation.

This hook is super simple to use, if you know how to `useCallback`, then you know how to `useResultInSuspense`.

## Install

```
npm install use-result-in-suspense --save
```

## Example

### Using in Suspense
```JavaScript
import React, { Suspense } from "react";
import useResultInSuspense from "use-result-in-suspense";

function loadTextAsync(val) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`async output: ${val}`);
    }, 2000);
  });
}

function loadTextSync(val) {
  return `sync output: ${val}`;
}

function App() {
  // async load 
  const ResultInSuspense = useResultInSuspense(
    () => loadTextAsync("Hello, world!")
  );

  // sync load also permitting
  // const ResultInSuspense = useResultInSuspense(
  //   () => loadTextSync("Hello, world!")
  // );

  return (
    <Suspense fallback={"loading..."}>
      <ResultInSuspense />
    </Suspense>
  );
}
```

### Using directly

You can also use result directly.

```JavaScript
import React, { Suspense } from "react";
import { useResult } from "use-result-in-suspense";

function App() {
  const Result = useResult(
    () => loadText("Hello, world!")
  );

  return (
    <Result fallback={"loading..."} />
  );
}
```

## Reference

### useResultInSuspense

```JavaScript
useResultInSuspense(fn: () => Promise<ReactNode> | ReactNode, deps?: DependencyList);
```

### useResultInSuspense

```JavaScript
useResult(fn: () => Promise<ReactNode> | ReactNode, deps?: DependencyList)
```

### parse

The returned Function Component(`ResultInSuspense` or `Result`) accept a `parse` function in props, you can use it to parse the result of `fn`

```JavaScript
<ResultInSuspense parse={k => `---${k}---`} />
```

## License

MIT


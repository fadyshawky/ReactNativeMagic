// Global type shims for the template.
//
// React 19 removed the global `JSX` namespace (it now lives at `React.JSX`).
// The codebase annotates components with `JSX.Element`, so we re-expose the
// global namespace by mapping it onto `React.JSX`.
import type * as React from 'react';

declare global {
  namespace JSX {
    type ElementType = React.JSX.ElementType;
    interface Element extends React.JSX.Element {}
    interface ElementClass extends React.JSX.ElementClass {}
    interface ElementAttributesProperty
      extends React.JSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute
      extends React.JSX.ElementChildrenAttribute {}
    type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<
      C,
      P
    >;
    interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T>
      extends React.JSX.IntrinsicClassAttributes<T> {}
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}

// NOTE: bare `declare module 'x';` ambient shims for untyped packages live in
// `modules.d.ts` (a script file with no imports) — they don't work here because
// this file is a module (it has a top-level import).

// react-native-snackbar ships a default export at runtime but its bundled
// types omit it — add the default so `import Snackbar from ...` type-checks.
declare module 'react-native-snackbar' {
  const Snackbar: {
    LENGTH_SHORT: number;
    LENGTH_LONG: number;
    LENGTH_INDEFINITE: number;
    show(options: {text: string; duration?: number; [key: string]: any}): void;
    dismiss(): void;
  };
  export default Snackbar;
}

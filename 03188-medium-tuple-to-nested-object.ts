// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]

// ============= Your Code Here =============
type TupleToNestedObject<T extends unknown[], U> =
  T extends [infer Head extends PropertyKey, ...infer Tail]
    ? { [K in Head]: TupleToNestedObject<Tail, U> }
    : U
    
// T extends [infer First, ...infer Rest]
// ? First extends string
//   ? Rest['length'] extends 0
//     ? Record<First, U>
//     : Record<First, TupleToNestedObject<Rest, U>>
//   : {}
// : U

type Result = TupleToNestedObject<['a', 'b', 'c'], boolean>

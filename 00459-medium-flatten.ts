// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>,
]


// ============= Your Code Here =============
type ToWrite<T extends readonly unknown[]> =
  T extends readonly [...infer Rest]
  ? [...Rest]
  : T

export type Flatten<T> =
  T extends readonly [infer F, ...infer Rest]
    ? F extends readonly unknown[]
      ? [...Flatten<ToWrite<F>>, ...Flatten<ToWrite<Rest>>]
      : [F, ...Flatten<ToWrite<Rest>>]
    : T

// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { Flatten } from './00459-medium-flatten'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]


// ============= Your Code Here =============
type Extends<T, U> = T extends U ? true : false;
type FlattenDepth<T, D extends number = 1, A extends unknown[] = []> = 
  T extends readonly [infer F, ...infer Rest]
    ? [Extends<F, unknown[]>, Extends<A['length'], D>] extends [true, false]
      ? [...FlattenDepth<F, D, [...A, unknown]>, ...FlattenDepth<Rest, D, A>]
      : [F, ...FlattenDepth<Rest, D, A>]
    : []

type Result = FlattenDepth<[1, [2, [3, [4, [5]]]]], 2>

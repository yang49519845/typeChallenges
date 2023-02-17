// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Concat<['1', 2, '3'], [false, boolean, '4']>, ['1', 2, '3', false, boolean, '4']>>,
]


// ============= Their Code Here =============
// type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U] 

// ============= Your Code Here =============
// type Concat<T extends unknown[], U extends unknown[]> = 
//   T extends [...infer I]
//     ? U extends [...infer J]
//       ? [...I, ...J]
//       : [...I]
//     : []

type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U]


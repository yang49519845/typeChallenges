// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]


// ============= Your Code Here =============
// type ToArr<T extends string> = 
//   T extends `${infer F}${infer Rest}`
//     ? [F, ...ToArr<Rest>] 
//     : [];

// type LengthOfString<S extends string> = ToArr<S>['length']

type LengthOfString<S extends string, A extends unknown[] = []> = 
  S extends `${infer F}${infer Rest}`
    ? LengthOfString<Rest, [...A, F]>
    : A['length']

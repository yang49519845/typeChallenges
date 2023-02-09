// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]


// ============= Your Code Here =============
// type BuildArr<
//   Length extends number,
//   Ele = unknown,
//   Arr extends unknown[] = []
// > = Arr['length'] extends Length
//   ? Arr
//   : BuildArr<Length, Ele, [...Arr, Ele]>
// type BuildArrAdd<Length extends number, Ele = unknown, Arr extends unknown[] = []> =
//   Arr['length'] extends Length
//   ? Arr
//   : BuildArrAdd<Length, Ele, [...Arr, Ele]>
// type Subtract<NA extends number, NB extends number> = BuildArrAdd<NA> extends [...arr1: BuildArr<NB>, ...arr2: infer Rest] ? Rest['length'] : never;
// type Last<T extends unknown[]> = T[Subtract<T['length'], 1>]
type Last<T extends unknown[]> = T extends [infer F, ...infer R]
  ? R extends []
    ? F
    : Last<R>
  : T

type Test = Last<[3,2,1]>

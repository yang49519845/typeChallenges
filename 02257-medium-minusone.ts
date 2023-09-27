// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]


// ============= Your Code Here =============
type MinusOne<T extends number, R extends unknown[] = []> =
  T extends 0
    ? -1
    : T extends R['length']
      ? R extends [infer F, ...infer Last]
        ? Last['length']
        : never
      : MinusOne<T, [...R, R['length']]>

type Result = MinusOne<100>

type MinusOne<T extends number, U extends number[] = [] > = U['length'] extends T
  ? U extends [infer _, ...infer R] ? R['length'] : never
  : MinusOne<T, [...U, T]>


// type NumberLiteral = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
// type MinusOneMap = {
//   "0": 9
//   "1": 0
//   "2": 1
//   "3": 2
//   "4": 3
//   "5": 4
//   "6": 5
//   "7": 6
//   "8": 7
//   "9": 8
// }
// type PlusOneMap = {
//   "0": 1
//   "1": 2
//   "2": 3
//   "3": 4
//   "4": 5
//   "5": 6
//   "6": 7
//   "7": 8
//   "8": 9
//   "9": 0
// }

// type NumberToString<T extends number> = `${T}`

// type RemoveStartWithZeros<S extends string> = S extends "0"
//   ? S
//   : S extends `${0}${infer Rest}`
//     ? `${RemoveStartWithZeros<Rest>}`
//     : S

// type ReverseString<S extends string> = S extends `${infer First}${infer Rest}`
//   ? `${ReverseString<Rest>}${First}`
//   : ""

// type Initial<S extends string> = ReverseString<S> extends `${infer _}${infer Rest}`
//   ? `${ReverseString<Rest>}`
//   : S

// type MinusOneForString<S extends string, T extends string = Initial<S>> = S extends `${T}${infer Last extends NumberLiteral}`
//   ? Last extends '0'
//     ? `${MinusOneForString<T>}${MinusOneMap[Last]}`
//     : `${T}${MinusOneMap[Last]}`
//   : never

// type PlusOneForString<S extends string, T extends string = Initial<S>> = S extends `${T}${infer Last extends NumberLiteral}`
//   ? Last extends '9'
//     ? T extends '9'
//       ? `${1}${PlusOneForString<T>}${PlusOneMap[Last]}`
//       : `${PlusOneForString<T>}${PlusOneMap[Last]}`
//     : `${T}${PlusOneMap[Last]}`
//   : S

// type GetSignSymbol<T extends string> = T extends `${infer _F extends '-'}${infer _L extends number}`
//   ? '-'
//   : '+'

// type ParseInt<T extends string> =
//   RemoveStartWithZeros<T> extends `${infer Digit extends number}`
//     ? Digit
//     : never

// type MinusOne<T extends number, S = GetSignSymbol<`${T}`>> = T extends 0
//   ? -1
//   : S extends '+'
//     ? ParseInt<MinusOneForString<NumberToString<T>>>
//     : ParseInt<PlusOneForString<NumberToString<T>>>



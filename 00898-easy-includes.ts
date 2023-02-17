// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]

type AAA = 1 extends number ? true : false;
type BBB = number extends 1 ? true : false;

// TODO: <T>() => T extends X ? 1 : 2 没看懂是什么写法
// ============= Their Code Here =============
type CustomEqual<X,Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2  ? true : false;

type Includes<T extends readonly any[], U> =
  T extends [infer First, ...infer Rest]
    ? CustomEqual<First, U> extends true
      ? true
      : Includes<Rest, U>
    : false

type Includes<T extends readonly any[], U> = 
  T extends [infer F, ...infer O]
    ? Equal<F, U> extends true
      ? Equal<F, U>
      : Includes<O, U>
    : false;

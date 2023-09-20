// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]


// ============= Your Code Here =============
type Fibonacci<T extends number, Arr extends number[] = []> = any
  

type GenerateArray<T extends number, Arr extends number[] = []> = 
  T extends 0
    ? [] 
    : T extends Arr['length']
      ? Arr
      : GenerateArray<T, [...Arr, Arr['length']]>

type Result = GenerateArray<10>

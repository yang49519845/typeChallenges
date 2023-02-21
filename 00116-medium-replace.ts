// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]


// ============= Your Code Here =============
type Result = Replace<'foobarbar', 'bar', 'foo'>
// type Replace<S extends string, From extends string, To extends string> = S extends `${infer Rest}${From}` 
// ? `${Rest}` extends S
//   ? S
//   : `${To}${Rest}`
// : S


type Replace<S extends string, From extends string, To extends string> = 
  From extends ''
    ? S
    : S extends `${infer Left}${From}${infer Right}`
      ? `${Left}${To}${Right}`
      : S

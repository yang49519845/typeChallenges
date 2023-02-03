// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]

type Test = Trim<' str'>
// ============= Your Code Here =============
type Space = ' ' | '\n' | '\t';
type TrimLeft<S extends string> = S extends `${Space}${infer Rest}` ? TrimLeft<`${Rest}`> : S
type Trim<S extends string> = TrimLeft<S> extends `${infer Rest}${Space}` ? Trim<`${Rest}`> : TrimLeft<S>;

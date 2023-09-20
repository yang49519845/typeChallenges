// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]


// ============= Your Code Here =============

type GenerateBE<B extends string, E extends string[]> = 
  E extends [infer EH, ...infer ET]
    ? ET extends string[]
      ? EH extends string
        ? `${B}__${EH}` | GenerateBE<B, ET>
        : never
      : never
    : never

type GenerateBM<B extends string, M extends string[]> =
  M extends [infer MH, ...infer MT]
    ? MT extends string[]
      ? MH extends string
        ? `${B}--${MH}` | GenerateBM<B, MT>
        : never
      : never
    : never


type BEM<B extends string, E extends string[], M extends string[]> = 
  M['length'] extends 0
    ? E['length'] extends 0
      ? B
      : GenerateBE<B, E>
    : E['length'] extends 0
      ? GenerateBM<B, M>
      : GenerateBM<GenerateBE<B, E>, M>


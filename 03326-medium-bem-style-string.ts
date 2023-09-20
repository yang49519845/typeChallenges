// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]


// ============= Your Code Here =============

type GenerateLine<B extends string, E extends string[], Line extends string = '__'> = 
  E extends [infer EH, ...infer ET]
    ? ET extends string[]
      ? EH extends string
        ? `${B}${Line}${EH}` | GenerateLine<B, ET, Line>
        : never
      : never
    : never


type BEM<B extends string, E extends string[], M extends string[]> = 
  M['length'] extends 0
    ? E['length'] extends 0
      ? B
      : GenerateLine<B, E, '__'>
    : E['length'] extends 0
      ? GenerateLine<B, M, '--'>
      : GenerateLine<GenerateLine<B, E>, M, '--'>


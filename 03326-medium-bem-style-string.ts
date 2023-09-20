// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success'>>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large'>>,
]


// ============= Your Code Here =============

type BEM<B extends string, E extends string[], M extends string[]> = 
  M extends [infer Head extends string, ...infer Other extends string[]]
    ? `${BEM<B, E, []>}--${Head}` | BEM<B, E, Other extends [] ? never : Other>
    : E extends [infer Head extends string, ...infer Other extends string[]]
      ? `${BEM<B,[], M>}__${Head}` | BEM<B, Other extends [] ? never : Other, M>
      : `${B}`

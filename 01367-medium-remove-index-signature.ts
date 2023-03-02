// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]

type AA = { a(): void }
type isTrue<V> = (() => void) extends V ? true : false

// ============= Your Code Here =============
type RemoveIndexSignature<T> = {
  [
  K in keyof T as number extends K
  ? never
    : string extends K
      ? never
      : symbol extends K
    ? never
  : K
  ]: T[K]
}

type Result = RemoveIndexSignature<Baz>

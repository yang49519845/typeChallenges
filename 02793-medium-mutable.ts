// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type List = [1, 2, 3]

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>,
]

type errors = [
  // @ts-expect-error
  Mutable<'string'>,
  // @ts-expect-error
  Mutable<0>,
]

type A = keyof Todo1
// ============= Your Code Here =============
type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K]
}

type Result = Mutable<Readonly<Todo1>>

// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

const pick: MyPick<Todo, 'title' | 'completed'> = {
  title: '1',
  completed: false
}

const pick1: Pick<Todo, 'title' | 'completed'> = {
  title: '1',
  completed: false
}

const pick2: MyPickOne<Todo, 'title' | 'completed'> = {
  title: '1',
  completed: false
}

type MyPickOne<T, K extends keyof T> = {
  [I in K]: T[I]
}
// ============= Your Code Here =============
type MyPick<T, P extends keyof T> = {
  [Key in keyof T as P extends Key ? Key : never]: T[Key]
}

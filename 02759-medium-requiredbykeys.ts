// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string
}

interface UserRequiredNameAndAge {
  name: string
  age: number
  address?: string
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
]


// ============= Your Code Here =============
type Merge<T> =  {
  [Key in keyof T]: T[Key]
}

type RequiredByKeys<T, K extends keyof T = keyof T> = Merge<{
  [Key in keyof T as Key extends K ? Key : never]-?: T[Key]
} & {
  [Key in keyof T as Key extends K ? never : Key]: T[Key]
}>

type Result = RequiredByKeys<User, 'name'>

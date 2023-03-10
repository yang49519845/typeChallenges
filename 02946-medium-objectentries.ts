// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
]


// ============= Your Code Here =============
type ObjectEntries<T, K extends keyof T = keyof T> = 
  K extends K
    ? [K, T[K] extends undefined | infer R ? R : undefined]
    : never

type Result = ObjectEntries<Model>

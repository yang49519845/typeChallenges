import { Flatten } from "./00459-medium-flatten";

function parseQueryString<S extends string>(str: S): ParseQueryString<S>
function parseQueryString(str: string) {
  if (!str || !str.length) {
    return {}
  }
  const queryObj: Record<string, any> = {};
  const items = str.split('&');
  items.forEach(element => {
    const [key, value] = element.split('=')
    if (queryObj[key]) {
      if (Array.isArray(queryObj[key])) {
        queryObj[key].push(value)
      } else {
        queryObj[key] = [queryObj[key], value]
      }
    } else[
      queryObj[key] = value
    ]
  });
  return queryObj;
}

function flat<A extends readonly unknown[]>(arr: A): Flatten<A>
function flat(arr: readonly unknown[]) {
  if (arr.length === 0) return []
  const [u, ...rest] = arr;
  if (Array.isArray(u)) {
    return [...flat(u), ...flat(rest)]
  } else {
    return [u, ...flat(rest)]
  }
}

const arr = [1, 2, 3, 4, 5, [6, [7, [8, [9]]]]] as const;
const brr = arr.flat(Infinity)






const c = flat(arr)
// a=1&b=2&c=3  => {a: 1 : b: 2, c: 3}
const params = parseQueryString('a=1&b=2&c=3')



const promiseAllResult = Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve('3'), 4])
const promiseRaceResult = Promise.race([Promise.reject(1), Promise.reject(2), Promise.resolve('3')])

interface PromiseConstructorA {
  all<T extends readonly unknown[] | []>(values: T): Promise<{
    -readonly [K in keyof T]: Awaited<T[K]>
  }>,
  race<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>
}

/** ========================= curring function ========================= */
function plus(a: number, b: number, c: number) {
  return a + b + c
}
function curryPlus(func: Function) {
  return function curried(this: any, ...args: number[]) {
    if (args.length >= func.length) {
      return func.apply(this, ...args)
    } else {
      return function (this: any, ...args2: number[]) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

type CurrFunc<P, R> =
  P extends [infer Arg, ...infer Rest]
  ? (arg: Arg) => CurrFunc<Rest, R>
  : R
// function curry<F>(params:F): F extends (...args: infer P) => infer R ? CurrFunc<P, R> : never

// type CurriedFunc<Params, Return> = 
//     Params extends [infer Arg, ...infer Rest]
//         ? (arg: Arg) => CurriedFunc<Rest, Return>
//         : Return;

// function currying<Func>(fn: Func): 
//     Func extends (...args: infer Params) => infer Result ? CurriedFunc<Params, Result> : never;
// function currying(func: Function) {
//   return function curried(...args) {
//     if (args.length >= func.length) {
//       return func.apply(this, args);
//     } else {
//       return function(...args2) {
//         return curried.apply(this, args.concat(args2));
//       }
//     }
//   };

// }

// var currFunc = currying(plus)
// const val = currFunc(1)(2)(3)
// const val1 = currFunc(1, 2)(3)
// const val2 = currFunc(1, 2, 3)

//  aaa-bbb-ccc   aaaBbbCcc
type KebabCaseToCamelCase<T extends string> =
  T extends `${infer F}-${infer R}`
  ? `${F}${KebabCaseToCamelCase<Capitalize<R>>}`
  : T
/** aaaBbbCcc => aaa-bbb-ccc */
type CamelCaseToKebabCase<T> =
  T extends `${infer F}${infer Rest}`
  ? F extends Lowercase<F>
  ? `${F}${CamelCaseToKebabCase<Rest>}`
  : `-${Lowercase<F>}${CamelCaseToKebabCase<Rest>}`
  : T
type Demos = Capitalize<'miao'>
type KebabCaseToCamelCaseResult = KebabCaseToCamelCase<'aaa-bbb-ccc'>
type CamelCaseToKebabaCaseResult = CamelCaseToKebabCase<KebabCaseToCamelCaseResult>


type Chunk<Arr extends unknown[], ItemLen extends number, CurrentItem extends unknown[] = [], Res extends unknown[] = []>
  = Arr extends [infer F, ...infer Rest]
  ? CurrentItem['length'] extends ItemLen
  ? Chunk<Rest, ItemLen, [F], [...Res, CurrentItem]>
  : Chunk<Rest, ItemLen, [...CurrentItem, F], Res>
  : [...Res, CurrentItem]

type ChunkResult = Chunk<[1, 2, 3, 4, 5], 2>

type AA = keyof any;
type BB = keyof undefined;
type CC = keyof null;
type ObjDemo = ['m', 'i', 'a', 'o']
type TupleToNestedObject<T extends unknown[], V> =
  T extends [infer F, ...infer Rest]
  ? {
    [K in F as K extends keyof any ? K : never]:
    Rest extends unknown[]
    ? TupleToNestedObject<Rest, V>
    : V
  }
  : V

type TupleToNestedObjectplus<T extends unknown[], V> = T extends [infer F extends PropertyKey, ...infer Rest]
  ? Record<F, TupleToNestedObject<Rest, V>>
  : V

type TupleToNestedObjectResult = TupleToNestedObject<ObjDemo, 1>
type TupleToNestedObjectplusResult = TupleToNestedObjectplus<ObjDemo, 1>

// 高级类型
interface Dong {
  name: string
  age: number
  address: string
}

interface Dong2 {
  name?: string
  age?: number
  address: string
}

type PartialObjectPropByKeys<
  Obj extends Record<string, any>,
  Key extends keyof any
> = Partial<Pick<Obj, Extract<keyof Obj, Key>>> & Omit<Obj, Key>;

type PartialObjectPropByKeysResult = CopyA<PartialObjectPropByKeys<Dong, 'age' | 'address'>>
type CopyA<T extends Record<string, any>> = {
  [K in keyof T]: T[K]
}

type DongKey = keyof Dong;
type ExtractResult = Extract<DongKey, 'name' | 'age'>
type PickResult = Pick<Dong, ExtractResult>
type PartialResult = Partial<PickResult>

type UnionToIntersection<U> =
  (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
  ? R
  : never

type UnionToFuncIntersection<T> = UnionToIntersection<T extends any ? () => T : never>
type UnionToTuple<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer R
  ? [...UnionToTuple<Exclude<T, R>>, R]
  : []
type UnionToIntersectionResult = UnionToIntersection<'a'>
type UnionToFuncIntersectionResultA = UnionToFuncIntersection<'miao' | 'shi' | 'yi'>
type UnionToFuncIntersectionResult = UnionToFuncIntersection<'miao' | 'shi' | 'yi'>
type UnionToTupleResult = UnionToTuple<'a' | 'b' | 'c'>
// type UnionToTuple<T> = T export
type RemoveFirstDelimiter<
  T extends string
> = T extends `${infer _}${infer Rest}` ? Rest : T


type JoinType<
  I extends any[],
  T extends string,
  Result extends string = ''
> = I extends [infer F, ...infer Rest]
  ? JoinType<Rest, T, `${Result}${T}${F & string}`>
  : RemoveFirstDelimiter<Result>

function join<
  T extends string
>(a: T):
  <Items extends string[]>
    (...parts: Items) => JoinType<Items, T>
function join(a: string) {
  return function params(b: string, c: string, d: string) {
    return `${b}${a}${c}${a}${d}`
  }
}

const a = join('-')('miao', 'shi', 'yi')

type CamelizeArr<Arr> = Arr extends [infer F, ...infer Rest]
  ? [DeepCamelize<F extends Record<string, any> ? F : never>, ...CamelizeArr<Rest>]
  : []
type DeepCamelize<Obj extends Record<string, any>> =
  Obj extends unknown[]
  ? CamelizeArr<Obj>
  : {
    [
    Key in keyof Obj
    as Key extends `${infer F}_${infer Rest}`
    ? `${F}${Capitalize<Rest>}`
    : Key

    ]: DeepCamelize<Obj[Key]>
  }

type DeepCamelizeResult = DeepCamelize<{
  aaa_bbb: string,
  bbb_ccc: [
    {
      ccc_ddd: string,
      eee_fff: {
        fff_ggg: string
      }
    }
  ]
}>

type AllKeyPath<Obj extends Record<string, any>> = {
  [K in keyof Obj]: 
    K extends string
      ? Obj[K] extends Record<string, any>
        ? K | `${K}.${AllKeyPath<Obj[K]>}`
        : K
      : never
}[keyof Obj]
type Obj = {
  a: {
      b: {
          b1: string
          b2: string
      }
      c: {
          c1: string;
          c2: string;
      }
  },
}

type AllKeyPathResult = AllKeyPath<Obj>

type Defaulting<A, B> =
 & Pick<A, Exclude<keyof A, keyof B>>
 & Partial<Pick<A, Extract<keyof A, keyof B>>>
 & Partial<Pick<B, Exclude<keyof B, keyof A>>>

 type Copy<Obj extends Record<string, any>> = {
  [K in keyof Obj]: Obj[K]
 }
 type DefaultingResult = Copy<Defaulting<{
  aaa: 1,
  bbb: 2
 }, {
  bbb: 2,
  ccc: 3
 }>>

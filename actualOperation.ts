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
> = Partial<Pick<Obj,Extract<keyof Obj, Key>>> & Omit<Obj,Key>;

type PartialObjectPropByKeysResult = CopyA<PartialObjectPropByKeys<Dong, 'age' | 'address'>>
type CopyA<T extends Record<string, any>> = {
  [K in keyof T] : T[K]
}

type DongKey = keyof Dong;
type ExtractResult = Extract<DongKey, 'name' | 'age'>
type PickResult = Pick<Dong, ExtractResult>
type PartialResult = Partial<PickResult>

const a:PartialObjectPropByKeysResult = {
}

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

// CamelCaseToKebabCase


type KebabCaseToCamelCaseResult = KebabCaseToCamelCase<'aaa-bbb-ccc'>

// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const tupleMix = [1, '2', 3, '4'] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4' }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>

type GetParams<Func extends Function> = Func extends (...args: infer Args) => unknown ? Args : never;
type ParamsResult = GetParams<(name: string, age: number) => string>

type GetParamsThis<T> = T extends (this: infer ThisType, ...args: any[]) => any ? ThisType : unknown;

class Dong {
  name: string;
  constructor() {
    this.name = 'Dong'
  }
  hello(this: Dong) {
    return "hello, i'm " + this.name
  }
}
const don = new Dong();
don.hello()
type thisParams = GetParamsThis<typeof don.hello>

interface Person {
  name: string;
}
interface PersonConstructor {
  new (name: string): Person;
}

type GetInstanceType<T extends new (...args:any) => any> = T extends new (...args: any) => infer InstanceType ? InstanceType : any;
type GetInstanceConstructorParams<T extends new (...args: any) => any> = T extends new (...args: infer ParamsType) => any ? ParamsType : any;
type InstanceTypeResult = GetInstanceType<PersonConstructor>
type InstanceTypeConstructorParams = GetInstanceConstructorParams<PersonConstructor>

type TupleArr = [1,2,3,4]
type PushTupleArr<Arr extends unknown[], Ele> = [...Arr, Ele]
type UnshiftArr<Arr extends unknown[], Ele> = [Ele, ...Arr]
type PushResult = PushTupleArr<TupleArr, 5>
type UnshiftResult = UnshiftArr<TupleArr, 0>

type TupleArrA = [1,2]
type TupleArrB = ['hello', 'world']
type TupleArrC = [1,2,3,4,5]
type TupleArrD = ['hello', 'world', 'made', 'in', 'china']
type ZipTuple<Source extends [unknown, unknown], Other extends [unknown, unknown]> = Source extends [infer NumType, infer NumTypeA]
  ? Other extends [infer StrType, infer StrTypeA] 
      ? [[NumType, StrType],[NumTypeA, StrTypeA]]
      : []
  : []
  type ZipDeepTuple<Source extends unknown[], Other extends unknown[]> = Source extends [infer NumType, ...infer NumTypeA]
  ? Other extends [infer StrType, ...infer StrTypeA] 
      ? [[NumType, StrType],...ZipDeepTuple<NumTypeA, StrTypeA>]
      : []
  : []
type ZipResult = ZipTuple<TupleArrA, TupleArrB>
type ZipResultA = ZipDeepTuple<TupleArrC, TupleArrD>

type HelloStr = 'hello'
type Shiyi = 'zhao_shi_yi';
type CapitalizeStr<Str extends string> = Str extends `${infer First}${infer Rest}` 
  ? `${Uppercase<First>}${Rest}` 
  : Str
type CapitalizeDeepStr<S extends string> = S extends `${infer Left}_${infer Right}${infer Rest}` 
  ? `${Left}${Uppercase<Right>}${CapitalizeDeepStr<Rest>}` 
  : S
type CapHello = CapitalizeStr<HelloStr>
type CapDeepName = CapitalizeDeepStr<Shiyi>

type TTPromise = Promise<Promise<Promise<Record<string, any>>>>
type TTDeepPromise<P extends Promise<unknown>> = P extends Promise<infer ValueType> 
  ? ValueType extends Promise<unknown>
    ? TTDeepPromise<ValueType>
    : ValueType
  : never
type TTDeepPromiseA<P> = P extends Promise<infer ValueType> 
  ? TTDeepPromiseA<ValueType> 
  : P;

type TTPromiseResult = TTDeepPromise<TTPromise>
type TTPromiseResultA = TTDeepPromiseA<TTPromise>

type Arr = [1,2,3]
type ArrA = [1,2,3,4,5,6,7,8,9,0]
type Reverse<T> = T extends [infer One, infer Two, infer Three] ? [Three, Two, One] : T
type ReversePlus<T extends unknown[]> = 
  T extends [infer One, ...infer Rest] 
    ? [...ReversePlus<Rest>, One] 
    : T
type ReverseArr = Reverse<Arr>
type ReverseArrA = ReversePlus<ArrA>

type IncludesItem<T extends unknown[], R> = T extends [infer First, ...infer Rest] 
  ? First extends R
    ? true
    : IncludesItem<Rest, R>
  : false
type IncludesResult = IncludesItem<ArrA, 9>
type IncludesResultA = IncludesItem<ArrA, 10>

type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);
type RemoveItem<Arr extends unknown[], Item, Result extends unknown[] = []> = 
  Arr extends [infer First, ...infer Rest] 
    ? IsEqual<First, Item> extends true
      ? RemoveItem<Rest, Item, Result>
      : RemoveItem<Rest, Item, [...Result, First]>
    : Result
type DeleteItemResult = RemoveItem<ArrA, 9>


type BuildArr<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr['length'] extends Length 
  ? Arr
  : BuildArr<Length, Ele, [...Arr, Ele]>
type ArrS = BuildArr<10>
type ArrD = BuildArr<10, number, [string]>

// ============= Your Code Here =============
// [infer TupleItem, ...infer OtherTupleItem] 
// type TupleToObject<T extends readonly unknown[]> = {}
type TupleToObject<T extends readonly unknown[]> = T extends [infer TupleItem, ...infer OtherTupleItem] 
  ? { [Key in keyof TupleItem ]: TupleItem } & TupleToObject<OtherTupleItem>
  : {}

  type TTC = TupleToObject<typeof tuple>


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

type ReplaceAll<Str extends string, From extends string, To extends string> = Str extends `${infer Left}${From}${infer Right}`
  ? `${Left}${To}${ReplaceAll<Right, From, To>}`
  : Str
type ReplaceAllResult = ReplaceAll<'zhao zhao zhao', 'zhao', 'li'>


type StringValue = 'miao';
type StringToUnion<S extends string> = S extends `${infer One}${infer Two}${infer Three}${infer Four}` ? One | Two | Three | Four : never;
type StringValueResult = StringToUnion<StringValue>
type StringToUnionPlus<S extends string> = S extends `${infer First}${infer Rest}` ? First | StringToUnion<Rest> : never;
type StringValueResultA = StringToUnionPlus<StringValue>;

type StringReverse<S extends string, Result extends string> = S extends `${infer First}${infer Rest}` ? StringReverse<Rest, `${First}${Result}`> : Result
type StringReverseResult = StringReverse<StringValue, ''>

type CaiXuKun = { name: string, age: number, child: { group: string, child: { currend: number } }}
type ReadonlyBase<T> = {
  readonly [K in keyof T]: T[K]
}
type ReadonlyDeep<T> = {
  readonly [K in keyof T]: 
    T[K] extends object 
      ? T[K] extends Function 
        ? T[K]
        : ReadonlyDeep<T[K]>
      : T[K]
}
type CaiXuKunA = ReadonlyBase<CaiXuKun>
type CaiXuKunB = ReadonlyDeep<CaiXuKun>
type CaiXuKunC = CaiXuKunA['child']['child'];


function say(msg: { a: 1, b: 2 }): { a: 1, b: 2 } { return msg }

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
  new(name: string): Person;
}

type GetInstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer InstanceType ? InstanceType : any;
type GetInstanceConstructorParams<T extends new (...args: any) => any> = T extends new (...args: infer ParamsType) => any ? ParamsType : any;
type InstanceTypeResult = GetInstanceType<PersonConstructor>
type InstanceTypeConstructorParams = GetInstanceConstructorParams<PersonConstructor>

type TupleArr = [1, 2, 3, 4]
type PushTupleArr<Arr extends unknown[], Ele> = [...Arr, Ele]
type UnshiftArr<Arr extends unknown[], Ele> = [Ele, ...Arr]
type PushResult = PushTupleArr<TupleArr, 5>
type UnshiftResult = UnshiftArr<TupleArr, 0>

type TupleArrA = [1, 2]
type TupleArrB = ['hello', 'world']
type TupleArrC = [1, 2, 3, 4, 5]
type TupleArrD = ['hello', 'world', 'made', 'in', 'china']
type ZipTuple<Source extends [unknown, unknown], Other extends [unknown, unknown]> = Source extends [infer NumType, infer NumTypeA]
  ? Other extends [infer StrType, infer StrTypeA]
  ? [[NumType, StrType], [NumTypeA, StrTypeA]]
  : []
  : []
type ZipDeepTuple<Source extends unknown[], Other extends unknown[]> = Source extends [infer NumType, ...infer NumTypeA]
  ? Other extends [infer StrType, ...infer StrTypeA]
  ? [[NumType, StrType], ...ZipDeepTuple<NumTypeA, StrTypeA>]
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

type Arr = [1, 2, 3]
type ArrA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
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

type CaiXuKunInfo = { name: string, age: number, child: { group: string, child: { currend: number } } }
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
type ReadonlyDeepPlus<T extends Record<string, any>> =
  T extends any
  ? {
    readonly [K in keyof T]:
    T[K] extends object
    ? T[K] extends Function
    ? T[K]
    : ReadonlyDeepPlus<T[K]>
    : T[K]
  }
  : never

type CaiXuKunA = ReadonlyBase<CaiXuKunInfo>
type CaiXuKunB = ReadonlyDeep<CaiXuKunInfo>
type CaiXuKunC = CaiXuKunA['child']['child'];
type CaiXuKunD = ReadonlyDeepPlus<CaiXuKunInfo>

type NumA = [unknown]['length'];
type BuildArrAdd<Length extends number, Ele = unknown, Arr extends unknown[] = []> =
  Arr['length'] extends Length
  ? Arr
  : BuildArrAdd<Length, Ele, [...Arr, Ele]>
type Add<NumA extends number, NumB extends number> = [...BuildArrAdd<NumA>, ...BuildArrAdd<NumB>]['length'];
type BuildArrAddResult = Add<2, 1>
type BuildArrAddResultA = BuildArrAdd<2, unknown>

type Subtract<NA extends number, NB extends number> = BuildArrAdd<NA> extends [...arr1: BuildArr<NB>, ...arr2: infer Rest] ? Rest['length'] : never;
type SubtractResult = Subtract<10, 6>

type Mutiply<
  NumA extends number,
  NumB extends number,
  Result extends unknown[] = []
> = NumB extends 0
  ? Result['length']
  : Mutiply<NumA, Subtract<NumB, 1>, [...BuildArrAdd<NumA>, ...Result]>
type MutiplyResult = Mutiply<9, 9>
type Divide<
  NumA extends number,
  NumB extends number,
  Result extends unknown[] = []
> = NumA extends 0
  ? Result['length']
  : Divide<Subtract<NumA, NumB>, NumB, [unknown, ...Result]>
type DivdeResult = Divide<81, 9>

type StrLength<T extends string, R extends unknown[] = []> =
  T extends `${infer First}${infer Rest}`
  ? StrLength<Rest, [...R, unknown]>
  : R['length']
type StrLengthResult = StrLength<'hello miao'>
type GreaterThan<
  NumA extends number,
  NumB extends number,
  Result extends unknown[] = []
> =
  NumA extends NumB
  ? false
  : Result['length'] extends NumB
  ? true
  : Result['length'] extends NumA
  ? false
  : GreaterThan<NumA, NumB, [...Result, unknown]>
type GreaterThanResult = GreaterThan<3, 4>
type GreaterThanResultA = GreaterThan<4, 3>

type A = Readonly<Record<string, string>>

/**
 * Fibonacci
 * 
 * Fibonacci 数列是 1、1、2、3、5、8、13、21、34、…… 这样的数列，有当前的数是前两个数的和的规律。
 * F(0) = 1，F(1) = 1, F(n) = F(n - 1) + F(n - 2)（n ≥ 2，n ∈ N*）
 * 
 */
type Fibonacci<
  P extends unknown[],
  C extends unknown[],
  I extends unknown[] = [],
  N extends number = 1
> = I['length'] extends N
  ? C['length']
  : Fibonacci<C, [...P, ...C], [...I, unknown], N>
type FibonacciFindIndex<N extends number> = Fibonacci<[1], [], [], N>;
type FibonacciResult = FibonacciFindIndex<1>

type Union = '🐱' | '🐶' | '🐷' | 'a'
type UpperCaseUnion<I extends string> = I extends 'a' ? Uppercase<I> : I
type UpperCaseUnionResult = UpperCaseUnion<Union>
type StrUnion = `${Union}要吃饭`

/**
 * Camelcase 
 * 我们实现过，就是提取字符串中的字符，首字母大写以后重新构造一个新的。
 */
type Camelcase<S extends string> =
  S extends `${infer L}_${infer R}${infer Rest}`
  ? `${L}${Uppercase<R>}${Camelcase<Rest>}`
  : S
type CamelcaseArr<Arr extends unknown[]> =
  Arr extends [infer I, ...infer R]
  ? [Camelcase<I & string>, ...CamelcaseArr<R>]
  : []
type ArrDemo = ['spider_man', 'iron_man', 'flash_man']
type UnionDemo = 'spider_man' | 'iron_man' | 'flash_man';
type CamelcaseResult = Camelcase<ArrDemo[0]>
type CamelcaseArrResult = CamelcaseArr<ArrDemo>
type CamelcaseUnion<I extends string> =
  I extends `${infer L}_${infer R}${infer Rest}`
  ? `${L}${Uppercase<R>}${Camelcase<Rest>}`
  : I
type CamelcaseUnionResult = CamelcaseUnion<UnionDemo>

/**
 * 判断联合类型
 */
type IsUnion<A, B = A> =
  A extends A
  ? [B] extends [A]
  ? false
  : true
  : never
type IsUnionResult = IsUnion<UnionDemo>

/**
 * BEM
 * 
 * bem 是 css 命名规范，用 block__element--modifier 的形式来描述某个区块下面的某个元素的某个状态的样式。
 */
type BEM<
  B extends string,
  E extends string[],
  M extends string[]
> = `${B}__${E[number]}--${M[number]}`
type bemResult = BEM<'guang', ['aaa', 'bbb'], ['warning', 'success']>;

type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`
type AllCombinations<A extends string, B extends string = A> =
  A extends A
  ? Combination<A, AllCombinations<Exclude<B, A>>>
  : never
type CombinationResult = Combination<ArrDemo[0], ArrDemo[1]>
type AllCombinationsResult = AllCombinations<UnionDemo>
type AllCombinationsResultA = AllCombinations<'A' | 'B' | 'C'>
/** ==================== 提取、构造、递归、数组长度的计数、联合类型的分散 ==================== */
/** ======================================end ======================================= */
// 特性1 any 与任何类型交叉 ， 例如 1 & any, 结果是 any
type IsAny<T> = 'dong' extends ('guang' & T) ? true : false;
type IsAnyResult = IsAny<any>
type IsEqualA<A, B> = (A extends B ? true : false) & (B extends A ? true : false)

// TODO: 对这种类型做了特殊处理，得去原理篇了解
type IsEqualB<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false
type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? false : true
type IsSame = IsEqualA<any, boolean>
type isSameA = IsEqualB<boolean, boolean>
// NOTE: 这里的 A 是单个类型， B是整个联合类型，所以根据 [B] extends [A]来判断是否是联合类型
type isUnion<A, B = A> = A extends A ? [B] extends [A] ? false : true : never
type isUnionResult = isUnion<1 | 2>
type isUnionResultA = isUnion<1 | 2 | 3 | 4>

type TestNumber<T> = T extends number ? 1 : 2;
type testNumberResult = TestNumber<any>
type TestNumberResultA = TestNumber<never>
type testNumberResultB = TestNumber<number>
type testNumberResultC = TestNumber<string>
type IsNever<T> = [T] extends [never] ? true : false;
type IsNeverResult = IsNever<never>

// NOTE: 利用元组和数组length的特性，来实现判断元组与数组 元组的length 会返回一个数字，数组的length会返回一个number
type IsTupleDemo = [1, 2, 3] // 元组
type IsTupleDemoA = number[] // 数组
type IsTuple<T> =
  T extends [...params: infer Eles]
  ? NotEqual<Eles['length'], number>
  : false;
type IsTupleResult = IsTuple<IsTupleDemo>

type UnionToIntersection<U> =
  (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
  ? R
  : never;

type UnionToIntersectionResult = UnionToIntersection<{ guang: 1 } | { dong: 2 }>

type GetDemo = {
  [key: string]: any,
  sleep(): void
}
class MiaoDemo {
  public name: string;
  protected age: number;
  private hobbies: string[];

  constructor() {
    this.name = 'dong';
    this.age = 20;
    this.hobbies = ['sleep', 'eat'];
  }
}
type MiaoName = keyof MiaoDemo;
/**
 * ##提取索引中的可选类型
 * 
 * @description 可选索引的值为 undefined 和值类型的联合类型。
 */
type GetOptional<T extends Record<string, any>> = {
  [
  K in keyof T as {} extends Pick<T, K> ? K : never
  ]: T[K]
}
type GetRequired<T extends Record<string, any>> = {
  [K in keyof T as {} extends Pick<T, K> ? never : K]: T[K]
}
type RemoveIndexSignature<T> = {
  [K in keyof T as K extends `${infer S}` ? S : never]: T[K]
}
type ClassPublicProps<T extends Record<string, any>> = {
  [K in keyof T]: T[K]
}

type GetOptionalResult = GetOptional<{ name: string, age?: number }>
type GetRequiredResult = GetRequired<{ name: string, age?: number }>
type RemoveIndexSignatureResult = RemoveIndexSignature<GetDemo>

const obj = {
  a: 1,
  b: 2
}
const objA = {
  a: 1,
  b: 2
} as const
const arr = [1, 2, 3];
const arrA = [1, 2, 3] as const;
type objType = typeof obj;
type ArrType = typeof arr
type objTypeA = typeof objA;
type ArrTypeA = typeof arrA;

type ParamsString = 'a=zhangsan&b=2&c=3&d=4';
/**
 * 将 'a=1' 转换为 {a: 1}
 */
type PraseParams<T extends string> = T extends `${infer K}=${infer V}` ? { [Key in K]: V } : Record<string, any>;
/**
 * 1 1 合并为 1
 * 1 2 合并为 [1, 2]
 */
type MergeValue<P, O> =
  P extends O
  ? P
  : O extends unknown[]
  ? [P, ...O]
  : [P, O]
/**
 * 将 {a: 1} {b: 2} 转换为 {a: 1, b: 2}
 */
type MergeParams<T extends Record<string, any>, V extends Record<string, any>> = {
  [K in keyof T | keyof V]:
  K extends keyof T
  ? K extends keyof V
  ? MergeValue<T[K], V[K]>
  : T[K]
  : K extends keyof V
  ? V[K]
  : never
}
type MergeValueResult = MergeValue<1, 2>
type PraseParamsResult = PraseParams<'a=1'>
type MergeParamsResult = MergeParams<{ a: 1 }, { b: 2 }>
// function
type ParseQueryString<T extends string> =
  T extends `${infer I}&${infer Rest}`
  ? MergeParams<PraseParams<I>, ParseQueryString<Rest>>
  : PraseParams<T>;

type QueryParamsStringResult = ParseQueryString<ParamsString>;

//////////////// 16新语法 infer extends 是如何简化类型编程的 ///////////////
type TestLast<Arr extends string[]> =
  // Arr extends [infer First, ...infer Rest, infer Last]
  // ? `提取出来的 ${Last}` // 不能将类型“Last”分配给类型“string | number | bigint | boolean | null | undefined”。ts(2322)
  // : never
  Arr extends [infer First, ...infer Rest, infer Last extends string]
  ? `提取出来的 ${Last}`
  : never

enum Code {
  a = 111,
  b = 222,
  c = "abc"
}

type CodeRes = `${Code}`

type StrToNum<T> = T extends `${infer Num extends number}` ? Num : T
type StrToNumResult = StrToNum<`${Code}`>

//////////////////// 原理篇：逆变、协变、双向协变、不变 ////////////////////
interface Person {
  name: string;
  age: number;
}

interface Guang {
  name: string;
  age: number;
  hobbies: string[]
}

let person: Person = {
  name: '',
  age: 1
}

let guang: Guang = {
  name: '',
  age: 1,
  hobbies: ['haha']
}

person = guang
// guang = person

let printHobbies: (guang: Guang) => void;
let printName: (person: Person) => void;

printHobbies = (guang) => {
  console.log(guang)
}
printName = (person) => {
  console.log(person)
}


printHobbies = printName

// printName = printHobbies

type Func = (a: string) => void;

// hello 不是string的字类型
// const func:Func = (a: 'hello') => undefined;

type isEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false

type Resss = isEqual<1, 2>
type Ressss = isEqual<1, 1>

type Zip<Target extends unknown[], Source extends unknown[]> =
  Target['length'] extends 0
  ? []
  : Source extends 0
  ? []
  : Target extends [infer One, ...infer Rest]
  ? Source extends [infer Other, ...infer RestOther]
  ? [[One, Other], ...Zip<Rest, RestOther>]
  : []
  : []

type RRR = Zip<[1, 2, 3], [4, 5, 6]>
function zip(target: unknown[], source: unknown[]): unknown[]
function zip<Target extends readonly unknown[], Source extends readonly unknown[]>(target: Target, source: Source): Zip<[...Target], [...Source]>
function zip(target: unknown[], source: unknown[]) {
  if (target.length === 0 || source.length === 0) return []

  const [targetFirst, ...targetRest] = target;
  const [sourceFirst, ...sourceRest] = source;

  return [[targetFirst, sourceFirst], ...zip(targetRest, sourceRest)]
}
const arrr = [1, 2, 3]
const arrr1 = [4, 5, 6]
const a = zip(arrr, arrr1)
const b = zip([1, 2, 3] as const, [4, 5, 6] as const)

type Query = typeof QueryKey[keyof typeof QueryKey]
const QueryKey = {
  getImage: "getImage"
}


type InclduesType<T extends unknown[], D> = T extends [infer Item, ...infer Rest]
  ? Item extends D
    ? true
    : InclduesType<Rest, D>
  : false

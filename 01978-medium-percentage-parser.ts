// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Case0 = ['', '', '']
type Case1 = ['+', '', '']
type Case2 = ['+', '1', '']
type Case3 = ['+', '100', '']
type Case4 = ['+', '100', '%']
type Case5 = ['', '100', '%']
type Case6 = ['-', '100', '%']
type Case7 = ['-', '100', '']
type Case8 = ['-', '1', '']
type Case9 = ['', '', '%']
type Case10 = ['', '1', '']
type Case11 = ['', '100', '']

type cases = [
  Expect<Equal<PercentageParser<''>, Case0>>,
  Expect<Equal<PercentageParser<'+'>, Case1>>,
  Expect<Equal<PercentageParser<'+1'>, Case2>>,
  Expect<Equal<PercentageParser<'+100'>, Case3>>,
  Expect<Equal<PercentageParser<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser<'100%'>, Case5>>,
  Expect<Equal<PercentageParser<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser<'-100'>, Case7>>,
  Expect<Equal<PercentageParser<'-1'>, Case8>>,
  Expect<Equal<PercentageParser<'%'>, Case9>>,
  Expect<Equal<PercentageParser<'1'>, Case10>>,
  Expect<Equal<PercentageParser<'100'>, Case11>>,
]


// ============= Your Code Here =============
type U = '-' | '+';
type A = '+' extends U ? true : false
type B = '-' extends U ? true : false
type C = '100%' extends `${infer F}%` ? [F, '%'] : '%'

type PercentageParser<A extends string> = 
  A extends `${infer First}${infer Rest}`
  // 先匹配头部
    ? First extends U
    // 匹配%
      ? Rest extends `${infer V}%`
        ? [First, V, '%']
        : [First,Rest, '']
      : Rest extends `${infer V}%`
        ? ['', `${First}${V}`, '%']
        : First extends '%' // 处理%
          ? ['', '', '%']
          : ['', A, ''] // 处理 [First:1, Rest: 00] => 100
    : ['', '', '']

type PercentageParserResult = PercentageParser<'100'>

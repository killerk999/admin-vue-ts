// @see: https://www.prettier.cn

module.exports = {
  // 超过最大值换行
  printWidth: 120,
  // 缩进字节数
  tabWidth: 2,
  // 使用制表符而不是空格缩进行
  useTabs: false,
  // 结尾不用分号(true有，false没有)
  semi: false,
  // 使用单引号(true单双引号，false双引号)
  singleQuote: true,
  // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  bracketSpacing: true,
  //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号 ,always：不省略括号
  arrowParens: 'avoid',
  // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
  endOfLine: 'auto'
}

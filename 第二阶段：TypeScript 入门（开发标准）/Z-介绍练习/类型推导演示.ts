// ========================================
// 类型推导演示
// 理解 TypeScript 如何自动推断类型
// ========================================

console.log("=== TypeScript 类型推导演示 ===\n");

// ========================================
// 1. 字面量类型推导
// ========================================

console.log("1️⃣  字面量和基础类型推导");

// 字符串推导
const name = "张三"; // 推导为 string
console.log(`  变量 name 的类型: ${typeof name}`);

// 数字推导
const age = 25; // 推导为 number
console.log(`  变量 age 的类型: ${typeof age}`);

// 布尔值推导
const isActive = true; // 推导为 boolean
console.log(`  变量 isActive 的类型: ${typeof isActive}`);

// 如果需要字面量类型
const literalStatus: "active" | "inactive" = "active";
console.log(`  字面量类型: "active" 或 "inactive"`);

// ========================================
// 2. 数组类型推导
// ========================================

console.log("\n2️⃣  数组类型推导");

const numbers = [1, 2, 3]; // 推导为 number[]
const strings = ["a", "b"]; // 推导为 string[]
const mixed = [1, "a", true]; // 推导为 (string | number | boolean)[]

console.log(`  数字数组类型: number[]`);
console.log(`  字符串数组类型: string[]`);
console.log(`  混合数组类型: (string | number | boolean)[]`);

// 数组方法返回类型推导
const firstNum = numbers.find(n => n > 1); // number | undefined
const mapped = numbers.map(n => n * 2); // number[]

console.log(`  find 返回: number | undefined`);
console.log(`  map 返回: number[]`);

// ========================================
// 3. 对象类型推导
// ========================================

console.log("\n3️⃣  对象类型推导");

const user = {
  name: "李四",
  age: 30,
  email: "lisi@example.com"
};

// 推导为: { name: string; age: number; email: string }
console.log(`  用户对象推导为:`);
console.log(`  { name: string; age: number; email: string }`);

// 嵌套对象推导
const config = {
  server: {
    host: "localhost",
    port: 3000
  },
  debug: true
};

// 推导为: { server: { host: string; port: number }; debug: boolean }
console.log(`  嵌套配置推导完成`);

// ========================================
// 4. 函数返回类型推导
// ========================================

console.log("\n4️⃣  函数返回类型推导");

// 返回数字
function add(a: number, b: number) {
  return a + b; // 推导为 number
}

// 返回字符串
function greet(name: string) {
  return `Hello, ${name}`; // 推导为 string
}

// 返回对象
function createUser(name: string, age: number) {
  return { name, age }; // 推导为 { name: string; age: number }
}

// 返回条件类型
function getValue(useDefault: boolean) {
  return useDefault ? 42 : "default"; // 推导为 number | string
}

console.log(`  add 返回类型: number`);
console.log(`  greet 返回类型: string`);
console.log(`  createUser 返回类型: { name: string; age: number }`);
console.log(`  getValue 返回类型: number | string`);

// ========================================
// 5. 条件推导 (三元表达式)
// ========================================

console.log("\n5️⃣  条件推导");

const isAdmin = true;
const role = isAdmin ? "admin" : "user"; // 推导为 "admin" | "user"

const score = 85;
const status = score >= 60 ? "pass" : "fail"; // 推导为 "pass" | "fail"

console.log(`  role 推导为: "admin" | "user"`);
console.log(`  status 推导为: "pass" | "fail"`);

// ========================================
// 6. typeof 操作符推导
// ========================================

console.log("\n6️⃣  typeof 推导");

const value = { x: 10, y: 20 };
type ValueType = typeof value; // 推导为 { x: number; y: number }

function getValue2(): boolean {
  return true;
}
type ReturnType = typeof getValue2; // 推导为 () => boolean

const config2 = {
  theme: "dark",
  size: 14
};
type ConfigType = typeof config2; // 推导为 { theme: string; size: number }

console.log(`  value 类型: { x: number; y: number }`);
console.log(`  getValue2 类型: () => boolean`);
console.log(`  config2 类型: { theme: string; size: number }`);

// ========================================
// 7. 泛型推导
// ========================================

console.log("\n7️⃣  泛型推导");

// 泛型函数 - 自动推导泛型类型
function identity<T>(arg: T): T {
  return arg;
}

const num = identity(42); // T 推导为 number
const str = identity("hello"); // T 推导为 string
const arr = identity([1, 2, 3]); // T 推导为 number[]

console.log(`  identity(42) 推导 T 为: number`);
console.log(`  identity("hello") 推导 T 为: string`);
console.log(`  identity([1,2,3]) 推导 T 为: number[]`);

// 泛型类
class Box<T> {
  constructor(public value: T) {}
}

const numBox = new Box(42); // T 推导为 number
const strBox = new Box("test"); // T 推导为 string

console.log(`  Box(42) 推导 T 为: number`);
console.log(`  Box("test") 推导 T 为: string`);

// ========================================
// 8. Promise 推导
// ========================================

console.log("\n8️⃣  Promise 类型推导");

// Promise 返回类型推导
function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return Promise.resolve({ id, name: "User" });
}

// 推导 user 为 { id: number; name: string }
async function showUser(): Promise<void> {
  const user = await fetchUser(1);
  console.log(`  user 推导为: { id: number; name: string }`);
}

// Promise.all 推导
const promises = [
  Promise.resolve(1),
  Promise.resolve("a"),
  Promise.resolve(true)
];

// 推导为 (number | string | boolean)[]
Promise.all(promises).then(results => {
  console.log(`  Promise.all 结果推导为: (number | string | boolean)[]`);
});

// ========================================
// 9. 解构推导
// ========================================

console.log("\n9️⃣  解构推导");

const person = { name: "王五", age: 35, email: "wangwu@example.com" };

// 解构时推导类型
const { name: personName, age: personAge } = person;
// personName 推导为 string
// personAge 推导为 number

console.log(`  personName 推导为: string`);
console.log(`  personAge 推导为: number`);

// 数组解构推导
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first 推导为 number
// second 推导为 number
// rest 推导为 number[]

console.log(`  first 推导为: number`);
console.log(`  second 推导为: number`);
console.log(`  rest 推导为: number[]`);

// ========================================
// 10. 高级推导
// ========================================

console.log("\n🔟  高级推导");

// 参数从调用推导
function processArray<T>(arr: T[], callback: (item: T) => T): T[] {
  return arr.map(callback);
}

const processedNums = processArray(
  [1, 2, 3],
  (n: number) => n * 2 // 推导 n 为 number
);

console.log(`  processArray 推导完成`);

// 条件类型推导
type Flatten<T> = T extends (infer U)[] ? U : T;

type NumType = Flatten<number[]>; // 推导为 number
type StrType = Flatten<string>; // 推导为 string

console.log(`  Flatten<number[]> 推导为: number`);
console.log(`  Flatten<string> 推导为: string`);

// 递归推导
type DeepValue<T> = T extends { x: infer U }
  ? DeepValue<U>
  : T;

type FinalType = DeepValue<{ x: { x: { x: number } } }>; // number

console.log(`  DeepValue 递归推导完成`);

// ========================================
// 11. 推导的限制
// ========================================

console.log("\n1️⃣1️⃣  推导的限制");

// ❌ 推导困难的情况
const complexObj = {
  method: (x: number) => x * 2,
  props: [1, "a", true]
};
// 推导可能不够精确

// ✅ 解决方案：明确类型注解
interface ComplexType {
  method: (x: number) => number;
  props: Array<number | string | boolean>;
}

const complexObj2: ComplexType = {
  method: (x: number) => x * 2,
  props: [1, "a", true]
};

console.log(`  复杂类型需要显式注解`);

// ========================================
// 总结
// ========================================

console.log("\n" + "=".repeat(50));
console.log("✅ 类型推导演示完成！");
console.log("=".repeat(50));

console.log(`
主要学习点：

1. ✓ 字面量类型自动推导
2. ✓ 数组类型自动推导
3. ✓ 对象类型自动推导
4. ✓ 函数返回类型推导
5. ✓ 条件表达式推导
6. ✓ typeof 类型提取
7. ✓ 泛型类型推导
8. ✓ Promise 类型推导
9. ✓ 解构赋值推导
10. ✓ 高级递归推导
11. ✓ 推导的局限性

关键规则：
- 一致的初始值 → 推导单一类型
- 多种类型的值 → 推导联合类型
- 复杂情况 → 明确注解类型

记住：TypeScript 很聪明，但有时需要你的帮助！
`);

export {};

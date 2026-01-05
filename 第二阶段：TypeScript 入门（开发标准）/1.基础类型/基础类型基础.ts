/// <reference lib="es2020" />
// @ts-ignore - 忽略 console 类型检查
// ========================================
// 1. 基础类型 - 基础示例
// ========================================

console.log("=== TypeScript 基础类型 ===");

// ========================================
// 1. 基本类型（primitives）
// ========================================

console.log("\n1. 基本类型:");

// string - 字符串
let userName: string = "张三";
let greeting: string = `你好，${userName}`;
console.log("string:", userName, greeting);

// number - 数字（包括整数和浮点数）
let age: number = 25;
let price: number = 99.9;
let hexNumber: number = 0xFF; // 十六进制
console.log("number:", age, price, hexNumber);

// boolean - 布尔值
let isActive: boolean = true;
let isStudent: boolean = false;
console.log("boolean:", isActive, isStudent);

// undefined - 未定义
let notDefined: undefined = undefined;
console.log("undefined:", notDefined);

// null - 空值
let empty: null = null;
console.log("null:", empty);

// ========================================
// 2. 数组类型
// ========================================

console.log("\n2. 数组类型:");

// 写法 1：类型[]
const numbers: number[] = [1, 2, 3, 4, 5];
console.log("number[]:", numbers);

// 写法 2：Array<类型>
const strings: Array<string> = ["张三", "李四", "王五"];
console.log("Array<string>:", strings);

// 数组的多种类型（后面讲联合类型）
const mixed: (string | number)[] = [1, "hello", 2, "world"];
console.log("mixed array:", mixed);

// 数组的方法仍然可用
const doubled = numbers.map(n => n * 2);
console.log("map 后:", doubled);

// ========================================
// 3. any 类型（应该避免使用）
// ========================================

console.log("\n3. any 类型:");

// any 表示任何类型，会失去 TS 的类型检查优势
let anything: any = "string";
anything = 123; // 可以赋予任何类型
anything = true;
anything = { key: "value" };
console.log("any:", anything);

console.log("❌ 避免使用 any");

// ========================================
// 4. void 类型（函数无返回值）
// ========================================

console.log("\n4. void 类型:");

// void 表示函数没有返回值
function printMessage(message: string): void {
  console.log(message);
}

printMessage("这是一条消息");

// 如果函数有返回值，不能用 void
function add(a: number, b: number): number {
  return a + b;
}

console.log("add 返回:", add(5, 3));

// ========================================
// 5. never 类型（永远不会返回）
// ========================================

console.log("\n5. never 类型:");

// never 用于永远不会返回的函数（如抛出错误或无限循环）
function throwError(message: string): never {
  throw new Error(message);
}

// 一般不需要主动使用 never，了解即可
console.log("✓ never 类型定义完成");

// ========================================
// 6. unknown 类型（任何值，但更安全）
// ========================================

console.log("\n6. unknown 类型:");

// unknown 类似 any，但更安全（需要类型检查）
let value: unknown = "string";

// ✅ 需要先检查类型
if (typeof value === "string") {
  console.log("字符串长度:", value.length);
}

function getUserInput(): unknown {
  return Math.random() > 0.5 ? "hello" : 123;
}

// ========================================
// 7. 类型推导（Type Inference）
// ========================================

console.log("\n7. 类型推导:");

// TS 可以自动推导类型
let count = 10; // TS 自动推导为 number
let statusFlag = true; // TS 自动推导为 boolean
let greeting2 = "你好"; // TS 自动推导为 string

console.log("greeting2.toUpperCase():", greeting2.toUpperCase());

// 对于复杂情况，最好显式标注类型
const complexData: { name: string; age: number } = {
  name: "张三",
  age: 25
};

console.log("显式标注复杂类型:", complexData);

// ========================================
// 8. 字面量类型（Literal Types）
// ========================================

console.log("\n8. 字面量类型:");

// 字面量类型：值本身就是类型
const exactNumber: 42 = 42;
const exactString: "hello" = "hello";
const exactBoolean: true = true;

console.log("字面量类型:", exactNumber, exactString, exactBoolean);

// 实际应用：限制变量只能取某些值
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction): void {
  console.log(`向${direction}移动`);
}

move("up");
move("down");

// ========================================
// 9. 元组类型（Tuple）
// ========================================

console.log("\n9. 元组类型:");

// 元组：固定长度和类型的数组
const tuple: [string, number] = ["张三", 25];
console.log("元组:", tuple);
console.log("第一个元素 (string):", tuple[0]);
console.log("第二个元素 (number):", tuple[1]);

// 可选元素
const optionalTuple: [string, number?] = ["张三"];
console.log("可选元素元组:", optionalTuple);

// 剩余元素
const variableTuple: [string, ...number[]] = ["scores", 90, 85, 88];
console.log("剩余元素元组:", variableTuple);

// 实际应用：函数返回多个值
function getUserInfo(): [string, number, boolean] {
  return ["张三", 25, true];
}

const [userNameFromTuple, userAgeFromTuple, isActiveTuple] = getUserInfo();
console.log("元组解构:", userNameFromTuple, userAgeFromTuple, isActiveTuple);

// ========================================
// 10. 完整类型检查示例
// ========================================

console.log("\n10. 完整类型检查示例:");

interface Student {
  name: string;
  age: number;
  score: number;
}

// 这是一个函数，参数类型为 Student，返回类型为 string
function getGrade(student: Student): string {
  if (student.score >= 90) {
    return "优秀";
  } else if (student.score >= 80) {
    return "良好";
  } else if (student.score >= 70) {
    return "及格";
  } else {
    return "不及格";
  }
}

const student1: Student = {
  name: "张三",
  age: 18,
  score: 95
};

const student2: Student = {
  name: "李四",
  age: 19,
  score: 75
};

console.log(`${student1.name} 的成绩等级: ${getGrade(student1)}`);
console.log(`${student2.name} 的成绩等级: ${getGrade(student2)}`);

// ========================================
// 11. 对象类型的简单定义
// ========================================

console.log("\n11. 对象类型的简单定义:");

// 对象字面量类型
const person: { name: string; age: number; city?: string } = {
  name: "张三",
  age: 25
};

console.log("对象字面量类型:", person);

// 函数参数的对象类型
function printPerson(p: { name: string; age: number }): void {
  console.log(`${p.name} 今年 ${p.age} 岁`);
}

printPerson({ name: "李四", age: 30 });

// ========================================
// 12. 类型别名简介
// ========================================

console.log("\n12. 类型别名简介:");

// type 用来定义类型别名
type Age = number;
type NameStr = string;

let myAge: Age = 25;
let myName: NameStr = "张三";

console.log("使用类型别名:", myName, myAge);

// 类型别名也可以定义对象类型
type UserInfo = {
  name: string;
  age: number;
  email: string;
};

const user: UserInfo = {
  name: "张三",
  age: 25,
  email: "zhangsan@example.com"
};

console.log("用类型别名定义的对象:", user);

// ========================================
// 总结
// ========================================

console.log("\n=== 基础类型总结 ===");

console.log(`
✓ string: 字符串
✓ number: 数字
✓ boolean: 布尔值
✓ undefined: 未定义
✓ null: 空值
✓ any: 任意类型（应避免）
✓ void: 无返回值
✓ never: 永不返回
✓ unknown: 未知类型（比 any 安全）
✓ Array<T>: 数组
✓ [T, U]: 元组
✓ T | U: 联合类型（下一章详讲）

核心原则：
1. 在声明变量时就指定类型
2. 避免使用 any，用 unknown 更安全
3. 利用 TS 的类型推导功能
4. 函数参数和返回值都要标注类型
`);

console.log("继续学习 → 打开 基础类型进阶.ts");

// 将此文件转为模块，避免与其他文件的变量冲突
export {};

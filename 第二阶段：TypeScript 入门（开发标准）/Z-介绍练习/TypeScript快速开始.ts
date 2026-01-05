// ========================================
// TypeScript 快速开始
// 最简单的 TypeScript 示例，10 分钟上手
// ========================================

console.log("=== TypeScript 10 分钟快速开始 ===\n");

// ========================================
// 第一步：基础类型
// ========================================

console.log("1️⃣  基础类型");

// 字符串、数字、布尔值
const userName: string = "张三";
const age: number = 25;
const isActive: boolean = true;

console.log(`  ${userName} 今年 ${age} 岁，活跃状态: ${isActive}`);

// 数组
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];

console.log(`  数字数组: ${numbers}`);
console.log(`  名字数组: ${names.join(", ")}`);

// ========================================
// 第二步：对象类型
// ========================================

console.log("\n2️⃣  对象类型");

// 接口定义对象形状
interface User {
  name: string;
  age: number;
  email?: string; // 可选属性
}

const user: User = {
  name: "李四",
  age: 30,
  email: "lisi@example.com"
};

console.log(`  用户: ${user.name}, 年龄: ${user.age}`);

// 类型别名
type Point = {
  x: number;
  y: number;
};

const point: Point = { x: 10, y: 20 };
console.log(`  坐标: (${point.x}, ${point.y})`);

// ========================================
// 第三步：函数类型
// ========================================

console.log("\n3️⃣  函数类型");

// 参数和返回类型
function add(a: number, b: number): number {
  return a + b;
}

console.log(`  5 + 3 = ${add(5, 3)}`);

// 箭头函数
const multiply = (a: number, b: number): number => a * b;
console.log(`  5 × 3 = ${multiply(5, 3)}`);

// 可选参数
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

console.log(`  ${greet("World")}`);
console.log(`  ${greet("World", "Hi")}`);

// ========================================
// 第四步：联合类型和字面量类型
// ========================================

console.log("\n4️⃣  联合类型和字面量");

// 联合类型 - 多个可能的类型
function processValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(`  字符串长度: ${value.length}`);
  } else {
    console.log(`  数字值: ${value}`);
  }
}

processValue("hello");  // 字符串长度: 5
processValue(42);       // 数字值: 42

// 字面量类型 - 具体的值
type Status = "success" | "error" | "loading";

function handleStatus(status: Status): void {
  console.log(`  状态: ${status}`);
}

handleStatus("success");
// handleStatus("unknown"); // ✗ 错误

// ========================================
// 第五步：类
// ========================================

console.log("\n5️⃣  类");

class Person {
  // 属性
  name: string;
  age: number;

  // 构造函数
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // 方法
  introduce(): void {
    console.log(`  我是 ${this.name}，今年 ${this.age} 岁`);
  }

  // Getter
  get info(): string {
    return `${this.name} (${this.age})`;
  }
}

const person = new Person("王五", 28);
person.introduce();
console.log(`  信息: ${person.info}`);

// 继承
class Employee extends Person {
  jobTitle: string;

  constructor(name: string, age: number, jobTitle: string) {
    super(name, age);
    this.jobTitle = jobTitle;
  }

  introduce(): void {
    console.log(`  我是 ${this.name}，${this.jobTitle}`);
  }
}

const employee = new Employee("赵六", 35, "工程师");
employee.introduce();

// ========================================
// 第六步：泛型
// ========================================

console.log("\n6️⃣  泛型");

// 泛型函数 - 类型安全的可复用函数
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

const firstNum = getFirstElement([1, 2, 3]);     // number
const firstStr = getFirstElement(["a", "b"]);    // string

console.log(`  第一个数字: ${firstNum}`);
console.log(`  第一个字符串: ${firstStr}`);

// 泛型类 - 类型安全的容器
class Box<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const numberBox = new Box<number>(42);
const stringBox = new Box<string>("hello");

console.log(`  数字盒子: ${numberBox.getValue()}`);
console.log(`  字符串盒子: ${stringBox.getValue()}`);

// ========================================
// 第七步：异步编程
// ========================================

console.log("\n7️⃣  异步编程");

// Promise 类型
function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: "用户" + id });
    }, 500);
  });
}

// async/await
async function showUser(id: number): Promise<void> {
  const user = await fetchUser(id);
  console.log(`  获取用户: ${user.name}`);
}

showUser(1);

// ========================================
// 第八步：接口和类
// ========================================

console.log("\n8️⃣  接口和类");

// 接口定义契约
interface Animal {
  name: string;
  move(): void;
}

// 类实现接口
class Dog implements Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(): void {
    console.log(`  ${this.name} 在跑`);
  }

  bark(): void {
    console.log(`  ${this.name} 汪汪`);
  }
}

const dog = new Dog("小黑");
dog.move();
dog.bark();

// ========================================
// 第九步：工具类型
// ========================================

console.log("\n9️⃣  工具类型");

interface Product {
  id: number;
  name: string;
  price: number;
}

// Partial - 所有属性可选
type ProductDraft = Partial<Product>;
const draft: ProductDraft = { name: "笔记本" };

// Pick - 选择某些属性
type ProductSummary = Pick<Product, "id" | "name">;
const summary: ProductSummary = { id: 1, name: "手机" };

// Omit - 排除某些属性
type ProductWithoutPrice = Omit<Product, "price">;
const noPrice: ProductWithoutPrice = { id: 1, name: "电脑" };

console.log("  工具类型使用完成");

// ========================================
// 第十步：类型推断
// ========================================

console.log("\n🔟  类型推断");

// TypeScript 自动推断类型
const message = "Hello"; // 推断为 string
const count = 42;        // 推断为 number
const active = true;     // 推断为 boolean

const arr = [1, 2, 3];   // 推断为 number[]
const obj = { x: 10, y: 20 }; // 推断为 { x: number; y: number }

// 函数返回类型推断
const multiply2 = (a: number, b: number) => a * b; // 返回类型推断为 number

console.log("  类型推断完成");

// ========================================
// 总结
// ========================================

console.log("\n" + "=".repeat(50));
console.log("✅ TypeScript 基础 10 个要点学完了！");
console.log("=".repeat(50));

console.log(`
你已经学会了：

1. ✓ 基础类型 (string, number, boolean)
2. ✓ 对象类型 (interface, type)
3. ✓ 函数类型 (参数类型, 返回类型)
4. ✓ 联合和字面量类型 (union, literal)
5. ✓ 类 (class, constructor, method)
6. ✓ 泛型 (generic, <T>)
7. ✓ 异步 (Promise, async/await)
8. ✓ 接口实现 (implements)
9. ✓ 工具类型 (Partial, Pick, Omit)
10. ✓ 类型推断 (type inference)

下一步：
- 深入学习接口与类型别名的高级用法
- 掌握更多泛型技巧
- 学习设计模式
- 制作真实项目！

祝你学习愉快！🎉
`);

// 将此文件转为模块，避免与其他文件的变量冲突
export {};

// ========================================
// 1. 基础类型 - 进阶示例
// ========================================

console.log("=== TypeScript 基础类型进阶 ===");

// ========================================
// 1. 联合类型（Union Types）
// ========================================

console.log("\n1. 联合类型:");

// 联合类型：变量可以是多种类型之一
type StringOrNumber = string | number;

let id: StringOrNumber;
id = "ABC123"; // ✓ 正确，是 string
id = 123; // ✓ 正确，是 number
// id = true; // ❌ 错误，boolean 不在联合类型中

console.log("联合类型 id:", id);

// 实际应用：用户 ID 可能是数字或字符串
function printUserId(id: string | number): void {
  console.log(`用户ID: ${id}`);
}

printUserId(123);
printUserId("user-abc");

// 类型守护（Type Guard）
function formatId(id: string | number): string {
  // 需要检查类型来确定如何处理
  if (typeof id === "string") {
    return id.toUpperCase();
  } else {
    return id.toString();
  }
}

console.log("格式化 ID:");
console.log(formatId("abc"));
console.log(formatId(123));

// ========================================
// 2. 字面量类型联合
// ========================================

console.log("\n2. 字面量类型联合:");

// 可以联合多个字面量值
type RequestStatus = "success" | "error" | "pending" | "loading";

function handleResponse(status: RequestStatus): string {
  switch (status) {
    case "success":
      return "操作成功";
    case "error":
      return "操作失败";
    case "pending":
      return "等待中...";
    case "loading":
      return "加载中...";
    default:
      return "未知状态";
  }
}

console.log("状态处理:");
console.log(handleResponse("success"));
console.log(handleResponse("loading"));

// ========================================
// 3. 交叉类型（Intersection Types）
// ========================================

console.log("\n3. 交叉类型:");

// 交叉类型：必须同时满足多个类型
interface Named {
  name: string;
}

interface Aged {
  age: number;
}

// 使用 & 符号表示交叉
type PersonType = Named & Aged;

const person: PersonType = {
  name: "张三",
  age: 25
};

console.log("交叉类型:", person);

// 实际应用
interface Animal {
  name: string;
  voice(): void;
}

interface Pet {
  owner: string;
  isTrained: boolean;
}

type PetAnimal = Animal & Pet;

const myDog: PetAnimal = {
  name: "旺财",
  owner: "张三",
  isTrained: true,
  voice() {
    console.log("汪汪!");
  }
};

console.log("宠物:", myDog.name, "主人:", myDog.owner);
myDog.voice();

// ========================================
// 4. 枚举类型（Enums）
// ========================================

console.log("\n4. 枚举类型:");

// 数字枚举
enum Direction {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3
}

console.log("Direction.Up:", Direction.Up);
console.log("Direction[0]:", Direction[0]);

// 字符串枚举（更推荐）
enum UserStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING"
}

let userStatusFlag: UserStatus = UserStatus.Active;
console.log("用户状态:", userStatusFlag);

// ========================================
// 5. 类型守卫（Type Guards）
// ========================================

console.log("\n5. 类型守卫:");

// typeof 守卫
function processValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(`字符串长度: ${value.length}`);
  } else {
    console.log(`数字: ${value}`);
  }
}

processValue("hello");
processValue(42);

// instanceof 守卫
class DogClass {
  bark() { console.log("汪"); }
}

class CatClass {
  meow() { console.log("喵"); }
}

function makeSound(animal: DogClass | CatClass): void {
  if (animal instanceof DogClass) {
    animal.bark();
  } else {
    animal.meow();
  }
}

makeSound(new DogClass());
makeSound(new CatClass());

// ========================================
// 6. 可辨别联合（Discriminated Unions）
// ========================================

console.log("\n6. 可辨别联合:");

interface SuccessResponse {
  type: "success";
  data: string;
  statusCode: 200;
}

interface ErrorResponse {
  type: "error";
  message: string;
  statusCode: 400 | 500;
}

type ApiResponse = SuccessResponse | ErrorResponse;

function handleApiResponse(response: ApiResponse): void {
  // 根据 type 属性精确判断
  if (response.type === "success") {
    console.log("成功:", response.data);
  } else {
    console.log("错误:", response.message);
  }
}

handleApiResponse({ type: "success", data: "数据", statusCode: 200 });
handleApiResponse({ type: "error", message: "请求失败", statusCode: 400 });

// ========================================
// 7. 类型断言（Type Assertions）
// ========================================

console.log("\n7. 类型断言:");

// 类型断言：告诉编译器变量的具体类型
const someValue: unknown = "这是字符串";

// 方式 1: as 语法
const length1 = (someValue as string).length;

// 方式 2: <> 语法（在 JSX 中不能用）
const length2 = (<string>someValue).length;

console.log("字符串长度:", length1);

// 实际应用
function getValue(): string | null {
  return "hello";
}

const valueStr = getValue() as string; // 断言不是 null
console.log("值:", valueStr.toUpperCase());

// ========================================
// 8. Never 类型（不可达）
// ========================================

console.log("\n8. Never 类型:");

// never 表示永远不会返回
function throwError(message: string): never {
  throw new Error(message);
}

// never 表示循环永不结束
function infiniteLoop(): never {
  while (true) {}
}

// 用于详尽性检查
type ShapeType = "circle" | "square" | "triangle";

function assertNever(shape: never): never {
  throw new Error(`未处理的形状: ${shape}`);
}

function getArea(shape: ShapeType): number {
  switch (shape) {
    case "circle":
      return 3.14;
    case "square":
      return 1;
    case "triangle":
      return 0.5;
    default:
      // 如果添加了新的 ShapeType 但没处理，这里会报错
      return assertNever(shape);
  }
}

console.log("形状面积:", getArea("circle"));

// ========================================
// 9. 对象类型的高级操作
// ========================================

console.log("\n9. 对象类型高级操作:");

// 可选属性和只读属性
interface Config {
  readonly apiUrl: string;
  timeout?: number;
  retries?: number;
}

const config: Config = {
  apiUrl: "https://api.example.com"
};

// config.apiUrl = "other"; // ✗ 只读属性不能修改

// 属性索引
interface StringIndex {
  [key: string]: number;
}

const scores: StringIndex = {
  math: 95,
  english: 88,
  chinese: 92
};

console.log("数学成绩:", scores["math"]);

// ========================================
// 10. 类型推导的高级用法
// ========================================

console.log("\n10. 类型推导:");

// as const - 推导为字面量类型
const directions = ["up", "down", "left", "right"] as const;
// directions 的类型是 readonly ["up", "down", "left", "right"]

// 函数推导
const users = [
  { name: "张三", age: 25 },
  { name: "李四", age: 30 }
];
// users 推导为: { name: string; age: number }[]

const firstUser = users[0]; // 推导为: { name: string; age: number }

console.log("自动推导完成");

// ========================================
// 总结
// ========================================

console.log("\n=== 进阶类型特性总结 ===");

console.log(`
✅ 联合类型 - 多种可能的类型组合
✅ 交叉类型 - 同时满足多个类型
✅ 字面量类型 - 具体的值作为类型
✅ 枚举 - 命名常量集合
✅ 类型守卫 - 在作用域内精确类型
✅ 可辨别联合 - 通过属性区分不同类型
✅ 类型断言 - 告诉编译器具体类型
✅ Never 类型 - 永不发生的类型
✅ 只读和可选 - 约束对象属性
✅ 类型推导 - 编译器自动推断类型

这些特性组合使用，能创建非常灵活且类型安全的代码！
`);

export {};

// ========================================
// 3. 泛型 - 基础示例
// ========================================

console.log("=== TypeScript 泛型基础 ===");

// ========================================
// 1. 泛型函数
// ========================================

console.log("\n1. 泛型函数:");

// 不用泛型的做法：要么返回 any，要么定义多个函数
function getFirstAny(arr: any[]): any {
  return arr[0];
}

// ❌ 这样失去了类型信息
const firstAny = getFirstAny([1, 2, 3]); // 类型是 any
console.log("any 方式:", firstAny);

// ✅ 使用泛型
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

// 泛型会根据传入的数据自动推导类型
const firstNum = getFirst([1, 2, 3]); // T 被推导为 number
const firstStr = getFirst(["a", "b", "c"]); // T 被推导为 string

console.log("泛型方式 (数字):", firstNum);
console.log("泛型方式 (字符串):", firstStr);

// ========================================
// 2. 多个泛型参数
// ========================================

console.log("\n2. 多个泛型参数:");

// 交换两个值
function swap<A, B>(a: A, b: B): [B, A] {
  return [b, a];
}

const [b, a] = swap("hello", 42);
console.log("交换后:", b, a);

// 映射一个数组
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const numbers = [1, 2, 3];
const doubled = map(numbers, n => n * 2);
console.log("映射后:", doubled);

const numStr = map(numbers, n => `数字${n}`);
console.log("映射为字符串:", numStr);

// ========================================
// 3. 泛型接口
// ========================================

console.log("\n3. 泛型接口:");

// 定义一个泛型接口
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

// 实现泛型接口
class Box<T> implements Container<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

// 使用不同的类型
const numberBox = new Box<number>(42);
console.log("数字盒子:", numberBox.getValue());

const stringBox = new Box<string>("hello");
console.log("字符串盒子:", stringBox.getValue());

stringBox.setValue("world");
console.log("修改后:", stringBox.getValue());

// ========================================
// 4. 泛型类
// ========================================

console.log("\n4. 泛型类:");

// 通用的栈数据结构
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// 使用不同类型的栈
const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
numStack.push(3);
console.log("栈顶:", numStack.peek());
console.log("弹出:", numStack.pop());

const strStack = new Stack<string>();
strStack.push("a");
strStack.push("b");
console.log("字符串栈顶:", strStack.peek());

// ========================================
// 5. 泛型约束
// ========================================

console.log("\n5. 泛型约束:");

// 有时需要限制泛型的范围
// 例如：只能处理有 length 属性的类型
function getLength<T extends { length: number }>(obj: T): number {
  return obj.length;
}

console.log("字符串长度:", getLength("hello"));
console.log("数组长度:", getLength([1, 2, 3]));

// 约束泛型必须是某个接口的实现
interface Printable {
  print(): void;
}

function printItem<T extends Printable>(item: T): void {
  item.print();
}

class Document implements Printable {
  print(): void {
    console.log("打印文档");
  }
}

const doc = new Document();
printItem(doc);

// ========================================
// 6. 泛型约束与 keyof
// ========================================

console.log("\n6. 泛型约束与 keyof:");

// 确保第二个参数是第一个对象的键
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "张三", age: 25 };

const personName = getProperty(person, "name"); // ✓ 正确
console.log("获取属性:", personName);

// getProperty(person, "email"); // ❌ 错误，"email" 不是 person 的键

// ========================================
// 7. 泛型默认值
// ========================================

console.log("\n7. 泛型默认值:");

// 可以给泛型参数设置默认值
interface Request<T = string> {
  data: T;
  method: "GET" | "POST";
}

// 不指定泛型时，T 默认为 string
const req1: Request = {
  data: "hello",
  method: "GET"
};

// 指定泛型
const req2: Request<number> = {
  data: 42,
  method: "POST"
};

console.log("默认泛型请求:", req1);
console.log("指定泛型请求:", req2);

// ========================================
// 8. 条件类型（高级）
// ========================================

console.log("\n8. 条件类型（了解即可）:");

// 条件类型：根据条件选择不同的类型
type IsString<T> = T extends string ? true : false;

// 测试
type A = IsString<"hello">; // true
type B = IsString<number>; // false

console.log("条件类型定义完成");

// 实际应用：获取数组的元素类型
type ArrayElement<T> = T extends (infer E)[] ? E : T;

type StrArrElem = ArrayElement<string[]>; // string
type NumArrElem = ArrayElement<number>; // number

console.log("提取数组元素类型完成");

// ========================================
// 9. 实际应用：API 响应处理
// ========================================

console.log("\n9. 实际应用：API 响应");

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface ProductData {
  id: number;
  name: string;
  price: number;
}

// 处理不同类型的 API 响应
function handleResponse<T>(response: ApiResponse<T>): T {
  if (response.code === 200) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
}

// 使用
const userResponse: ApiResponse<UserData> = {
  code: 200,
  message: "success",
  data: {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com"
  }
};

const userData = handleResponse(userResponse);
console.log("用户数据:", userData.name);

// ========================================
// 10. 常见泛型工具类型
// ========================================

console.log("\n10. 常见泛型工具类型:");

interface FullUser {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial<T> - 所有属性都变为可选
type PartialUser = Partial<FullUser>;
const updateUser: PartialUser = { name: "李四" }; // ✓ 可以只指定部分属性
console.log("Partial:", updateUser);

// Required<T> - 所有属性都变为必需
type RequiredUser = Required<FullUser>;
// const user: RequiredUser = { id: 1 }; // ❌ 错误，需要所有属性

// Pick<T, K> - 只选择指定的属性
type UserPreview = Pick<FullUser, "name" | "email">;
const preview: UserPreview = { name: "张三", email: "zhangsan@example.com" };
console.log("Pick:", preview);

// Omit<T, K> - 排除指定的属性
type UserWithoutId = Omit<FullUser, "id">;
const userWithoutId: UserWithoutId = { name: "张三", email: "zhangsan@example.com", age: 25 };
console.log("Omit:", userWithoutId);

// Record<K, V> - 构建一个对象类型
type RolePermissions = Record<"admin" | "user" | "guest", boolean>;
const permissions: RolePermissions = {
  admin: true,
  user: false,
  guest: false
};
console.log("Record:", permissions);

// ========================================
// 总结
// ========================================

console.log("\n=== 泛型总结 ===");

console.log(`
泛型基础：
✓ <T> 是类型变量，代表任何类型
✓ 泛型函数：function fn<T>(arg: T): T
✓ 泛型接口：interface Box<T> { value: T }
✓ 泛型类：class Stack<T> { ... }

泛型约束：
✓ <T extends Type> - 限制泛型范围
✓ <T extends { length: number }> - 必须有 length
✓ <T extends keyof U> - 必须是 U 的某个键

常用工具类型：
✓ Partial<T> - 所有属性可选
✓ Required<T> - 所有属性必需
✓ Pick<T, K> - 选择部分属性
✓ Omit<T, K> - 排除部分属性
✓ Record<K, V> - 构建对象类型

在实际项目中：
✓ API 响应类型：ApiResponse<T>
✓ 数据容器：Container<T>, Stack<T>
✓ Promise 类型：Promise<T>
`);

export {};

// ========================================
// 2. 接口与类型别名 - 基础示例
// ========================================

console.log("=== 接口与类型别名 ===");

// ========================================
// 1. Interface（接口）
// ========================================

console.log("\n1. Interface（接口）:");

// 定义一个接口
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // 可选属性
}

// 实现接口
const user1: User = {
  id: 1,
  name: "张三",
  email: "zhangsan@example.com",
  age: 25
};

const user2: User = {
  id: 2,
  name: "李四",
  email: "lisi@example.com"
  // age 是可选的，可以不写
};

console.log("用户1:", user1);
console.log("用户2:", user2);

// ========================================
// 2. Type（类型别名）
// ========================================

console.log("\n2. Type（类型别名）:");

// 定义一个类型别名
type Product = {
  id: number;
  name: string;
  price: number;
  inStock?: boolean;
};

const product1: Product = {
  id: 1,
  name: "iPhone",
  price: 8000,
  inStock: true
};

const product2: Product = {
  id: 2,
  name: "MacBook",
  price: 15000
};

console.log("产品1:", product1);
console.log("产品2:", product2);

// ========================================
// 3. Interface vs Type 的区别
// ========================================

console.log("\n3. Interface vs Type 的区别:");

// Interface 可以声明合并
interface Point {
  x: number;
  y: number;
}

interface Point {
  z: number; // 会自动合并到上面的 Point
}

const point: Point = { x: 1, y: 2, z: 3 };
console.log("Point（合并后）:", point);

// Type 不能声明合并，但可以用交叉类型
type Coordinate = {
  x: number;
  y: number;
};

// ❌ 这样会报错
// type Coordinate = {
//   z: number;
// };

// ✅ 使用交叉类型扩展
type Coordinate3D = Coordinate & {
  z: number;
};

const coord: Coordinate3D = { x: 1, y: 2, z: 3 };
console.log("3D Coordinate:", coord);

// ========================================
// 4. 接口继承
// ========================================

console.log("\n4. 接口继承:");

// 接口可以继承另一个接口
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}

const employee: Employee = {
  name: "张三",
  age: 30,
  employeeId: 101,
  department: "技术部"
};

console.log("员工:", employee);

// 接口可以继承多个接口
interface HasId {
  id: number;
}

interface HasName {
  name: string;
}

interface Entity extends HasId, HasName {
  createdAt: Date;
}

const entity: Entity = {
  id: 1,
  name: "实体",
  createdAt: new Date()
};

console.log("实体:", entity);

// ========================================
// 5. 只读属性（readonly）
// ========================================

console.log("\n5. 只读属性:");

interface Config {
  readonly version: string;
  readonly apiUrl: string;
  port: number; // 可以改
}

const config: Config = {
  version: "1.0.0",
  apiUrl: "https://api.example.com",
  port: 3000
};

config.port = 8080; // ✓ 可以改

// config.version = "1.1.0"; // ❌ 错误，version 是只读的

console.log("配置:", config);

// ========================================
// 6. 可选属性和只读属性结合
// ========================================

console.log("\n6. 可选和只读属性结合:");

interface Settings {
  readonly id: number;
  name: string;
  description?: string;
  readonly createdAt?: Date;
}

const setting: Settings = {
  id: 1,
  name: "设置1"
};

console.log("设置:", setting);

// ========================================
// 7. 索引签名（任意键）
// ========================================

console.log("\n7. 索引签名:");

// 定义任意字符串键和值的对象
interface StringIndex {
  [key: string]: string;
}

const dict: StringIndex = {
  name: "张三",
  city: "北京",
  country: "中国"
};

console.log("字典:", dict);

// 索引签名也可以是数字
interface NumberIndex {
  [index: number]: string;
}

const array: NumberIndex = {
  0: "first",
  1: "second",
  2: "third"
};

console.log("数字索引:", array);

// ========================================
// 8. 函数类型的接口
// ========================================

console.log("\n8. 函数类型的接口:");

// 定义函数签名的接口
interface Callback {
  (error: Error | null, data?: any): void;
}

const handleResult: Callback = (error, data) => {
  if (error) {
    console.log("错误:", error.message);
  } else {
    console.log("数据:", data);
  }
};

handleResult(null, { id: 1 });

// ========================================
// 9. 构造函数接口
// ========================================

console.log("\n9. 构造函数接口:");

interface Constructor {
  new (name: string): Person;
}

class PersonImpl implements Person {
  name: string;
  age: number;

  constructor(name: string) {
    this.name = name;
    this.age = 0;
  }
}

const createPerson: Constructor = PersonImpl;
const p = new createPerson("张三");
console.log("创建的人:", p);

// ========================================
// 10. Type 的高级用法
// ========================================

console.log("\n10. Type 的高级用法:");

// Type 可以定义联合类型
type Status = "success" | "error" | "loading";
type UserId = string | number;

const currentStatus: Status = "success";
const currentUserId: UserId = "user-123";

console.log("状态:", currentStatus);
console.log("用户ID:", currentUserId);

// Type 可以定义元组
type Tuple = [string, number, boolean];

const myTuple: Tuple = ["hello", 42, true];
console.log("元组:", myTuple);

// ========================================
// 11. 实际应用示例
// ========================================

console.log("\n11. 实际应用示例:");

// API 响应类型定义
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface UserResponse {
  id: number;
  name: string;
  email: string;
}

// 使用泛型和接口（后面详讲泛型）
const response: ApiResponse<UserResponse> = {
  code: 200,
  message: "success",
  data: {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com"
  }
};

console.log("API响应:", response);

// ========================================
// 总结
// ========================================

console.log("\n=== Interface vs Type 总结 ===");

console.log(`
Interface（接口）：
✓ 用于定义对象的形状
✓ 可以声明合并
✓ 可以被 implements
✓ 更好用于 OOP

Type（类型别名）：
✓ 可以定义任何类型（不仅是对象）
✓ 不能合并，但可以交叉 (&)
✓ 更灵活，用于函数式编程
✓ 可以定义联合类型、元组等

使用建议：
- 定义对象结构 → Interface
- 定义联合/文字/元组 → Type
- API 应答类型 → Interface
- 工具类型 → Type

关键记住：
✓ 接口支持继承和合并
✓ 类型支持联合和交叉
✓ 两者都可定义对象
`);

export {};

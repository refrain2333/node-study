// ========================================
// 2.接口与类型别名 - 进阶篇
// ========================================

console.log("=== 接口与类型别名 - 进阶 ===");

// ========================================
// 1. 泛型接口的高级用法
// ========================================

console.log("\n=== 1. 泛型接口 ===");

// 基础 API 响应
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 分页响应 - 嵌套泛型
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 组合使用
interface PaginatedApi<T> extends ApiResponse<PaginatedResponse<T>> {
  timestamp: Date;
}

type UserPageApi = PaginatedApi<{ id: number; name: string }>;

const examplePageResponse: UserPageApi = {
  code: 200,
  message: "success",
  data: {
    items: [{ id: 1, name: "张三" }],
    total: 100,
    page: 1,
    pageSize: 20
  },
  timestamp: new Date()
};

console.log("分页 API 响应:", examplePageResponse);

// ========================================
// 2. 条件类型（Conditional Types）
// ========================================

console.log("\n=== 2. 条件类型 ===");

// 基础条件类型
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">;      // true
type B = IsString<number>;        // false

// 实际应用：获取数组元素类型
type ElementType<T> = T extends (infer E)[] ? E : T;

type NumArray = ElementType<number[]>;   // number
type StrSingle = ElementType<string>;    // string

// 实际案例：API 返回类型推断
interface HasId {
  id: number;
}

type GetIdType<T> = T extends HasId ? number : never;

interface User extends HasId {
  name: string;
}

interface Product {
  code: string;
}

type UserIdType = GetIdType<User>;      // number
type ProductIdType = GetIdType<Product>; // never

console.log("条件类型推断完成");

// ========================================
// 3. 映射类型（Mapped Types）
// ========================================

console.log("\n=== 3. 映射类型 ===");

// 将所有属性设为可读
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// 将所有属性设为可选
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// 实际案例：API 请求和响应分离
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

// 创建产品 - 不需要 id
type CreateProductRequest = Omit<Product, "id">;

// 更新产品 - 所有字段都可选
type UpdateProductRequest = Partial<Product>;

// 响应 - 所有字段只读
type ProductResponse = Readonly<Product>;

// 提取所有 string 类型的属性
type StringProperties<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type ProductStrings = StringProperties<Product>;
// 结果: { name: string; description: string }

console.log("映射类型定义完成");

// ========================================
// 4. keyof 和 typeof 的组合
// ========================================

console.log("\n=== 4. keyof 和 typeof ===");

interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
  debug: boolean;
}

// 类型安全的配置 getter
function getConfig<K extends keyof Config>(key: K): Config[K] {
  const config: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
    debug: true
  };
  return config[key];
}

const apiUrl = getConfig("apiUrl");    // string
const timeout = getConfig("timeout");  // number
// const unknown = getConfig("other");  // ✗ 类型错误

// 记录所有配置变更
type ConfigChangeListener<K extends keyof Config> = (
  key: K,
  oldValue: Config[K],
  newValue: Config[K]
) => void;

// 示例：只监听字符串类型的变更
const apiUrlListener: ConfigChangeListener<"apiUrl"> = (key, old, newVal) => {
  console.log(`API URL 从 ${old} 变更为 ${newVal}`);
};

// ========================================
// 5. 模式匹配类型
// ========================================

console.log("\n=== 5. 模式匹配 ===");

// 提取 Promise 的返回类型
type Unwrap<T> = T extends Promise<infer U> ? U : T;

type PromiseString = Unwrap<Promise<string>>;    // string
type DirectNumber = Unwrap<number>;              // number

// 提取函数返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

const getUserName = (id: number): string => "张三";
type GetUserNameReturn = ReturnType<typeof getUserName>; // string

// 提取函数参数
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

type GetUserNameParams = Parameters<typeof getUserName>; // [id: number]

// ========================================
// 6. 递归条件类型
// ========================================

console.log("\n=== 6. 递归类型 ===");

// 深度 Readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface NestedConfig {
  server: {
    host: string;
    port: number;
    ssl: {
      enabled: boolean;
      cert: string;
    };
  };
  database: {
    url: string;
  };
}

type DeepReadonlyConfig = DeepReadonly<NestedConfig>;
// server.ssl.enabled 现在是 readonly!

// 深度展开类型
type Flatten<T> = {
  [K in keyof T]: T[K] extends object ? Flatten<T[K]> : T[K];
};

console.log("递归类型定义完成");

// ========================================
// 7. 模板字符串类型
// ========================================

console.log("\n=== 7. 模板字符串类型 ===");

// 构造事件名称类型
type EventName = `on${Capitalize<"click" | "change" | "focus">}`;
// "onClick" | "onChange" | "onFocus"

// 路由参数提取
type ExtractRouteParams<T extends string> = 
  T extends `${infer _}:${infer Param}/${infer Rest}`
    ? Param | ExtractRouteParams<`/${Rest}`>  // 递归处理剩余部分
    : T extends `${infer _}:${infer Param}`
    ? Param  // 最后一个参数
    : never;

type UserRoutes = ExtractRouteParams<"/users/:id/posts/:postId">;
// "id" | "postId"

// ========================================
// 8. 类型继承和合并
// ========================================

console.log("\n=== 8. 类型继承和合并 ===");

// 基础错误类型
interface ApiError {
  code: string;
  message: string;
}

// 验证错误 - 扩展基础错误
interface ValidationError extends ApiError {
  field: string;
  value: unknown;
}

// 运行时错误 - 扩展基础错误
interface RuntimeError extends ApiError {
  stack?: string;
  context: Record<string, unknown>;
}

// 所有可能的错误
type AnyError = ValidationError | RuntimeError;

// 类型守卫
function isValidationError(error: AnyError): error is ValidationError {
  return "field" in error;
}

function handleError(error: AnyError) {
  if (isValidationError(error)) {
    console.log(`字段 ${error.field} 验证失败: ${error.message}`);
  } else {
    console.log(`运行时错误: ${error.message}`);
  }
}

// ========================================
// 9. 工具类型组合
// ========================================

console.log("\n=== 9. 工具类型 ===");

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// 选择特定字段
type UserPublic = Pick<User, "id" | "name" | "email">;

// 排除特定字段
type UserWithoutPassword = Omit<User, "password">;

// 所有属性都是可选
type UserDraft = Partial<User>;

// 所有属性都必须
type UserRequired = Required<User>;

// 返回对象值类型的联合
type UserValues = User[keyof User];
// string | number | Date

// 提取可选属性
type UserOptional = {
  [K in keyof User as {} extends Pick<User, K> ? K : never]: User[K];
};

console.log("工具类型组合完成");

// ========================================
// 10. 实战：复杂 API 类型设计
// ========================================

console.log("\n=== 10. 实战：API 类型设计 ===");

// 定义各种可能的 API 状态
type ApiStatus = "loading" | "success" | "error" | "idle";

// 泛型 API 状态
interface ApiState<T> {
  status: ApiStatus;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// 使用条件类型验证状态
type GetData<T> = T extends ApiState<infer U> ? U : never;

type UserData = GetData<ApiState<{ name: string }>>;
// { name: string }

// 生成 API 方法的类型
interface ApiEndpoints {
  "/users": { GET: { id: number }; POST: { name: string } };
  "/products": { GET: { page: number }; DELETE: { id: number } };
}

// 动态提取特定端点的方法
type GetMethod<
  Endpoint extends keyof ApiEndpoints,
  Method extends keyof ApiEndpoints[Endpoint]
> = ApiEndpoints[Endpoint][Method];

type GetUsersMethod = GetMethod<"/users", "GET">;
// { id: number }

console.log("复杂 API 类型设计完成");

// ========================================
// 总结
// ========================================

console.log("\n=== 进阶特性总结 ===");

console.log(`
✅ 泛型接口 - 可复用的类型定义
✅ 条件类型 - 动态类型推断
✅ 映射类型 - 批量转换类型
✅ keyof 和 typeof - 类型操作符
✅ 模式匹配 - 提取嵌套类型
✅ 递归类型 - 深度类型转换
✅ 模板字符串类型 - 字符串字面量类型
✅ 类型继承 - 类型之间的层级关系
✅ 工具类型 - TypeScript 内置的便利工具
✅ API 类型设计 - 实战应用

这些高级特性让 TypeScript 类型系统足够表达任何复杂的业务逻辑！
`);

export {};

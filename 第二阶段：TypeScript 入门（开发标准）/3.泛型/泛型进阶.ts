// ========================================
// 3.泛型 - 进阶篇
// ========================================

console.log("=== 泛型 - 进阶篇 ===");

// ========================================
// 1. 泛型约束的高级应用
// ========================================

console.log("\n=== 1. 泛型约束 ===");

// 基础约束
interface WithId {
  id: number;
}

function getId<T extends WithId>(obj: T): number {
  return obj.id;
}

const user = { id: 1, name: "张三" };
console.log("用户 ID:", getId(user));

// 多重约束：使用交集类型
interface Named {
  name: string;
}

interface WithAge {
  age: number;
}

function describe<T extends Named & WithAge>(person: T): string {
  return `${person.name} 今年 ${person.age} 岁`;
}

console.log(describe({ name: "李四", age: 25 }));

// 约束泛型参数之间的关系
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "王五", age: 30 };
const name = getProperty(person, "name"); // ✓ 类型推断为 string
// getProperty(person, "email");        // ✗ 不存在的属性

console.log("高级约束应用完成");

// ========================================
// 2. 条件泛型 - 根据类型参数选择不同的返回
// ========================================

console.log("\n=== 2. 条件泛型 ===");

// 根据输入类型返回不同的类型
type Flatten<T> = T extends Array<infer U> ? U : T;

type Str = Flatten<string[]>;        // string
type Num = Flatten<number>;          // number

// 实战：API 响应转换
type ApiPayload<T> = T extends { data: infer U } ? U : T;

interface UserResponse {
  code: 200;
  data: { id: number; name: string };
}

type UserData = ApiPayload<UserResponse>;
// { id: number; name: string }

// 嵌套条件类型
type DeepFlatten<T> = T extends Array<infer U>
  ? DeepFlatten<U>
  : T;

type NestedFlat = DeepFlatten<[[[number]]]>; // number

// ========================================
// 3. 默认泛型参数
// ========================================

console.log("\n=== 3. 默认泛型参数 ===");

// 如果不提供泛型，使用默认值
interface Container<T = string> {
  value: T;
  getValue(): T;
}

const stringContainer: Container = { value: "hello", getValue: () => "hello" };
const numberContainer: Container<number> = { value: 42, getValue: () => 42 };

// 多个泛型参数的默认值
interface Pair<T = any, U = T> {
  first: T;
  second: U;
}

const samePair: Pair = { first: 1, second: 2 };
const diffPair: Pair<string, number> = { first: "a", second: 1 };

// ========================================
// 4. 泛型工具：构造和推断
// ========================================

console.log("\n=== 4. 泛型工具 ===");

// 构造函数泛型
interface Constructor<T> {
  new (...args: any[]): T;
}

class User {
  constructor(public name: string) {}
}

function createInstance<T>(ctor: Constructor<T>): T {
  return new ctor("default");
}

// 这会产生类型错误，因为 User 需要 name 参数
// const user = createInstance(User);

// 提取类的实例类型
type InstanceType<T> = T extends new (...args: any[]) => infer I ? I : never;

type UserInstance = InstanceType<typeof User>; // User

// ========================================
// 5. 递归泛型
// ========================================

console.log("\n=== 5. 递归泛型 ===");

// 深度提取值类型
type DeepValue<T> = {
  [K in keyof T]: T[K] extends object ? DeepValue<T[K]> : T[K];
};

interface Config {
  server: {
    host: string;
    port: number;
    ssl: {
      enabled: boolean;
    };
  };
}

type ConfigValues = DeepValue<Config>;
// server.ssl.enabled 的类型是 boolean

// 树形结构的递归处理
interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

function flattenTree<T>(node: TreeNode<T>): T[] {
  const result: T[] = [node.value];
  for (const child of node.children) {
    result.push(...flattenTree(child));
  }
  return result;
}

const numberTree: TreeNode<number> = {
  value: 1,
  children: [
    { value: 2, children: [] },
    { value: 3, children: [{ value: 4, children: [] }] }
  ]
};

console.log("树形结构展平:", flattenTree(numberTree));

// ========================================
// 6. 泛型约束中的 keyof
// ========================================

console.log("\n=== 6. keyof 约束 ===");

// 获取对象的某个属性
function pick<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const config = { timeout: 5000, retries: 3, debug: true };
const timeout = pick(config, "timeout"); // 类型: number
// pick(config, "unknown");              // ✗ 类型错误

// 多个 key 的提取
function pickMultiple<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
}

const picked = pickMultiple(config, ["timeout", "debug"]);
// { timeout: 5000, debug: true }

// ========================================
// 7. 映射泛型：转换整个对象
// ========================================

console.log("\n=== 7. 映射泛型 ===");

// 所有属性变成 Promise
type Asyncify<T> = {
  [K in keyof T]: Promise<T[K]>;
};

interface User {
  id: number;
  name: string;
}

type AsyncUser = Asyncify<User>;
// {
//   id: Promise<number>;
//   name: Promise<string>;
// }

// 所有属性变成 getter 函数
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getName: () => string;
// }

// 实战：API 请求/响应映射
interface ApiMethods {
  getUser: (id: number) => User;
  getUsers: (page: number) => User[];
  createUser: (data: any) => User;
}

// 转换为 async 版本
type AsyncApiMethods<T extends Record<string, Function>> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer R
    ? (...args: Args) => Promise<R>
    : never;
};

type AsyncApi = AsyncApiMethods<ApiMethods>;
// getUser: (id: number) => Promise<User>

// ========================================
// 8. 约束继承链
// ========================================

console.log("\n=== 8. 约束继承链 ===");

// 泛型链式约束
function extend<T extends U, U>(base: U, custom: T): T {
  return custom;
}

const baseConfig = { timeout: 5000 };
const extendedConfig = extend({ timeout: 3000, retries: 3 }, baseConfig);

// 在类中使用泛型约束
abstract class Repository<T extends { id: number }> {
  async getById(id: number): Promise<T | null> {
    // 模拟数据库查询
    return null;
  }

  async update(id: number, data: Partial<Omit<T, "id">>): Promise<T | null> {
    // 更新逻辑
    return null;
  }
}

interface UserEntity extends { id: number } {
  name: string;
  email: string;
}

class UserRepository extends Repository<UserEntity> {
  // 继承了 getById 和 update，都类型安全
}

// ========================================
// 9. 条件类型分布律
// ========================================

console.log("\n=== 9. 条件类型分布 ===");

// 联合类型的分布
type ToArray<T> = T extends unknown ? T[] : never;

type StringOrNumber = ToArray<string | number>;
// string[] | number[]

// 分布的应用：过滤类型
type FilterString<T> = T extends string ? T : never;

type MixedUnion = string | number | boolean;
type StringOnly = FilterString<MixedUnion>;
// string

// 不使用分布（用方括号包装）
type ToArrayNonDist<T> = [T] extends unknown ? T[] : never;

type Result = ToArrayNonDist<string | number>;
// (string | number)[]

// ========================================
// 10. 高级用例：状态机
// ========================================

console.log("\n=== 10. 状态机 ===");

// 定义状态和事件
interface IdleState {
  type: "idle";
}

interface LoadingState {
  type: "loading";
  progress: number;
}

interface ErrorState {
  type: "error";
  message: string;
}

interface SuccessState {
  type: "success";
  data: unknown;
}

type State = IdleState | LoadingState | ErrorState | SuccessState;

// 条件类型提取特定状态的数据
type StateData<S extends State, T extends S["type"]> = Extract<S, { type: T }>;

type LoadingData = StateData<State, "loading">; // LoadingState

// 状态转换的泛型
interface Transition<From extends State, To extends State> {
  from: From["type"];
  to: To["type"];
  guard?: (state: From) => boolean;
}

class StateMachine<T extends State = State> {
  private state: T;
  private transitions: Transition<any, any>[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  addTransition<F extends T, ToType extends State["type"]>(
    transition: Transition<F, StateData<State, ToType>>
  ) {
    this.transitions.push(transition);
  }

  getState(): T {
    return this.state;
  }
}

console.log("状态机类型定义完成");

// ========================================
// 总结
// ========================================

console.log("\n=== 进阶泛型特性总结 ===");

console.log(`
✅ 泛型约束 - 限制泛型参数的范围
✅ 条件泛型 - 根据类型参数动态决定返回类型
✅ 默认参数 - 泛型的可选参数
✅ 泛型工具 - 构造函数、实例提取
✅ 递归泛型 - 处理嵌套结构
✅ keyof 约束 - 对象属性级别的类型安全
✅ 映射泛型 - 批量转换对象属性
✅ 约束继承链 - 复杂的泛型关系
✅ 条件分布 - 联合类型的特殊处理
✅ 状态机 - 实战高级应用

这些特性使得 TypeScript 能够表达任何复杂的类型关系！
`);

export {};

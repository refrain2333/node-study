// ========================================
// 5. 综合练习 - 将 JavaScript 改写为 TypeScript
// ========================================

console.log("=== 第二阶段综合练习 ===");

// ========================================
// 项目1：用户管理系统（类型安全）
// ========================================

console.log("\n=== 项目1：用户管理系统 ===");

// 1. 定义类型和接口
interface UserProfile {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
  roles: Role[];
}

type Role = "admin" | "user" | "guest";

interface CreateUserInput {
  name: string;
  email: string;
  age?: number;
}

interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}

// 2. 用户仓储类
class UserRepository {
  private users: Map<number, UserProfile> = new Map();
  private nextId: number = 1;

  create(input: CreateUserInput): UserProfile {
    const user: UserProfile = {
      id: this.nextId++,
      name: input.name,
      email: input.email,
      age: input.age,
      isActive: true,
      roles: ["user"]
    };

    this.users.set(user.id, user);
    return user;
  }

  findById(id: number): UserProfile | undefined {
    return this.users.get(id);
  }

  findAll(): UserProfile[] {
    return Array.from(this.users.values());
  }

  update(id: number, data: Partial<UserProfile>): UserProfile | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updated = { ...user, ...data };
    this.users.set(id, updated);
    return updated;
  }

  delete(id: number): boolean {
    return this.users.delete(id);
  }
}

// 3. 用户服务类
class UserService {
  constructor(private repository: UserRepository) {}

  createUser(input: CreateUserInput): ApiResponse<UserProfile> {
    try {
      // 验证
      if (!input.name.trim()) {
        return {
          code: 400,
          message: "名字不能为空"
        };
      }

      if (!this.isValidEmail(input.email)) {
        return {
          code: 400,
          message: "邮箱格式不正确"
        };
      }

      // 创建
      const user = this.repository.create(input);

      return {
        code: 200,
        message: "用户创建成功",
        data: user
      };
    } catch (error) {
      return {
        code: 500,
        message: `创建失败: ${error instanceof Error ? error.message : "未知错误"}`
      };
    }
  }

  getUser(id: number): ApiResponse<UserProfile> {
    const user = this.repository.findById(id);

    if (!user) {
      return {
        code: 404,
        message: "用户不存在"
      };
    }

    return {
      code: 200,
      message: "获取成功",
      data: user
    };
  }

  listUsers(): ApiResponse<UserProfile[]> {
    return {
      code: 200,
      message: "获取列表成功",
      data: this.repository.findAll()
    };
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

// 使用示例
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const createRes = userService.createUser({
  name: "张三",
  email: "zhangsan@example.com",
  age: 25
});
console.log("1. 创建用户:", createRes);

const createRes2 = userService.createUser({
  name: "李四",
  email: "lisi@example.com"
});
console.log("2. 创建第二个用户:", createRes2);

const listRes = userService.listUsers();
console.log("3. 用户列表:", listRes);

// ========================================
// 项目2：购物车系统（泛型应用）
// ========================================

console.log("\n=== 项目2：购物车系统 ===");

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface CartItem<T extends Product> {
  product: T;
  quantity: number;
  subtotal: number;
}

class Cart<T extends Product> {
  private items: CartItem<T>[] = [];

  addItem(product: T, quantity: number): void {
    const existing = this.items.find(item => item.product.id === product.id);

    if (existing) {
      existing.quantity += quantity;
      existing.subtotal = existing.quantity * product.price;
    } else {
      this.items.push({
        product,
        quantity,
        subtotal: quantity * product.price
      });
    }
  }

  removeItem(productId: number): void {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.subtotal, 0);
  }

  getItems(): CartItem<T>[] {
    return this.items;
  }

  clear(): void {
    this.items = [];
  }
}

// 使用
const cart = new Cart<Product>();

const iphone: Product = { id: 1, name: "iPhone", price: 8000, stock: 10 };
const macbook: Product = { id: 2, name: "MacBook", price: 15000, stock: 5 };

cart.addItem(iphone, 1);
cart.addItem(macbook, 1);

console.log("购物车项目:");
cart.getItems().forEach(item => {
  console.log(`  ${item.product.name}: ${item.quantity} x ¥${item.product.price} = ¥${item.subtotal}`);
});
console.log("购物车总额: ¥" + cart.getTotal());

// ========================================
// 项目3：异步数据处理（Promise<T>）
// ========================================

console.log("\n=== 项目3：异步数据处理 ===");

interface FetchResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function fetchUserData(userId: number): Promise<FetchResult<UserProfile>> {
  try {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = userRepository.findById(userId);
    if (!user) {
      return {
        success: false,
        error: "用户不存在"
      };
    }

    return {
      success: true,
      data: user
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "未知错误"
    };
  }
}

async function fetchMultipleUsers(userIds: number[]): Promise<FetchResult<UserProfile[]>> {
  try {
    const results = await Promise.all(
      userIds.map(id => fetchUserData(id))
    );

    const users = results
      .filter(result => result.success && result.data)
      .map(result => result.data!);

    return {
      success: true,
      data: users
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "未知错误"
    };
  }
}

// 使用异步函数
(async () => {
  console.log("异步获取用户数据:");
  const singleUser = await fetchUserData(1);
  console.log("单个用户:", singleUser);
})();

// ========================================
// 项目4：数据转换管道（高阶函数）
// ========================================

console.log("\n=== 项目4：数据转换管道 ===");

type Transformer<T, U> = (data: T) => U;

class Pipeline<T> {
  constructor(private data: T) {}

  pipe<U>(transformer: Transformer<T, U>): Pipeline<U> {
    return new Pipeline(transformer(this.data));
  }

  get(): T {
    return this.data;
  }
}

// 定义转换函数
const toUpperCase: Transformer<string, string> = (str) => str.toUpperCase();
const addPrefix: Transformer<string, string> = (str) => `PREFIX_${str}`;
const addSuffix: Transformer<string, string> = (str) => `${str}_SUFFIX`;

// 使用管道
const result = new Pipeline("hello")
  .pipe(toUpperCase)
  .pipe(addPrefix)
  .pipe(addSuffix)
  .get();

console.log("管道转换结果:", result);

// ========================================
// 项目5：事件系统（泛型和继承）
// ========================================

console.log("\n=== 项目5：事件系统 ===");

interface EventHandler<T> {
  (data: T): void;
}

class EventEmitter<T> {
  private handlers: Set<EventHandler<T>> = new Set();

  on(handler: EventHandler<T>): void {
    this.handlers.add(handler);
  }

  off(handler: EventHandler<T>): void {
    this.handlers.delete(handler);
  }

  emit(data: T): void {
    this.handlers.forEach(handler => handler(data));
  }
}

// 定义事件类型
interface UserCreatedEvent {
  userId: number;
  userName: string;
  timestamp: Date;
}

// 创建事件发射器
const userCreatedEmitter = new EventEmitter<UserCreatedEvent>();

// 注册事件监听
userCreatedEmitter.on((event) => {
  console.log(`[事件] 用户创建: ${event.userName} (ID: ${event.userId})`);
});

userCreatedEmitter.on((event) => {
  console.log(`[日志] ${event.timestamp.toISOString()}`);
});

// 触发事件
userCreatedEmitter.emit({
  userId: 1,
  userName: "张三",
  timestamp: new Date()
});

// ========================================
// 项目6：API 层类型定义
// ========================================

console.log("\n=== 项目6：API 层类型定义 ===");

// 请求/响应类型
interface PageQuery {
  page: number;
  pageSize: number;
}

interface PageResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiRequest<T = any> {
  method: ApiMethod;
  url: string;
  data?: T;
  headers?: Record<string, string>;
}

interface ApiResponseSuccess<T> {
  code: 200;
  message: string;
  data: T;
}

interface ApiResponseError {
  code: number;
  message: string;
}

type ApiResponseData<T> = ApiResponseSuccess<T> | ApiResponseError;

// 模拟 API 调用
async function apiCall<ReqData, ResData>(
  request: ApiRequest<ReqData>
): Promise<ApiResponseData<ResData>> {
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 300));

    // 模拟成功响应
    return {
      code: 200,
      message: "请求成功",
      data: {} as ResData
    };
  } catch (error) {
    return {
      code: 500,
      message: error instanceof Error ? error.message : "服务器错误"
    };
  }
}

console.log("API 类型定义完成");

// ========================================
// 总结
// ========================================

console.log("\n=== 综合练习总结 ===");

console.log(`
第二阶段学习完成的项目：

✅ 项目1：用户管理系统
   - 接口定义
   - 类和继承
   - 服务层模式

✅ 项目2：购物车系统
   - 泛型类应用
   - 类型约束
   - 实体管理

✅ 项目3：异步数据处理
   - Promise<T> 类型
   - async/await
   - 错误处理

✅ 项目4：数据转换管道
   - 高阶函数
   - 函数类型
   - 链式调用

✅ 项目5：事件系统
   - 泛型事件
   - 发布订阅模式
   - 类型安全

✅ 项目6：API 层类型定义
   - 请求/响应类型
   - 泛型应用
   - 模块化设计

下一步：
进入第三阶段 Node.js + Koa 开发！
这些类型和设计模式会在 Koa 项目中大量使用！
`);

console.log("\n准备好进入第三阶段了吗？👉");

export {};

// ========================================
// 4. 类与装饰器 - 基础示例
// ========================================

console.log("=== TypeScript 类与装饰器 ===");

// ========================================
// 1. 基础类定义
// ========================================

console.log("\n1. 基础类定义:");

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): void {
    console.log(`我是 ${this.name}，今年 ${this.age} 岁`);
  }
}

const person = new Person("张三", 25);
person.introduce();

// ========================================
// 2. 访问修饰符
// ========================================

console.log("\n2. 访问修饰符:");

class Account {
  public id: number; // 公开，任何地方都能访问
  private password: string; // 私有，只在类内部访问
  protected email: string; // 受保护，类和子类可以访问

  constructor(id: number, password: string, email: string) {
    this.id = id;
    this.password = password;
    this.email = email;
  }

  // 公开方法
  public getInfo(): string {
    return `账号: ${this.id}`;
  }

  // 私有方法
  private checkPassword(pwd: string): boolean {
    return pwd === this.password;
  }

  // 受保护的方法
  protected updateEmail(newEmail: string): void {
    this.email = newEmail;
  }
}

const account = new Account(123, "secret", "user@example.com");
console.log(account.getInfo()); // ✓ 可以访问
// console.log(account.password); // ❌ 错误，password 是私有的

// ========================================
// 3. 继承
// ========================================

console.log("\n3. 继承:");

class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): void {
    console.log(`${this.name} 发出声音`);
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name); // 调用父类构造函数
    this.breed = breed;
  }

  // 重写父类方法
  speak(): void {
    console.log(`${this.name}（${this.breed}）汪汪汪`);
  }

  // 特有方法
  fetch(): void {
    console.log(`${this.name} 去叼球`);
  }
}

const dog = new Dog("旺财", "金毛");
dog.speak(); // 调用重写后的方法
dog.fetch(); // 调用特有方法

// ========================================
// 4. 抽象类
// ========================================

console.log("\n4. 抽象类:");

// 抽象类不能直接实例化，必须被继承
abstract class Shape {
  abstract area(): number;

  describe(): void {
    console.log(`这个形状的面积是 ${this.area()}`);
  }
}

class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

const circle = new Circle(5);
circle.describe(); // "这个形状的面积是 78.53981633974483"

const rectangle = new Rectangle(10, 20);
rectangle.describe(); // "这个形状的面积是 200"

// ========================================
// 5. getters 和 setters
// ========================================

console.log("\n5. getters 和 setters:");

class Temperature {
  private celsius: number;

  constructor(celsius: number) {
    this.celsius = celsius;
  }

  // getter
  get fahrenheit(): number {
    return (this.celsius * 9/5) + 32;
  }

  // setter
  set fahrenheit(f: number) {
    this.celsius = (f - 32) * 5/9;
  }

  get celsiusValue(): number {
    return this.celsius;
  }
}

const temp = new Temperature(0);
console.log(`0°C = ${temp.fahrenheit}°F`);
temp.fahrenheit = 98.6;
console.log(`98.6°F = ${temp.celsiusValue}°C`);

// ========================================
// 6. 静态属性和方法
// ========================================

console.log("\n6. 静态属性和方法:");

class Counter {
  static count: number = 0; // 静态属性

  static increment(): void {
    Counter.count++;
  }

  static getCount(): number {
    return Counter.count;
  }
}

Counter.increment();
Counter.increment();
console.log("计数器:", Counter.getCount()); // 2

// ========================================
// 7. 装饰器简介
// ========================================

console.log("\n7. 装饰器简介（概念演示）:");

// 装饰器是一个函数，用于修饰类、方法、属性等
// 注意：使用装饰器需要在 tsconfig.json 中启用 "experimentalDecorators": true

// 这是一个类装饰器的例子（伪代码，需要启用装饰器支持）
// @log
// class User {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }

// 定义装饰器函数
function logged(target: any) {
  console.log(`类 ${target.name} 被装饰器处理`);
  return target;
}

// 方法装饰器
function timing(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.time(propertyKey);
    const result = originalMethod.apply(this, args);
    console.timeEnd(propertyKey);
    return result;
  };

  return descriptor;
}

class Service {
  doSomething(): void {
    // 模拟耗时操作
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += i;
    }
  }
}

console.log("装饰器定义完成（更多详情见 Node.js 项目）");

// ========================================
// 8. 接口和类的结合
// ========================================

console.log("\n8. 接口和类的结合:");

interface Drawable {
  draw(): void;
}

interface Resizable {
  resize(width: number, height: number): void;
}

class Window implements Drawable, Resizable {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  draw(): void {
    console.log(`绘制窗口 (${this.width}x${this.height})`);
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    console.log(`窗口调整为 (${this.width}x${this.height})`);
  }
}

const window = new Window(800, 600);
window.draw();
window.resize(1024, 768);

// ========================================
// 9. 泛型类
// ========================================

console.log("\n9. 泛型类:");

class Repository<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  getAll(): T[] {
    return this.data;
  }

  getById(index: number): T | undefined {
    return this.data[index];
  }

  count(): number {
    return this.data.length;
  }
}

interface UserModel {
  id: number;
  name: string;
}

const userRepo = new Repository<UserModel>();
userRepo.add({ id: 1, name: "张三" });
userRepo.add({ id: 2, name: "李四" });

console.log("用户列表:", userRepo.getAll());
console.log("用户总数:", userRepo.count());

// ========================================
// 10. 实际应用示例
// ========================================

console.log("\n10. 实际应用示例:");

// 中间件基类（用于 Koa 项目）
abstract class Middleware {
  abstract handle(ctx: any, next: any): Promise<void>;
}

// 日志中间件
class LoggerMiddleware extends Middleware {
  async handle(ctx: any, next: any): Promise<void> {
    console.log(`[${new Date().toISOString()}] ${ctx.method} ${ctx.path}`);
    await next();
  }
}

// 认证中间件
class AuthMiddleware extends Middleware {
  async handle(ctx: any, next: any): Promise<void> {
    if (!ctx.headers.authorization) {
      ctx.status = 401;
      ctx.body = { error: "Unauthorized" };
      return;
    }
    await next();
  }
}

console.log("中间件类定义完成");

// ========================================
// 总结
// ========================================

console.log("\n=== 类与装饰器总结 ===");

console.log(`
类的基础：
✓ class 定义类
✓ constructor 构造函数
✓ extends 继承
✓ super 调用父类

访问修饰符：
✓ public（默认）- 公开
✓ private - 私有，只在类内
✓ protected - 受保护，类和子类可访问

高级特性：
✓ abstract class - 抽象类
✓ abstract method - 抽象方法
✓ static - 静态属性/方法
✓ get/set - 属性访问器
✓ implements - 实现接口
✓ <T> - 泛型类

装饰器：
✓ 函数形式的装饰器
✓ 用于修改类、方法、属性
✓ 在 Node.js Koa 项目中常见
✓ 需要启用 experimentalDecorators

在第三阶段 Koa 项目中会大量使用类！
`);

export {};

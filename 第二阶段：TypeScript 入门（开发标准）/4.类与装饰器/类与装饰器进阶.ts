// ========================================
// 4.类与装饰器 - 进阶篇
// ========================================

console.log("=== 类与装饰器 - 进阶篇 ===");

// ========================================
// 1. 高级继承模式
// ========================================

console.log("\n=== 1. 高级继承 ===");

// 混入（Mixins）模式
interface Swimmer {
  swim(): void;
}

interface Flyer {
  fly(): void;
}

// 实现多个接口
class Duck implements Swimmer, Flyer {
  swim(): void {
    console.log("鸭子在游泳");
  }

  fly(): void {
    console.log("鸭子在飞行");
  }
}

// Mixin 函数：合并多个类的功能
function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      const propertyDescriptor = Object.getOwnPropertyDescriptor(
        baseCtor.prototype,
        name
      );
      if (propertyDescriptor && name !== "constructor") {
        Object.defineProperty(derivedCtor.prototype, name, propertyDescriptor);
      }
    });
  });
}

class CanSwim {
  swim() {
    console.log("会游泳");
  }
}

class CanFly {
  fly() {
    console.log("会飞行");
  }
}

class GooseMixin implements Swimmer, Flyer {
  swim!: () => void;
  fly!: () => void;
}

applyMixins(GooseMixin, [CanSwim, CanFly]);

const goose = new GooseMixin();
goose.swim(); // "会游泳"
goose.fly();  // "会飞行"

// ========================================
// 2. 泛型类的高级用法
// ========================================

console.log("\n=== 2. 泛型类 ===");

// 树节点实现
class TreeNode<T> {
  private children: TreeNode<T>[] = [];

  constructor(public value: T) {}

  addChild(child: TreeNode<T>): void {
    this.children.push(child);
  }

  getChildren(): TreeNode<T>[] {
    return this.children;
  }

  // 遍历树
  traverse(callback: (node: TreeNode<T>) => void): void {
    callback(this);
    this.children.forEach(child => child.traverse(callback));
  }

  // 查找值
  find(predicate: (value: T) => boolean): TreeNode<T> | null {
    if (predicate(this.value)) return this;

    for (const child of this.children) {
      const found = child.find(predicate);
      if (found) return found;
    }

    return null;
  }
}

const root = new TreeNode<string>("Root");
const child1 = new TreeNode<string>("Child1");
const child2 = new TreeNode<string>("Child2");

root.addChild(child1);
root.addChild(child2);

console.log("树遍历:");
root.traverse(node => console.log(`  ${node.value}`));

// 对象池：使用泛型管理资源
class ObjectPool<T> {
  private available: T[] = [];
  private inUse: T[] = [];

  constructor(private factory: () => T) {}

  acquire(): T {
    const obj = this.available.pop() || this.factory();
    this.inUse.push(obj);
    return obj;
  }

  release(obj: T): void {
    const index = this.inUse.indexOf(obj);
    if (index !== -1) {
      this.inUse.splice(index, 1);
      this.available.push(obj);
    }
  }
}

class Connection {
  connect() {
    console.log("数据库连接中...");
  }
}

const connPool = new ObjectPool<Connection>(() => new Connection());
const conn = connPool.acquire();
conn.connect();

// ========================================
// 3. 元数据和反射（装饰器前置知识）
// ========================================

console.log("\n=== 3. 类成员的元数据 ===");

// 类属性描述符
class Person {
  private _age: number = 0;

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value < 0) throw new Error("年龄不能为负数");
    this._age = value;
  }
}

const person = new Person();
person.age = 25;
console.log("设置年龄: " + person.age);

// 对象属性描述符
const obj: any = {};

Object.defineProperty(obj, "name", {
  value: "张三",
  writable: false,    // 不可修改
  enumerable: true,   // 可枚举
  configurable: false // 不可配置
});

console.log("name 属性:", obj.name);
// obj.name = "李四"; // ✗ 错误：不可修改

// ========================================
// 4. 高级访问控制
// ========================================

console.log("\n=== 4. 访问控制模式 ===");

// 前缀约定的私有属性（ES5）
class BankAccount {
  private _balance: number = 0;

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("金额必须大于0");
    this._balance += amount;
  }

  withdraw(amount: number): boolean {
    if (amount > this._balance) return false;
    this._balance -= amount;
    return true;
  }

  getBalance(): number {
    return this._balance;
  }
}

const account = new BankAccount();
account.deposit(1000);
console.log("账户余额:", account.getBalance());

// 属性装饰符：严格的 getter/setter
class ValidatedUser {
  private _email: string = "";

  set email(value: string) {
    if (!this.isValidEmail(value)) {
      throw new Error("无效的邮箱格式");
    }
    this._email = value;
  }

  get email(): string {
    return this._email;
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

const user = new ValidatedUser();
user.email = "user@example.com";
console.log("邮箱:", user.email);

// ========================================
// 5. 抽象工厂模式
// ========================================

console.log("\n=== 5. 工厂模式 ===");

// 产品接口
interface Shape {
  draw(): void;
}

// 具体产品
class Circle implements Shape {
  draw(): void {
    console.log("画圆形");
  }
}

class Rectangle implements Shape {
  draw(): void {
    console.log("画矩形");
  }
}

// 工厂
class ShapeFactory {
  static createShape(type: "circle" | "rectangle"): Shape {
    switch (type) {
      case "circle":
        return new Circle();
      case "rectangle":
        return new Rectangle();
    }
  }
}

const circle = ShapeFactory.createShape("circle");
circle.draw();

// 抽象工厂
interface UIFactory {
  createButton(): Button;
  createTextbox(): Textbox;
}

interface Button {
  click(): void;
}

interface Textbox {
  type(): void;
}

class WindowsButton implements Button {
  click(): void {
    console.log("Windows 按钮点击");
  }
}

class MacButton implements Button {
  click(): void {
    console.log("Mac 按钮点击");
  }
}

class WindowsFactory implements UIFactory {
  createButton(): Button {
    return new WindowsButton();
  }

  createTextbox(): Textbox {
    throw new Error("Method not implemented.");
  }
}

// ========================================
// 6. 观察者模式（事件驱动）
// ========================================

console.log("\n=== 6. 观察者模式 ===");

// 事件类型
interface Observer<T> {
  update(data: T): void;
}

class Subject<T> {
  private observers: Observer<T>[] = [];

  attach(observer: Observer<T>): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer<T>): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data: T): void {
    this.observers.forEach(observer => observer.update(data));
  }
}

interface StockPrice {
  symbol: string;
  price: number;
}

class StockMarket extends Subject<StockPrice> {}

class Investor implements Observer<StockPrice> {
  constructor(private name: string) {}

  update(price: StockPrice): void {
    console.log(`${this.name} 收到更新: ${price.symbol} = ¥${price.price}`);
  }
}

const market = new StockMarket();
const investor1 = new Investor("小李");
const investor2 = new Investor("小王");

market.attach(investor1);
market.attach(investor2);

market.notify({ symbol: "AAPL", price: 150 });

// ========================================
// 7. 策略模式
// ========================================

console.log("\n=== 7. 策略模式 ===");

// 策略接口
interface SortStrategy<T> {
  sort(arr: T[]): T[];
}

// 具体策略
class BubbleSortStrategy<T> implements SortStrategy<T> {
  sort(arr: T[]): T[] {
    const result = [...arr];
    for (let i = 0; i < result.length - 1; i++) {
      for (let j = 0; j < result.length - i - 1; j++) {
        if (result[j] > result[j + 1]) {
          [result[j], result[j + 1]] = [result[j + 1], result[j]];
        }
      }
    }
    return result;
  }
}

class QuickSortStrategy<T> implements SortStrategy<T> {
  sort(arr: T[]): T[] {
    if (arr.length <= 1) return arr;
    return arr;
  }
}

// 使用策略的上下文
class Sorter<T> {
  constructor(private strategy: SortStrategy<T>) {}

  execute(arr: T[]): T[] {
    return this.strategy.sort(arr);
  }

  setStrategy(strategy: SortStrategy<T>): void {
    this.strategy = strategy;
  }
}

const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
const sorter = new Sorter<number>(new BubbleSortStrategy<number>());
console.log("排序结果:", sorter.execute(numbers));

// ========================================
// 8. 装饰器模式（结构型）
// ========================================

console.log("\n=== 8. 装饰器模式 ===");

// 组件接口
interface Component {
  getDescription(): string;
  getPrice(): number;
}

// 基础组件
class Coffee implements Component {
  getDescription(): string {
    return "黑咖啡";
  }

  getPrice(): number {
    return 20;
  }
}

// 装饰器基类
abstract class CoffeeDecorator implements Component {
  constructor(protected component: Component) {}

  getDescription(): string {
    return this.component.getDescription();
  }

  getPrice(): number {
    return this.component.getPrice();
  }
}

// 具体装饰器
class MilkDecorator extends CoffeeDecorator {
  getDescription(): string {
    return this.component.getDescription() + " + 牛奶";
  }

  getPrice(): number {
    return this.component.getPrice() + 5;
  }
}

class SugarDecorator extends CoffeeDecorator {
  getDescription(): string {
    return this.component.getDescription() + " + 糖";
  }

  getPrice(): number {
    return this.component.getPrice() + 2;
  }
}

// 使用
let coffee: Component = new Coffee();
console.log("基础咖啡:", coffee.getDescription(), "¥" + coffee.getPrice());

coffee = new MilkDecorator(coffee);
console.log("加奶:", coffee.getDescription(), "¥" + coffee.getPrice());

coffee = new SugarDecorator(coffee);
console.log("加糖:", coffee.getDescription(), "¥" + coffee.getPrice());

// ========================================
// 总结
// ========================================

console.log("\n=== 进阶类与模式总结 ===");

console.log(`
✅ 混入模式 - 组合多个类的功能
✅ 泛型类 - 类型安全的可复用类
✅ 元数据 - 对象属性的细粒度控制
✅ 访问控制 - 私有/保护/公开的设计
✅ 工厂模式 - 对象创建的抽象
✅ 观察者模式 - 事件驱动系统
✅ 策略模式 - 算法的动态选择
✅ 装饰器模式 - 动态添加功能

这些设计模式是创建可维护、可扩展代码的关键！
`);

export {};

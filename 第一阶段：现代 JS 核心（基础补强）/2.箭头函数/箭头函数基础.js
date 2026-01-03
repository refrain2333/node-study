// ========================================
// 2. 箭头函数 - 基础示例
// ========================================

console.log("=== 箭头函数基础示例 ===");

// ========================================
// 1. 基本语法对比
// ========================================

console.log("\n1. 基本语法对比:");

// 传统函数声明
function traditionalFunction(x, y) {
    return x + y;
}

// 箭头函数 - 多行函数体
const arrowFunction1 = (x, y) => {
    return x + y;
};

// 箭头函数 - 单行表达式（隐式返回）
const arrowFunction2 = (x, y) => x + y;

// 箭头函数 - 单个参数（可以省略括号）
const square = x => x * x;

// 箭头函数 - 无参数
const getRandom = () => Math.random();

console.log("传统函数:", traditionalFunction(2, 3)); // 5
console.log("箭头函数1:", arrowFunction1(2, 3));     // 5
console.log("箭头函数2:", arrowFunction2(2, 3));     // 5
console.log("单参数箭头函数:", square(4));           // 16
console.log("无参数箭头函数:", getRandom());         // 随机数

// ========================================
// 2. this 绑定的差异
// ========================================

console.log("\n2. this 绑定的差异:");

const obj = {
    name: "对象",
    
    // 传统函数 - this 指向调用者
    traditionalMethod() {
        console.log("传统函数的 this:", this.name);
        
        setTimeout(function() {
            console.log("传统函数内部的 this:", this.name); // undefined (window)
        }, 100);
    },
    
    // 箭头函数 - this 继承外层作用域
    arrowMethod() {
        console.log("箭头函数的 this:", this.name);
        
        setTimeout(() => {
            console.log("箭头函数内部的 this:", this.name); // "对象"
        }, 200);
    }
};

obj.traditionalMethod();
obj.arrowMethod();

// ========================================
// 3. 在数组方法中的应用
// ========================================

console.log("\n3. 在数组方法中的应用:");

const numbers = [1, 2, 3, 4, 5];

// map - 转换数组
const doubled = numbers.map(n => n * 2);
console.log("map - 翻倍:", doubled); // [2, 4, 6, 8, 10]

// filter - 过滤数组
const evens = numbers.filter(n => n % 2 === 0);
console.log("filter - 偶数:", evens); // [2, 4]

// find - 查找元素
const found = numbers.find(n => n > 3);
console.log("find - 大于3的数:", found); // 4

// reduce - 累积计算
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("reduce - 求和:", sum); // 15

// ========================================
// 4. Node.js 中间件中的应用
// ========================================

console.log("\n4. Node.js 中间件中的应用:");

// 模拟 Koa 中间件
function createMiddleware(name) {
    return async (ctx, next) => {
        console.log(`${name} 中间件开始`);
        
        // 记录开始时间
        const startTime = Date.now();
        
        // 执行下一个中间件
        await next();
        
        // 记录结束时间
        const endTime = Date.now();
        console.log(`${name} 中间件结束，耗时: ${endTime - startTime}ms`);
    };
}

// 模拟中间件栈
const middleware1 = createMiddleware("日志");
const middleware2 = createMiddleware("认证");
const middleware3 = createMiddleware("路由");

// 模拟执行
async function runMiddleware() {
    console.log("开始执行中间件...");
    
    // 模拟上下文
    const ctx = { request: { url: "/api/users" } };
    
    // 执行中间件
    await middleware1(ctx, async () => {
        await middleware2(ctx, async () => {
            await middleware3(ctx, async () => {
                console.log("最终处理逻辑");
            });
        });
    });
}

runMiddleware();

// ========================================
// 5. 事件处理中的应用
// ========================================

console.log("\n5. 事件处理中的应用:");

// 模拟 DOM 元素
const mockElement = {
    addEventListener: function(event, handler) {
        console.log(`为 ${event} 事件添加处理器`);
        // 模拟触发事件
        setTimeout(() => {
            console.log("模拟触发事件...");
            handler({ type: event, target: this });
        }, 100);
    }
};

// 传统事件处理器
mockElement.addEventListener('click', function(event) {
    console.log("传统事件处理器:", event.type);
});

// 箭头函数事件处理器
mockElement.addEventListener('click', (event) => {
    console.log("箭头函数事件处理器:", event.type);
});

// ========================================
// 6. Python vs JavaScript 箭头函数对比
// ========================================

console.log("\n6. Python vs JavaScript 箭头函数对比:");

// Python 的 lambda 函数
// lambda x, y: x + y

// JavaScript 的箭头函数
const add = (x, y) => x + y;
console.log("箭头函数加法:", add(3, 4)); // 7

// Python 的列表推导式
// [x * 2 for x in numbers if x % 2 == 0]

// JavaScript 的数组方法 + 箭头函数
const pythonStyle = numbers.filter(x => x % 2 === 0).map(x => x * 2);
console.log("类似 Python 列表推导式:", pythonStyle); // [4, 8]

// ========================================
// 7. 常见使用场景
// ========================================

console.log("\n7. 常见使用场景:");

// 场景1：回调函数
setTimeout(() => {
    console.log("延迟执行的箭头函数");
}, 300);

// 场景2：Promise 链
Promise.resolve(1)
    .then(x => x * 2)
    .then(x => x + 1)
    .then(result => {
        console.log("Promise 链结果:", result); // 3
    });

// 场景3：对象方法（注意 this 问题）
const calculator = {
    value: 0,
    
    // 错误示例：箭头函数不能作为对象方法
    // add: (x) => this.value += x, // this 指向错误
    
    // 正确示例：使用普通函数
    add(x) {
        this.value += x;
        return this;
    },
    
    multiply(x) {
        this.value *= x;
        return this;
    }
};

console.log("对象方法测试:", calculator.add(5).multiply(2).value); // 10

// ========================================
// 8. 注意事项和限制
// ========================================

console.log("\n8. 注意事项和限制:");

// 限制1：不能作为构造函数
try {
    const ArrowConstructor = (name) => { this.name = name; };
    // new ArrowConstructor("test"); // TypeError: ArrowConstructor is not a constructor
    console.log("箭头函数不能作为构造函数");
} catch (error) {
    console.log("错误:", error.message);
}

// 限制2：没有 arguments 对象
function regularFunction() {
    console.log("arguments:", arguments);
}

const arrowFunction = () => {
    // console.log(arguments); // ReferenceError: arguments is not defined
    console.log("箭头函数没有 arguments 对象");
};

regularFunction(1, 2, 3);
arrowFunction(1, 2, 3);

// 限制3：不能使用 yield
// const generatorArrow = () => { yield 1; }; // SyntaxError

// ========================================
// 9. 练习题
// ========================================

console.log("\n9. 练习题:");

// 练习1：修复 this 绑定问题
console.log("\n练习1：修复 this 绑定问题");

const user = {
    name: "张三",
    age: 25,
    
    // 问题代码
    greet1: function() {
        setTimeout(function() {
            console.log("greet1:", this.name); // undefined
        }, 100);
    },
    
    // 修复后的代码
    greet2: function() {
        setTimeout(() => {
            console.log("greet2:", this.name); // "张三"
        }, 200);
    }
};

user.greet1();
user.greet2();

// 练习2：使用箭头函数重写数组操作
console.log("\n练习2：使用箭头函数重写数组操作");

const products = [
    { name: "苹果", price: 5 },
    { name: "香蕉", price: 3 },
    { name: "橙子", price: 4 }
];

// 使用箭头函数实现：
// 1. 找出价格大于 3 的产品
const expensiveProducts = products.filter(p => p.price > 3);
console.log("价格大于3的产品:", expensiveProducts);

// 2. 计算总价
const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
console.log("总价:", totalPrice);

// 3. 生成产品描述
const descriptions = products.map(p => `${p.name} - ¥${p.price}`);
console.log("产品描述:", descriptions);

// 练习3：创建一个简单的 HTTP 请求包装器
console.log("\n练习3：创建 HTTP 请求包装器");

const http = {
    get: (url) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ status: 200, data: `数据来自 ${url}` });
            }, 100);
        });
    },
    
    post: (url, data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ status: 201, data: `创建成功: ${JSON.stringify(data)}` });
            }, 100);
        });
    }
};

// 使用箭头函数包装 HTTP 请求
const api = {
    getUsers: () => http.get('/api/users'),
    createUser: (user) => http.post('/api/users', user)
};

// 测试
api.getUsers().then(response => {
    console.log("获取用户:", response.data);
});

api.createUser({ name: "新用户" }).then(response => {
    console.log("创建用户:", response.data);
});
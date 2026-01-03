// ========================================
// 箭头函数讲解
// ========================================

console.log("=== 箭头函数讲解 ===");

// ========================================
// 1. 箭头函数的基本语法
// ========================================

console.log("\n1. 箭头函数的基本语法:");

// 传统函数
function traditionalFunction(a, b) {
    return a + b;
}

// 箭头函数
const arrowFunction = (a, b) => a + b;

console.log("传统函数结果:", traditionalFunction(2, 3)); // 5
console.log("箭头函数结果:", arrowFunction(2, 3));     // 5

// ========================================
// 2. 箭头函数的简写形式
// ========================================

console.log("\n2. 箭头函数的简写形式:");

// 单参数可以省略括号
const square = x => x * x;
console.log("平方:", square(5)); // 25

// 无参数需要空括号
const getRandom = () => Math.random();
console.log("随机数:", getRandom());

// 多行代码需要大括号和return
const multiLine = (a, b) => {
    const sum = a + b;
    return sum * 2;
};
console.log("多行箭头函数:", multiLine(2, 3)); // 10

// ========================================
// 3. 箭头函数与this
// ========================================

console.log("\n3. 箭头函数与this:");

// 传统函数的this问题
function TraditionalObject() {
    this.value = 10;
    this.getValue = function() {
        return this.value;
    };
}

const obj1 = new TraditionalObject();
console.log("传统函数this:", obj1.getValue()); // 10

// 箭头函数没有自己的this，会继承外层作用域的this
function ArrowObject() {
    this.value = 20;
    this.getValue = () => {
        return this.value;
    };
}

const obj2 = new ArrowObject();
console.log("箭头函数this:", obj2.getValue()); // 20

// ========================================
// 4. 箭头函数在数组方法中的应用
// ========================================

console.log("\n4. 箭头函数在数组方法中的应用:");

const numbers = [1, 2, 3, 4, 5];

// map
const doubled = numbers.map(x => x * 2);
console.log("map结果:", doubled); // [2, 4, 6, 8, 10]

// filter
const even = numbers.filter(x => x % 2 === 0);
console.log("filter结果:", even); // [2, 4]

// reduce
const sum = numbers.reduce((acc, x) => acc + x, 0);
console.log("reduce结果:", sum); // 15

// ========================================
// 5. 箭头函数的注意事项
// ========================================

console.log("\n5. 箭头函数的注意事项:");

// 不能作为构造函数
try {
    const BadConstructor = () => {};
    new BadConstructor();
} catch (error) {
    console.log("箭头函数不能作为构造函数:", error.message);
}

// 没有arguments对象
function traditionalWithArgs() {
    return arguments;
}

const arrowWithArgs = () => {
    // return arguments; // 会报错
    return "箭头函数没有arguments";
};

console.log("传统函数arguments:", traditionalWithArgs(1, 2, 3));
console.log("箭头函数:", arrowWithArgs());

// ========================================
// 6. 实际应用场景
// ========================================

console.log("\n6. 实际应用场景:");

// 场景1：回调函数
setTimeout(() => {
    console.log("1秒后的回调");
}, 1000);

// 场景2：Promise
const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("成功"), 500);
});

promise.then(result => console.log("Promise结果:", result));

// 场景3：对象方法（注意this问题）
const calculator = {
    value: 10,
    add: function(x) {
        return this.value + x;
    },
    multiply: x => {
        // 这里this不指向calculator
        // return this.value * x; // undefined
        return "箭头函数不适合作为对象方法";
    }
};

console.log("传统方法:", calculator.add(5));      // 15
console.log("箭头方法:", calculator.multiply(5)); // 箭头函数不适合作为对象方法

// ========================================
// 7. 练习题
// ========================================

console.log("\n7. 练习题:");

// 练习1：将传统函数转换为箭头函数
console.log("练习1：转换函数");

// 原始函数
function greet(name) {
    return `Hello, ${name}!`;
}

// 转换为箭头函数
const greetArrow = name => `Hello, ${name}!`;

console.log("传统函数:", greet("张三"));
console.log("箭头函数:", greetArrow("李四"));

// 练习2：修复this问题
console.log("\n练习2：修复this问题");

const person = {
    name: "王五",
    hobbies: ["读书", "跑步", "编程"],
    showHobbies: function() {
        // 使用箭头函数保持this
        this.hobbies.forEach(hobby => {
            console.log(`${this.name} 喜欢 ${hobby}`);
        });
    }
};

person.showHobbies();

// 练习3：数组操作
console.log("\n练习3：数组操作");

const products = [
    { name: "苹果", price: 5 },
    { name: "香蕉", price: 3 },
    { name: "橙子", price: 4 }
];

// 使用箭头函数过滤和映射
const expensiveProducts = products
    .filter(product => product.price > 3)
    .map(product => `${product.name}: ¥${product.price}`);

// ========================================
// 8. 简化理解：函数嵌套示例
// ========================================

console.log("\n8. 简化理解：函数嵌套示例");

// 简单函数
const simpleFunc = () => "简单函数";
console.log("简单函数:", simpleFunc());

// 函数作为参数（回调）
function callMeBack(callback) {
    console.log("我要调用回调函数了");
    callback(); // 执行传入的函数
}

callMeBack(() => console.log("我是回调函数"));

// Promise 简化版
console.log("开始创建Promise");
const simplePromise = new Promise((resolve) => {
    console.log("执行器函数运行，立即调用resolve");
    resolve("完成"); // 立即成功
    console.log("resolve调用完毕");
});

console.log("Promise创建完成，开始注册then");
simplePromise.then(result => console.log("Promise结果:", result));
console.log("then注册完成");

// 总结：箭头函数让代码简洁，异步操作用 Promise/setTimeout 处理
console.log("\n总结：多层函数是正常的，逐步理解每个部分就好！");
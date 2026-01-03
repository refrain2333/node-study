// ========================================
// 1. 变量与作用域 - 基础示例
// ========================================

console.log("=== 变量与作用域基础示例 ===");

// 1. var vs let vs const 的区别
console.log("\n1. var vs let vs const");

// var - 函数作用域，可以重复声明，存在变量提升
function varExample() {
    console.log("varExample 内部:");
    console.log("a:", a); // undefined (变量提升)
    
    var a = 1;
    console.log("a:", a); // 1
    
    if (true) {
        var a = 2; // 会覆盖外层的 a
        console.log("if 内部 a:", a); // 2
    }
    console.log("if 外部 a:", a); // 2 (被修改了)
}

// let - 块级作用域，不能重复声明，不存在变量提升
function letExample() {
    console.log("\nletExample 内部:");
    
    // console.log("b:", b); // ReferenceError: Cannot access 'b' before initialization
    
    let b = 1;
    console.log("b:", b); // 1
    
    if (true) {
        let b = 2; // 块级作用域，不会影响外层
        console.log("if 内部 b:", b); // 2
    }
    console.log("if 外部 b:", b); // 1 (保持不变)
}

// const - 块级作用域，必须初始化，不能重新赋值
function constExample() {
    console.log("\nconstExample 内部:");
    
    const c = 1;
    console.log("c:", c); // 1
    
    // c = 2; // TypeError: Assignment to constant variable.
    
    // 对于对象，const 只保护引用不被修改，但可以修改对象内部属性
    const obj = { name: "张三" };
    obj.name = "李四"; // 可以修改属性
    console.log("obj:", obj); // { name: '李四' }
    
    // obj = {}; // TypeError: Assignment to constant variable.
}

varExample();
letExample();
constExample();

// ========================================
// 2. 块级作用域的实际应用
// ========================================

console.log("\n=== 块级作用域实际应用 ===");

// 场景1：循环中的变量
console.log("\n1. 循环中的变量问题:");

// 使用 var 的问题
console.log("使用 var:");
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log("var i:", i); // 都输出 3
    }, 100);
}

// 使用 let 的解决方案
console.log("使用 let:");
for (let j = 0; j < 3; j++) {
    setTimeout(() => {
        console.log("let j:", j); // 输出 0, 1, 2
    }, 200);
}

// ========================================
// 3. Python vs JavaScript 变量对比
// ========================================

console.log("\n=== Python vs JavaScript 变量对比 ===");

// Python 风格的全局变量污染问题
console.log("\n1. 全局变量污染对比:");

// JavaScript 中的全局污染（类似 Python 的 global 问题）
var globalVar = "我是全局变量";

function problematicFunction() {
    // 如果忘记声明，会意外创建全局变量
    accidentalGlobal = "我也是全局变量"; // 没有 var/let/const，变成了全局变量
    console.log("函数内:", globalVar, accidentalGlobal);
}

problematicFunction();
console.log("函数外:", globalVar, accidentalGlobal); // 都能访问到

// 使用 let/const 避免全局污染
function safeFunction() {
    let localVar = "我是局部变量";
    const constVar = "我也是局部变量";
    console.log("函数内:", localVar, constVar);
}

safeFunction();
// console.log("函数外:", localVar); // ReferenceError: localVar is not defined

// ========================================
// 4. 实际开发中的最佳实践
// ========================================

console.log("\n=== 实际开发中的最佳实践 ===");

// 最佳实践1：总是使用 const，除非需要重新赋值
const API_BASE_URL = "https://api.example.com";
let currentUser = null;

// 最佳实践2：使用块级作用域避免变量冲突
function processData(data) {
    // 处理数据的逻辑
    for (let item of data) {
        // 每次循环都是新的块级作用域
        let processedItem = processItem(item);
        console.log("处理后的项目:", processedItem);
    }
}

function processItem(item) {
    return item.toUpperCase();
}

// 测试数据
const testData = ["apple", "banana", "cherry"];
processData(testData);

// ========================================
// 5. 练习题
// ========================================

console.log("\n=== 练习题 ===");

// 练习1：修复变量作用域问题
console.log("\n练习1：修复以下代码的作用域问题");

function fixScopeIssue() {
    // 原始有问题的代码
    // for (var i = 0; i < 3; i++) {
    //     setTimeout(() => {
    //         console.log("i =", i);
    //     }, 100);
    // }
    
    // 修复后的代码
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            console.log("修复后 i =", i);
        }, 300);
    }
}

fixScopeIssue();

// 练习2：创建一个安全的计数器
console.log("\n练习2：创建一个安全的计数器");

function createSafeCounter() {
    let count = 0; // 私有变量
    
    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getCount() {
            return count;
        }
    };
}

const counter = createSafeCounter();
console.log("计数器测试:");
console.log("increment:", counter.increment()); // 1
console.log("increment:", counter.increment()); // 2
console.log("decrement:", counter.decrement()); // 1
console.log("getCount:", counter.getCount());   // 1

// 验证私有性
// console.log(count); // ReferenceError: count is not defined
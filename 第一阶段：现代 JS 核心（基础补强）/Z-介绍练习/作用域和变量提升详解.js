// ========================================
// 作用域和变量提升详解
// ========================================

console.log("=== 作用域和变量提升详解 ===");

// ========================================
// 1. 全局作用域
// ========================================

console.log("\n1. 全局作用域:");

// 全局变量 - 在任何地方都可以访问
var globalVar = "我是全局变量";
let globalLet = "我也是全局变量";
const globalConst = "我也是全局常量";

function checkGlobalScope() {
    console.log("函数内访问全局变量:", globalVar);
    console.log("函数内访问全局let:", globalLet);
    console.log("函数内访问全局const:", globalConst);
}

checkGlobalScope();
console.log("函数外访问全局变量:", globalVar);

// ========================================
// 2. 函数作用域
// ========================================

console.log("\n2. 函数作用域:");

function functionScopeExample() {
    // 函数作用域变量 - 只在函数内可访问
    var functionVar = "我是函数作用域变量";
    let functionLet = "我也是函数作用域变量";
    const functionConst = "我也是函数作用域常量";
    
    console.log("函数内访问:", functionVar, functionLet, functionConst);
}

functionScopeExample();

// 尝试在函数外访问（会报错）
try {
    console.log("函数外访问:", functionVar);
} catch (error) {
    console.log("函数外访问函数作用域变量:", error.message);
}

// ========================================
// 3. 块级作用域
// ========================================

console.log("\n3. 块级作用域:");

function blockScopeExample() {
    console.log("块级作用域示例:");
    
    if (true) {
        var blockVar = "var 没有块级作用域";
        let blockLet = "let 有块级作用域";
        const blockConst = "const 也有块级作用域";
        
        console.log("块内访问 var:", blockVar);
        console.log("块内访问 let:", blockLet);
        console.log("块内访问 const:", blockConst);
    }
    
    // var 可以在块外访问（因为没有块级作用域）
    console.log("块外访问 var:", blockVar);
    
    // let 和 const 不能在块外访问
    try {
        console.log("块外访问 let:", blockLet);
    } catch (error) {
        console.log("块外访问 let:", error.message);
    }
    
    try {
        console.log("块外访问 const:", blockConst);
    } catch (error) {
        console.log("块外访问 const:", error.message);
    }
}

blockScopeExample();

// ========================================
// 4. 变量提升详解
// ========================================

console.log("\n4. 变量提升详解:");

// 4.1 var 的变量提升
console.log("\n4.1 var 的变量提升:");
console.log("在声明前访问 var 变量:", typeof varBeforeDeclaration); // undefined
var varBeforeDeclaration = "我被提升了";
console.log("声明后访问 var 变量:", varBeforeDeclaration); // "我被提升了"

// 实际的执行顺序相当于：
// var varBeforeDeclaration; // 声明被提升，值为 undefined
// console.log(typeof varBeforeDeclaration); // undefined
// varBeforeDeclaration = "我被提升了"; // 赋值在原位置
// console.log(varBeforeDeclaration); // "我被提升了"

// 4.2 let 和 const 的暂时性死区
console.log("\n4.2 let 和 const 的暂时性死区:");

try {
    console.log("在声明前访问 let 变量:", letBeforeDeclaration);
} catch (error) {
    console.log("在声明前访问 let 变量:", error.message);
}

try {
    console.log("在声明前访问 const 变量:", constBeforeDeclaration);
} catch (error) {
    console.log("在声明前访问 const 变量:", error.message);
}

let letBeforeDeclaration = "let 也有提升，但在声明前访问会报错";
const constBeforeDeclaration = "const 也有提升，但在声明前访问会报错";

console.log("声明后访问 let 变量:", letBeforeDeclaration);
console.log("声明后访问 const 变量:", constBeforeDeclaration);

// ========================================
// 5. 函数提升
// ========================================

console.log("\n5. 函数提升:");

// 5.1 函数声明 - 完全提升
console.log("\n5.1 函数声明 - 完全提升:");
console.log("函数声明前调用:", functionDeclaration()); // 可以正常调用

function functionDeclaration() {
    return "函数声明被完全提升了";
}

// 5.2 函数表达式 - 只提升声明，不提升赋值
console.log("\n5.2 函数表达式 - 只提升声明，不提升赋值:");

try {
    console.log("函数表达式前调用:", functionExpression());
} catch (error) {
    console.log("函数表达式前调用:", error.message);
}

var functionExpression = function() {
    return "函数表达式只提升声明";
};

console.log("函数表达式后调用:", functionExpression()); // 可以正常调用

// ========================================
// 6. 作用域链
// ========================================

console.log("\n6. 作用域链:");

var globalVariable = "全局变量";

function outerFunction() {
    var outerVariable = "外层函数变量";
    
    function innerFunction() {
        var innerVariable = "内层函数变量";
        
        console.log("内层函数访问:");
        console.log("- 内层变量:", innerVariable);
        console.log("- 外层变量:", outerVariable);
        console.log("- 全局变量:", globalVariable);
    }
    
    innerFunction();
    
    console.log("外层函数访问:");
    console.log("- 外层变量:", outerVariable);
    console.log("- 全局变量:", globalVariable);
    // console.log("- 内层变量:", innerVariable); // 这里会报错
}

outerFunction();
console.log("全局作用域访问:", globalVariable);

// ========================================
// 7. 闭包中的作用域
// ========================================

console.log("\n7. 闭包中的作用域:");

function createCounter() {
    let count = 0; // 这个变量在函数执行完后不会被销毁
    
    return function() {
        count++;
        return count;
    };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log("闭包示例:");
console.log("counter1 第一次调用:", counter1()); // 1
console.log("counter1 第二次调用:", counter1()); // 2
console.log("counter2 第一次调用:", counter2()); // 1 (独立的闭包)
console.log("counter1 第三次调用:", counter1()); // 3

// ========================================
// 8. Python vs JavaScript 作用域对比
// ========================================

console.log("\n8. Python vs JavaScript 作用域对比:");

// Python 风格的作用域
console.log("\nPython 风格的作用域:");

function pythonStyleScope() {
    // Python 中没有块级作用域的概念
    // if/for/while 等语句块不会创建新的作用域
    
    if (true) {
        var pythonStyleVar = "Python 中这相当于全局变量";
    }
    
    console.log("Python 风格的 var:", pythonStyleVar);
}

pythonStyleScope();

// ========================================
// 9. 实际应用场景
// ========================================

console.log("\n9. 实际应用场景:");

// 场景1：避免全局污染
console.log("\n场景1：避免全局污染:");

// 不好的做法 - 全局变量
var globalCounter = 0;

function badCounter() {
    globalCounter++;
    return globalCounter;
}

// 好的做法 - 使用闭包
function createSafeCounter() {
    let privateCounter = 0;
    
    return {
        increment: function() {
            privateCounter++;
            return privateCounter;
        },
        getCount: function() {
            return privateCounter;
        }
    };
}

const safeCounter = createSafeCounter();
console.log("安全计数器:", safeCounter.increment());
console.log("安全计数器:", safeCounter.increment());

// 场景2：循环中的作用域问题
console.log("\n场景2：循环中的作用域问题:");

// 问题代码 - var 的问题
console.log("使用 var 的问题:");
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log("var i:", i); // 都输出 3
    }, 100);
}

// 解决方案1 - 使用 let
console.log("使用 let 的解决方案:");
for (let j = 0; j < 3; j++) {
    setTimeout(() => {
        console.log("let j:", j); // 输出 0, 1, 2
    }, 200);
}

// 解决方案2 - 使用闭包
console.log("使用闭包的解决方案:");
for (var k = 0; k < 3; k++) {
    (function(index) {
        setTimeout(() => {
            console.log("闭包 k:", index); // 输出 0, 1, 2
        }, 300);
    })(k);
}

// ========================================
// 10. 练习题
// ========================================

console.log("\n10. 练习题:");

// 练习1：理解变量提升
console.log("\n练习1：理解变量提升:");

function variableHoistingExercise() {
    console.log("练习1 - 变量提升:");
    
    // 问题：下面的代码会输出什么？
    console.log("a:", a); // undefined
    console.log("b:", typeof b); // undefined
    console.log("c:", typeof c); // undefined
    
    var a = 1;
    let b = 2;
    const c = 3;
    
    console.log("a:", a); // 1
    console.log("b:", b); // 2
    console.log("c:", c); // 3
}

variableHoistingExercise();

// 练习2：作用域链理解
console.log("\n练习2：作用域链理解:");

var x = 1;

function outer() {
    var x = 2;
    
    function inner() {
        console.log("inner x:", x); // 2
    }
    
    inner();
    console.log("outer x:", x); // 2
}

outer();
console.log("global x:", x); // 1

// 练习3：闭包应用
console.log("\n练习3：闭包应用:");

function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log("double(5):", double(5)); // 10
console.log("triple(4):", triple(4)); // 12

// ========================================
// 总结
// ========================================

console.log("\n=== 总结 ===");

console.log(`
作用域和变量提升总结：

1. 作用域类型：
   - 全局作用域：整个程序可访问
   - 函数作用域：函数内可访问
   - 块级作用域：代码块内可访问（let/const）

2. 变量提升：
   - var：声明和初始化都提升，值为 undefined
   - let/const：声明提升，但存在暂时性死区
   - 函数声明：完全提升
   - 函数表达式：只提升声明

3. 最佳实践：
   - 使用 let/const 代替 var
   - 避免全局变量污染
   - 理解闭包的作用
   - 注意循环中的作用域问题

4. Python 对比：
   - Python 没有块级作用域
   - Python 的变量提升概念不同
   - JavaScript 的作用域更复杂但更灵活
`);
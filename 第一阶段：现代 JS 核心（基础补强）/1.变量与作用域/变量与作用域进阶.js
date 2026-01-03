// ========================================
// 1. 变量与作用域 - 进阶示例
// ========================================

console.log("=== 变量与作用域进阶示例 ===");

// ========================================
// 1. 闭包与作用域链
// ========================================

console.log("\n1. 闭包与作用域链:");

function createClosureExample() {
    let outerVariable = "外部变量";
    
    function innerFunction() {
        let innerVariable = "内部变量";
        console.log("innerFunction 访问:", outerVariable, innerVariable);
    }
    
    return innerFunction;
}

const closureFunc = createClosureExample();
closureFunc(); // 可以访问外部变量

// ========================================
// 2. 立即执行函数表达式 (IIFE)
// ========================================

console.log("\n2. 立即执行函数表达式 (IIFE):");

// IIFE 创建私有作用域，避免全局污染
(function() {
    let privateVar = "我是私有变量";
    const privateConst = "我也是私有常量";
    
    function privateFunction() {
        return "私有函数";
    }
    
    // 暴露公共接口
    global.myModule = {
        getPrivateVar: () => privateVar,
        getPrivateFunction: () => privateFunction()
    };
})();

console.log("IIFE 模块:", myModule.getPrivateVar());
console.log("IIFE 函数:", myModule.getPrivateFunction());

// ========================================
// 3. 模块模式
// ========================================

console.log("\n3. 模块模式:");

const UserModule = (
    function() {
    // 私有变量
    let users = [];
    let nextId = 1;
    
    // 私有方法
    function validateUser(user) {
        return user && user.name && user.email;
    }
    
    function generateId() {
        return nextId++;
    }
    
    // 公共接口
    return {
        addUser(user) {
            if (validateUser(user)) {
                user.id = generateId();
                users.push(user);
                return user;
            }
            throw new Error("用户数据无效");
        },
        
        getUser(id) {
            return users.find(user => user.id === id);
        },
        
        getAllUsers() {
            return [...users]; // 返回副本，保护原始数据
        },
        
        removeUser(id) {
            const index = users.findIndex(user => user.id === id);
            if (index !== -1) {
                return users.splice(index, 1)[0];
            }
            return null;
        },
        
        getUserCount() {
            return users.length;
        }
    };
})();

// 使用模块
console.log("模块模式测试:");
const user1 = UserModule.addUser({ name: "张三", email: "zhangsan@example.com" });
const user2 = UserModule.addUser({ name: "李四", email: "lisi@example.com" });

console.log("添加用户:", user1);
console.log("用户总数:", UserModule.getUserCount());
console.log("所有用户:", UserModule.getAllUsers());

// ========================================
// 4. 作用域与内存管理
// ========================================

console.log("\n4. 作用域与内存管理:");

function memoryManagementExample() {
    console.log("内存管理示例:");
    
    // 避免内存泄漏：及时清理引用
    let largeData = new Array(1000000).fill("data");
    
    function processData() {
        // 处理数据
        const result = largeData.slice(0, 100);
        
        // 处理完成后，清理大对象引用
        largeData = null;
        
        return result;
    }
    
    const result = processData();
    console.log("处理结果长度:", result.length);
    console.log("大对象是否被清理:", largeData === null);
}

memoryManagementExample();

// ========================================
// 5. 作用域陷阱和注意事项
// ========================================

console.log("\n5. 作用域陷阱和注意事项:");

// 陷阱1：函数声明提升
console.log("函数声明提升:");
console.log("hoistedFunction():", hoistedFunction()); // 可以调用

function hoistedFunction() {
    return "函数声明被提升了";
}

// 陷阱2：let/const 的暂时性死区
console.log("\n暂时性死区:");
try {
    // console.log(temporalDeadZoneVar); // ReferenceError
    let temporalDeadZoneVar = "暂时性死区";
} catch (error) {
    console.log("暂时性死区错误:", error.message);
}

// 陷阱3：循环中的闭包问题
console.log("\n循环中的闭包问题:");

// 问题代码
console.log("问题代码:");
const functions = [];
for (var k = 0; k < 3; k++) {
    functions[k] = function() {
        return k; // 都返回 3
    };
}

console.log("functions[0]():", functions[0]()); // 3
console.log("functions[1]():", functions[1]()); // 3
console.log("functions[2]():", functions[2]()); // 3

// 解决方案1：使用 let
console.log("\n解决方案1 - 使用 let:");
const functions2 = [];
for (let k = 0; k < 3; k++) {
    functions2[k] = function() {
        return k; // 正确返回 0, 1, 2
    };
}

console.log("functions2[0]():", functions2[0]()); // 0
console.log("functions2[1]():", functions2[1]()); // 1
console.log("functions2[2]():", functions2[2]()); // 2

// 解决方案2：使用 IIFE
console.log("\n解决方案2 - 使用 IIFE:");
const functions3 = [];
for (var k = 0; k < 3; k++) {
    functions3[k] = (function(index) {
        return function() {
            return index;
        };
    })(k);
}

console.log("functions3[0]():", functions3[0]()); // 0
console.log("functions3[1]():", functions3[1]()); // 1
console.log("functions3[2]():", functions3[2]()); // 2

// ========================================
// 6. 实际应用场景
// ========================================

console.log("\n6. 实际应用场景:");

// 场景1：事件监听器中的作用域
console.log("事件监听器中的作用域:");

function setupEventListeners() {
    const buttons = document.querySelectorAll('.btn') || [];
    
    // 使用 let 确保每个按钮都有正确的索引
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            console.log(`按钮 ${i} 被点击`);
        });
    }
}

// 场景2：定时器中的作用域
console.log("\n定时器中的作用域:");

function setupTimers() {
    console.log("设置定时器:");
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            console.log(`定时器 ${i}: ${new Date().toLocaleTimeString()}`);
        }, i * 1000);
    }
}

setupTimers();

// ========================================
// 7. 练习题
// ========================================

console.log("\n7. 练习题:");

// 练习1：创建一个私有的计数器工厂
console.log("\n练习1：创建计数器工厂");

function createCounterFactory() {
    const counters = new Map();
    
    return {
        createCounter(name) {
            if (counters.has(name)) {
                throw new Error(`计数器 ${name} 已存在`);
            }
            let count = 0;
            counters.set(name, {
                increment() {
                    return ++count;
                },
                decrement() {
                    return --count;
                },
                getCount() {
                    return count;
                },
                reset() {
                    count = 0;
                    return count;
                }
            });
            return counters.get(name);
        },
        
        getCounter(name) {
            return counters.get(name);
        },
        
        getAllCounters() {
            return Array.from(counters.keys());
        },
        
        removeCounter(name) {
            return counters.delete(name);
        }
    };
}

const counterFactory = createCounterFactory();
const counterA = counterFactory.createCounter("A");
const counterB = counterFactory.createCounter("B");

console.log("计数器 A:", counterA.increment()); // 1
console.log("计数器 A:", counterA.increment()); // 2
console.log("计数器 B:", counterB.increment()); // 1
console.log("所有计数器:", counterFactory.getAllCounters()); // ['A', 'B']

// 练习2：实现一个简单的缓存系统
console.log("\n练习2：实现缓存系统");

function createCache() {
    const cache = new Map();
    const maxSize = 100;
    
    return {
        set(key, value) {
            if (cache.size >= maxSize) {
                // 删除最旧的条目
                const firstKey = cache.keys().next().value;
                cache.delete(firstKey);
            }
            cache.set(key, value);
            return this;
        },
        
        get(key) {
            return cache.get(key);
        },
        
        has(key) {
            return cache.has(key);
        },
        
        delete(key) {
            return cache.delete(key);
        },
        
        clear() {
            cache.clear();
        },
        
        size() {
            return cache.size;
        },
        
        keys() {
            return Array.from(cache.keys());
        }
    };
}

const cache = createCache();
cache.set("user1", { name: "张三", age: 25 });
cache.set("user2", { name: "李四", age: 30 });

console.log("缓存测试:");
console.log("user1:", cache.get("user1"));
console.log("缓存大小:", cache.size());
console.log("所有键:", cache.keys());
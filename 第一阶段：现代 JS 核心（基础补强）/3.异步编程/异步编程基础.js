// ========================================
// 3. 异步编程 - Promise 基础示例
// ========================================

console.log("=== 异步编程 - Promise 基础示例 ===");

// ========================================
// 1. Promise 基本概念
// ========================================

console.log("\n1. Promise 基本概念:");

// 创建一个简单的 Promise
const simplePromise = new Promise((resolve, reject) => {
    // 模拟异步操作
    setTimeout(() => {
        const success = Math.random() > 0.5;
        
        if (success) {
            resolve("操作成功！");
        } else {
            reject("操作失败！");
        }
    }, 1000);
});

// 使用 then/catch 处理 Promise
simplePromise
    .then(result => {
        console.log("成功:", result);
    })
    .catch(error => {
        console.log("失败:", error);
    });

// ========================================
// 2. Promise 状态
// ========================================

console.log("\n2. Promise 状态:");

// Promise 有三种状态：
// - pending: 初始状态
// - fulfilled: 成功状态
// - rejected: 失败状态

function demonstratePromiseStates() {
    console.log("Promise 状态演示:");
    
    // pending 状态
    const pendingPromise = new Promise(() => {});
    console.log("pending 状态的 Promise:", pendingPromise);
    
    // fulfilled 状态
    const fulfilledPromise = Promise.resolve("已解决");
    console.log("fulfilled 状态的 Promise:", fulfilledPromise);
    
    // rejected 状态
    const rejectedPromise = Promise.reject("已拒绝");
    console.log("rejected 状态的 Promise:", rejectedPromise);
    rejectedPromise.catch(() => {}); // 静默处理，避免未处理的拒绝
}

demonstratePromiseStates();

// ========================================
// 3. Promise 链式调用
// ========================================

console.log("\n3. Promise 链式调用:");

function createAsyncTask(name, delay, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(`任务 ${name} 失败`);
            } else {
                console.log(`任务 ${name} 完成`);
                resolve(`结果: ${name}`);
            }
        }, delay);
    });
}

// 链式调用
createAsyncTask("第一步", 500)
    .then(result => {
        console.log("第一步结果:", result);
        return createAsyncTask("第二步", 300);
    })
    .then(result => {
        console.log("第二步结果:", result);
        return createAsyncTask("第三步", 200);
    })
    .then(result => {
        console.log("第三步结果:", result);
        return "所有任务完成";
    })
    .then(finalResult => {
        console.log("最终结果:", finalResult);
    })
    .catch(error => {
        console.log("链式调用中出现错误:", error);
    });

// ========================================
// 4. Promise 静态方法
// ========================================

console.log("\n4. Promise 静态方法:");

// Promise.resolve()
const resolvedPromise = Promise.resolve("立即解决");
resolvedPromise.then(result => {
    console.log("Promise.resolve():", result);
});

// Promise.reject()
const rejectedPromise2 = Promise.reject("立即拒绝");
rejectedPromise2.catch(error => {
    console.log("Promise.reject():", error);
});

// Promise.all() - 所有都成功才成功
const promise1 = Promise.resolve(1);
const promise2 = new Promise(resolve => setTimeout(() => resolve(2), 500));
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log("Promise.all() 结果:", results); // [1, 2, 3]
    })
    .catch(error => {
        console.log("Promise.all() 错误:", error);
    });

// Promise.race() - 第一个完成的
const fastPromise = new Promise(resolve => setTimeout(() => resolve("快速"), 100));
const slowPromise1 = new Promise(resolve => setTimeout(() => resolve("慢速"), 1000));

Promise.race([fastPromise, slowPromise1])
    .then(result => {
        console.log("Promise.race() 结果:", result); // "快速"
    });

// Promise.allSettled() - 等待所有完成（无论成功失败）
const mixedPromises = [
    Promise.resolve("成功1"),
    Promise.reject("失败1"),
    Promise.resolve("成功2")
];

Promise.allSettled(mixedPromises)
    .then(results => {
        console.log("Promise.allSettled() 结果:", results);
        // [
        //   { status: 'fulfilled', value: '成功1' },
        //   { status: 'rejected', reason: '失败1' },
        //   { status: 'fulfilled', value: '成功2' }
        // ]
    });

// ========================================
// 5. 错误处理
// ========================================

console.log("\n5. 错误处理:");

function asyncWithError() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("这是一个错误"));
        }, 200);
    });
}

// 方式1：使用 catch
asyncWithError()
    .then(result => {
        console.log("成功:", result);
    })
    .catch(error => {
        console.log("错误处理1:", error.message);
    });

// 方式2：then 的第二个参数
asyncWithError()
    .then(
        result => console.log("成功:", result),
        error => console.log("错误处理2:", error.message)
    );

// 方式3：链式错误处理
Promise.resolve("开始")
    .then(() => {
        throw new Error("链中出错");
    })
    .then(result => {
        console.log("不会执行");
    })
    .catch(error => {
        console.log("链式错误处理:", error.message);
        return "错误已处理";
    })
    .then(result => {
        console.log("继续执行:", result);
    });

// ========================================
// 6. Python vs JavaScript 异步对比
// ========================================

console.log("\n6. Python vs JavaScript 异步对比:");

// Python 的 asyncio
// async def fetch_data():
//     await asyncio.sleep(1)
//     return "数据"

// JavaScript 的 Promise
function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("数据");
        }, 1000);
    });
}

fetchData().then(data => {
    console.log("JavaScript 异步结果:", data);
});

// ========================================
// 7. 实际应用场景
// ========================================

console.log("\n7. 实际应用场景:");

// 场景1：模拟 API 调用
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: `用户${id}`, email: `user${id}@example.com` });
            } else {
                reject(new Error("无效的用户ID"));
            }
        }, 300);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "文章1", userId },
                { id: 2, title: "文章2", userId }
            ]);
        }, 200);
    });
}

// 链式调用获取用户和文章
fetchUser(1)
    .then(user => {
        console.log("获取用户:", user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log("获取文章:", posts);
    })
    .catch(error => {
        console.log("获取数据失败:", error.message);
    });

// 场景2：并行请求
function parallelRequests() {
    const userPromise = fetchUser(1);
    const postsPromise = fetchUserPosts(1);
    
    return Promise.all([userPromise, postsPromise])
        .then(([user, posts]) => {
            console.log("并行请求结果:");
            console.log("用户:", user);
            console.log("文章:", posts);
        });
}

parallelRequests();

// ========================================
// 8. 练习题
// ========================================

console.log("\n8. 练习题:");

// 练习1：创建一个延迟函数
console.log("\n练习1：延迟函数");

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

delay(1000).then(() => {
    console.log("延迟1秒后执行");
});

// 练习2：实现一个重试机制
console.log("\n练习2：重试机制");

function withRetry(fn, maxRetries = 3, delayMs = 1000) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        
        function attempt() {
            fn()
                .then(resolve)
                .catch(error => {
                    attempts++;
                    if (attempts >= maxRetries) {
                        reject(new Error(`重试 ${maxRetries} 次后仍然失败: ${error.message}`));
                    } else {
                        console.log(`第 ${attempts} 次尝试失败，${delayMs}ms 后重试...`);
                        setTimeout(attempt, delayMs);
                    }
                });
        }
        
        attempt();
    });
}

// 模拟可能失败的函数
const flakyFunction = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.7) {
                resolve("成功！");
            } else {
                reject(new Error("随机失败"));
            }
        }, 500);
    });
};

withRetry(flakyFunction, 3, 500)
    .then(result => console.log("重试成功:", result))
    .catch(error => console.log("重试失败:", error.message));

// 练习3：实现一个超时机制
console.log("\n练习3：超时机制");

function withTimeout(promise, timeoutMs) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`操作超时 (${timeoutMs}ms)`)), timeoutMs);
    });
    
    return Promise.race([promise, timeoutPromise]);
}

const slowPromise2 = new Promise(resolve => setTimeout(() => resolve("慢速完成"), 2000));

withTimeout(slowPromise2, 1000)
    .then(result => console.log("超时测试成功:", result))
    .catch(error => console.log("超时测试失败:", error.message));

// 练习4：批量处理
console.log("\n练习4：批量处理");

function batchProcess(items, processor, batchSize = 3) {
    const results = [];
    
    return new Promise((resolve) => {
        function processBatch(startIndex) {
            const batch = items.slice(startIndex, startIndex + batchSize);
            
            if (batch.length === 0) {
                resolve(results);
                return;
            }
            
            const promises = batch.map((item, index) => {
                return processor(item).then(result => {
                    results[startIndex + index] = result;
                    return result;
                });
            });
            
            Promise.all(promises)
                .then(() => {
                    processBatch(startIndex + batchSize);
                });
        }
        
        processBatch(0);
    });
}

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const processor = (item) => new Promise(resolve => setTimeout(() => resolve(item * 2), 300));

batchProcess(items, processor, 3)
    .then(results => {
        console.log("批量处理结果:", results);
    });
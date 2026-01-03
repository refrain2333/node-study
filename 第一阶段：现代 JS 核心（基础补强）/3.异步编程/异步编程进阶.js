// ========================================
// 3. 异步编程 - async/await 进阶示例
// ========================================

console.log("=== 异步编程 - async/await 进阶示例 ===");

// ========================================
// 1. async/await 基础语法
// ========================================

console.log("\n1. async/await 基础语法:");

// async 函数总是返回 Promise
async function asyncFunction() {
    return "这是 async 函数的返回值";
}

// 等价的 Promise 写法
function promiseFunction() {
    return Promise.resolve("这是 Promise 的返回值");
}

asyncFunction().then(result => {
    console.log("async 函数结果:", result);
});

promiseFunction().then(result => {
    console.log("Promise 函数结果:", result);
});

// ========================================
// 2. await 的使用
// ========================================

console.log("\n2. await 的使用:");

function createAsyncTask(name, delay, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`任务 ${name} 失败`));
            } else {
                console.log(`任务 ${name} 完成`);
                resolve(`结果: ${name}`);
            }
        }, delay);
    });
}

// 使用 async/await 重写链式调用
async function sequentialTasks() {
    try {
        console.log("开始顺序执行任务...");
        
        const result1 = await createAsyncTask("第一步", 300);
        console.log("第一步结果:", result1);
        
        const result2 = await createAsyncTask("第二步", 200);
        console.log("第二步结果:", result2);
        
        const result3 = await createAsyncTask("第三步", 100);
        console.log("第三步结果:", result3);
        
        return "所有任务完成";
    } catch (error) {
        console.log("顺序执行中出现错误:", error.message);
        throw error;
    }
}

sequentialTasks().then(finalResult => {
    console.log("最终结果:", finalResult);
});

// ========================================
// 3. 并行执行 vs 顺序执行
// ========================================

console.log("\n3. 并行执行 vs 顺序执行:");

async function parallelExecution() {
    console.log("开始并行执行...");
    
    // 并行执行所有任务
    const [result1, result2, result3] = await Promise.all([
        createAsyncTask("并行1", 500),
        createAsyncTask("并行2", 300),
        createAsyncTask("并行3", 400)
    ]);
    
    console.log("并行执行结果:", result1, result2, result3);
    return "并行执行完成";
}

async function sequentialExecution() {
    console.log("开始顺序执行...");
    
    // 顺序执行任务
    const result1 = await createAsyncTask("顺序1", 200);
    const result2 = await createAsyncTask("顺序2", 200);
    const result3 = await createAsyncTask("顺序3", 200);
    
    console.log("顺序执行结果:", result1, result2, result3);
    return "顺序执行完成";
}

// 测试并行执行
parallelExecution().then(result => {
    console.log("并行执行总耗时:", result);
});

// 测试顺序执行
sequentialExecution().then(result => {
    console.log("顺序执行总耗时:", result);
});

// ========================================
// 4. 错误处理
// ========================================

console.log("\n4. 错误处理:");

async function errorHandlingExample() {
    try {
        // 正常的异步操作
        const result1 = await createAsyncTask("正常任务", 200);
        console.log("正常任务结果:", result1);
        
        // 可能失败的任务
        const result2 = await createAsyncTask("失败任务", 100, true);
        console.log("失败任务结果:", result2);
        
    } catch (error) {
        console.log("捕获到错误:", error.message);
        
        // 可以在这里进行错误恢复
        try {
            const fallbackResult = await createAsyncTask("备用任务", 200);
            console.log("备用任务结果:", fallbackResult);
        } catch (fallbackError) {
            console.log("备用任务也失败了:", fallbackError.message);
        }
    }
}

errorHandlingExample();

// ========================================
// 5. async/await 与 Promise 的混合使用
// ========================================

console.log("\n5. async/await 与 Promise 的混合使用:");

async function mixedUsage() {
    console.log("混合使用示例:");
    
    // 使用 await 等待 Promise
    const result1 = await createAsyncTask("任务1", 200);
    console.log("任务1结果:", result1);
    
    // 返回 Promise（async 函数自动包装）
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("这是从 async 函数返回的 Promise");
        }, 300);
    });
}

mixedUsage().then(result => {
    console.log("混合使用结果:", result);
});

// ========================================
// 6. 实际应用场景
// ========================================

console.log("\n6. 实际应用场景:");

// 场景1：API 调用链
async function apiCallChain() {
    try {
        console.log("开始 API 调用链...");
        
        // 1. 获取用户信息
        const userResponse = await fetch('/api/user/1');
        const user = await userResponse.json();
        console.log("用户信息:", user);
        
        // 2. 根据用户信息获取权限
        const permissionResponse = await fetch(`/api/permissions/${user.id}`);
        const permissions = await permissionResponse.json();
        console.log("用户权限:", permissions);
        
        // 3. 根据权限获取数据
        const dataResponse = await fetch(`/api/data?userId=${user.id}&permissions=${permissions.join(',')}`);
        const data = await dataResponse.json();
        console.log("获取的数据:", data);
        
        return { user, permissions, data };
        
    } catch (error) {
        console.log("API 调用链失败:", error.message);
        throw error;
    }
}

// 模拟 fetch 函数
global.fetch = function(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (url.includes('/user/')) {
                resolve({
                    json: () => Promise.resolve({ id: 1, name: "张三", email: "zhangsan@example.com" })
                });
            } else if (url.includes('/permissions/')) {
                resolve({
                    json: () => Promise.resolve(["read", "write", "delete"])
                });
            } else if (url.includes('/api/data')) {
                resolve({
                    json: () => Promise.resolve([{ id: 1, title: "数据1" }, { id: 2, title: "数据2" }])
                });
            }
        }, 200);
    });
};

// apiCallChain().then(result => {
//     console.log("API 调用链完成:", result);
// });

// 场景2：文件处理
async function fileProcessing() {
    console.log("文件处理示例:");
    
    try {
        // 模拟读取文件
        const fileContent = await readFile("config.json");
        console.log("文件内容:", fileContent);
        
        // 模拟解析 JSON
        const config = JSON.parse(fileContent);
        console.log("配置信息:", config);
        
        // 模拟处理数据
        const processedData = await processData(config.data);
        console.log("处理后的数据:", processedData);
        
        // 模拟写入文件
        await writeFile("output.json", JSON.stringify(processedData, null, 2));
        console.log("文件写入完成");
        
    } catch (error) {
        console.log("文件处理失败:", error.message);
    }
}

// 模拟文件操作函数
function readFile(filename) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`{"data": ["item1", "item2", "item3"]}`);
        }, 300);
    });
}

function writeFile(filename, content) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`文件 ${filename} 写入成功`);
        }, 200);
    });
}

function processData(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data.map(item => item.toUpperCase()));
        }, 400);
    });
}

// fileProcessing();

// ========================================
// 7. 高级模式
// ========================================

console.log("\n7. 高级模式:");

// 模式1：异步迭代器
async function* asyncIterator() {
    for (let i = 1; i <= 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 200));
        yield `异步值 ${i}`;
    }
}

async function useAsyncIterator() {
    console.log("异步迭代器示例:");
    for await (const value of asyncIterator()) {
        console.log(value);
    }
}

useAsyncIterator();

// 模式2：异步生成器函数
async function* asyncGenerator() {
    let i = 0;
    while (i < 3) {
        await new Promise(resolve => setTimeout(resolve, 300));
        yield `生成器值 ${++i}`;
    }
}

async function useAsyncGenerator() {
    console.log("异步生成器示例:");
    const generator = asyncGenerator();
    
    const result1 = await generator.next();
    console.log("第一次调用:", result1.value);
    
    const result2 = await generator.next();
    console.log("第二次调用:", result2.value);
    
    const result3 = await generator.next();
    console.log("第三次调用:", result3.value);
    
    const result4 = await generator.next();
    console.log("第四次调用:", result4.done);
}

useAsyncGenerator();

// 模式3：异步队列处理器
class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }
    
    add(task) {
        this.queue.push(task);
        this.process();
    }
    
    async process() {
        if (this.processing) return;
        this.processing = true;
        
        while (this.queue.length > 0) {
            const task = this.queue.shift();
            try {
                await task();
            } catch (error) {
                console.log("任务执行失败:", error.message);
            }
        }
        
        this.processing = false;
    }
}

const queue = new AsyncQueue();

queue.add(async () => {
    console.log("任务1开始");
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("任务1完成");
});

queue.add(async () => {
    console.log("任务2开始");
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log("任务2完成");
});

queue.add(async () => {
    console.log("任务3开始");
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log("任务3完成");
});

// ========================================
// 8. 性能优化技巧
// ========================================

console.log("\n8. 性能优化技巧:");

// 技巧1：尽早开始异步操作
async function earlyStart() {
    console.log("尽早开始异步操作:");
    
    // 立即开始所有异步操作
    const promise1 = createAsyncTask("并行A", 400);
    const promise2 = createAsyncTask("并行B", 300);
    const promise3 = createAsyncTask("并行C", 500);
    
    // 执行其他同步操作
    console.log("执行同步操作...");
    
    // 等待所有异步操作完成
    const [result1, result2, result3] = await Promise.all([promise1, promise2, promise3]);
    
    console.log("所有异步操作完成:", result1, result2, result3);
}

earlyStart();

// 技巧2：分批处理大量数据
async function batchProcessing(items, processor, batchSize = 3) {
    console.log(`开始分批处理 ${items.length} 个项目，每批 ${batchSize} 个`);
    
    const results = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        
        // 并行处理当前批次
        const batchPromises = batch.map(item => processor(item));
        const batchResults = await Promise.all(batchPromises);
        
        results.push(...batchResults);
        
        console.log(`处理完第 ${Math.floor(i/batchSize) + 1} 批，当前结果数量: ${results.length}`);
    }
    
    return results;
}

const largeDataSet = Array.from({ length: 10 }, (_, i) => i + 1);
const processor = (item) => new Promise(resolve => setTimeout(() => resolve(item * 2), 200));

batchProcessing(largeDataSet, processor, 3)
    .then(results => {
        console.log("分批处理完成，结果:", results);
    });

// ========================================
// 9. 练习题
// ========================================

console.log("\n9. 练习题:");

// 练习1：实现一个简单的缓存系统
console.log("\n练习1：缓存系统");

const cache = new Map();

async function cachedFetch(url) {
    if (cache.has(url)) {
        console.log(`从缓存获取: ${url}`);
        return cache.get(url);
    }
    
    console.log(`从网络获取: ${url}`);
    const response = await fetch(url);
    const data = await response.json();
    
    cache.set(url, data);
    return data;
}

// 练习2：实现一个重试机制的 async 函数
console.log("\n练习2：重试机制");

async function withRetryAsync(fn, maxRetries = 3, delayMs = 1000) {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (i < maxRetries - 1) {
                console.log(`第 ${i + 1} 次尝试失败，${delayMs}ms 后重试...`);
                await new Promise(resolve => setTimeout(resolve, delayMs));
            }
        }
    }
    
    throw new Error(`重试 ${maxRetries} 次后仍然失败: ${lastError.message}`);
}

// 练习3：实现一个并发控制器
console.log("\n练习3：并发控制器");

class ConcurrencyController {
    constructor(maxConcurrency = 3) {
        this.maxConcurrency = maxConcurrency;
        this.running = 0;
        this.queue = [];
    }
    
    async run(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            this.process();
        });
    }
    
    async process() {
        if (this.running >= this.maxConcurrency || this.queue.length === 0) {
            return;
        }
        
        this.running++;
        const { task, resolve, reject } = this.queue.shift();
        
        try {
            const result = await task();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.running--;
            this.process();
        }
    }
}

const controller = new ConcurrencyController(2);

// 创建一些异步任务
const tasks = Array.from({ length: 6 }, (_, i) => 
    () => new Promise(resolve => {
        console.log(`任务 ${i + 1} 开始`);
        setTimeout(() => {
            console.log(`任务 ${i + 1} 完成`);
            resolve(`任务 ${i + 1} 的结果`);
        }, 1000);
    })
);

// 并发执行任务
Promise.all(tasks.map(task => controller.run(task)))
    .then(results => {
        console.log("所有任务完成:", results);
    });
// ========================================
// 2. 箭头函数 - 进阶示例
// ========================================

console.log("=== 箭头函数进阶示例 ===");

// ========================================
// 1. 高阶函数与箭头函数
// ========================================

console.log("\n1. 高阶函数与箭头函数:");

// 创建高阶函数
const createMultiplier = (factor) => {
    return (number) => number * factor;
};

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log("高阶函数测试:");
console.log("double(5):", double(5));   // 10
console.log("triple(4):", triple(4));   // 12

// 函数组合
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const square = x => x * x;

const composed = compose(square, multiplyByTwo, addOne);
const piped = pipe(addOne, multiplyByTwo, square);

console.log("函数组合测试:");
console.log("compose(square, multiplyByTwo, addOne)(2):", composed(2)); // ((2+1)*2)^2 = 36
console.log("pipe(addOne, multiplyByTwo, square)(2):", piped(2));       // ((2+1)*2)^2 = 36

// ========================================
// 2. 箭头函数在异步编程中的应用
// ========================================

console.log("\n2. 箭头函数在异步编程中的应用:");

// Promise 链式调用
const asyncOperation = (value) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(value * 2), 100);
    });
};

asyncOperation(5)
    .then(result => {
        console.log("第一次操作结果:", result); // 10
        return asyncOperation(result);
    })
    .then(result => {
        console.log("第二次操作结果:", result); // 20
        return asyncOperation(result);
    })
    .then(result => {
        console.log("最终结果:", result); // 40
    });

// async/await 与箭头函数
const asyncChain = async () => {
    let result = 5;
    
    result = await asyncOperation(result);
    console.log("async/await 第一次:", result); // 10
    
    result = await asyncOperation(result);
    console.log("async/await 第二次:", result); // 20
    
    result = await asyncOperation(result);
    console.log("async/await 最终:", result); // 40
};

asyncChain();

// ========================================
// 3. 箭头函数在数据处理中的高级应用
// ========================================

console.log("\n3. 箭头函数在数据处理中的高级应用:");

const users = [
    { id: 1, name: "张三", age: 25, department: "开发", salary: 8000 },
    { id: 2, name: "李四", age: 30, department: "测试", salary: 6000 },
    { id: 3, name: "王五", age: 28, department: "开发", salary: 9000 },
    { id: 4, name: "赵六", age: 35, department: "产品", salary: 12000 },
    { id: 5, name: "钱七", age: 22, department: "开发", salary: 5000 }
];

// 复杂的数据转换
const processUsers = (users) => 
    users
        .filter(user => user.age >= 25)                    // 过滤年龄 >= 25
        .map(user => ({                                     // 转换数据结构
            ...user,
            bonus: user.salary * 0.1,
            level: user.salary >= 8000 ? '高级' : '初级'
        }))
        .sort((a, b) => b.salary - a.salary)               // 按薪资降序排序
        .reduce((acc, user) => {                           // 按部门分组
            if (!acc[user.department]) {
                acc[user.department] = [];
            }
            acc[user.department].push(user);
            return acc;
        }, {});

const processedData = processUsers(users);
console.log("复杂数据处理结果:", JSON.stringify(processedData, null, 2));

// ========================================
// 4. 箭头函数在函数式编程中的应用
// ========================================

console.log("\n4. 箭头函数在函数式编程中的应用:");

// curry 函数
const curry = (fn) => {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return (...nextArgs) => curried(...args, ...nextArgs);
        }
    };
};

const addThree = (a, b, c) => a + b + c;
const curriedAdd = curry(addThree);

console.log("柯里化测试:");
console.log("curriedAdd(1, 2, 3):", curriedAdd(1, 2, 3));     // 6
console.log("curriedAdd(1)(2)(3):", curriedAdd(1)(2)(3));     // 6
console.log("curriedAdd(1, 2)(3):", curriedAdd(1, 2)(3));     // 6

// memoize 函数
const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

const fibonacci = memoize((n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log("记忆化斐波那契:");
console.log("fibonacci(10):", fibonacci(10)); // 55
console.log("fibonacci(20):", fibonacci(20)); // 6765

// ========================================
// 5. 箭头函数在 React 风格组件中的应用
// ========================================

console.log("\n5. 箭头函数在 React 风格组件中的应用:");

// 模拟 React 组件
const createComponent = (renderFn) => {
    return {
        render: renderFn,
        props: {},
        state: {}
    };
};

// 函数式组件
const UserCard = (props) => {
    const { name, age, department } = props;
    
    return {
        type: 'div',
        props: {
            className: 'user-card',
            children: [
                { type: 'h3', props: { children: name } },
                { type: 'p', props: { children: `年龄: ${age}` } },
                { type: 'p', props: { children: `部门: ${department}` } }
            ]
        }
    };
};

// 高阶组件
const withLogger = (Component) => {
    return (props) => {
        console.log('渲染组件:', Component.name || 'Anonymous');
        console.log('Props:', props);
        return Component(props);
    };
};

const LoggedUserCard = withLogger(UserCard);

console.log("组件测试:");
const userCard = LoggedUserCard({
    name: "张三",
    age: 25,
    department: "开发"
});

console.log("渲染结果:", userCard);

// ========================================
// 6. 箭头函数在事件系统中的应用
// ========================================

console.log("\n6. 箭头函数在事件系统中的应用:");

class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }
    
    emit(event, ...args) {
        const listeners = this.events.get(event);
        if (listeners) {
            listeners.forEach(listener => listener(...args));
        }
    }
    
    off(event, listener) {
        const listeners = this.events.get(event);
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }
}

const emitter = new EventEmitter();

// 使用箭头函数作为事件监听器
const handleUserCreated = (user) => {
    console.log(`用户创建事件: ${user.name} (ID: ${user.id})`);
};

const handleUserUpdated = (user) => {
    console.log(`用户更新事件: ${user.name} (年龄: ${user.age})`);
};

emitter.on('user:created', handleUserCreated);
emitter.on('user:updated', handleUserUpdated);

// 触发事件
emitter.emit('user:created', { id: 1, name: "张三" });
emitter.emit('user:updated', { name: "张三", age: 26 });

// ========================================
// 7. 箭头函数在工具函数库中的应用
// ========================================

console.log("\n7. 箭头函数在工具函数库中的应用:");

// 工具函数库
const utils = {
    // 深拷贝
    deepClone: (obj) => {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => utils.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = utils.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    },
    
    // 防抖函数
    debounce: (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    },
    
    // 节流函数
    throttle: (fn, delay) => {
        let lastCall = 0;
        return (...args) => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                fn.apply(this, args);
            }
        };
    },
    
    // 格式化日期
    formatDate: (date, format = 'YYYY-MM-DD') => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day);
    }
};

// 测试工具函数
const originalObj = { a: 1, b: { c: 2 } };
const clonedObj = utils.deepClone(originalObj);
console.log("深拷贝测试:", clonedObj);

const throttledFn = utils.throttle(() => {
    console.log("节流函数执行");
}, 1000);

console.log("节流函数测试:");
throttledFn(); // 立即执行
throttledFn(); // 不执行
setTimeout(throttledFn, 500); // 不执行
setTimeout(throttledFn, 1500); // 执行

// ========================================
// 8. 练习题
// ========================================

console.log("\n8. 练习题:");

// 练习1：实现一个简单的状态管理器
console.log("\n练习1：实现状态管理器");

const createState = (initialState) => {
    let state = utils.deepClone(initialState);
    const listeners = [];
    
    return {
        getState: () => utils.deepClone(state),
        
        setState: (newState) => {
            state = { ...state, ...newState };
            listeners.forEach(listener => listener(state));
        },
        
        subscribe: (listener) => {
            listeners.push(listener);
            return () => {
                const index = listeners.indexOf(listener);
                if (index > -1) listeners.splice(index, 1);
            };
        }
    };
};

const store = createState({ count: 0, name: "初始状态" });

const unsubscribe = store.subscribe((state) => {
    console.log("状态变化:", state);
});

store.setState({ count: 1 });
store.setState({ name: "更新状态", count: 2 });

unsubscribe();

// 练习2：实现一个简单的路由系统
console.log("\n练习2：实现路由系统");

const createRouter = () => {
    const routes = new Map();
    let currentRoute = '';
    
    return {
        addRoute: (path, handler) => {
            routes.set(path, handler);
        },
        
        navigate: (path) => {
            currentRoute = path;
            const handler = routes.get(path);
            if (handler) {
                handler({ path, params: {} });
            } else {
                console.log(`路由 ${path} 未找到`);
            }
        },
        
        getCurrentRoute: () => currentRoute
    };
};

const router = createRouter();

router.addRoute('/', () => console.log("首页"));
router.addRoute('/users', () => console.log("用户列表"));
router.addRoute('/about', () => console.log("关于页面"));

router.navigate('/');
router.navigate('/users');
router.navigate('/about');
router.navigate('/not-found');

console.log("当前路由:", router.getCurrentRoute());
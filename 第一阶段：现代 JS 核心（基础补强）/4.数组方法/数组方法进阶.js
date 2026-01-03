// ========================================
// 4. 数组方法 - 进阶示例
// ========================================

console.log("=== 数组方法进阶示例 ===");

// ========================================
// 1. 链式调用
// ========================================

console.log("\n1. 链式调用:");

const products = [
    { id: 1, name: "iPhone", price: 999, category: "电子产品", inStock: true },
    { id: 2, name: "Samsung Galaxy", price: 799, category: "电子产品", inStock: false },
    { id: 3, name: "MacBook", price: 1999, category: "电子产品", inStock: true },
    { id: 4, name: "Dell Laptop", price: 899, category: "电子产品", inStock: true },
    { id: 5, name: "Nike Shoes", price: 120, category: "服装", inStock: true },
    { id: 6, name: "Adidas Jacket", price: 150, category: "服装", inStock: false },
    { id: 7, name: "Levi's Jeans", price: 80, category: "服装", inStock: true }
];

// 复杂的链式调用：找出电子产品中价格大于500且有库存的商品，按价格排序，只取前3个
const result = products
    .filter(product => product.category === "电子产品")
    .filter(product => product.price > 500)
    .filter(product => product.inStock)
    .sort((a, b) => b.price - a.price)
    .slice(0, 3)
    .map(product => ({
        name: product.name,
        price: `$${product.price}`,
        category: product.category
    }));

console.log("链式调用结果:", result);

// ========================================
// 2. 高级 reduce 操作
// ========================================

console.log("\n2. 高级 reduce 操作:");

// 场景1：数据分组和聚合
const salesData = [
    { product: "iPhone", region: "North", amount: 1000 },
    { product: "iPhone", region: "South", amount: 1500 },
    { product: "MacBook", region: "North", amount: 2000 },
    { product: "MacBook", region: "South", amount: 1800 },
    { product: "iPad", region: "North", amount: 800 },
    { product: "iPad", region: "South", amount: 1200 }
];

// 按产品和地区分组统计销售额
const groupedSales = salesData.reduce((acc, sale) => {
    const { product, region, amount } = sale;
    
    if (!acc[product]) {
        acc[product] = {};
    }
    
    if (!acc[product][region]) {
        acc[product][region] = 0;
    }
    
    acc[product][region] += amount;
    return acc;
}, {});

console.log("分组销售数据:", groupedSales);

// 场景2：扁平化嵌套数组
const nestedArrays = [
    [1, 2, [3, 4]],
    [5, 6, [7, 8, [9, 10]]],
    [11, 12]
];

const flattenDeep = (arr) => {
    return arr.reduce((acc, val) => {
        return acc.concat(Array.isArray(val) ? flattenDeep(val) : val);
    }, []);
};

const flattened = flattenDeep(nestedArrays);
console.log("深度扁平化:", flattened); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// 场景3：实现数组的 uniqBy 功能
const items = [
    { id: 1, name: "苹果" },
    { id: 2, name: "香蕉" },
    { id: 1, name: "苹果(重复)" },
    { id: 3, name: "橙子" },
    { id: 2, name: "香蕉(重复)" }
];

const uniqById = items.reduce((acc, item) => {
    const existing = acc.find(x => x.id === item.id);
    if (!existing) {
        acc.push(item);
    }
    return acc;
}, []);

console.log("按ID去重:", uniqById);

// ========================================
// 3. 数组方法的组合使用
// ========================================

console.log("\n3. 数组方法的组合使用:");

// 场景：处理复杂的用户数据
const users = [
    {
        id: 1,
        name: "张三",
        age: 25,
        skills: ["JavaScript", "Python", "Java"],
        projects: [
            { name: "电商网站", tech: ["React", "Node.js"], score: 85 },
            { name: "管理系统", tech: ["Vue", "Express"], score: 92 }
        ]
    },
    {
        id: 2,
        name: "李四",
        age: 30,
        skills: ["Python", "Go", "Rust"],
        projects: [
            { name: "数据分析平台", tech: ["Python", "Pandas"], score: 78 },
            { name: "微服务", tech: ["Go", "Docker"], score: 95 }
        ]
    },
    {
        id: 3,
        name: "王五",
        age: 28,
        skills: ["JavaScript", "TypeScript", "React"],
        projects: [
            { name: "前端框架", tech: ["TypeScript", "React"], score: 88 }
        ]
    }
];

// 分析：找出使用 JavaScript 的用户，计算他们的平均项目分数
const jsUsers = users.filter(user => user.skills.includes("JavaScript"));
const jsUserScores = jsUsers
    .map(user => user.projects.map(p => p.score))
    .flat()
    .reduce((acc, score, index, arr) => {
        acc += score;
        if (index === arr.length - 1) {
            return acc / arr.length;
        }
        return acc;
    }, 0);

console.log("使用JavaScript的用户平均分数:", jsUserScores);

// ========================================
// 4. 实现自定义数组方法
// ========================================

console.log("\n4. 实现自定义数组方法:");

// 实现自定义的 map 方法
Array.prototype.myMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};

// 实现自定义的 filter 方法
Array.prototype.myFilter = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

// 实现自定义的 reduce 方法
Array.prototype.myReduce = function(callback, initialValue) {
    let accumulator = initialValue !== undefined ? initialValue : this[0];
    let startIndex = initialValue !== undefined ? 0 : 1;
    
    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    
    return accumulator;
};

// 测试自定义方法
const testArray = [1, 2, 3, 4, 5];
console.log("原数组:", testArray);
console.log("myMap *2:", testArray.myMap(x => x * 2));
console.log("myFilter 偶数:", testArray.myFilter(x => x % 2 === 0));
console.log("myReduce 求和:", testArray.myReduce((acc, x) => acc + x, 0));

// ========================================
// 5. 性能优化技巧
// ========================================

console.log("\n5. 性能优化技巧:");

// 技巧1：避免不必要的链式调用
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

console.time("优化前");
const result1 = largeArray
    .filter(x => x % 2 === 0)
    .map(x => x * 2)
    .filter(x => x > 1000);
console.timeEnd("优化前");

console.time("优化后");
const result2 = largeArray.filter(x => x % 2 === 0 && x * 2 > 1000).map(x => x * 2);
console.timeEnd("优化后");

// 技巧2：使用 reduce 进行多操作
console.time("多次遍历");
const evens1 = largeArray.filter(x => x % 2 === 0);
const sum1 = evens1.reduce((acc, x) => acc + x, 0);
const max1 = evens1.reduce((acc, x) => Math.max(acc, x), 0);
console.timeEnd("多次遍历");

console.time("一次遍历");
const { sum2, max2 } = largeArray.reduce((acc, x) => {
    if (x % 2 === 0) {
        acc.sum += x;
        acc.max = Math.max(acc.max, x);
    }
    return acc;
}, { sum: 0, max: 0 });
console.timeEnd("一次遍历");

// ========================================
// 6. 实际项目中的应用
// ========================================

console.log("\n6. 实际项目中的应用:");

// 场景1：数据表格处理
const tableData = [
    { id: 1, name: "张三", department: "开发", salary: 8000, active: true },
    { id: 2, name: "李四", department: "测试", salary: 6000, active: true },
    { id: 3, name: "王五", department: "开发", salary: 9000, active: false },
    { id: 4, name: "赵六", department: "产品", salary: 7000, active: true },
    { id: 5, name: "钱七", department: "开发", salary: 8500, active: true }
];

// 实现表格的搜索、过滤、排序功能
function processTableData(data, search, filters, sortBy, sortOrder) {
    return data
        // 搜索功能
        .filter(item => 
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.department.toLowerCase().includes(search.toLowerCase())
        )
        // 过滤功能
        .filter(item => {
            if (filters.department && item.department !== filters.department) return false;
            if (filters.active !== undefined && item.active !== filters.active) return false;
            return true;
        })
        // 排序功能
        .sort((a, b) => {
            const aVal = a[sortBy];
            const bVal = b[sortBy];
            
            if (typeof aVal === 'string') {
                return sortOrder === 'asc' 
                    ? aVal.localeCompare(bVal) 
                    : bVal.localeCompare(aVal);
            } else {
                return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
            }
        });
}

const processedData = processTableData(
    tableData,
    "开发", // 搜索
    { department: "开发", active: true }, // 过滤
    "salary", // 排序字段
    "desc" // 排序顺序
);

console.log("处理后的表格数据:", processedData);

// 场景2：数据验证和转换
const rawData = [
    { name: "张三", age: "25", email: "zhangsan@example.com", score: "85.5" },
    { name: "李四", age: "30", email: "lisi@example", score: "92" },
    { name: "王五", age: "28", email: "wangwu@example.com", score: "invalid" },
    { name: "", age: "22", email: "zhaoliu@example.com", score: "78" }
];

function validateAndTransform(data) {
    return data
        .map(item => ({
            ...item,
            age: parseInt(item.age, 10),
            score: parseFloat(item.score),
            validEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.email)
        }))
        .filter(item => 
            item.name.trim() !== "" && 
            !isNaN(item.age) && 
            item.age > 0 &&
            item.validEmail &&
            !isNaN(item.score) &&
            item.score >= 0
        )
        .map(item => ({
            name: item.name.trim(),
            age: item.age,
            email: item.email.toLowerCase(),
            score: item.score
        }));
}

const validatedData = validateAndTransform(rawData);
console.log("验证和转换后的数据:", validatedData);

// ========================================
// 7. 练习题
// ========================================

console.log("\n7. 练习题:");

// 练习1：实现数组的 shuffle 功能
console.log("\n练习1：数组洗牌");

function shuffleArray(array) {
    return array.reduce((acc, _, index) => {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        acc[index] = acc[randomIndex];
        acc[randomIndex] = _;
        return acc;
    }, [...array]);
}

const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("原数组:", originalArray);
console.log("洗牌后:", shuffleArray(originalArray));

// 练习2：实现数组的 intersectionBy 功能
console.log("\n练习2：数组交集（基于函数）");

function intersectionBy(array1, array2, iteratee) {
    const transformed2 = array2.map(iteratee);
    return array1.filter(item => transformed2.includes(iteratee(item)));
}

const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const arr2 = [{ id: 2 }, { id: 3 }, { id: 4 }];
const result3 = intersectionBy(arr1, arr2, item => item.id);
console.log("基于ID的交集:", result3);

// 练习3：实现数组的 partition 功能
console.log("\n练习3：数组分区");

function partition(array, predicate) {
    return array.reduce((acc, item) => {
        acc[predicate(item) ? 0 : 1].push(item);
        return acc;
    }, [[], []]);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const [evens, odds] = partition(numbers, n => n % 2 === 0);
console.log("偶数:", evens);
console.log("奇数:", odds);

// 练习4：实现数组的 chunk 功能
console.log("\n练习4：数组分块");

function chunk(array, size) {
    return array.reduce((acc, item, index) => {
        const chunkIndex = Math.floor(index / size);
        if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
        }
        acc[chunkIndex].push(item);
        return acc;
    }, []);
}

const chunked = chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
console.log("分块结果:", chunked);

// 练习5：实现数组的 zip 功能
console.log("\n练习5：数组压缩");

function zip(...arrays) {
    const maxLength = Math.max(...arrays.map(arr => arr.length));
    return Array.from({ length: maxLength }, (_, index) => {
        return arrays.map(arr => arr[index]);
    });
}

const zipped = zip([1, 2, 3], ['a', 'b', 'c'], [true, false, true]);
console.log("压缩结果:", zipped);
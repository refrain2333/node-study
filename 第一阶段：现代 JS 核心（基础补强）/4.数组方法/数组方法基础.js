// ========================================
// 4. 数组方法 - 基础示例
// ========================================

console.log("=== 数组方法基础示例 ===");

// ========================================
// 1. map - 数组转换
// ========================================

console.log("\n1. map - 数组转换:");

const numbers = [1, 2, 3, 4, 5];
console.log("原始数组:", numbers);

// 基本用法：将每个元素乘以 2
const doubled = numbers.map(n => n * 2);
console.log("map - 翻倍:", doubled); // [2, 4, 6, 8, 10]

// 转换为字符串
const stringNumbers = numbers.map(n => `数字${n}`);
console.log("map - 转换为字符串:", stringNumbers); // ["数字1", "数字2", "数字3", "数字4", "数字5"]

// 对象数组转换
const users = [
    { id: 1, name: "张三", age: 25 },
    { id: 2, name: "李四", age: 30 },
    { id: 3, name: "王五", age: 28 }
];

const userNames = users.map(user => user.name);
console.log("map - 提取用户名:", userNames); // ["张三", "李四", "王五"]

const userSummaries = users.map(user => ({
    id: user.id,
    summary: `${user.name} (${user.age}岁)`
}));
console.log("map - 生成摘要:", userSummaries);

// ========================================
// 2. filter - 数组过滤
// ========================================

console.log("\n2. filter - 数组过滤:");

const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("原始数组:", allNumbers);

// 过滤偶数
const evens = allNumbers.filter(n => n % 2 === 0);
console.log("filter - 偶数:", evens); // [2, 4, 6, 8, 10]

// 过滤奇数
const odds = allNumbers.filter(n => n % 2 !== 0);
console.log("filter - 奇数:", odds); // [1, 3, 5, 7, 9]

// 过滤大于 5 的数
const greaterThanFive = allNumbers.filter(n => n > 5);
console.log("filter - 大于5:", greaterThanFive); // [6, 7, 8, 9, 10]

// 对象数组过滤
const products = [
    { name: "苹果", price: 5, category: "水果" },
    { name: "香蕉", price: 3, category: "水果" },
    { name: "胡萝卜", price: 2, category: "蔬菜" },
    { name: "牛肉", price: 50, category: "肉类" },
    { name: "鸡肉", price: 20, category: "肉类" }
];

// 过滤水果
const fruits = products.filter(product => product.category === "水果");
console.log("filter - 水果:", fruits);

// 过滤价格大于 10 的商品
const expensiveProducts = products.filter(product => product.price > 10);
console.log("filter - 价格>10:", expensiveProducts);

// ========================================
// 3. find - 查找元素
// ========================================

console.log("\n3. find - 查找元素:");

const users2 = [
    { id: 1, name: "张三", age: 25 },
    { id: 2, name: "李四", age: 30 },
    { id: 3, name: "王五", age: 28 },
    { id: 4, name: "赵六", age: 35 }
];

// 查找特定 ID 的用户
const userById = users2.find(user => user.id === 2);
console.log("find - ID为2的用户:", userById); // { id: 2, name: "李四", age: 30 }

// 查找年龄大于 30 的用户
const oldUser = users2.find(user => user.age > 30);
console.log("find - 年龄>30的用户:", oldUser); // { id: 4, name: "赵六", age: 35 }

// 查找名字包含"张"的用户
const zhangUser = users2.find(user => user.name.includes("张"));
console.log("find - 名字包含张的用户:", zhangUser); // { id: 1, name: "张三", age: 25 }

// find 返回 undefined（没找到）
const notFound = users2.find(user => user.id === 999);
console.log("find - 未找到的用户:", notFound); // undefined

// ========================================
// 4. reduce - 累积计算
// ========================================

console.log("\n4. reduce - 累积计算:");

const numbers2 = [1, 2, 3, 4, 5];
console.log("原始数组:", numbers2);

// 求和
const sum = numbers2.reduce((accumulator, current) => {
    return accumulator + current;
}, 0);
console.log("reduce - 求和:", sum); // 15

// 简化写法
const sum2 = numbers2.reduce((acc, cur) => acc + cur, 0);
console.log("reduce - 求和(简化):", sum2); // 15

// 求积
const product = numbers2.reduce((acc, cur) => acc * cur, 1);
console.log("reduce - 求积:", product); // 120

// 统计字符出现次数
const characters = ['a', 'b', 'a', 'c', 'b', 'a'];
const charCount = characters.reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
}, {});
console.log("reduce - 字符统计:", charCount); // { a: 3, b: 2, c: 1 }

// 对象数组的累积
const orders = [
    { product: "苹果", quantity: 2, price: 5 },
    { product: "香蕉", quantity: 3, price: 3 },
    { product: "橙子", quantity: 1, price: 4 }
];

const totalRevenue = orders.reduce((acc, order) => {
    return acc + (order.quantity * order.price);
}, 0);
console.log("reduce - 总收入:", totalRevenue); // 27

// ========================================
// 5. Python vs JavaScript 数组方法对比
// ========================================

console.log("\n5. Python vs JavaScript 数组方法对比:");

// Python 的列表推导式
// [x * 2 for x in numbers if x % 2 == 0]

// JavaScript 的等价写法
const pythonStyle = numbers2.filter(x => x % 2 === 0).map(x => x * 2);
console.log("类似 Python 列表推导式:", pythonStyle); // [4, 8]

// Python 的 map 函数
// list(map(lambda x: x * 2, numbers))

// JavaScript 的等价写法
const mapStyle = numbers2.map(x => x * 2);
console.log("类似 Python map:", mapStyle); // [2, 4, 6, 8, 10]

// Python 的 filter 函数
// list(filter(lambda x: x % 2 == 0, numbers))

// JavaScript 的等价写法
const filterStyle = numbers2.filter(x => x % 2 === 0);
console.log("类似 Python filter:", filterStyle); // [2, 4]

// ========================================
// 6. 实际应用场景
// ========================================

console.log("\n6. 实际应用场景:");

// 场景1：数据转换和格式化
const rawData = [
    { name: "张三", score: 85, subject: "数学" },
    { name: "李四", score: 92, subject: "数学" },
    { name: "王五", score: 78, subject: "英语" },
    { name: "赵六", score: 88, subject: "英语" }
];

// 转换为更易读的格式
const formattedData = rawData.map(item => ({
    学生: item.name,
    科目: item.subject,
    成绩: `${item.score}分`,
    等级: item.score >= 90 ? "优秀" : item.score >= 80 ? "良好" : "及格"
}));

console.log("格式化后的数据:", formattedData);

// 场景2：数据筛选和统计
const students = [
    { name: "张三", age: 18, grade: "A" },
    { name: "李四", age: 19, grade: "B" },
    { name: "王五", age: 18, grade: "A" },
    { name: "赵六", age: 20, grade: "C" },
    { name: "钱七", age: 19, grade: "A" }
];

// 筛选优秀学生
const excellentStudents = students.filter(student => student.grade === "A");
console.log("优秀学生:", excellentStudents);

// 按年龄分组统计
const ageGroups = students.reduce((acc, student) => {
    const age = student.age;
    if (!acc[age]) {
        acc[age] = [];
    }
    acc[age].push(student);
    return acc;
}, {});

console.log("按年龄分组:", ageGroups);

// 场景3：查找和验证
const inventory = [
    { id: 1, name: "苹果", stock: 10, price: 5 },
    { id: 2, name: "香蕉", stock: 0, price: 3 },
    { id: 3, name: "橙子", stock: 5, price: 4 },
    { id: 4, name: "葡萄", stock: 0, price: 8 }
];

// 检查是否有库存
const hasStock = inventory.some(item => item.stock > 0);
console.log("是否有库存:", hasStock); // true

// 检查是否全部有库存
const allInStock = inventory.every(item => item.stock > 0);
console.log("是否全部有库存:", allInStock); // false

// 查找特定商品
const apple = inventory.find(item => item.name === "苹果");
console.log("苹果信息:", apple);

// ========================================
// 7. 练习题
// ========================================

console.log("\n7. 练习题:");

// 练习1：实现数组去重
console.log("\n练习1：数组去重");

const duplicates = [1, 2, 2, 3, 4, 4, 5, 6, 6];
const unique = duplicates.filter((item, index, arr) => arr.indexOf(item) === index);
console.log("去重结果:", unique); // [1, 2, 3, 4, 5, 6]

// 练习2：实现数组扁平化
console.log("\n练习2：数组扁平化");

const nestedArray = [[1, 2], [3, 4], [5, 6]];
const flattened = nestedArray.reduce((acc, current) => acc.concat(current), []);
console.log("扁平化结果:", flattened); // [1, 2, 3, 4, 5, 6]

// 练习3：计算平均值
console.log("\n练习3：计算平均值");

const scores = [85, 92, 78, 96, 88, 91];
const average = scores.reduce((acc, score, index, arr) => {
    acc += score;
    if (index === arr.length - 1) {
        return acc / arr.length;
    }
    return acc;
}, 0);
console.log("平均分:", average); // 88.333...

// 练习4：实现数组分组
console.log("\n练习4：数组分组");

const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
const groupedByLength = words.reduce((acc, word) => {
    const length = word.length;
    if (!acc[length]) {
        acc[length] = [];
    }
    acc[length].push(word);
    return acc;
}, {});

console.log("按长度分组:", groupedByLength);

// 练习5：实现数组交集
console.log("\n练习5：数组交集");

const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const intersection = array1.filter(item => array2.includes(item));
console.log("数组交集:", intersection); // [3, 4, 5]

// 练习6：实现数组差集
console.log("\n练习6：数组差集");

const difference = array1.filter(item => !array2.includes(item));
console.log("数组差集:", difference); // [1, 2]
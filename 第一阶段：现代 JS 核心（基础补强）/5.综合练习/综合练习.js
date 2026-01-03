// ========================================
// 5. 综合练习 - 实际项目应用
// ========================================

console.log("=== 第一阶段综合练习 ===");

// ========================================
// 项目1：学生成绩管理系统
// ========================================

console.log("\n=== 项目1：学生成绩管理系统 ===");

// 模拟数据
const students = [
    { id: 1, name: "张三", age: 18, grades: { math: 85, english: 92, science: 78 } },
    { id: 2, name: "李四", age: 19, grades: { math: 95, english: 88, science: 91 } },
    { id: 3, name: "王五", age: 18, grades: { math: 72, english: 85, science: 83 } },
    { id: 4, name: "赵六", age: 20, grades: { math: 88, english: 90, science: 87 } },
    { id: 5, name: "钱七", age: 19, grades: { math: 91, english: 79, science: 94 } }
];

// 1. 计算每个学生的平均分
const studentsWithAverage = students.map(student => {
    const grades = Object.values(student.grades);
    const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    
    return {
        ...student,
        average: Math.round(average * 100) / 100
    };
});

console.log("1. 学生平均分:", studentsWithAverage);

// 2. 找出数学成绩优秀的学生（>90）
const excellentMathStudents = studentsWithAverage.filter(s => s.grades.math > 90);
console.log("2. 数学优秀学生:", excellentMathStudents);

// 3. 按平均分排序
const sortedByAverage = studentsWithAverage.sort((a, b) => b.average - a.average);
console.log("3. 按平均分排序:", sortedByAverage);

// 4. 计算各科平均分
const subjects = ['math', 'english', 'science'];
const subjectAverages = subjects.map(subject => {
    const total = students.reduce((sum, student) => sum + student.grades[subject], 0);
    return {
        subject,
        average: Math.round((total / students.length) * 100) / 100
    };
});

console.log("4. 各科平均分:", subjectAverages);

// 5. 找出最薄弱的科目
const weakestSubject = subjectAverages.reduce((weakest, current) => {
    return current.average < weakest.average ? current : weakest;
});

console.log("5. 最薄弱科目:", weakestSubject);

// ========================================
// 项目2：电商库存管理系统
// ========================================

console.log("\n=== 项目2：电商库存管理系统 ===");

const products = [
    { id: 1, name: "iPhone 15", category: "手机", price: 7999, stock: 50, sales: 120 },
    { id: 2, name: "Samsung S24", category: "手机", price: 6999, stock: 30, sales: 80 },
    { id: 3, name: "MacBook Pro", category: "电脑", price: 15999, stock: 20, sales: 45 },
    { id: 4, name: "Dell XPS", category: "电脑", price: 8999, stock: 25, sales: 60 },
    { id: 5, name: "iPad Air", category: "平板", price: 3999, stock: 40, sales: 100 },
    { id: 6, name: "Surface Pro", category: "平板", price: 7999, stock: 15, sales: 35 }
];

// 1. 计算库存总价值
const totalInventoryValue = products.reduce((total, product) => {
    return total + (product.price * product.stock);
}, 0);

console.log("1. 库存总价值: ¥" + totalInventoryValue.toLocaleString());

// 2. 找出热销产品（销量>50）
const hotProducts = products.filter(p => p.sales > 50);
console.log("2. 热销产品:", hotProducts);

// 3. 按类别分组统计
const categoryStats = products.reduce((acc, product) => {
    if (!acc[product.category]) {
        acc[product.category] = {
            count: 0,
            totalStock: 0,
            totalValue: 0,
            avgPrice: 0
        };
    }
    
    acc[product.category].count++;
    acc[product.category].totalStock += product.stock;
    acc[product.category].totalValue += product.price * product.stock;
    
    return acc;
}, {});

// 计算平均价格
Object.keys(categoryStats).forEach(category => {
    const stats = categoryStats[category];
    stats.avgPrice = Math.round(stats.totalValue / stats.totalStock);
});

console.log("3. 按类别统计:", categoryStats);

// 4. 找出需要补货的产品（库存<20）
const needRestock = products.filter(p => p.stock < 20);
console.log("4. 需要补货的产品:", needRestock);

// 5. 计算各品类的销售占比
const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
const salesByCategory = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + product.sales;
    return acc;
}, {});

const salesPercentage = Object.keys(salesByCategory).map(category => ({
    category,
    sales: salesByCategory[category],
    percentage: Math.round((salesByCategory[category] / totalSales) * 100)
}));

console.log("5. 销售占比:", salesPercentage);

// ========================================
// 项目3：异步数据处理系统
// ========================================

console.log("\n=== 项目3：异步数据处理系统 ===");

// 模拟异步数据获取
function fetchUserData(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: `用户${userId}`,
                email: `user${userId}@example.com`,
                lastLogin: new Date(Date.now() - Math.random() * 86400000 * 30)
            });
        }, 200);
    });
}

function fetchUserOrders(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const orders = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
                id: `${userId}-${i + 1}`,
                amount: Math.floor(Math.random() * 1000) + 100,
                date: new Date(Date.now() - Math.random() * 86400000 * 60)
            }));
            resolve(orders);
        }, 300);
    });
}

function processOrder(order) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ...order,
                status: order.amount > 500 ? "高价值订单" : "普通订单",
                discount: order.amount > 800 ? 0.1 : 0
            });
        }, 100);
    });
}

// 1. 批量获取用户数据
async function batchFetchUsers(userIds) {
    console.log("1. 批量获取用户数据:");
    
    try {
        const users = await Promise.all(userIds.map(id => fetchUserData(id)));
        console.log("获取到的用户:", users);
        return users;
    } catch (error) {
        console.error("获取用户失败:", error);
        return [];
    }
}

// 2. 获取用户订单并处理
async function getUserOrdersWithProcessing(userId) {
    console.log(`\n2. 获取用户 ${userId} 的订单并处理:`);
    
    try {
        const orders = await fetchUserOrders(userId);
        console.log("原始订单:", orders);
        
        // 并行处理所有订单
        const processedOrders = await Promise.all(orders.map(processOrder));
        console.log("处理后的订单:", processedOrders);
        
        return processedOrders;
    } catch (error) {
        console.error("处理订单失败:", error);
        return [];
    }
}

// 3. 综合用户分析
async function analyzeUsers(userIds) {
    console.log("\n3. 综合用户分析:");
    
    try {
        // 并行获取所有用户数据
        const users = await batchFetchUsers(userIds);
        
        // 为每个用户获取和处理订单
        const userAnalyses = await Promise.all(
            users.map(async (user) => {
                const orders = await getUserOrdersWithProcessing(user.id);
                
                // 计算用户统计信息
                const totalSpent = orders.reduce((sum, order) => sum + order.amount, 0);
                const avgOrder = orders.length > 0 ? totalSpent / orders.length : 0;
                const highValueOrders = orders.filter(o => o.status === "高价值订单").length;
                
                return {
                    user: user.name,
                    totalOrders: orders.length,
                    totalSpent,
                    avgOrder: Math.round(avgOrder),
                    highValueOrders,
                    lastLogin: user.lastLogin.toLocaleDateString()
                };
            })
        );
        
        console.log("用户分析结果:", userAnalyses);
        return userAnalyses;
    } catch (error) {
        console.error("用户分析失败:", error);
        return [];
    }
}

// 执行异步数据处理
batchFetchUsers([1, 2, 3]).then(() => {
    getUserOrdersWithProcessing(1).then(() => {
        analyzeUsers([1, 2, 3]);
    });
});

// ========================================
// 项目4：数据验证和转换管道
// ========================================

console.log("\n=== 项目4：数据验证和转换管道 ===");

// 模拟原始数据
const rawData = [
    { name: "张三", age: "25", email: "zhangsan@example.com", phone: "13800138000" },
    { name: "李四", age: "30", email: "lisi@example", phone: "13800138001" },
    { name: "王五", age: "28", email: "wangwu@example.com", phone: "invalid-phone" },
    { name: "", age: "22", email: "zhaoliu@example.com", phone: "13800138003" },
    { name: "钱七", age: "invalid", email: "qianqi@example.com", phone: "13800138004" }
];

// 验证规则
const validators = {
    name: (value) => value && value.trim().length >= 2,
    age: (value) => !isNaN(parseInt(value, 10)) && parseInt(value, 10) > 0 && parseInt(value, 10) < 150,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: (value) => /^\d{11}$/.test(value)
};

// 转换规则
const transformers = {
    name: (value) => value.trim(),
    age: (value) => parseInt(value, 10),
    email: (value) => value.toLowerCase(),
    phone: (value) => value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
};

// 数据处理管道
function processDataPipeline(data) {
    return data
        // 1. 验证数据
        .map(item => {
            const errors = [];
            const isValid = Object.keys(validators).every(key => {
                const isValidField = validators[key](item[key]);
                if (!isValidField) {
                    errors.push(`${key} 字段无效`);
                }
                return isValidField;
            });
            
            return {
                ...item,
                isValid,
                errors
            };
        })
        // 2. 过滤有效数据
        .filter(item => item.isValid)
        // 3. 转换数据
        .map(item => {
            const transformed = {};
            Object.keys(transformers).forEach(key => {
                transformed[key] = transformers[key](item[key]);
            });
            return transformed;
        })
        // 4. 添加额外字段
        .map(item => ({
            ...item,
            id: Math.floor(Math.random() * 10000),
            createdAt: new Date().toISOString(),
            ageGroup: item.age < 30 ? "青年" : item.age < 50 ? "中年" : "老年"
        }));
}

const processedData = processDataPipeline(rawData);
console.log("处理后的数据:", processedData);

// ========================================
// 项目5：综合练习 - 电商数据分析
// ========================================

console.log("\n=== 项目5：电商数据分析 ===");

// 模拟复杂数据结构
const ecommerceData = {
    users: [
        { id: 1, name: "张三", registrationDate: "2024-01-15", isActive: true },
        { id: 2, name: "李四", registrationDate: "2024-02-20", isActive: true },
        { id: 3, name: "王五", registrationDate: "2024-03-10", isActive: false }
    ],
    products: [
        { id: 101, name: "iPhone", category: "手机", price: 8000 },
        { id: 102, name: "MacBook", category: "电脑", price: 12000 },
        { id: 103, name: "iPad", category: "平板", price: 4000 }
    ],
    orders: [
        { id: 1001, userId: 1, productId: 101, quantity: 1, orderDate: "2024-04-01" },
        { id: 1002, userId: 1, productId: 102, quantity: 1, orderDate: "2024-04-05" },
        { id: 1003, userId: 2, productId: 103, quantity: 2, orderDate: "2024-04-10" },
        { id: 1004, userId: 3, productId: 101, quantity: 1, orderDate: "2024-04-15" }
    ]
};

// 1. 计算用户生命周期价值 (LTV)
const userLTV = ecommerceData.users.map(user => {
    const userOrders = ecommerceData.orders.filter(order => order.userId === user.id);
    const totalSpent = userOrders.reduce((sum, order) => {
        const product = ecommerceData.products.find(p => p.id === order.productId);
        return sum + (product.price * order.quantity);
    }, 0);
    
    return {
        ...user,
        totalOrders: userOrders.length,
        totalSpent,
        avgOrderValue: userOrders.length > 0 ? totalSpent / userOrders.length : 0
    };
});

console.log("1. 用户LTV分析:", userLTV);

// 2. 产品销售分析
const productSales = ecommerceData.products.map(product => {
    const sales = ecommerceData.orders.filter(order => order.productId === product.id);
    const totalRevenue = sales.reduce((sum, order) => sum + (product.price * order.quantity), 0);
    const totalUnits = sales.reduce((sum, order) => sum + order.quantity, 0);
    
    return {
        ...product,
        totalOrders: sales.length,
        totalUnits,
        totalRevenue,
        avgPrice: totalRevenue / totalUnits
    };
});

console.log("2. 产品销售分析:", productSales);

// 3. 按月统计销售数据
const monthlySales = ecommerceData.orders.reduce((acc, order) => {
    const month = order.orderDate.substring(0, 7); // YYYY-MM
    const product = ecommerceData.products.find(p => p.id === order.productId);
    const revenue = product.price * order.quantity;
    
    if (!acc[month]) {
        acc[month] = {
            month,
            totalOrders: 0,
            totalRevenue: 0,
            totalUnits: 0,
            uniqueCustomers: new Set()
        };
    }
    
    acc[month].totalOrders++;
    acc[month].totalRevenue += revenue;
    acc[month].totalUnits += order.quantity;
    acc[month].uniqueCustomers.add(order.userId);
    
    return acc;
}, {});

const monthlySalesArray = Object.values(monthlySales).map(item => ({
    ...item,
    uniqueCustomers: item.uniqueCustomers.size
}));

console.log("3. 月度销售统计:", monthlySalesArray);

// ========================================
// 总结和练习建议
// ========================================

console.log("\n=== 学习总结 ===");

console.log(`
第一阶段学习要点总结：

1. 变量与作用域
   ✅ 掌握 let/const 与 var 的区别
   ✅ 理解块级作用域的概念
   ✅ 学会使用闭包和 IIFE

2. 箭头函数
   ✅ 掌握箭头函数语法
   ✅ 理解 this 绑定的差异
   ✅ 熟悉在数组方法中的应用

3. 异步编程
   ✅ 理解 Promise 的 then/catch 机制
   ✅ 掌握 async/await 语法糖
   ✅ 学会处理异步错误

4. 数组方法
   ✅ 熟练使用 map, filter, find, reduce
   ✅ 理解函数式编程思想
   ✅ 掌握链式调用技巧

学习建议：
1. 每天练习 2-3 个示例
2. 尝试修改代码理解不同效果
3. 将 Python 思维转换为 JavaScript 思维
4. 多使用 console.log 调试代码
5. 理解每个方法的返回值和副作用

下一步：
完成第一阶段后，进入第二阶段 TypeScript 学习！
`);

// 延迟输出，确保异步操作完成
setTimeout(() => {
    console.log("\n=== 第一阶段学习完成！ ===");
}, 2000);
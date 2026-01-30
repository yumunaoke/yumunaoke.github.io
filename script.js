// 生日祝福消息数组
const birthdayMessages = [
    "生日快乐！愿你的每一天都充满阳光和快乐！",
    "祝你生日快乐，愿幸福常伴你左右！",
    "新的一岁，愿你心想事成，万事如意！",
    "生日快乐！愿你的梦想都能实现！",
    "祝你生日快乐，天天开心，永远年轻！",
    "愿你的生日充满无尽的快乐和温馨！",
    "生日快乐！愿你的生活像彩虹一样绚丽多彩！",
    "祝你生日快乐，愿好运永远伴随你！",
    "生日快乐！愿你的未来更加美好！",
    "祝你生日快乐，身体健康，工作顺利！",
    "愿你的生日像你一样特别而美好！",
    "生日快乐！愿你的每一天都充满惊喜！",
    "祝你生日快乐，愿爱情甜蜜，友情长久！",
    "生日快乐！愿你的笑容永远灿烂！",
    "祝你生日快乐，愿你的心愿都能实现！",
    "生日快乐！愿你的生活充满爱和快乐！",
    "祝你生日快乐，事业有成，家庭幸福！",
    "生日快乐！愿你的每一天都比昨天更美好！",
    "祝你生日快乐，愿你的梦想展翅高飞！",
    "生日快乐！愿你的世界充满阳光和温暖！"
];

// 全局变量
let currentPage = 0;
let totalPages = 5;
let isStarted = false;
let snowflakes = [];
let fireworks = [];
let balloons = [];

// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    createSnowflakes();
});

// 创建飘雪效果（使用图片）
function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = Math.min(80, window.innerWidth / 15);
    const snowImages = ['图片/飘雪1.png', '图片/飘雪2.png', '图片/飘雪3.png', '图片/飘雪4.png'];
    
    for (let i = 0; i < snowflakeCount; i++) {
        setTimeout(() => {
            createSnowflake(snowContainer, snowImages);
        }, i * 300);
    }
}

function createSnowflake(container, snowImages) {
    const snowflake = document.createElement('img');
    snowflake.className = 'snowflake';
    
    // 随机选择一张飘雪图片
    const randomImage = snowImages[Math.floor(Math.random() * snowImages.length)];
    snowflake.src = randomImage;
    
    const size = Math.random() * 20 + 15; // 图片大小15-35px
    const left = Math.random() * 100;
    const duration = Math.random() * 8 + 8; // 下落时间8-16秒
    const delay = Math.random() * 5;
    const rotation = Math.random() * 360;
    
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${left}%`;
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.animationDelay = `${delay}s`;
    snowflake.style.transform = `rotate(${rotation}deg)`;
    
    container.appendChild(snowflake);
    snowflakes.push(snowflake);
    
    // 雪花落地后重新开始
    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
            createSnowflake(container, snowImages);
        }
    }, (duration + delay) * 1000);
}

// 页面切换函数
function showPage(pageIndex) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示当前页面
    pages[pageIndex].classList.add('active');
    
    // 更新进度指示器
    updateProgressIndicator(pageIndex);
    
    // 根据页面索引执行特定功能（每次切换都重新初始化）
    switch(pageIndex) {
        case 0: // 启动页
            initPage0();
            break;
        case 1: // 第一页：文字祝福
            initPage1();
            break;
        case 2: // 第二页：图片祝福
            initPage2();
            break;
        case 3: // 第三页：消息弹窗
            initPage3();
            break;
        case 4: // 第四页：气球和礼花效果
            initPage4();
            break;
    }
}

function updateProgressIndicator(pageIndex) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === pageIndex);
    });
}

// 启动功能
function startBirthdayShow() {
    isStarted = true;
    
    // 切换到第一页
    currentPage = 1;
    showPage(currentPage);
}





// 创建消息弹窗
function createPopups() {
    const page3 = document.getElementById('page3');
    const content = page3.querySelector('.content');
    
    // 清空现有弹窗
    content.innerHTML = '';
    
    // 创建20个弹窗（生成速度调慢）
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createPopup(content, i);
        }, i * 500); // 从300ms增加到500ms
    }
}

function createPopup(container, index) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    
    const message = birthdayMessages[index % birthdayMessages.length];
    
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    popupContent.textContent = message;
    
    popup.appendChild(popupContent);
    
    // 使用视口尺寸计算，确保在移动端正确
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
    // 弹窗尺寸（移动端适配）
    const popupWidth = Math.min(250, viewportWidth * 0.7);
    const popupHeight = 100;
    
    // 安全边界（考虑移动端的安全区域）
    const safeMargin = 20;
    const maxX = viewportWidth - popupWidth - safeMargin;
    const maxY = viewportHeight - popupHeight - safeMargin;
    
    // 改进的随机位置算法，确保在移动端均匀分布
    let x, y;
    
    // 根据屏幕尺寸调整区域划分
    const isMobile = viewportWidth <= 768;
    const regionCount = isMobile ? 4 : 4; // 移动端和桌面端都使用4个区域
    const regionSize = 20 / regionCount;
    
    // 更精确的区域划分
    const regionIndex = index % regionCount;
    
    // 根据区域索引计算位置
    switch(regionIndex) {
        case 0: // 左上区域
            x = Math.random() * (maxX * 0.4) + safeMargin;
            y = Math.random() * (maxY * 0.4) + safeMargin;
            break;
        case 1: // 右上区域
            x = maxX * 0.6 + Math.random() * (maxX * 0.4);
            y = Math.random() * (maxY * 0.4) + safeMargin;
            break;
        case 2: // 左下区域
            x = Math.random() * (maxX * 0.4) + safeMargin;
            y = maxY * 0.6 + Math.random() * (maxY * 0.4);
            break;
        case 3: // 右下区域
            x = maxX * 0.6 + Math.random() * (maxX * 0.4);
            y = maxY * 0.6 + Math.random() * (maxY * 0.4);
            break;
    }
    
    // 确保在边界内，考虑移动端的安全区域
    x = Math.max(safeMargin, Math.min(maxX, x));
    y = Math.max(safeMargin, Math.min(maxY, y));
    
    // 使用绝对定位，基于视口
    popup.style.position = 'absolute';
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    popup.style.width = `${popupWidth}px`;
    popup.style.maxWidth = 'none'; // 移除max-width限制
    
    // 确保弹窗在移动端可见
    popup.style.zIndex = '1000';
    
    container.appendChild(popup);
    
    // 弹窗保持显示，不自动消失
    // 当页面切换时会被自动清理
}

// 页面初始化函数
function initPage0() {
    // 启动页不需要特殊初始化，保持当前状态
}

function initPage1() {
    // 第一页：文字祝福 - 重新应用动画
    const cake = document.querySelector('.cake');
    const birthdayText = document.querySelector('.birthday-text');
    
    if (cake) {
        cake.style.animation = 'none';
        cake.offsetHeight; // 触发重排
        cake.style.animation = 'cakeFloat 3s ease-in-out infinite';
    }
    
    if (birthdayText) {
        birthdayText.style.animation = 'none';
        birthdayText.offsetHeight; // 触发重排
        birthdayText.style.animation = 'bounce 2s ease-in-out infinite';
    }
}

function initPage2() {
    // 第二页：图片祝福 - 重新应用动画
    const salamanderImgs = document.querySelectorAll('.salamander-img');
    const salamanderItems = document.querySelectorAll('.salamander-item');
    
    salamanderImgs.forEach(img => {
        img.style.animation = 'none';
        img.offsetHeight; // 触发重排
        img.style.animation = 'wiggle 3s ease-in-out infinite';
    });
    
    salamanderItems.forEach((item, index) => {
        item.style.animation = 'none';
        item.offsetHeight; // 触发重排
        item.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s both`;
    });
}

function initPage3() {
    // 第三页：消息弹窗 - 重新创建所有弹窗
    const page3 = document.getElementById('page3');
    const content = page3.querySelector('.content');
    
    // 清空现有弹窗
    content.innerHTML = '';
    
    // 重新创建所有弹窗
    createPopups();
}

function initPage4() {
    // 第四页：气球和礼花效果 - 重新初始化
    const balloonsContainer = document.querySelector('.balloons-container');
    if (balloonsContainer) {
        balloonsContainer.innerHTML = '';
    }
    balloons = [];
    
    const canvas = document.getElementById('fireworks-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    fireworks = [];
    
    createBalloons();
    initFireworks();
}

// 气球动画
function createBalloons() {
    const balloonsContainer = document.querySelector('.balloons-container');
    if (!balloonsContainer) return;
    
    // 气球颜色配置
    const balloonColors = [
        'linear-gradient(45deg, #E85D04, #FFBA08)',
        'linear-gradient(45deg, #ff3da4, #FB5607)',
        'linear-gradient(45deg, #f15156, #3A86FF)',
        'linear-gradient(45deg, #FFBE0B, #f15156)',
        'linear-gradient(45deg, #FF006E, #00a1de)',
        'linear-gradient(45deg, #DC2F02, #ff3da4)',
        'linear-gradient(45deg, #FFBE0B, #FB5607)',
        'linear-gradient(45deg, #E85D04, #FFBA08)',
        'linear-gradient(45deg, #f15156, #3A86FF)',
        'linear-gradient(45deg, #DC2F02, #FB5607)',
        'linear-gradient(45deg, #FFBA08, #3A86FF)',
        'linear-gradient(45deg, #8338EC, #00a1de)',
        'linear-gradient(45deg, #FF006E, #f15156)',
        'linear-gradient(45deg, #ff3da4, #DC2F02)',
        'linear-gradient(45deg, #E85D04, #FFBA08)',
        'linear-gradient(45deg, #00a1de, #FB5607)',
        'linear-gradient(45deg, #d177ff, #00a1de)',
        'linear-gradient(45deg, #DC2F02, #FB5607)',
        'linear-gradient(45deg, #d177ff, #FF006E)',
        'linear-gradient(45deg, #DC2F02, #FB5607)',
        'linear-gradient(45deg, #3A86FF, #FF006E)',
        'linear-gradient(45deg, #FF006E, #3A86FF)',
        'linear-gradient(45deg, #00a1de, #FFBE0B)',
        'linear-gradient(45deg, #ff3da4, #FFBA08)',
        'linear-gradient(45deg, #DC2F02, #d177ff)',
        'linear-gradient(45deg, #f15156, #FB5607)',
        'linear-gradient(45deg, #FF006E, #3A86FF)',
        'linear-gradient(45deg, #3A86FF, #FFBA08)',
        'linear-gradient(45deg, #8338EC, #ff3da4)',
        'linear-gradient(45deg, #f15156, #3A86FF)',
        'linear-gradient(45deg, #8338EC, #00a1de)',
        'linear-gradient(45deg, #f15156, #FFBA08)',
        'linear-gradient(45deg, #FFBE0B, #00a1de)',
        'linear-gradient(45deg, #FF006E, #ff3da4)',
        'linear-gradient(45deg, #FFBE0B, #8338EC)',
        'linear-gradient(45deg, #FFBE0B, #ff3da4)',
        'linear-gradient(45deg, #E85D04, #FFBE0B)',
        'linear-gradient(45deg, #FB5607, #FF006E)',
        'linear-gradient(45deg, #3A86FF, #f15156)',
        'linear-gradient(45deg, #FF006E, #FF006E)',
        'linear-gradient(45deg, #00a1de, #FFBA08)',
        'linear-gradient(45deg, #FB5607, #FF006E)',
        'linear-gradient(45deg, #FF006E, #d177ff)',
        'linear-gradient(45deg, #FB5607, #DC2F02)',
        'linear-gradient(45deg, #f15156, #00a1de)',
        'linear-gradient(45deg, #f15156, #DC2F02)',
        'linear-gradient(45deg, #d177ff, #DC2F02)',
        'linear-gradient(45deg, #3A86FF, #FFBE0B)',
        'linear-gradient(45deg, #d177ff, #3A86FF)',
        'linear-gradient(45deg, #3A86FF, #E85D04)'
    ];
    
    // 创建气球
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createBalloon(balloonsContainer, balloonColors, i);
        }, i * 500);
    }
}

function createBalloon(container, colors, index) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    // 随机选择颜色
    const colorIndex = index % colors.length;
    const color = colors[colorIndex];
    
    // 随机大小 (80-200px)
    const size = Math.floor(Math.random() * 120) + 80;
    
    // 随机位置 (0-95%)
    const left = Math.random() * 95;
    
    // 随机动画延迟 (0-20秒)
    const animationDelay = Math.random() * 20;
    
    // 随机漂移 (-50px 到 50px)
    const drift = (Math.random() - 0.5) * 100;
    
    // 随机旋转 (-15度 到 15度)
    const rotation = (Math.random() - 0.5) * 30;
    
    // 设置样式
    balloon.style.setProperty('--width', `${size}px`);
    balloon.style.setProperty('--balloon-color', color);
    balloon.style.setProperty('--animationDelay', animationDelay);
    balloon.style.setProperty('--drift', `${drift}px`);
    balloon.style.setProperty('--rotation', `${rotation}deg`);
    balloon.style.left = `${left}%`;
    
    // 添加气球绳
    const balloonString = document.createElement('div');
    balloonString.className = 'balloon-string';
    balloon.appendChild(balloonString);
    
    container.appendChild(balloon);
    balloons.push(balloon);
}

// 礼花效果
function initFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    
    // 设置canvas尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    fireworks = [];
    
    // 创建初始礼花
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework(ctx, canvas.width, canvas.height);
        }, i * 1000);
    }
    
    // 持续创建礼花（速度调慢）
    setInterval(() => {
        createFirework(ctx, canvas.width, canvas.height);
    }, 5000); // 从3000ms增加到5000ms
    
    // 动画循环
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw(ctx);
            
            if (fireworks[i].isDone()) {
                fireworks.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function createFirework(ctx, width, height) {
    const x = width / 2 + (Math.random() - 0.5) * width * 0.8;
    const y = height / 2 + (Math.random() - 0.5) * height * 0.8;
    
    fireworks.push(new Firework(x, y));
}

// 礼花类（更真实的效果）
class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.trail = [];
        this.exploded = false;
        this.velocity = { x: 0, y: -8 }; // 向上发射
        this.gravity = 0.1;
        this.createTrail();
    }
    
    createTrail() {
        // 创建尾迹粒子
        for (let i = 0; i < 5; i++) {
            this.trail.push({
                x: this.x,
                y: this.y,
                size: 1 + Math.random() * 2,
                life: 1,
                decay: 0.05
            });
        }
    }
    
    explode() {
        this.exploded = true;
        const color = this.getRandomColor();
        const particleCount = 150 + Math.random() * 50;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 3 + Math.random() * 4;
            const velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            };
            
            this.particles.push({
                x: this.x,
                y: this.y,
                velocity: velocity,
                color: color,
                secondaryColor: this.getRandomColor(),
                size: 1.5 + Math.random() * 2.5,
                life: 1,
                decay: 0.01 + Math.random() * 0.02,
                trail: []
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE',
            '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE',
            '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        if (!this.exploded) {
            // 上升阶段
            this.velocity.y += this.gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            
            // 更新尾迹
            this.trail.unshift({ x: this.x, y: this.y, size: 2, life: 1, decay: 0.1 });
            if (this.trail.length > 15) this.trail.pop();
            
            // 随机爆炸高度
            if (this.y < Math.random() * window.innerHeight * 0.3 + window.innerHeight * 0.2) {
                this.explode();
            }
        } else {
            // 爆炸后粒子运动
            for (let particle of this.particles) {
                particle.velocity.y += 0.05; // 重力
                particle.x += particle.velocity.x;
                particle.y += particle.velocity.y;
                particle.velocity.x *= 0.99; // 空气阻力
                particle.velocity.y *= 0.99;
                particle.life -= particle.decay;
                
                // 粒子尾迹
                particle.trail.unshift({ x: particle.x, y: particle.y, size: particle.size * 0.5, life: 1 });
                if (particle.trail.length > 3) particle.trail.pop();
            }
        }
        
        // 更新尾迹生命值
        for (let trail of this.trail) {
            trail.life -= trail.decay;
        }
    }
    
    draw(ctx) {
        ctx.save();
        
        if (!this.exploded) {
            // 绘制上升轨迹
            for (let i = 0; i < this.trail.length; i++) {
                const trail = this.trail[i];
                if (trail.life > 0) {
                    ctx.globalAlpha = trail.life * 0.3;
                    ctx.fillStyle = '#FFFFFF';
                    ctx.beginPath();
                    ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            // 绘制烟花头
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // 绘制爆炸粒子
            for (let particle of this.particles) {
                if (particle.life > 0) {
                    // 绘制粒子尾迹
                    for (let trail of particle.trail) {
                        ctx.globalAlpha = particle.life * 0.5;
                        ctx.fillStyle = particle.color;
                        ctx.beginPath();
                        ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    
                    // 绘制粒子主体
                    const gradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, particle.size
                    );
                    gradient.addColorStop(0, particle.color);
                    gradient.addColorStop(1, particle.secondaryColor);
                    
                    ctx.globalAlpha = particle.life;
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        
        ctx.restore();
    }
    
    isDone() {
        return this.exploded && this.particles.every(particle => particle.life <= 0);
    }
}

// 窗口大小变化处理
window.addEventListener('resize', function() {
    // 重新设置礼花canvas尺寸
    const canvas = document.getElementById('fireworks-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // 重新创建飘雪效果
    const snowContainer = document.getElementById('snow-container');
    snowContainer.innerHTML = '';
    snowflakes = [];
    createSnowflakes();
    
    // 重新创建气球效果（如果当前是气球页面）
    if (currentPage === 4) {
        const balloonsContainer = document.querySelector('.balloons-container');
        if (balloonsContainer) {
            balloonsContainer.innerHTML = '';
            balloons = [];
            createBalloons();
        }
    }
});

// 启动按钮和翻页按钮点击事件
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.querySelector('.start-button');
    if (startButton) {
        startButton.addEventListener('click', startBirthdayShow);
    }
    
    // 进度指示器圆点点击事件
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            if (!isStarted) {
                startBirthdayShow();
                return;
            }
            currentPage = index;
            showPage(currentPage);
        });
    });
});

// 翻页功能
function goToPrevPage() {
    if (!isStarted) {
        startBirthdayShow();
        return;
    }
    
    currentPage = (currentPage - 1 + totalPages) % totalPages;
    if (currentPage === 0) currentPage = totalPages - 1; // 跳过启动页
    showPage(currentPage);
}

function goToNextPage() {
    if (!isStarted) {
        startBirthdayShow();
        return;
    }
    
    currentPage = (currentPage + 1) % totalPages;
    if (currentPage === 0) currentPage = 1; // 跳过启动页
    showPage(currentPage);
}

// 点击切换页面（可选功能）
document.addEventListener('click', function(e) {
    // 如果是按钮点击或音乐插件元素，不执行页面切换
    if (e.target.classList.contains('start-button') || 
        e.target.classList.contains('nav-button') ||
        e.target.closest('#xf-MusicPlayer') ||
        e.target.closest('.xf-MusicPlayer')) {
        return;
    }
    
    if (!isStarted) {
        startBirthdayShow();
        return;
    }
    
    currentPage = (currentPage + 1) % totalPages;
    if (currentPage === 0) currentPage = 1; // 跳过启动页
    showPage(currentPage);
});

// 触摸滑动切换页面（移动端）
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // 水平滑动距离大于垂直滑动距离，且大于50px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
            // 向左滑动，下一页
            currentPage = (currentPage + 1) % totalPages;
        } else {
            // 向右滑动，上一页
            currentPage = (currentPage - 1 + totalPages) % totalPages;
        }
        
        showPage(currentPage);
    }
    
    touchStartX = 0;
    touchStartY = 0;
});
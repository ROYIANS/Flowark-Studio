<!DOCTYPE html>
<html lang="zh-CN">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>小梦岛 | 书架</title>
<script src="https://cdn.tailwindcss.com"></script>
<!-- 引入字体：Noto Serif SC (标题/正文), Inter (UI), Cinzel (装饰英文) -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500;700;900&family=Inter:wght@300;400;500&family=Cinzel:wght@400;700&display=swap" rel="stylesheet">

    <style>
        /* --- 全局与背景 --- */
        body {
        font-family: 'Inter', system-ui, sans-serif;
        background-color: #f9f9f7;
        color: #333;
        overflow-x: hidden;
    }

        .font-serif-title { font-family: 'Noto Serif SC', serif; }
        .font-serif-body { font-family: 'Noto Serif SC', serif; }
        .font-deco { font-family: 'Cinzel', serif; }

        /* 等高线背景 */
        .contour-bg {
        background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='pattern' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 50 Q 25 25 50 50 T 100 50' fill='none' stroke='%23e5e5e0' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3C/svg%3E");
        background:
        radial-gradient(circle at 10% 20%, rgba(0,0,0,0.02) 0%, transparent 40%),
        url("data:image/svg+xml,%3Csvg viewBox='0 0 800 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23e0e0dc' stroke-width='1.5' stroke-opacity='0.6'%3E%3Cpath d='M-50 200 Q 200 100 400 300 T 850 250' /%3E%3Cpath d='M-50 350 Q 300 450 600 300 T 850 400' /%3E%3Cpath d='M-50 50 Q 400 -50 600 100 T 850 50' /%3E%3Cpath d='M-50 500 Q 150 550 400 450 T 850 550' /%3E%3C/g%3E%3C/svg%3E");
        background-size: cover;
        background-attachment: fixed;
    }

        /* --- 书籍组件样式 --- */
        .book-container {
        perspective: 1000px;
        width: 140px;
        height: 200px;
        position: relative;
        margin: 0 auto;
        cursor: pointer;
    }
        .book {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.4s ease-out;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1), 0 2px 5px rgba(0,0,0,0.05);
        border-radius: 2px 4px 4px 2px;
    }
        .book-container:hover .book {
        transform: translateY(-8px);
        box-shadow: 0 20px 30px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.08);
    }
        .cover {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        border-radius: 2px 4px 4px 2px;
        transform-origin: left center;
        transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        z-index: 10;
        background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 5%, rgba(0,0,0,0) 95%, rgba(0,0,0,0.1) 100%);
        display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 1rem; text-align: center;
    }
        .cover::before {
        content: ''; position: absolute; left: 6px; top: 0; bottom: 0; width: 2px; background: rgba(0,0,0,0.1);
    }
        .book-container:hover .cover { transform: rotateY(-25deg); }
        .pages {
        position: absolute; top: 2px; right: 0; width: 98%; height: 98%;
        background-color: #fff; border-radius: 0 3px 3px 0; z-index: 5;
        box-shadow: inset -2px 0 5px rgba(0,0,0,0.05);
        background-image: linear-gradient(to right, #f5f5f5 0%, #fff 10%, #fff 100%);
        transform: translateZ(-2px);
    }
        .pages::after {
        content: ''; position: absolute; top: 0; right: -4px; width: 4px; height: 100%;
        background: #e0e0e0; background-image: repeating-linear-gradient(to bottom, #e0e0e0 0px, #f5f5f5 1px, #e0e0e0 2px);
        border-radius: 0 1px 1px 0;
    }
        .tooltip {
        position: absolute; bottom: 50%; left: 105%; transform: translateY(50%) translateX(-10px);
        background: #2d3748; color: white; padding: 6px 12px; border-radius: 4px;
        font-size: 12px; white-space: nowrap; opacity: 0; pointer-events: none;
        transition: all 0.2s ease; z-index: 100;
    }
        .book-container:hover .tooltip { opacity: 1; transform: translateY(50%) translateX(0); }
        @media (max-width: 640px) {
        .book-container { width: 110px; height: 160px; }
        .book-container:hover .cover { transform: none; }
        .book-container:active .cover { transform: scale(0.98); }
        .tooltip { display: none; }
    }

        /* --- 杂志排版核心样式 --- */
        #reader-view {
        scrollbar-width: thin;
        scrollbar-color: #d1d5db #f3f4f6;
    }
        .magazine-paper {
        background-color: #fff;
        box-shadow: 0 0 20px rgba(0,0,0,0.05);
        background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    }
        .mag-columns {
        column-count: 1;
        column-gap: 2.5rem;
        text-align: justify;
    }
        @media (min-width: 768px) {
        .mag-columns { column-count: 2; column-rule: 1px solid transparent; }
        .mag-columns-3 { column-count: 3; column-gap: 2rem; }
    }
        .mag-span-all { column-span: all; }
        .toc-item { display: flex; align-items: baseline; margin-bottom: 0.75rem; }
        .toc-title { flex-shrink: 0; background: #fff; padding-right: 0.5rem; }
        .toc-line { flex-grow: 1; border-bottom: 1px dotted #999; margin: 0 0.5rem; }
        .toc-page { flex-shrink: 0; background: #fff; padding-left: 0.5rem; font-variant-numeric: tabular-nums; }
        .drop-cap { float: left; font-size: 3.5rem; line-height: 0.8; font-weight: 900; margin-right: 0.5rem; margin-bottom: -0.2rem; color: #333; }
        .vertical-text { writing-mode: vertical-rl; text-orientation: mixed; }

        /* 引用块样式 */
        .quote-box { position: relative; padding-left: 1.5rem; margin: 1.5rem 0; }
        .quote-box::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: #000; transform: rotate(15deg); }
        .quote-box::after { content: ''; position: absolute; left: 6px; top: 10px; bottom: -10px; width: 1px; background: #666; transform: rotate(15deg); }

        /* 新增：双线边框容器 (用于问卷/对话风格) */
        .double-border-box {
        border: 4px double #d1d5db; /* gray-300 */
        padding: 1.5rem;
        position: relative;
    }
        /* 新增：波浪线装饰 */
        .wavy-decoration {
        background-image: url("data:image/svg+xml,%3Csvg width='40' height='10' viewBox='0 0 40 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 5 Q 10 0 20 5 T 40 5' fill='none' stroke='%239ca3af' stroke-width='1'/%3E%3C/svg%3E");
        background-repeat: repeat-x;
        height: 10px;
        width: 100%;
    }

    </style>
</head>
<body class="contour-bg min-h-screen flex flex-col">

<!-- 顶部导航栏 -->
<header class="sticky top-0 z-40 bg-[#f9f9f7]/90 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
            <span class="font-serif-title font-bold text-xl text-gray-800">小梦岛</span>
            <span class="text-gray-400 text-sm mt-1">书架</span>
        </div>
        <div class="flex items-center gap-4">
            <button class="text-gray-500 hover:text-black">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
        </div>
    </div>
</header>

<!-- 主要书架区 -->
<main class="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
    <section class="mb-16">
        <h2 class="font-serif-title text-3xl text-gray-800 mb-2">收集控</h2>
        <p class="text-gray-400 text-sm mb-10 font-light">COLLECTIONS & ANTHOLOGIES</p>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8" id="shelf-collection"></div>
    </section>
    <section class="mb-16">
        <h2 class="font-serif-title text-3xl text-gray-800 mb-2">Snippets</h2>
        <p class="text-gray-400 text-sm mb-10 font-light">CODE FRAGMENTS & NOTES</p>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8" id="shelf-snippets"></div>
    </section>
</main>

<!-- 杂志阅读器 Overlay -->
<div id="reader-view" class="fixed inset-0 z-50 bg-[#e5e5e5] hidden overflow-y-auto">
    <div class="fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur flex justify-between items-center px-4 md:px-8 border-b border-gray-200 z-[60]">
        <span class="text-xs tracking-widest text-gray-500 uppercase font-bold" id="reader-top-title">MAGAZINE VIEW</span>
        <button onclick="closeReader()" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-2xl font-serif text-gray-600">×</button>
    </div>

    <div class="min-h-screen py-20 px-4 flex justify-center">
        <div id="reader-content" class="w-full max-w-[800px] magazine-paper shadow-2xl relative">
            <!-- 动态内容 -->
        </div>
    </div>

    <div class="fixed right-4 bottom-8 hidden lg:block vertical-text font-deco text-gray-300 text-6xl opacity-20 pointer-events-none select-none tracking-widest">
        LITERARY CAMP
    </div>
</div>

<!-- 底部 -->
<footer class="py-8 text-center text-gray-400 text-sm">
    <p>&copy; 2024 小梦岛. Designed with simplicity.</p>
</footer>

<script>
    const books = [
    // 1. 散文排版 (原版)
    {
        id: 'prose',
        category: "collection",
        title: "散文收集簿",
        author: "涂静尹",
        color: "#9d174d",
        textColor: "#fff",
        contentHTML: `
                    <!-- 扉页 -->
                    <div class="p-8 md:p-16 min-h-[900px] relative">
                        <div class="flex justify-between text-[10px] text-gray-400 border-b border-gray-200 pb-2 mb-12 font-serif-body tracking-wide">
                            <span>萌芽 / 上海-台北两岸文学营专辑</span>
                            <span>二〇二五年 十一月</span>
                            <span>责任编辑 杨紫翔</span>
                        </div>
                        <div class="relative mb-20">
                            <h1 class="font-serif-title text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight relative z-10">晚间散步</h1>
                            <div class="absolute -top-6 left-12 text-6xl md:text-8xl font-deco text-gray-100 -z-0 tracking-tighter select-none">LITERARY CAMP</div>
                            <p class="text-xl md:text-2xl font-serif-body text-gray-600 mt-4">涂静尹</p>
                        </div>
                        <div class="ml-8 md:ml-16 max-w-2xl">
                             <div class="flex justify-center mb-8"><span class="font-serif-title font-bold text-xl text-gray-300">1</span></div>
                            <div class="font-serif-body text-gray-800 leading-loose text-justify text-lg space-y-6">
                                <p><span class="drop-cap">小</span>乖离世之后，许晴芳母子二人渐渐地养成了在晚饭后散步的习惯。他们的路线总是固定的：从家门出来后向右绕，去到宝龙路的公园看猫咪...</p>
                                <p>端午节已经过了许久，家家户户的信箱中却还留着枯萎的榕树枝条，垂挂的艾草与菖蒲...</p>
                            </div>
                        </div>
                        <div class="absolute bottom-8 left-0 right-0 text-center text-xs text-gray-400 font-serif-body">018</div>
                    </div>
                `
    },
    // 2. 目录排版 (原版)
    {
        id: 'toc',
        category: "collection",
        title: "乐谱收集簿",
        author: "JS Core",
        color: "#1e3a8a",
        textColor: "#fff",
        contentHTML: `
                     <div class="p-8 md:p-16 min-h-[900px] bg-white relative">
                        <div class="text-center border-b border-gray-100 pb-8 mb-12">
                             <h1 class="font-serif-title text-4xl font-bold text-gray-800 tracking-wider">现代 JavaScript 教程</h1>
                             <div class="text-gray-300 font-deco text-5xl absolute top-12 left-0 right-0 text-center opacity-20 pointer-events-none">CONTENTS</div>
                        </div>
                        <div class="max-w-2xl mx-auto font-serif-body">
                            <div class="mb-10">
                                <h3 class="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2"><span class="w-1 h-6 bg-gray-800 block"></span>JavaScript 编程语言</h3>
                                <h4 class="text-gray-500 font-bold mb-4 mt-8 ml-2">简介</h4>
                                <div class="space-y-1">
                                    <div class="toc-item"><span class="toc-title text-gray-800">JavaScript 简介</span><span class="toc-line"></span><span class="toc-page text-gray-500">001</span></div>
                                    <div class="toc-item"><span class="toc-title text-gray-800">代码编辑器</span><span class="toc-line"></span><span class="toc-page text-gray-500">002</span></div>
                                </div>
                            </div>
                        </div>
                     </div>
                `
    },
    // 3. [新增] 艺术展讯 (参考图 33a...cd5)
    {
        id: 'exhibition',
        category: "collection",
        title: "西岸展览导览",
        author: "Art West",
        color: "#0f766e", // Teal
        textColor: "#fff",
        contentHTML: `
                    <div class="p-8 md:p-12 min-h-[1000px] bg-white font-serif-body">
                         <!-- Header Info -->
                        <div class="flex justify-between text-[10px] text-gray-400 mb-8 border-b border-gray-200 pb-2">
                            <span>萌芽 / 编辑部推荐</span>
                            <span>二〇二五年 十二月</span>
                            <span>责任编辑 杨鹏翔</span>
                        </div>

                         <!-- 顶部装饰波浪 -->
                         <div class="wavy-decoration mb-8 opacity-30"></div>

                         <!-- 主要视觉区域 Grid -->
                         <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
                            <!-- 左侧信息 (3 cols) -->
                            <div class="md:col-span-3 flex flex-col items-start pt-8">
                                <div class="bg-[#5c8c87] text-white text-xs px-3 py-1 mb-6 font-bold shadow-sm">编辑部推荐 艺术</div>
                                <!-- 简笔画图标 SVG -->
                                <svg class="w-24 h-24 text-gray-800 mb-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3">
                                    <rect x="20" y="20" width="60" height="50" /> <!-- 画布 -->
                                    <path d="M50 20 L50 10" /> <!-- 顶轴 -->
                                    <path d="M20 70 L10 100" /> <!-- 左腿 -->
                                    <path d="M80 70 L90 100" /> <!-- 右腿 -->
                                    <path d="M15 75 L85 75" stroke-width="5"/> <!-- 托盘 -->
                                </svg>
                                <h2 class="text-[#2c5282] font-bold text-xl leading-tight mb-2">西岸美术馆与<br>蓬皮杜中心</h2>
                                <p class="text-[#2c5282] text-sm font-bold mb-6">五年展陈合作项目特展单元：<br>“偶然！激浪派！”</p>

                                <div class="text-[10px] text-gray-500 space-y-1 font-sans">
                                    <p>时间：2025年9月26日 - 2026年2月22日</p>
                                    <p>地点：上海 - 西岸美术馆</p>
                                    <p>策展人：弗雷德里克·保罗</p>
                                </div>
                            </div>

                            <!-- 右侧大海报 (9 cols) -->
                            <div class="md:col-span-9 relative">
                                <!-- 图片容器 -->
                                <div class="relative z-10">
                                    <img src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1200&auto=format&fit=crop" class="w-full h-[500px] object-cover filter grayscale hover:grayscale-0 transition duration-700 shadow-xl" alt="Exhibition">
                                    <!-- 图片上的叠加文字 -->
                                    <div class="absolute bottom-8 left-8 text-white mix-blend-difference">
                                        <h3 class="text-6xl font-bold italic font-sans tracking-tighter">Fluxus,</h3>
                                        <h3 class="text-6xl font-bold italic font-sans tracking-tighter">by Chance</h3>
                                    </div>
                                </div>
                                <!-- 侧边装饰文字 (模拟海报右侧信息) -->
                                <div class="absolute top-4 right-4 text-white text-right z-20 drop-shadow-md">
                                    <div class="text-3xl font-bold font-sans">2025.09.26</div>
                                    <div class="text-3xl font-bold font-sans">-</div>
                                    <div class="text-3xl font-bold font-sans">2026.02.22</div>
                                    <div class="vertical-text text-5xl font-serif mt-8 h-64 tracking-widest text-red-500 font-bold bg-white/10 backdrop-blur px-2">激浪派！</div>
                                </div>
                            </div>
                         </div>

                         <div class="wavy-decoration mb-8 opacity-30"></div>

                         <!-- 底部正文 -->
                         <div class="mag-columns text-sm leading-relaxed text-gray-700 text-justify">
                            <p class="mb-4">暑期，我去香港参与了一个交流项目，日程表里，几乎所有集体活动都用来春展和参观文学径。抵达当日，香港用打破雨量记录的黑色暴雨迎接我们。飞机在高空经历了十几分钟的气流颠簸，舷窗之外，是灰暗的厚重云层...</p>
                            <p class="mb-4">的雨此时就在眼前，机身摇晃，急速下坠，我和同行者紧握双手，不知道等待我们的会是什么。最后的结果是我们安全降落了，而后的几天里，每日都是大好晴天。回想起来这一天有点后怕，但是在害怕之外，感受到一种恐惧到极点时突如其来的安心...</p>
                            <p class="mb-4">这种感觉在观看香港艺术馆“感知之维——万物与自我的多重探索”展览时经常复现。艺术不仅仅是美的展示，更是对混乱世界的一种重组与回应。</p>
                         </div>
                         <div class="absolute bottom-8 left-0 right-0 text-center text-xs text-gray-400">094</div>
                    </div>
                `
    },
    // 4. [新增] 问卷专栏 (参考图 92a...566 & 5b9...acb)
    {
        id: 'qa',
        category: "collection",
        title: "两岸文学问卷",
        author: "Literary Camp",
        color: "#be185d", // Pink-700
        textColor: "#fff",
        contentHTML: `
                     <div class="p-8 md:p-12 min-h-[1000px] bg-[#fdfbf7] relative">
                        <!-- 大标题 -->
                        <div class="text-center mb-12">
                            <h1 class="text-6xl font-sans font-black text-gray-300 tracking-tighter uppercase mb-4">LITERARY CAMP</h1>
                            <h2 class="text-2xl font-serif-title font-bold text-gray-800">2025 上海 - 台北</h2>
                            <h2 class="text-2xl font-serif-title font-bold text-gray-800 mb-6">两岸文学营问卷</h2>
                            <div class="inline-block border border-gray-400 rounded-full px-4 py-1 text-xl font-serif italic text-gray-500">Q & A</div>
                        </div>

                        <!-- 问卷内容区 1 -->
                        <div class="double-border-box mb-8 bg-white shadow-sm">
                            <div class="flex gap-6">
                                <div class="hidden md:block text-6xl font-serif font-bold text-gray-200 leading-none">1</div>
                                <div class="flex-1">
                                    <div class="bg-gray-100 p-4 mb-4 rounded-sm">
                                        <p class="font-bold text-gray-700 text-sm">Q: 回忆写作之初，哪位作家的语言为你提供了范本？其中的节奏、用词、叙事逻辑，哪个方面塑造了你对文字最初的感知？</p>
                                    </div>
                                    <div class="space-y-4 text-sm leading-relaxed text-gray-700 font-serif-body">
                                        <p><span class="font-bold text-black">麦年：</span>初中时很喜欢简媜，觉得她的遣词造句好特别，有种清丽古典的韵味。尤其是她的比喻，以及各种联想，让我开始对陈词滥调变得敏感。我开始故意避开常用的比喻，比如笑眼一定不能“像月牙”，幸福也不是“像花儿一样”。</p>
                                        <p><span class="font-bold text-black">邱怡青：</span>日本作家小川洋子的作品一直是我写作的模板，尤其是她贯穿所有作品的核心理念：“替无法说话的人发声。”她擅长将故事的意图布线在她温柔细致的叙事中，但仍然能带领读者去往她想抵达之处。</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 问卷内容区 2 (带水墨插图) -->
                        <div class="double-border-box bg-white shadow-sm relative overflow-hidden">
                             <!-- 背景插图装饰 -->
                             <img src="https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=600&auto=format&fit=crop" class="absolute -bottom-10 -right-10 w-64 h-64 object-cover opacity-20 grayscale rounded-full pointer-events-none" alt="Ink">

                             <div class="flex gap-6 relative z-10">
                                <div class="hidden md:block text-6xl font-serif font-bold text-gray-200 leading-none">9</div>
                                <div class="flex-1">
                                    <div class="bg-gray-100 p-4 mb-4 rounded-sm">
                                        <p class="font-bold text-gray-700 text-sm">Q: 若泽·萨拉马戈的《失明症漫记》将“失明”设定为一种肆虐的传染病，借此揭示文明秩序的脆弱。假如现代社会迫使人类集体退化，你会选择放弃哪种感官？</p>
                                    </div>
                                    <div class="space-y-4 text-sm leading-relaxed text-gray-700 font-serif-body">
                                        <p><span class="font-bold text-black">孙立：</span>嗅觉。在能接收到我们不想接收的信息的感官中，嗅觉是唯一不给予你思考时间的那个，你别无选择，无法辩解。</p>
                                        <p><span class="font-bold text-black">方东妮：</span>味觉。因为我是一个对吃饭没有太多兴趣的人。相较之下，我最舍不得丢掉的反而是触觉。简单设想一下，若失去触觉，那么抱小猫时就毫无感觉，扎入泳池时无法体验水的流动...</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="absolute bottom-8 left-0 right-0 text-center text-xs text-gray-400">049</div>
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 vertical-text text-[10px] text-gray-300 tracking-widest font-deco">LITERARY CAMP</div>
                     </div>
                `
    },
    // 5. [新增] 影视观察 (参考图 d70...622)
    {
        id: 'review',
        category: "snippets",
        title: "影视观察手记",
        author: "指间沙",
        color: "#b45309", // Amber-700
        textColor: "#fff",
        contentHTML: `
                     <div class="p-8 md:p-16 min-h-[900px] bg-white relative font-serif-body">
                         <div class="flex justify-between text-[10px] text-gray-400 border-b border-gray-200 pb-2 mb-12">
                            <span>萌芽 / 美人尖</span>
                            <span>二〇二五年 十二月</span>
                            <span>责任编辑 陈惊雷</span>
                        </div>

                        <div class="mb-12">
                            <h1 class="text-5xl font-bold text-gray-900 mb-4 tracking-tight">男演员之鄙视链</h1>
                            <p class="text-xl text-gray-500">指间沙</p>
                        </div>

                        <!-- 3栏纯文字排版 -->
                        <div class="mag-columns-3 text-[13px] leading-7 text-gray-800 text-justify">
                            <p class="mb-4">奥斯卡颁奖典礼上，瑞恩·高斯林携手六十五名男舞伴表演《I'm Just Ken》，粉艳艳地闪瞎人眼，当可载入影史。</p>
                            <p class="mb-4">这网充满了自怜的歌曲是“挂件男”的心路自白：“很平庸，无论我怎么做，永远都只能屈居第二。没有人知道我多么努力，我的心情恐怕无从解释……这是否是我的命运，从生到死，一生都只是金发嫩男。我只是肯。”“女凝”下的这个金发肌肉男作为芭比的附属被创造出来，是“花瓶的花瓶”。</p>

                            <!-- 插入的小标题 -->
                            <div class="text-center my-8 break-inside-avoid">
                                <h3 class="font-bold text-base mb-1">“软男”鄙视链</h3>
                                <p class="text-xs text-gray-400 font-sans">窝囊废 > 渣男 > 暖男 > 霸总</p>
                            </div>

                            <p class="mb-4">像肯这种依附于女主存在的男性角色，有人称之为“赘婿”。我觉得他们就像女主挂包上挂着的拉布布、蒙奇奇、玲娜贝儿，风格各异，但均可统称为“挂件男”。</p>
                            <p class="mb-4">谁都知道，霸总退场。杰克苏们群魔乱舞的盛世已经过去。尽管还是有人爱看霸总强制爱，就像秦海璐所言，“有时候会来点羞耻的片段”，但霸总已经处于男性角色鄙视链底端。一窝蜂流行起来的大女主剧里，挂件男如今已是乱花渐欲迷人眼。</p>
                            <p class="mb-4">男演员不仅不要演霸总，而且还要给女主伏低做小。谁具有全方位的服务意识，谁就能博得女性观众的喜爱。</p>
                            <p class="mb-4">日剧《请和我的老公结婚》让全心全意守护女主的佐藤健火了。本是凭借作品《浪客剑心》走红，但佐藤健近年一直以“荷尔蒙旺盛的忠犬”之姿，认认真真服务好每一位纯爱剧女主，始终秉持“为了女主的幸福而活”的觉悟。</p>
                            <p class="mb-4">而在内地男演员中，从不和女主争番位的刘宇宁也是难得地具有服务意识。在《一念关山》《折腰》《书卷一梦》中都甘当二番，挑选剧本的眼光好过绝大多数古偶小生。</p>
                        </div>

                        <div class="absolute bottom-8 left-0 right-0 text-center text-xs text-gray-400">086</div>
                     </div>
                `
    },
    // 其他占位书籍
    { category: "snippets", title: "开发踩坑记录", author: "ROYIANS", color: "#78350f", textColor: "#fff" },
    { category: "snippets", title: "前端艺术", author: "CSS", color: "#059669", textColor: "#fff" },
    { category: "snippets", title: "Vue3源码", author: "Study", color: "#10b981", textColor: "#fff" }
    ];

    function renderBooks() {
    const shelfCollection = document.getElementById('shelf-collection');
    const shelfSnippets = document.getElementById('shelf-snippets');
    // 清空现有内容，防止重复
    shelfCollection.innerHTML = '';
    shelfSnippets.innerHTML = '';

    books.forEach(book => {
    const bookEl = createBookElement(book);
    if (book.category === 'collection') {
    shelfCollection.appendChild(bookEl);
} else {
    shelfSnippets.appendChild(bookEl);
}
});
}

    function createBookElement(book) {
    const container = document.createElement('div');
    container.className = 'book-container group';

    const tooltipText = `点击阅读：${book.title}`;

    container.innerHTML = `
                <div class="book">
                    <div class="pages"></div>
                    <div class="cover shadow-md" style="background-color: ${book.color}; color: ${book.textColor};">
                        <div class="absolute top-4 left-4 text-[10px] opacity-70 tracking-widest uppercase truncate w-24">${book.author}</div>
                        <h3 class="font-serif-title text-lg leading-snug font-bold break-words px-2 select-none">${book.title}</h3>
                    </div>
                </div>
                <div class="tooltip hidden md:block">
                    ${tooltipText}
                    <div class="absolute top-1/2 -left-1 w-2 h-2 bg-[#2d3748] transform -translate-y-1/2 rotate-45"></div>
                </div>
            `;
    container.onclick = () => openReader(book);
    return container;
}

    function openReader(book) {
    const reader = document.getElementById('reader-view');
    const contentDiv = document.getElementById('reader-content');
    const topTitle = document.getElementById('reader-top-title');
    topTitle.innerText = book.title.toUpperCase();

    if (book.contentHTML) {
    contentDiv.innerHTML = book.contentHTML;
} else {
    contentDiv.innerHTML = `
                    <div class="p-16 min-h-[800px] flex flex-col justify-center items-center text-center">
                        <h1 class="font-serif-title text-4xl mb-4">${book.title}</h1>
                        <p class="text-gray-500 font-serif-body">内容整理中...</p>
                        <div class="mt-12 w-16 h-1 bg-gray-300"></div>
                    </div>
                `;
}
    reader.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

    function closeReader() {
    const reader = document.getElementById('reader-view');
    reader.classList.add('hidden');
    document.body.style.overflow = '';
}

    document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeReader();
});

    renderBooks();
</script>
</body>
</html>
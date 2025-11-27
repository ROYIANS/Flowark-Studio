import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Moon, Sun, Coffee, BookOpen, Aperture, PenTool, Heart, Zap, Eye, Feather, Compass, Anchor, Wind, Layers, Box, Circle, Triangle } from 'lucide-react'

const questions = [
  {
    id: 1,
    category: "Domain",
    question: "当世界喧嚣褪去，你的意识倾向于流向何处？",
    options: [
      { id: 'life', text: "琐碎日常中闪烁的微光。", icon: <Coffee size={32} />, label: "生活 · 观察" },
      { id: 'knowledge', text: "万物运转背后的精密齿轮。", icon: <BookOpen size={32} />, label: "知识 · 解构" },
      { id: 'visual', text: "未被定义的色彩与线条。", icon: <Aperture size={32} />, label: "视觉 · 审美" },
    ]
  },
  {
    id: 2,
    category: "Style",
    question: "如果你的文字有触感，它会是？",
    options: [
      { id: 'warm', text: "粗糙而温暖的手织羊毛。", icon: <Heart size={32} />, label: "治愈 · 陪伴" },
      { id: 'sharp', text: "冰冷、锋利且精准的手术刀。", icon: <PenTool size={32} />, label: "理性 · 犀利" },
      { id: 'spark', text: "舌尖跳跃的苏打气泡。", icon: <Zap size={32} />, label: "幽默 · 脑洞" },
    ]
  },
  {
    id: 3,
    category: "Motivation",
    question: "为何向虚空投递信号？",
    options: [
      { id: 'record', text: "为了在这个宇宙留下我存在的坐标。", icon: <Moon size={32} />, label: "存档 · 永恒" },
      { id: 'connect', text: "为了等待遥远星系的另一声回响。", icon: <Sun size={32} />, label: "共鸣 · 连接" },
    ]
  },
  {
    id: 4,
    category: "Perspective",
    question: "你更习惯如何观察这个世界？",
    options: [
      { id: 'micro', text: "显微镜：凝视一粒沙中的宇宙。", icon: <Eye size={32} />, label: "微观 · 细节" },
      { id: 'macro', text: "望远镜：俯瞰时代洪流的走向。", icon: <Compass size={32} />, label: "宏观 · 趋势" },
    ]
  },
  {
    id: 5,
    category: "Structure",
    question: "你偏爱的叙事结构是？",
    options: [
      { id: 'linear', text: "一条笔直的河流，奔涌向前。", icon: <ArrowRight size={32} />, label: "线性 · 逻辑" },
      { id: 'network', text: "一张错综复杂的蛛网，处处相连。", icon: <Layers size={32} />, label: "网状 · 关联" },
      { id: 'fragment', text: "散落一地的拼图，由读者拼凑。", icon: <Feather size={32} />, label: "碎片 · 留白" },
    ]
  },
  {
    id: 6,
    category: "Energy",
    question: "创作时的能量状态更接近？",
    options: [
      { id: 'calm', text: "深海般的静谧与专注。", icon: <Anchor size={32} />, label: "沉静 · 深度" },
      { id: 'storm', text: "风暴般的激情与宣泄。", icon: <Wind size={32} />, label: "爆发 · 情绪" },
    ]
  },
  {
    id: 7,
    category: "Audience",
    question: "你希望读者读完后带走什么？",
    options: [
      { id: 'answer', text: "一个确定的答案或方法。", icon: <Box size={32} />, label: "实用 · 价值" },
      { id: 'question', text: "一个值得深思的问题。", icon: <Circle size={32} />, label: "启发 · 思考" },
      { id: 'feeling', text: "一种难以言说的情绪。", icon: <Triangle size={32} />, label: "体验 · 感知" },
    ]
  },
  {
    id: 8,
    category: "Input",
    question: "你的灵感通常来源于？",
    options: [
      { id: 'book', text: "书本、理论与前人的智慧。", icon: <BookOpen size={32} />, label: "阅读 · 积淀" },
      { id: 'street', text: "街头、对话与鲜活的现实。", icon: <Coffee size={32} />, label: "行走 · 体验" },
    ]
  },
  {
    id: 9,
    category: "Output",
    question: "你更倾向于哪种表达形式？",
    options: [
      { id: 'text', text: "文字的精准与留白。", icon: <PenTool size={32} />, label: "纯文 · 深度" },
      { id: 'image', text: "图像的直观与冲击。", icon: <Aperture size={32} />, label: "图文 · 视觉" },
    ]
  },
  {
    id: 10,
    category: "Final",
    question: "最后，你认为创作的本质是？",
    options: [
      { id: 'self', text: "自我与本我的对话。", icon: <Moon size={32} />, label: "内省" },
      { id: 'world', text: "自我与世界的博弈。", icon: <Sun size={32} />, label: "外探" },
    ]
  }
]

const TestPage = () => {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isExiting, setIsExiting] = useState(false)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleOptionClick = (optionId) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.category]: optionId }))
    
    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 400)
    } else {
      setIsExiting(true)
      // 这里可以添加简单的逻辑来决定跳转结果，暂时全部跳转到默认
      setTimeout(() => navigate('/result'), 800)
    }
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col relative overflow-hidden font-sans text-text-primary selection:bg-terracotta selection:text-white">
      
      {/* Abstract Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className={`absolute top-0 right-0 w-[50vw] h-[50vw] bg-terracotta/5 rounded-full blur-[120px] transition-all duration-1000 ${currentIndex % 2 === 0 ? 'translate-x-20' : '-translate-x-20'}`}></div>
         <div className={`absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-terracotta/5 rounded-full blur-[100px] transition-all duration-1000 ${currentIndex % 2 !== 0 ? 'scale-110' : 'scale-100'}`}></div>
      </div>

      {/* Progress Line */}
      <div className="fixed top-0 left-0 w-full h-1 bg-divider z-50">
        <motion.div 
          className="h-full bg-terracotta"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Navigation / Header */}
      <header className="relative z-20 px-8 py-8 flex justify-between items-center">
        <div className="text-xs font-bold uppercase tracking-widest opacity-50 text-text-secondary">
          探索进度 {currentIndex + 1} <span className="mx-2">/</span> {questions.length}
        </div>
        <button onClick={() => navigate('/')} className="text-xs font-bold uppercase tracking-widest hover:text-terracotta transition-colors text-text-secondary">
          离开展厅
        </button>
      </header>

      {/* Main Interaction Area */}
      <main className="flex-1 flex flex-col justify-center px-6 md:px-20 relative z-10 max-w-7xl mx-auto w-full">
        <AnimatePresence mode='wait'>
          {!isExiting && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <div className="mb-16 md:mb-24 max-w-4xl">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight mb-8 text-text-primary">
                  {currentQuestion.question}
                </h2>
                <div className="w-12 h-[2px] bg-terracotta/20"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {currentQuestion.options.map((option, idx) => (
                  <OptionCard 
                    key={option.id}
                    option={option}
                    index={idx}
                    onClick={() => handleOptionClick(option.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="relative z-20 px-8 py-8 text-center md:text-left">
        <p className="font-mono text-xs text-text-muted">FLOWARK © ARCHETYPE DISCOVERY PROTOCOL v2.0</p>
      </footer>

    </div>
  )
}

const OptionCard = ({ option, index, onClick }) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
    onClick={onClick}
    className="group text-left w-full"
  >
    <div className="aspect-[4/3] md:aspect-square bg-white/80 backdrop-blur-sm border border-divider p-8 flex flex-col justify-between hover:border-terracotta hover:shadow-float transition-all duration-500 relative overflow-hidden group-hover:-translate-y-1">
      {/* Abstract hover bg */}
      <div className="absolute inset-0 bg-canvas translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
      
      <div className="relative z-10 text-text-muted group-hover:text-terracotta transition-colors duration-300">
        {option.icon}
      </div>
      
      <div className="relative z-10">
        <div className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-2 group-hover:text-terracotta transition-colors">{option.label}</div>
        <p className="text-lg md:text-xl font-serif text-text-primary group-hover:text-text-primary transition-all duration-300 leading-relaxed">
          {option.text}
        </p>
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-terracotta">
        <ArrowRight size={20} />
      </div>
    </div>
  </motion.button>
)

export default TestPage
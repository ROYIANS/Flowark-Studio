import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Sparkles, 
  Image as ImageIcon, 
  MoreHorizontal,
  Maximize2,
  Minimize2,
  Send,
  UserCheck,
  Lightbulb
} from 'lucide-react'

const CreatePage = () => {
  const navigate = useNavigate()
  const [isGenerating, setIsGenerating] = useState(false)
  const [content, setContent] = useState({ title: '', body: '' })
  const [showSuccess, setShowSuccess] = useState(false)
  const [focusMode, setFocusMode] = useState(false)
  const [activeAiPanel, setActiveAiPanel] = useState(null) // 'persona' | 'inspiration'

  const handleAiAssist = (type) => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      if (type === 'persona') {
        // 模拟人设校验
        alert("AI: 这段话的语气有点过于冷淡，建议加入一些个人感受，符合'生活美学博主'的人设。")
      } else {
        // 模拟灵感提示
        setContent(prev => ({ 
          ...prev, 
          body: prev.body + "\n\n或许，我们可以从'光影的变化'这个角度来描述..." 
        }))
      }
      setActiveAiPanel(null)
    }, 1500)
  }

  const handlePublish = () => {
    setShowSuccess(true)
    setTimeout(() => navigate('/dashboard'), 2000)
  }

  return (
    <div className="min-h-screen bg-canvas text-text-primary font-sans flex flex-col selection:bg-terracotta/20 selection:text-text-primary">
      
      {/* 极简顶部栏 */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-50 transition-all duration-500 border-b border-divider ${focusMode ? '-translate-y-full' : 'bg-canvas/90 backdrop-blur-sm'}`}
      >
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-sm hover:bg-terracotta-light/50 transition-colors text-text-secondary hover:text-text-primary">
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <span className="text-xs font-mono uppercase tracking-widest text-text-muted">Draft / Untitled</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex text-xs font-mono text-text-muted gap-4">
             <span>{content.body.length} 字</span>
             <span>阅读: 1 min</span>
          </div>
          <button 
            onClick={() => setFocusMode(!focusMode)}
            className="w-10 h-10 flex items-center justify-center rounded-sm hover:bg-terracotta-light/50 transition-colors text-text-secondary hover:text-text-primary"
            title={focusMode ? "退出沉浸" : "沉浸模式"}
          >
            {focusMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button onClick={handlePublish} className="btn-primary text-xs px-6 py-2 shadow-none">
            发布
          </button>
        </div>
      </motion.header>

      {/* 主编辑区 */}
      <main className="flex-1 flex flex-col items-center pt-32 pb-20 px-6 relative">
        <div className="w-full max-w-2xl relative">
          
          {/* 标题输入 */}
          <input
            type="text"
            placeholder="无题"
            className="w-full text-4xl md:text-5xl font-serif font-bold placeholder:text-divider border-none outline-none bg-transparent mb-8 text-text-primary"
            value={content.title}
            onChange={(e) => setContent({...content, title: e.target.value})}
          />

          {/* 正文输入 */}
          <textarea
            placeholder="在此处，让思绪流淌..."
            className="w-full min-h-[60vh] resize-none text-lg md:text-xl leading-relaxed text-text-secondary placeholder:text-divider border-none outline-none bg-transparent font-serif"
            value={content.body}
            onChange={(e) => setContent({...content, body: e.target.value})}
          />

          {/* AI 辅助侧边栏 (悬浮) */}
          <motion.div 
            className={`absolute -right-20 md:-right-40 top-0 w-12 md:w-auto transition-opacity duration-500 ${focusMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
             <div className="sticky top-32 flex flex-col gap-4">
                
                {/* 人设校验按钮 */}
                <div className="relative group">
                  <button 
                    onClick={() => handleAiAssist('persona')}
                    className="w-10 h-10 bg-white border border-divider shadow-sm hover:shadow-md rounded-full flex items-center justify-center text-text-secondary hover:text-terracotta transition-all"
                    title="人设校验"
                  >
                    <UserCheck size={18} strokeWidth={1.5} />
                  </button>
                  <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 text-xs font-mono text-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">人设校验</span>
                </div>

                {/* 灵感提示按钮 */}
                <div className="relative group">
                  <button 
                    onClick={() => handleAiAssist('inspiration')}
                    className="w-10 h-10 bg-white border border-divider shadow-sm hover:shadow-md rounded-full flex items-center justify-center text-text-secondary hover:text-terracotta transition-all"
                    title="灵感提示"
                  >
                    <Lightbulb size={18} strokeWidth={1.5} />
                  </button>
                  <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 text-xs font-mono text-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">灵感提示</span>
                </div>

                <div className="w-10 h-[1px] bg-divider my-2"></div>

                <button className="w-10 h-10 bg-white border border-divider shadow-sm hover:shadow-md rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary transition-all">
                  <ImageIcon size={18} strokeWidth={1.5} />
                </button>
             </div>
          </motion.div>

        </div>
      </main>

      {/* 发布成功反馈 */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-canvas/90 backdrop-blur-md flex items-center justify-center"
          >
             <div className="text-center">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                  className="mb-6 text-text-primary"
                >
                  <div className="w-20 h-20 border border-terracotta/30 bg-terracotta/5 rounded-full flex items-center justify-center mx-auto mb-8 text-terracotta">
                    <Sparkles size={32} strokeWidth={1} />
                  </div>
                  <h2 className="text-4xl font-serif font-bold mb-4">已发布</h2>
                  <p className="text-xs font-mono uppercase tracking-widest text-text-secondary">
                    你的声音，已汇入星河。
                  </p>
                </motion.div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default CreatePage
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, ArrowUpRight, Bookmark, Heart } from 'lucide-react'

const InspirationPage = () => {
  const navigate = useNavigate()

  const inspirations = [
    {
      id: 1,
      category: "生活哲学",
      title: "为什么我们越来越不敢'断舍离'？",
      desc: "探讨物质囤积背后的安全感缺失，以及如何重建内心的秩序。",
      tags: ["#深度思考", "#极简主义"],
      likes: 1240,
      image: "bg-terracotta/10"
    },
    {
      id: 2,
      category: "视觉美学",
      title: "2025年家居色彩趋势报告：回归大地",
      desc: "从陶土色到苔藓绿，自然色系如何重塑我们的居住空间。",
      tags: ["#趋势分析", "#色彩心理学"],
      likes: 856,
      image: "bg-success/10"
    },
    {
      id: 3,
      category: "职场洞察",
      title: "'松弛感'工作：一种新的效率悖论",
      desc: "在内卷与躺平之间，寻找第三种工作状态。",
      tags: ["#职场进化", "#心理健康"],
      likes: 2103,
      image: "bg-warning/10"
    }
  ]

  return (
    <div className="min-h-screen bg-canvas font-sans text-text-primary selection:bg-terracotta/20 selection:text-text-primary pb-20">
      
      {/* Navigation */}
      <nav className="sticky top-0 bg-canvas/90 backdrop-blur-sm z-50 border-b border-divider">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')} className="group flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/>
            Back to Studio
          </button>
          <div className="text-xs font-mono text-text-muted">Inspiration Curator</div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12 md:pt-20">
        
        <header className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/5 text-terracotta text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            Weekly Curated
          </div>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            浮光灵感
          </h1>
          <p className="text-lg text-text-secondary font-serif">
            "灵感不是凭空而来的闪电，而是对生活细致观察后的回响。"
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inspirations.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white border border-divider hover:border-terracotta/30 hover:shadow-float transition-all duration-500 flex flex-col h-full"
            >
              <div className={`aspect-[4/3] ${item.image} relative overflow-hidden`}>
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/90 backdrop-blur-sm">
                    <button onClick={() => navigate('/create')} className="btn-primary text-xs px-6 py-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      使用此灵感创作
                    </button>
                 </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-terracotta">{item.category}</span>
                  <div className="flex gap-3 text-text-muted">
                    <Heart size={16} className="hover:text-terracotta cursor-pointer transition-colors" />
                    <Bookmark size={16} className="hover:text-terracotta cursor-pointer transition-colors" />
                  </div>
                </div>
                
                <h3 className="text-xl font-serif font-medium mb-3 leading-snug group-hover:text-terracotta transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                  {item.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-divider">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </main>
    </div>
  )
}

export default InspirationPage
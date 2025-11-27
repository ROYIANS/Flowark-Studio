import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Feather, Layers, Sparkles } from 'lucide-react'

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen relative overflow-hidden font-sans selection:bg-terracotta/20 selection:text-text-primary">
      
      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 bg-canvas/80 backdrop-blur-sm border-b border-divider">
        <div className="text-lg font-serif font-bold tracking-tight flex items-center gap-2">
          <span className="w-3 h-3 bg-terracotta rounded-full inline-block"></span>
          Flowark Studio.
        </div>
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/gallery" className="hidden md:block text-xs font-mono uppercase tracking-widest hover:text-terracotta transition-colors">Visit Gallery</Link>
          <a href="#vision" className="hidden md:block text-xs font-mono uppercase tracking-widest hover:text-terracotta transition-colors">Vision</a>
          <Link to="/login" className="text-xs font-mono uppercase tracking-widest hover:text-terracotta transition-colors flex items-center gap-1">
            Enter Studio <ArrowUpRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero 区域：杂志封面 */}
      <header className="min-h-screen flex flex-col justify-center px-6 md:px-12 relative pt-32 pb-20">
        <div className="max-w-[90rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <p className="text-terracotta font-mono text-xs md:text-sm mb-8 tracking-widest uppercase">
              — The Exhibition of Digital Self
            </p>
            {/* 优化后的标题排版：两行展示，去除斜体 */}
            <h1 className="text-display mb-12 leading-tight">
              策展你的 <br className="hidden md:block" />
              <span className="font-serif font-light text-text-secondary">数字灵魂。</span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start max-w-2xl">
              <div className="w-12 h-[1px] bg-text-primary mt-3 hidden md:block"></div>
              <div>
                {/* 去除正文斜体 */}
                <p className="text-lg md:text-xl leading-relaxed text-text-secondary font-serif mb-10">
                  "创作即布展。Flowark 是你的私人美术馆，让每一次表达都成为值得收藏的展品。"
                </p>
                <div className="flex gap-4">
                  <Link to="/test" className="btn-primary group inline-flex items-center">
                    开始布展
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Link>
                  <Link to="/gallery" className="btn-ghost border border-divider hover:border-terracotta transition-colors group inline-flex items-center">
                    参观展览
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 视觉符号：抽象的“品味” */}
          <motion.div style={{ y }} className="lg:col-span-4 hidden lg:flex justify-end relative">
             <div className="w-80 aspect-[3/4] bg-white border border-divider p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-float transition-all duration-700">
                <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <div className="text-6xl font-serif text-terracotta">F.</div>
                <div className="font-mono text-xs text-right leading-tight text-text-secondary">
                  ISSUE 01<br/>
                  CURATION<br/>
                  <span className="opacity-50">EST. 2025</span>
                </div>
             </div>
          </motion.div>
        </div>
      </header>

      {/* 愿景区域：策展前言 */}
      <section id="vision" className="py-32 px-6 md:px-12 bg-white border-t border-divider relative z-10">
        <div className="max-w-[90rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start mb-32">
            <div className="sticky top-32">
              {/* 去除标题斜体 */}
              <h2 className="text-4xl md:text-6xl font-serif mb-12 leading-tight">
                人机共生 <br/>
                <span className="text-terracotta">策展流。</span>
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed max-w-md mb-8 text-justify">
                在这个信息过载的时代，唯有经过审视与筛选的内容，才能穿越噪音，抵达人心。
              </p>
            </div>
            
            {/* 艺术化流程展示 */}
            <div className="space-y-24 pt-12 md:pt-0 relative">
               {/* 连接线 */}
               <div className="absolute left-[19px] top-8 bottom-8 w-[1px] bg-divider hidden md:block"></div>

               <FlowStep 
                 number="01"
                 title="品味建模"
                 desc="AI 作为你的策展助理，通过深度对话建立多维度的创作人格档案。"
                 icon={<Layers size={24} />}
               />
               <FlowStep 
                 number="02"
                 title="灵感甄选"
                 desc="拒绝平庸的热点。我们为你甄选具有恒久价值的灵感碎片，等待被重新编织。"
                 icon={<Sparkles size={24} />}
               />
               <FlowStep 
                 number="03"
                 title="价值沉淀"
                 desc="在极简的布展工作室中，打磨每一件作品，使其成为数字资产而非快消品。"
                 icon={<Feather size={24} />}
               />
            </div>
          </div>
        </div>
      </section>

      {/* Footer: 极简版权 */}
      <footer className="py-20 px-6 md:px-12 bg-canvas border-t border-divider">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-end">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-2">Flowark Studio.</h3>
            <p className="font-mono text-xs text-text-secondary uppercase tracking-widest">
              用品味放大创作，用 AI 成就更好的自己。
            </p>
          </div>
          <div className="mt-8 md:mt-0 text-xs text-text-secondary font-mono">
            © 2025 Flowark Team.
          </div>
        </div>
      </footer>
    </div>
  )
}

const FlowStep = ({ number, title, desc, icon }) => (
  <div className="relative pl-16 group">
    <div className="absolute left-0 top-0 w-10 h-10 bg-canvas border border-divider rounded-full flex items-center justify-center text-xs font-mono text-text-secondary group-hover:border-terracotta group-hover:text-terracotta transition-colors z-10">
      {number}
    </div>
    <div className="mb-4 text-text-secondary group-hover:text-terracotta transition-colors duration-500">
      {icon}
    </div>
    <h3 className="text-3xl font-serif mb-4 group-hover:text-terracotta transition-colors duration-500">{title}</h3>
    <p className="text-text-secondary leading-relaxed text-lg max-w-md">{desc}</p>
  </div>
)

export default LandingPage
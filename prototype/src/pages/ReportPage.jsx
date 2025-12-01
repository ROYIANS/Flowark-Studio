import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Activity, GitCommit, TrendingUp, Share2, Download } from 'lucide-react'

const ReportPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-canvas font-sans text-text-primary selection:bg-terracotta/20 selection:text-text-primary pb-20">
      
      {/* Navigation */}
      <nav className="sticky top-0 bg-canvas/90 backdrop-blur-sm z-50 border-b border-divider">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => navigate('/analytics')} className="group flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/>
            Back to Gallery
          </button>
          <div className="text-xs font-mono text-text-muted">Taste Decision Report #042</div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-12 md:pt-20">
        
        <header className="mb-16 border-b border-divider pb-12">
          <div className="flex items-center gap-3 mb-6">
             <span className="px-3 py-1 bg-success/10 text-success text-xs font-bold uppercase tracking-widest rounded-full">
               High Resonance
             </span>
             <span className="text-xs font-mono text-text-muted">Oct 24, 2024</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
            关于"咖啡馆声学研究"的<br/>
            <span className="text-terracotta">品味决策复盘</span>
          </h1>
          <p className="text-lg text-text-secondary font-serif max-w-2xl">
            "这篇内容成功地将个人的感官体验转化为了一种普遍的情绪共鸣。你的'观察者'人设在这里发挥了关键作用。"
          </p>
        </header>

        <div className="space-y-20">
          
          {/* Layer 1: Data Mirror */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-8 flex items-center gap-2">
              <Activity size={16} /> Layer 01: 数据镜像
            </h3>
            <div className="grid grid-cols-3 gap-8">
               <StatBox label="完读率" value="68%" sub="高于平均 12%" />
               <StatBox label="平均停留" value="2m 14s" sub="深度阅读" />
               <StatBox label="收藏率" value="8.5%" sub="高价值" />
            </div>
          </section>

          {/* Layer 2: Decision Trace */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-8 flex items-center gap-2">
              <GitCommit size={16} /> Layer 02: 决策回溯
            </h3>
            
            <div className="relative border-l-2 border-divider pl-8 space-y-12">
               <DecisionItem 
                 step="创作意图"
                 content="我想捕捉那种'在人群中独处'的微妙安全感。"
                 analysis="AI 分析：意图清晰，切中现代都市人的心理痛点。"
                 status="valid"
               />
               <DecisionItem 
                 step="关键选择"
                 content="选择了'白描式'的开头，而非直接抒情。"
                 analysis="AI 分析：这个选择有效地建立了场景感，让读者在前3秒内沉浸。"
                 status="valid"
               />
               <DecisionItem 
                 step="读者反馈"
                 content="评论区高频词：'真实'、'治愈'、'白噪音'。"
                 analysis="AI 分析：读者的反馈与你的创作意图高度一致，决策链条闭环。"
                 status="valid"
               />
            </div>
          </section>

          {/* Layer 3: Taste Growth */}
          <section className="bg-white border border-divider p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-8 flex items-center gap-2 relative z-10">
              <TrendingUp size={16} /> Layer 03: 品味成长
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
               <div>
                 <h4 className="font-serif text-xl mb-4">风格演化</h4>
                 <p className="text-sm text-text-secondary leading-relaxed mb-6">
                   相比上个月，你的文字更加克制了。你开始学会用"留白"来邀请读者参与创作，这是一种高级的叙事技巧。
                 </p>
                 <div className="flex gap-2">
                    <span className="tag">#叙事留白</span>
                    <span className="tag">#克制美学</span>
                 </div>
               </div>
               
               <div className="flex items-center justify-center">
                  {/* Placeholder for Radar Chart */}
                  <div className="w-40 h-40 border border-dashed border-terracotta/30 rounded-full flex items-center justify-center text-xs font-mono text-terracotta">
                     Taste Radar
                  </div>
               </div>
            </div>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="mt-20 pt-8 border-t border-divider flex justify-between items-center">
           <div className="text-xs font-mono text-text-muted">Generated by Flowark AI</div>
           <div className="flex gap-4">
              <button className="btn-ghost flex items-center gap-2 text-xs">
                <Share2 size={14} /> 分享报告
              </button>
              <button className="btn-ghost flex items-center gap-2 text-xs">
                <Download size={14} /> 导出 PDF
              </button>
           </div>
        </div>

      </main>
    </div>
  )
}

const StatBox = ({ label, value, sub }) => (
  <div>
    <div className="text-3xl font-serif text-text-primary mb-1">{value}</div>
    <div className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-1">{label}</div>
    <div className="text-[10px] font-mono text-success">{sub}</div>
  </div>
)

const DecisionItem = ({ step, content, analysis, status }) => (
  <div className="relative">
    <div className="absolute -left-[41px] top-0 w-5 h-5 bg-canvas border-2 border-terracotta rounded-full flex items-center justify-center">
       <div className="w-2 h-2 bg-terracotta rounded-full"></div>
    </div>
    <h4 className="text-sm font-bold uppercase tracking-widest text-terracotta mb-2">{step}</h4>
    <p className="text-lg font-serif text-text-primary mb-3">"{content}"</p>
    <div className="bg-terracotta/5 p-4 rounded-sm text-sm text-text-secondary leading-relaxed">
       {analysis}
    </div>
  </div>
)

export default ReportPage
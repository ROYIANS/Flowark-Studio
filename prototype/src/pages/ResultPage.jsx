import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Share2, ArrowRight, Layers, Eye, Zap, Feather, Download } from 'lucide-react'

const ARCHETYPES = {
  qilin: {
    id: 'qilin',
    name: '逻辑建筑师',
    enName: 'THE ARCHITECT',
    slogan: '混沌中的秩序构建者',
    description: "你眼中的世界不是无序的碎片，而是待解构的宏大系统。你的创作冷静、精密且富有洞见，如同在荒原上搭建起理性的大厦，为迷茫者提供栖息地。",
    icon: <Layers size={64} strokeWidth={1} />,
    color: 'text-terracotta', 
    bgGradient: 'from-terracotta/20 to-transparent',
    traits: ["结构化思维", "深度洞察", "理性美学"],
    keywords: ["#系统化写作", "#知识考古", "#冷调思考"]
  },
  whale: {
    id: 'whale',
    name: '深海共鸣者',
    enName: 'THE RESONANCE',
    slogan: '情绪引力的操控者',
    description: "你拥有穿透表象直抵人心的天赋。你的文字如同深海的鲸歌，在喧嚣的数字海洋中，为孤独的灵魂提供最温柔的共振。",
    icon: <Eye size={64} strokeWidth={1} />,
    color: 'text-terracotta',
    bgGradient: 'from-terracotta/20 to-transparent',
    traits: ["高敏感度", "治愈力", "叙事感"],
    keywords: ["#情感共鸣", "#慢生活", "#治愈系"]
  },
  jellyfish: {
    id: 'jellyfish',
    name: '灵感游侠',
    enName: 'THE MAVERICK',
    slogan: '击碎平庸的闪电',
    description: "你是规则的破坏者，也是新流行的缔造者。你的创作充满不可预测的生命力，像电流一样刺激着观众逐渐麻木的神经。",
    icon: <Zap size={64} strokeWidth={1} />,
    color: 'text-terracotta',
    bgGradient: 'from-terracotta/20 to-transparent',
    traits: ["反常规", "爆发力", "趣味性"],
    keywords: ["#脑洞大开", "#反转", "#犀利吐槽"]
  },
  peacock: {
    id: 'peacock',
    name: '视觉诗人',
    enName: 'THE AESTHETE',
    slogan: '唯美主义的守门人',
    description: "对你而言，形式即内容。你用极致的审美将生活重组为艺术品，提醒人们在粗糙的现实中，美是唯一的救赎。",
    icon: <Feather size={64} strokeWidth={1} />,
    color: 'text-terracotta',
    bgGradient: 'from-terracotta/20 to-transparent',
    traits: ["光影捕捉", "细节控", "氛围感"],
    keywords: ["#生活美学", "#视觉系", "#格调"]
  }
}

const DEFAULT_RESULT = ARCHETYPES.qilin;

const ResultPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const resultType = location.state?.type || 'qilin'
  const result = ARCHETYPES[resultType] || DEFAULT_RESULT

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center relative overflow-hidden p-6 selection:bg-terracotta selection:text-white font-sans">
       {/* Ambient Background */}
       <div className={`absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-30 bg-gradient-to-br ${result.bgGradient} pointer-events-none`}></div>
       <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-20 bg-gray-200 pointer-events-none"></div>
       
       <nav className="absolute top-0 w-full p-8 flex justify-between items-center z-10">
         <div className="text-xs font-bold uppercase tracking-widest opacity-50 text-text-secondary">Identity / 01</div>
         <Link to="/" className="w-2 h-2 bg-text-primary rounded-full hover:scale-150 transition-transform"></Link>
       </nav>

       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
         className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10"
       >
          {/* Visual Card - The Art Piece */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center lg:justify-end">
             <div className="w-full max-w-md aspect-[3/4] bg-white p-4 shadow-float relative group cursor-default transform transition-transform duration-700 hover:scale-[1.02]">
                <div className="absolute inset-0 border border-divider m-4 flex flex-col items-center justify-center text-text-primary bg-white">
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.5, duration: 0.8 }}
                     className={`mb-12 ${result.color} opacity-90`}
                   >
                     {result.icon}
                   </motion.div>
                   
                   <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-secondary mb-4">Archetype</div>
                   <h2 className="font-serif text-4xl md:text-5xl text-center mb-2 tracking-tight">{result.name}</h2>
                   <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">{result.enName}</p>
                   
                   <div className="w-12 h-[1px] bg-text-primary my-8 opacity-20"></div>
                   
                   <div className="flex flex-wrap justify-center gap-3 px-8">
                      {result.traits.map((t, i) => (
                        <motion.span 
                          key={t} 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 + (i * 0.1) }}
                          className="text-[10px] font-bold uppercase tracking-widest border border-divider px-3 py-1 text-text-secondary"
                        >
                          {t}
                        </motion.span>
                      ))}
                   </div>
                </div>
                
                {/* Decorative sticker */}
                <div className="absolute -top-3 -right-3 bg-text-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-lg">
                  Fig. 01
                </div>
             </div>
          </div>

          {/* Content - The Manifesto */}
          <div className="lg:col-span-7 order-1 lg:order-2 text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 tracking-tight text-text-primary leading-[1.1]"
            >
              {result.slogan}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-text-secondary leading-relaxed font-serif italic mb-10 max-w-xl mx-auto lg:mx-0"
            >
              "{result.description}"
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start font-mono text-xs text-text-muted mb-16"
            >
              {result.keywords.map(k => <span key={k}>{k}</span>)}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col md:flex-row gap-5 justify-center lg:justify-start items-center"
            >
               <Link to="/register" className="bg-text-primary text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-terracotta transition-colors flex items-center gap-3 justify-center group text-xs md:text-sm shadow-lg shadow-soft">
                 点亮此人设 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
               </Link>
               
               <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors px-6 py-4 border border-transparent hover:border-divider">
                 <Share2 size={16} /> 
                 <span className="hidden md:inline">分享档案</span>
               </button>

               <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors px-6 py-4 border border-transparent hover:border-divider">
                 <Download size={16} /> 
                 <span className="hidden md:inline">保存海报</span>
               </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-12 lg:mt-16"
            >
               <button onClick={() => navigate('/test')} className="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors border-b border-transparent hover:border-text-primary pb-1">
                 重新校准分析
               </button>
            </motion.div>
          </div>
       </motion.div>
    </div>
  )
}

export default ResultPage
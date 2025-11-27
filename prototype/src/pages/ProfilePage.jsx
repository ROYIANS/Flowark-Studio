import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Layers, 
  Feather,
  ArrowUpRight,
  Clock,
  Award,
  Sparkles,
  Hexagon
} from 'lucide-react'

const ProfilePage = () => {
  const navigate = useNavigate()

  const userStats = {
    name: "Alex Chen",
    title: "生活美学博主",
    bio: "在数字噪点与静谧思绪的交界处游荡。试图用文字捕捉城市生活中转瞬即逝的光影。",
    joined: "Est. 2024",
    totalReads: "12.5k",
    totalLikes: "3.2k"
  }

  const milestones = [
    { id: 1, name: "初光 First Light", date: "Oct 2024", type: "里程碑", active: true },
    { id: 2, name: "日常的韵律", date: "Nov 2024", type: "挑战赛", active: true },
    { id: 3, name: "病毒式浪潮", date: "待解锁", type: "成就", active: false },
  ]

  const personas = [
    { 
      id: 1, 
      name: "逻辑建筑师", 
      role: "理性 & 结构", 
      keywords: ["#深度思考", "#结构化", "#冷调"],
      active: true
    },
    { 
      id: 2, 
      name: "深海共鸣者", 
      role: "好奇心 & 生命力", 
      keywords: ["#治愈", "#情感", "#温暖"],
      active: false
    }
  ]

  return (
    <div className="min-h-screen bg-canvas font-sans selection:bg-terracotta/20 selection:text-text-primary pb-20">
      
      {/* Navigation */}
      <nav className="sticky top-0 bg-canvas/90 backdrop-blur-sm z-50 border-b border-divider">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')} className="group flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/>
            Back to Studio
          </button>
          <div className="text-xs font-mono text-text-muted">Taste Profile</div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12 md:pt-24">
        
        {/* Artist Bio Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
          <div className="md:col-span-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[4/5] bg-gray-100 relative overflow-hidden group border border-divider"
            >
              {/* Abstract Avatar Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-9xl opacity-10 select-none font-serif text-text-primary group-hover:scale-110 transition-transform duration-700">
                 A
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white via-white/80 to-transparent">
                 <div className="font-mono text-[10px] uppercase tracking-widest mb-1 text-text-secondary">Status · 状态</div>
                 <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                   <span className="text-xs font-bold text-text-primary">创作中...</span>
                 </div>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl font-serif font-medium mb-6 tracking-tight text-text-primary">
                {userStats.name}
              </h1>
              <div className="flex items-center gap-4 mb-8 text-xs font-mono uppercase tracking-widest text-text-secondary">
                <span>{userStats.title}</span>
                <span className="w-1 h-1 bg-divider rounded-full"></span>
                <span>{userStats.joined}</span>
              </div>
              <p className="text-xl text-text-secondary font-serif max-w-2xl leading-relaxed mb-12 border-l-2 border-terracotta/20 pl-6">
                "{userStats.bio}"
              </p>

              {/* Minimal Stats */}
              <div className="grid grid-cols-3 gap-8 border-t border-divider pt-8 max-w-lg">
                <div>
                  <div className="text-3xl font-light text-text-primary mb-1">{userStats.totalReads}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Impressions</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-text-primary mb-1">{userStats.totalLikes}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Appreciations</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-text-primary mb-1">03</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Series</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          
          {/* Persona Engine */}
          <section>
            <div className="flex items-center justify-between mb-8 border-b border-divider pb-4">
               <h2 className="font-serif text-3xl text-text-primary">人设引擎</h2>
               <button className="text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-terracotta transition-colors flex items-center gap-1">
                 <Sparkles size={12} />
                 New Persona
               </button>
            </div>
            
            <div className="space-y-6">
              {personas.map((p, i) => (
                <motion.div 
                  key={p.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className={`group flex flex-col p-6 bg-white border ${p.active ? 'border-terracotta shadow-soft' : 'border-divider'} hover:border-terracotta/50 transition-all duration-500 cursor-pointer relative`}
                >
                   <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 ${p.active ? 'bg-terracotta text-white' : 'bg-gray-100 text-text-secondary'} flex items-center justify-center rounded-full`}>
                          <Layers size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-lg font-serif text-text-primary">{p.name}</h3>
                          <p className="text-xs text-text-secondary font-mono mt-0.5">{p.role}</p>
                        </div>
                      </div>
                      {p.active && <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2 py-1 rounded-full">Active</span>}
                   </div>
                   
                   <div className="flex gap-2 mt-2">
                     {p.keywords.map(k => (
                       <span key={k} className="text-xs text-text-secondary bg-canvas px-2 py-1 border border-divider rounded-sm">{k}</span>
                     ))}
                   </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Taste Map (Visualized as Milestones for now) */}
          <section>
             <div className="flex items-center justify-between mb-8 border-b border-divider pb-4">
               <h2 className="font-serif text-3xl text-text-primary">品味印记</h2>
               <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                 Milestones
               </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
               {milestones.map((item, i) => (
                 <motion.div 
                   key={item.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.6 + (i * 0.1) }}
                   className={`flex items-center justify-between p-4 border-b border-divider hover:bg-white transition-colors ${!item.active ? 'opacity-50 grayscale' : ''}`}
                 >
                    <div className="flex items-center gap-4">
                       <span className="font-mono text-xs text-text-muted">0{i + 1}</span>
                       <span className="font-serif text-lg text-text-primary">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-bold uppercase tracking-widest bg-canvas border border-divider px-2 py-1 text-text-secondary rounded-sm flex items-center gap-1">
                          {item.type === '成就' && <Award size={10} />}
                          {item.type}
                       </span>
                       <span className="font-mono text-xs text-text-muted">{item.date}</span>
                    </div>
                 </motion.div>
               ))}
            </div>
            
            {/* Placeholder for Taste Map Visualization */}
            <div className="mt-8 p-8 border border-dashed border-divider flex flex-col items-center justify-center text-center bg-canvas/50">
               <Hexagon size={32} className="text-terracotta mb-4 opacity-50" />
               <p className="text-sm text-text-secondary font-serif">品味图谱正在生成中...</p>
               <p className="text-xs text-text-muted mt-2">继续创作以完善你的六维数据</p>
            </div>
          </section>

        </div>

      </main>
    </div>
  )
}

export default ProfilePage
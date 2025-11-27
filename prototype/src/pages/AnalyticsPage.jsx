import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  Calendar,
  Activity,
  Sparkles
} from 'lucide-react'

const AnalyticsPage = () => {
  const navigate = useNavigate()

  const stats = [
    { 
      label: "浏览人次", 
      subLabel: "Gallery Visits",
      value: "12,543", 
      change: "+12%", 
      icon: <Eye size={20} />, 
      color: "text-primary",
      bg: "bg-primary/5"
    },
    { 
      label: "共鸣时刻", 
      subLabel: "Resonances",
      value: "3,201", 
      change: "+5%", 
      icon: <Heart size={20} />, 
      color: "text-accent-coral",
      bg: "bg-accent-coral/5"
    },
    { 
      label: "订阅者", 
      subLabel: "Patrons",
      value: "128", 
      change: "+24%", 
      icon: <Users size={20} />, 
      color: "text-info",
      bg: "bg-info/5"
    },
  ]

  const contentPerformance = [
    { title: "周末不卷！这家藏在巷子里的咖啡馆...", date: "2小时前", views: 1204, likes: 342, score: 98 },
    { title: "职场新人必看的沟通法则，建议收藏", date: "昨天", views: 856, likes: 124, score: 85 },
    { title: "我的书桌改造计划 vol.1", date: "3天前", views: 542, likes: 89, score: 72 },
  ]

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-text-main pb-20">
      
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
           <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors text-gray-400 hover:text-text-main">
              <ArrowLeft size={20} strokeWidth={1.5} />
            </button>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Data & Insights</span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm">
             <Calendar size={14} className="text-gray-400" />
             <span className="text-xs font-medium text-gray-600">近 7 天</span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        
        <header className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-medium text-text-main mb-4"
          >
            影响力画廊
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-xl leading-relaxed"
          >
            倾听数字世界的回响。每一次点击与互动，都是观众与你灵魂共振的证明。
          </motion.p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              className="p-8 bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-soft transition-all duration-500 group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-success bg-success/5 px-2 py-1 rounded-full">
                  <TrendingUp size={12} />
                  {stat.change}
                </div>
              </div>
              <div className="text-4xl font-light text-text-main mb-2 font-sans tracking-tight">{stat.value}</div>
              <div>
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mt-1">{stat.subLabel}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Visual Chart Area */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-serif text-xl text-text-main mb-1">流量趋势</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Traffic Flow</p>
                </div>
                <Activity size={20} className="text-gray-300" />
             </div>
             
             {/* Custom Minimal Chart */}
             <div className="h-64 flex items-end justify-between gap-2 md:gap-6 pt-10 relative">
                {/* Background Lines */}
                <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-200 pointer-events-none">
                   <div className="border-b border-dashed border-gray-100 w-full h-0"></div>
                   <div className="border-b border-dashed border-gray-100 w-full h-0"></div>
                   <div className="border-b border-dashed border-gray-100 w-full h-0"></div>
                   <div className="border-b border-dashed border-gray-100 w-full h-0"></div>
                </div>

                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                    className="flex-1 bg-gradient-to-t from-primary/20 to-primary/5 rounded-t-md relative group cursor-pointer min-w-[20px]"
                  >
                     <div className="absolute bottom-0 w-full bg-primary/40 h-1 rounded-full group-hover:bg-primary transition-colors"></div>
                     
                     {/* Hover Tooltip */}
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-text-main text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        {h * 10} Views
                     </div>
                     
                     <div className="absolute -bottom-8 w-full text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>

          {/* Recent Performance List */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="font-serif text-xl text-text-main mb-1">近期展出</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Recent Works</p>
               </div>
            </div>

            <div className="space-y-6 flex-1">
              {contentPerformance.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (idx * 0.1) }}
                  className="group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-medium text-text-body group-hover:text-primary transition-colors line-clamp-1 flex-1 mr-4">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/5 px-1.5 py-0.5 rounded">
                       <Sparkles size={10} />
                       {item.score}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{item.date}</span>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><Eye size={12}/> {item.views}</span>
                      <span className="flex items-center gap-1"><Heart size={12}/> {item.likes}</span>
                    </div>
                  </div>
                  
                  {idx !== contentPerformance.length - 1 && (
                    <div className="h-px bg-gray-50 w-full mt-4 group-hover:bg-primary/10 transition-colors"></div>
                  )}
                </motion.div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 border border-gray-100 rounded-lg hover:border-primary hover:text-primary transition-colors">
              View All Archive
            </button>
          </div>

        </div>
      </main>
    </div>
  )
}

export default AnalyticsPage
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Search, Filter, Heart, Bookmark, ArrowLeft } from 'lucide-react'

const GalleryPage = () => {
  const navigate = useNavigate()

  const exhibits = [
    {
      id: 1,
      title: "在赫尔辛基的雨天，我听见城市的呼吸",
      author: "Lin",
      role: "声音景观师",
      category: "Soundscape",
      date: "Oct 24",
      imageUrl: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2070&auto=format&fit=crop",
      excerpt: "雨滴敲击着电车轨道的节奏，仿佛是这座城市古老的心跳。我举起录音笔，试图捕捉这转瞬即逝的交响曲...",
      size: "col-span-1 md:col-span-2 row-span-2" // 大版面
    },
    {
      id: 2,
      title: "极简主义不是空无一物",
      author: "K.",
      role: "空间设计师",
      category: "Philosophy",
      date: "Oct 22",
      imageUrl: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop",
      excerpt: "它是一种对本质的极致追求，是剔除噪音后留下的纯粹回响。",
      size: "col-span-1"
    },
    {
      id: 3,
      title: "深夜食堂的第101种孤独",
      author: "Midnight",
      role: "城市观察者",
      category: "Story",
      date: "Oct 20",
      imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1964&auto=format&fit=crop",
      excerpt: "每个人都是一座孤岛，而食物是我们彼此连接的桥梁。",
      size: "col-span-1"
    },
    {
      id: 4,
      title: "数字游民的背包里有什么？",
      author: "Nomad",
      role: "生活家",
      category: "Lifestyle",
      date: "Oct 18",
      imageUrl: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop",
      excerpt: "少即是多。带着最少的行李，去往最远的地方。",
      size: "col-span-1 md:col-span-2"
    },
    {
      id: 5,
      title: "胶片摄影：时间的切片",
      author: "Focus",
      role: "摄影师",
      category: "Visual",
      date: "Oct 15",
      imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1638&auto=format&fit=crop",
      excerpt: "每一次快门，都是对时间的挽留。",
      size: "col-span-1"
    }
  ]

  return (
    <div className="min-h-screen bg-canvas font-sans text-text-primary selection:bg-terracotta/20 selection:text-text-primary pb-20">
      
      {/* Navigation */}
      <nav className="sticky top-0 bg-canvas/90 backdrop-blur-sm z-50 border-b border-divider">
        <div className="max-w-[90rem] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-lg font-serif font-bold tracking-tight flex items-center gap-2">
              <span className="w-3 h-3 bg-terracotta rounded-full inline-block"></span>
              Flowark Gallery.
            </Link>
            <div className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-text-secondary">
              <a href="#" className="hover:text-terracotta transition-colors">Featured</a>
              <a href="#" className="hover:text-terracotta transition-colors">Latest</a>
              <a href="#" className="hover:text-terracotta transition-colors">Collections</a>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-terracotta transition-colors" size={16} />
              <input
                type="text"
                placeholder="Search exhibitions..."
                className="pl-10 pr-4 py-2 bg-transparent border-b border-divider focus:border-terracotta outline-none text-sm font-serif w-64 transition-all placeholder:text-text-muted/50"
              />
            </div>
            <Link to="/login" className="text-xs font-bold uppercase tracking-widest hover:text-terracotta transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="btn-primary text-xs px-6 py-2 shadow-none">
              Start Creating
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-[90rem] mx-auto px-6 pt-12 md:pt-20">
        
        {/* Curator Statement / Wall Text */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-end border-b border-divider pb-8">
          <div className="max-w-xl">
             <div className="text-xs font-mono text-terracotta uppercase tracking-widest mb-4 flex items-center gap-2">
               <span className="w-2 h-2 bg-terracotta rounded-full"></span>
               Current Exhibition
             </div>
             <p className="text-xl md:text-2xl font-serif leading-relaxed text-text-primary">
               这里没有信息流，只有思想的切片。<br/>
               <span className="text-text-secondary">我们策展最有温度的思考，呈现最独特的灵魂。</span>
             </p>
          </div>
          
          <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest text-text-secondary mt-8 md:mt-0">
             <button className="text-text-primary hover:text-terracotta transition-colors">All Works</button>
             <button className="hover:text-terracotta transition-colors">Soundscapes</button>
             <button className="hover:text-terracotta transition-colors">Visuals</button>
             <button className="hover:text-terracotta transition-colors">Stories</button>
          </div>
        </header>

        {/* Gallery Grid (Masonry-like) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[minmax(300px,auto)]">
          {exhibits.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`group relative bg-white border border-divider hover:border-terracotta/30 hover:shadow-float transition-all duration-700 flex flex-col overflow-hidden cursor-pointer ${item.size}`}
            >
              {/* Image Area */}
              <div className="flex-1 relative overflow-hidden min-h-[240px] bg-gray-100">
                 <img
                   src={item.imageUrl}
                   alt={item.title}
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                 <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex gap-3 z-10">
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-text-primary hover:text-terracotta shadow-sm">
                      <Heart size={14} />
                    </button>
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-text-primary hover:text-terracotta shadow-sm">
                      <Bookmark size={14} />
                    </button>
                 </div>
              </div>
              
              {/* Content Area */}
              <div className="p-8 bg-white relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-terracotta px-2 py-0.5 rounded-sm">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                      {item.date}
                    </span>
                  </div>
                  <ArrowUpRight size={18} className="text-text-muted group-hover:text-terracotta transition-colors" />
                </div>
                
                <h3 className="text-2xl font-serif font-medium mb-3 leading-snug group-hover:text-terracotta transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-sm text-text-secondary leading-relaxed mb-6 line-clamp-3">
                  {item.excerpt}
                </p>
                
                <div className="flex items-center gap-3 pt-6 border-t border-divider">
                  <div className="w-6 h-6 rounded-full bg-gray-100"></div>
                  <div className="text-xs">
                    <span className="font-bold text-text-primary block">{item.author}</span>
                    <span className="text-text-muted font-mono uppercase tracking-wider text-[10px]">{item.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-20 text-center">
           <button className="btn-ghost border border-divider hover:border-terracotta transition-colors">
             Load More Exhibits
           </button>
        </div>

      </main>
    </div>
  )
}

export default GalleryPage
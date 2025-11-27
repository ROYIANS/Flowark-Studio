import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Plus, 
  LayoutGrid, 
  BarChart2, 
  User, 
  Settings, 
  Search,
  ArrowUpRight,
  PenTool,
  Sparkles,
  BookOpen
} from 'lucide-react'

const DashboardPage = () => {
  const userPersona = {
    name: "Alex Chen",
    role: "生活美学博主",
  }

  return (
    <div className="min-h-screen bg-canvas flex font-sans text-text-primary">
      
      {/* 极简侧边栏 */}
      <aside className="w-20 border-r border-divider bg-canvas fixed h-full z-20 flex flex-col items-center py-8">
        <div className="mb-12">
          <div className="w-10 h-10 bg-terracotta text-white flex items-center justify-center font-serif font-bold text-xl rounded-sm shadow-sm">
            F.
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-8 w-full px-4">
          <NavItem to="/dashboard" icon={<LayoutGrid size={20} />} active />
          <NavItem to="/inspiration" icon={<Sparkles size={20} />} />
          <NavItem to="/create" icon={<Plus size={20} />} />
          <NavItem to="/analytics" icon={<BarChart2 size={20} />} />
          <NavItem to="/profile" icon={<User size={20} />} />
        </nav>

        <div className="mt-auto">
          <button className="p-3 text-text-secondary hover:text-terracotta transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 ml-20 p-8 md:p-12 max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-end mb-16">
          <div>
            <p className="font-mono text-xs text-text-secondary uppercase tracking-widest mb-2">Workspace / {userPersona.role}</p>
            <h1 className="text-4xl md:text-5xl font-serif">
              早安，<span className="text-terracotta">{userPersona.name}</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <div className="text-xs font-bold uppercase tracking-widest text-text-secondary">品味等级</div>
              <div className="font-mono text-terracotta">Level 03</div>
            </div>
            <div className="w-12 h-12 rounded-full border border-divider overflow-hidden bg-gray-50">
               <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${userPersona.name}`} alt="Avatar" />
            </div>
          </div>
        </header>

        {/* 瀑布流布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 左侧：灵感策展与快速创作 */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* 快速创作卡片 */}
            <div className="bg-white p-8 md:p-12 border border-divider shadow-soft hover:shadow-float transition-all duration-500 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-terracotta transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
              
              <h2 className="text-2xl font-serif mb-6">捕捉此刻的灵光...</h2>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="今天想聊聊什么？"
                  className="w-full bg-transparent border-b border-divider py-4 text-xl md:text-2xl focus:outline-none focus:border-terracotta transition-colors placeholder:text-text-muted font-serif"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-terracotta">
                  <ArrowUpRight size={32} />
                </button>
              </div>

              <div className="mt-8 flex items-center gap-4 text-xs text-text-secondary font-mono uppercase tracking-widest">
                <span>推荐话题:</span>
                <span className="cursor-pointer hover:text-terracotta transition-colors">#极简生活</span>
                <span className="cursor-pointer hover:text-terracotta transition-colors">#城市漫步</span>
              </div>
            </div>

            {/* 浮光灵感 (Inspiration Curator) */}
            <div>
              <div className="flex justify-between items-center mb-6 px-2">
                <h3 className="font-serif text-lg flex items-center gap-2">
                  <Sparkles size={18} className="text-terracotta" /> 浮光灵感
                </h3>
                <Link to="/inspiration" className="text-xs font-mono uppercase tracking-widest hover:text-terracotta transition-colors">查看全部</Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <InspirationCard 
                    title="为什么我们越来越不敢'断舍离'？" 
                    source="生活哲学" 
                    type="深度思考"
                 />
                 <InspirationCard 
                    title="2025年家居色彩趋势报告" 
                    source="视觉美学" 
                    type="趋势分析"
                 />
              </div>
            </div>
          </div>

          {/* 右侧：草稿箱与数据 */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* 草稿箱 */}
            <div className="bg-canvas border border-divider p-8 relative">
              <div className="flex items-center gap-2 mb-6 text-text-secondary">
                 <PenTool size={16} />
                 <span className="text-xs font-bold tracking-widest uppercase">草稿箱</span>
              </div>
              <div className="space-y-4">
                <DraftItem title="关于咖啡馆的声学研究" date="2小时前" />
                <DraftItem title="读《悉达多》有感" date="昨天" />
                <DraftItem title="无题随笔" date="10月24日" />
              </div>
              <button className="w-full mt-6 py-3 text-xs font-mono uppercase tracking-widest text-text-secondary border border-divider hover:border-terracotta hover:text-terracotta transition-colors">
                管理所有草稿
              </button>
            </div>

            {/* 品味印记概览 */}
            <div className="bg-white p-8 border border-divider shadow-sm">
               <h3 className="font-serif text-lg mb-6">品味印记</h3>
               <div className="space-y-6">
                 <StatItem label="情绪共鸣" value="High" />
                 <StatItem label="视觉美学" value="Medium" />
                 <StatItem label="逻辑结构" value="Low" />
               </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}

const NavItem = ({ to, icon, active }) => (
  <Link 
    to={to}
    className={`w-full aspect-square flex items-center justify-center rounded-sm transition-all duration-300 ${
      active 
        ? 'bg-terracotta text-white shadow-sm' 
        : 'text-text-secondary hover:bg-terracotta-light/50 hover:text-terracotta'
    }`}
  >
    {icon}
  </Link>
)

const InspirationCard = ({ title, source, type }) => (
  <div className="exhibit-card group cursor-pointer">
    <div className="flex justify-between items-start mb-4">
      <span className="tag">{source}</span>
      <span className="text-xs text-text-muted font-mono">{type}</span>
    </div>
    <h4 className="font-serif text-lg mb-2 group-hover:text-terracotta transition-colors leading-snug">{title}</h4>
  </div>
)

const DraftItem = ({ title, date }) => (
  <div className="flex justify-between items-center py-3 border-b border-divider last:border-0 group cursor-pointer">
    <span className="text-sm font-medium text-text-primary group-hover:text-terracotta transition-colors">{title}</span>
    <span className="text-xs text-text-muted font-mono">{date}</span>
  </div>
)

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-text-secondary">{label}</span>
    <span className="font-mono font-bold text-sm text-text-primary">{value}</span>
  </div>
)

export default DashboardPage
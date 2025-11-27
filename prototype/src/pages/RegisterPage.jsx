import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, Github, Mail, Smartphone } from 'lucide-react'
import { motion } from 'framer-motion'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-art-blue/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-art-orange/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white/80 backdrop-blur-xl shadow-art-lg border border-white/50 rounded-3xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side - Visual/Concept */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-art-blue/5 to-art-purple/10 p-10 flex flex-col justify-between relative overflow-hidden">
           {/* Decorative Circles */}
           <div className="absolute top-10 right-10 w-20 h-20 border border-art-black/10 rounded-full" />
           <div className="absolute bottom-10 left-10 w-32 h-32 border border-art-black/10 rounded-full opacity-50" />
           
           <div className="relative z-10">
             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 text-art-black">
               <Sparkles size={24} strokeWidth={1.5} />
             </div>
             <h2 className="text-3xl font-serif font-medium text-art-black mb-4 leading-tight">
               保存你的<br/>
               <span className="italic text-art-blue">创作人格档案</span>
             </h2>
             <p className="text-text-body text-sm leading-relaxed opacity-80">
               你的灵感不应是转瞬即逝的烟火。<br/>
               加入我们，将你的独特风格转化为永恒的数字资产。
             </p>
           </div>

           <div className="relative z-10 mt-12 md:mt-0">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                <span className="w-8 h-[1px] bg-gray-300"></span>
                <span>Member Access</span>
              </div>
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-7/12 p-10 md:p-16 bg-white">
          <div className="mb-10">
            <h1 className="text-2xl font-serif text-art-black mb-2">开启旅程</h1>
            <p className="text-sm text-gray-400">已有账号？ <a href="#" className="text-art-blue hover:underline">直接登录</a></p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-4">
              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-text-body">
                  <Github size={18} />
                  <span>Github</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-text-body">
                  <Mail size={18} />
                  <span>Google</span>
                </button>
              </div>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="flex-shrink-0 mx-4 text-gray-300 text-xs uppercase tracking-widest">Or via phone</span>
                <div className="flex-grow border-t border-gray-100"></div>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">手机号码</label>
                <div className="relative group">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-art-black transition-colors" size={18} />
                  <input
                    type="tel"
                    required
                    className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-transparent rounded-lg text-art-black text-sm focus:bg-white focus:border-art-black/30 focus:ring-4 focus:ring-art-black/5 outline-none transition-all placeholder:text-gray-300"
                    placeholder="138 0000 0000"
                  />
                </div>
              </div>

              {/* Code Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">验证码</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    required
                    className="block w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg text-art-black text-sm focus:bg-white focus:border-art-black/30 focus:ring-4 focus:ring-art-black/5 outline-none transition-all placeholder:text-gray-300 text-center tracking-widest"
                    placeholder="0000"
                  />
                  <button 
                    type="button"
                    className="shrink-0 px-6 py-3 bg-gray-50 text-text-body text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                  >
                    获取验证码
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-terracotta text-white rounded-lg hover:bg-terracotta-hover transition-all duration-300 shadow-lg shadow-soft hover:shadow-float group"
            >
              {isLoading ? (
                <span className="flex items-center gap-2 text-sm">
                  <Sparkles size={16} className="animate-spin"/> 
                  正在建立连接...
                </span>
              ) : (
                <>
                  <span className="text-sm font-medium">确认并进入</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8 leading-relaxed">
            点击即代表您同意 <a href="#" className="text-art-black hover:underline">服务条款</a> 与 <a href="#" className="text-art-black hover:underline">隐私政策</a>。<br/>
            您的数据将如同艺术品般被珍视与保护。
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default RegisterPage
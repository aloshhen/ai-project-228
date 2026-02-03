import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility for tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// SafeIcon Component - Handles all Lucide icons safely
const SafeIcon = ({ name, size = 24, className = '', color }: { name: string, size?: number, className?: string, color?: string }) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType<any> | null>(null)
  
  useEffect(() => {
    // Dynamic import to handle any icon name
    import('lucide-react').then((icons) => {
      // Convert kebab-case to PascalCase
      const pascalCase = name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
      
      const Icon = (icons as any)[pascalCase] || icons.HelpCircle
      setIconComponent(() => Icon)
    })
  }, [name])
  
  if (!IconComponent) {
    return <div style={{ width: size, height: size }} className={className} />
  }
  
  return <IconComponent size={size} className={className} color={color} />
}

// Scroll Animation Hook
const useScrollAnimation = () => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return { ref, isInView }
}

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#about', label: 'О протоколе' },
    { href: '#features', label: 'Преимущества' },
    { href: '#stats', label: 'Статистика' },
    { href: '#team', label: 'Команда' },
  ]

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
    )}>
      <nav className="container mx-auto max-w-7xl px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <SafeIcon name="hexagon" size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Nexus</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-sm text-slate-400 hover:text-white transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block btn-primary text-sm py-3 px-6">
              Подключить кошелёк
            </button>
            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <SafeIcon name={isMobileMenuOpen ? "x" : "menu"} size={24} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-slate-300 hover:text-white transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ))}
                <button className="btn-primary text-sm py-3 mt-2">
                  Подключить кошелёк
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

// Hero Section
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse-slow delay-1000" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-cyan-400 text-sm font-medium mb-6">
              <SafeIcon name="zap" size={16} />
              <span>Новое поколение DeFi</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-balance"
          >
            <span className="gradient-text">Децентрализованные</span>
            <br />
            <span className="text-white">финансы 2.0</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Nexus — это инновационный протокол ликвидности с мгновенными свопами, 
            минимальными комиссиями и максимальной безопасностью ваших активов
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="btn-primary flex items-center justify-center gap-2 group">
              <span>Начать использовать</span>
              <SafeIcon name="arrow-right" size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary">
              Узнать больше
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex items-center justify-center gap-8 text-slate-500 text-sm"
          >
            <div className="flex items-center gap-2">
              <SafeIcon name="shield-check" size={16} className="text-cyan-500" />
              <span>Аудит безопасности</span>
            </div>
            <div className="flex items-center gap-2">
              <SafeIcon name="lock" size={16} className="text-cyan-500" />
              <span>Не требует KYC</span>
            </div>
            <div className="flex items-center gap-2">
              <SafeIcon name="globe" size={16} className="text-cyan-500" />
              <span>Децентрализовано</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}

// Features Section
const Features = () => {
  const { ref, isInView } = useScrollAnimation()

  const features = [
    {
      icon: 'shield',
      title: 'Безопасность',
      description: 'Многоуровневая система защиты с аудитом от ведущих компаний. Ваши средства под надёжной защитой.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: 'zap',
      title: 'Мгновенные свопы',
      description: 'Обменивайте токены за доли секунды благодаря оптимизированной архитектуре и layer-2 решениям.',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: 'trending-up',
      title: 'Высокая доходность',
      description: 'Получайте до 15% APY на стейкинг и участвуйте в программах ликвидности с бонусами.',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: 'users',
      title: 'DAO Governance',
      description: 'Управляйте протоколом через децентрализованную автономную организацию. Голосуйте за изменения.',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: 'wallet',
      title: 'Мультичейн',
      description: 'Поддержка Ethereum, BSC, Polygon, Arbitrum и других сетей. Мосты между блокчейнами.',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      icon: 'coins',
      title: 'Низкие комиссии',
      description: 'Минимальные gas costs благодаря оптимизации смарт-контрактов и интеграции с layer-2.',
      color: 'from-pink-500 to-rose-600'
    }
  ]

  return (
    <section id="features" className="py-24 relative" ref={ref}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Почему выбирают <span className="gradient-text">Nexus</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Инновационные решения для максимальной эффективности ваших криптоактивов
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass glass-hover p-8 rounded-2xl relative overflow-hidden"
            >
              <div className={cn(
                "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-6 shadow-lg",
                feature.color
              )}>
                <SafeIcon name={feature.icon} size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Stats Section
const Stats = () => {
  const { ref, isInView } = useScrollAnimation()

  const stats = [
    { value: '$2.4B+', label: 'Общий объём', icon: 'bar-chart-3' },
    { value: '150K+', label: 'Пользователей', icon: 'users' },
    { value: '45M+', label: 'Транзакций', icon: 'repeat' },
    { value: '0.1%', label: 'Минимальная комиссия', icon: 'percent' },
  ]

  return (
    <section id="stats" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-purple-950/20" />
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-8 rounded-2xl text-center group hover:border-cyan-500/30 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <SafeIcon name={stat.icon} size={24} />
              </div>
              <div className="text-3xl md:text-4xl font-black gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// How It Works Section
const HowItWorks = () => {
  const { ref, isInView } = useScrollAnimation()

  const steps = [
    {
      number: '01',
      title: 'Подключите кошелёк',
      description: 'Поддерживаем MetaMask, WalletConnect, Coinbase Wallet и другие популярные кошельки',
      icon: 'wallet'
    },
    {
      number: '02',
      title: 'Выберите актив',
      description: 'Выберите токены для обмена или пула ликвидности из поддерживаемых активов',
      icon: 'coins'
    },
    {
      number: '03',
      title: 'Начните зарабатывать',
      description: 'Получайте пассивный доход от стейкинга и предоставления ликвидности',
      icon: 'trending-up'
    }
  ]

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Как это <span className="gradient-text">работает</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Начните использовать протокол за три простых шага
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <div className="glass p-8 rounded-2xl h-full relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-6xl font-black text-white">{step.number}</span>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20">
                  <SafeIcon name={step.icon} size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Team Section
const Team = () => {
  const { ref, isInView } = useScrollAnimation()

  const team = [
    {
      name: 'Алексей Волков',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      social: 'twitter'
    },
    {
      name: 'Мария Соколова',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      social: 'github'
    },
    {
      name: 'Дмитрий Козлов',
      role: 'Head of DeFi',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      social: 'linkedin'
    },
    {
      name: 'Анна Морозова',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      social: 'github'
    }
  ]

  return (
    <section id="team" className="py-24 relative" ref={ref}>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Наша <span className="gradient-text">команда</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Эксперты с опытом в блокчейне, финансах и разработке
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass glass-hover rounded-2xl overflow-hidden group"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-cyan-400 text-sm mb-4">{member.role}</p>
                <div className="flex gap-3">
                  <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors">
                    <SafeIcon name={member.social} size={16} />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors">
                    <SafeIcon name="twitter" size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-purple-600/20" />
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" />
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 md:p-16 text-center max-w-4xl mx-auto border border-cyan-500/20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Готовы начать? <span className="gradient-text">Присоединяйтесь</span> к революции DeFi
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к 150,000+ пользователей, которые уже зарабатывают с Nexus. 
            Получите бонус 50 NEX токенов при первом депозите.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary flex items-center justify-center gap-2 text-lg">
              <span>Начать сейчас</span>
              <SafeIcon name="arrow-right" size={20} />
            </button>
            <button className="btn-secondary flex items-center justify-center gap-2">
              <SafeIcon name="book-open" size={20} />
              <span>Документация</span>
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <SafeIcon name="check-circle" size={16} className="text-cyan-500" />
              <span>Без скрытых комиссий</span>
            </div>
            <div className="flex items-center gap-2">
              <SafeIcon name="check-circle" size={16} className="text-cyan-500" />
              <span>Мгновенный вывод</span>
            </div>
            <div className="flex items-center gap-2">
              <SafeIcon name="check-circle" size={16} className="text-cyan-500" />
              <span>Поддержка 24/7</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950 pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <SafeIcon name="hexagon" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold">Nexus</span>
            </a>
            <p className="text-slate-400 max-w-sm mb-6">
              Инновационный DeFi протокол нового поколения. Безопасность, скорость и доходность в одном месте.
            </p>
            <div className="flex gap-4">
              {['twitter', 'github', 'send', 'message-circle'].map((icon) => (
                <a 
                  key={icon}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors"
                >
                  <SafeIcon name={icon} size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Продукт</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Обмен</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Пулы ликвидности</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Стейкинг</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Фарминг</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Ресурсы</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Документация</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Whitepaper</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">API</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 Nexus Protocol. Все права защищены.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <Team />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App
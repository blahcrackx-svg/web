'use client'

import { useEffect, useRef, useState } from 'react'

// Particle interface
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cityscapeRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    const particleCount = 80
    const connectionDistance = 150

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (): Particle => {
      const colors = ['#00ffff', '#ff00ff', '#00ff88', '#8800ff']
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      }
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.shadowBlur = 15
        ctx.shadowColor = particle.color
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.shadowBlur = 0
            ctx.stroke()
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black">
      {/* Film grain overlay */}
      <div className="film-grain" />
      
      {/* CRT scanlines */}
      <div className="crt-scanlines" />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Parallax cityscape */}
      <div 
        ref={cityscapeRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="cityscape">
          <div className="city-layer city-layer-far" />
          <div className="city-layer city-layer-mid" />
          <div className="city-layer city-layer-near" />
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-gradient-radial pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
          {/* Glitching Neon Marquee */}
          <div className="marquee-container mb-8 w-full overflow-hidden">
            <div className="marquee-content">
              <span className="marquee-text">
                ★ WELCOME TO THE FUTURE ★ DIGITAL REALMS AWAIT ★ BEYOND THE HORIZON ★ NEON DREAMS ★ CYBER PULSE ★
              </span>
              <span className="marquee-text">
                ★ WELCOME TO THE FUTURE ★ DIGITAL REALMS AWAIT ★ BEYOND THE HORIZON ★ NEON DREAMS ★ CYBER PULSE ★
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="glitch-headline text-5xl md:text-7xl lg:text-9xl font-bold mb-4" data-text="NEXUS">
              <span className="neon-cyan">N</span>
              <span className="neon-magenta">E</span>
              <span className="neon-cyan">X</span>
              <span className="neon-magenta">U</span>
              <span className="neon-cyan">S</span>
            </h1>
            <p className="subtitle text-xl md:text-2xl lg:text-3xl text-gray-300 font-light tracking-[0.3em] uppercase">
              Digital Architect • Code Artisan • Vision Builder
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="cyber-button primary">
              <span className="button-content">Enter The Grid</span>
              <span className="button-glitch" />
            </button>
            <button className="cyber-button secondary">
              <span className="button-content">View Projects</span>
              <span className="button-glitch" />
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
            <div className="scroll-arrow" />
          </div>
        </section>

        {/* About Section */}
        <section className="min-h-screen flex items-center py-20 px-4 relative">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Card */}
            <div className="profile-card">
              <div className="card-inner">
                <div className="card-front">
                  <div className="avatar-container">
                    <div className="avatar-ring" />
                    <div className="avatar">
                      <span className="text-4xl">⚡</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold neon-cyan mt-6">Digital Identity</h3>
                  <p className="text-gray-400 mt-2">Hover to reveal stats</p>
                </div>
                <div className="card-back">
                  <div className="stats-grid">
                    <div className="stat-item">
                      <span className="stat-value neon-cyan">10+</span>
                      <span className="stat-label">Years Experience</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value neon-magenta">200+</span>
                      <span className="stat-label">Projects Done</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value neon-cyan">50+</span>
                      <span className="stat-label">Happy Clients</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value neon-magenta">∞</span>
                      <span className="stat-label">Ideas Created</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Text */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="neon-cyan">About</span>{' '}
                <span className="neon-magenta">Me</span>
              </h2>
              <div className="terminal-window">
                <div className="terminal-header">
                  <span className="terminal-dot red" />
                  <span className="terminal-dot yellow" />
                  <span className="terminal-dot green" />
                  <span className="terminal-title">user@nexus:~</span>
                </div>
                <div className="terminal-body">
                  <p className="terminal-line">
                    <span className="terminal-prompt">$</span> whoami
                  </p>
                  <p className="terminal-output">
                    A passionate developer crafting digital experiences that push boundaries.
                    Specializing in full-stack development, creative coding, and building
                    immersive web experiences that blend art with technology.
                  </p>
                  <p className="terminal-line mt-4">
                    <span className="terminal-prompt">$</span> cat skills.txt
                  </p>
                  <p className="terminal-output skills-list">
                    <span className="skill-tag">React</span>
                    <span className="skill-tag">TypeScript</span>
                    <span className="skill-tag">Node.js</span>
                    <span className="skill-tag">Python</span>
                    <span className="skill-tag">WebGL</span>
                    <span className="skill-tag">Three.js</span>
                    <span className="skill-tag">UI/UX</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="min-h-screen py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="neon-cyan">Featured</span>{' '}
              <span className="neon-magenta">Projects</span>
            </h2>

            <div className="projects-grid">
              {/* Project Card 1 */}
              <div className="project-card">
                <div className="project-image">
                  <div className="project-placeholder">
                    <span className="pixel-icon">🎮</span>
                  </div>
                  <div className="project-overlay">
                    <span className="overlay-text">View Project</span>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">Neon Arcade</h3>
                  <p className="project-desc">Retro gaming platform with WebGL effects</p>
                  <div className="project-tags">
                    <span>React</span>
                    <span>WebGL</span>
                    <span>Node.js</span>
                  </div>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="project-card">
                <div className="project-image">
                  <div className="project-placeholder">
                    <span className="pixel-icon">🌐</span>
                  </div>
                  <div className="project-overlay">
                    <span className="overlay-text">View Project</span>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">Quantum Dashboard</h3>
                  <p className="project-desc">Real-time data visualization system</p>
                  <div className="project-tags">
                    <span>D3.js</span>
                    <span>WebSocket</span>
                    <span>Python</span>
                  </div>
                </div>
              </div>

              {/* Project Card 3 */}
              <div className="project-card">
                <div className="project-image">
                  <div className="project-placeholder">
                    <span className="pixel-icon">🎵</span>
                  </div>
                  <div className="project-overlay">
                    <span className="overlay-text">View Project</span>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">Synth Wave</h3>
                  <p className="project-desc">AI-powered music generation app</p>
                  <div className="project-tags">
                    <span>Python</span>
                    <span>TensorFlow</span>
                    <span>React</span>
                  </div>
                </div>
              </div>

              {/* Project Card 4 */}
              <div className="project-card">
                <div className="project-image">
                  <div className="project-placeholder">
                    <span className="pixel-icon">🔐</span>
                  </div>
                  <div className="project-overlay">
                    <span className="overlay-text">View Project</span>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">Crypto Vault</h3>
                  <p className="project-desc">Secure cryptocurrency portfolio manager</p>
                  <div className="project-tags">
                    <span>Blockchain</span>
                    <span>Next.js</span>
                    <span>Solidity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="min-h-screen flex items-center py-20 px-4 relative">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="neon-cyan">Get In</span>{' '}
              <span className="neon-magenta">Touch</span>
            </h2>

            <div className="contact-container">
              <div className="contact-form">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" className="cyber-input" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="cyber-input" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="cyber-input cyber-textarea" placeholder="Your message..." rows={5} />
                </div>
                <button className="cyber-button primary w-full mt-6">
                  <span className="button-content">Transmit Message</span>
                  <span className="button-glitch" />
                </button>
              </div>

              {/* Social Links */}
              <div className="social-links">
                <a href="#" className="social-link">
                  <span className="social-icon">📧</span>
                  <span className="social-text">hello@nexus.dev</span>
                </a>
                <a href="#" className="social-link">
                  <span className="social-icon">🐦</span>
                  <span className="social-text">@nexus_dev</span>
                </a>
                <a href="#" className="social-link">
                  <span className="social-icon">💼</span>
                  <span className="social-text">linkedin.com/in/nexus</span>
                </a>
                <a href="#" className="social-link">
                  <span className="social-icon">🐙</span>
                  <span className="social-text">github.com/nexus</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-gray-800">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-500 text-sm">
              © 2024 <span className="neon-cyan">NEXUS</span>. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Built with ❤️ and lots of ☕
            </p>
          </div>
        </footer>
      </div>

      {/* Corner decorations */}
      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />

      <style jsx global>{`
        /* ========== BASE STYLES ========== */
        * {
          box-sizing: border-box;
        }

        /* ========== NEON COLORS ========== */
        .neon-cyan {
          color: #00ffff;
          text-shadow: 
            0 0 5px #00ffff,
            0 0 10px #00ffff,
            0 0 20px #00ffff,
            0 0 40px #00ffff;
        }

        .neon-magenta {
          color: #ff00ff;
          text-shadow: 
            0 0 5px #ff00ff,
            0 0 10px #ff00ff,
            0 0 20px #ff00ff,
            0 0 40px #ff00ff;
        }

        /* ========== FILM GRAIN ========== */
        .film-grain {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          animation: grain 0.3s steps(1) infinite;
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(1%, 1%); }
          30% { transform: translate(-1%, 1%); }
          40% { transform: translate(1%, -1%); }
          50% { transform: translate(-1%, 0); }
          60% { transform: translate(1%, 0); }
          70% { transform: translate(0, 1%); }
          80% { transform: translate(0, -1%); }
          90% { transform: translate(1%, 1%); }
        }

        /* ========== CRT SCANLINES ========== */
        .crt-scanlines {
          position: fixed;
          inset: 0;
          z-index: 9998;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15) 0px,
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
        }

        /* ========== RADIAL GRADIENT ========== */
        .bg-gradient-radial {
          background: radial-gradient(
            ellipse at center,
            transparent 0%,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0.8) 100%
          );
        }

        /* ========== PARALLAX CITYSCAPE ========== */
        .cityscape {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60vh;
          overflow: hidden;
        }

        .city-layer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          background-size: 200% 100%;
          background-repeat: repeat-x;
        }

        .city-layer-far {
          background: linear-gradient(to top, transparent 0%, transparent 100%);
          opacity: 0.3;
          animation: cityMove 60s linear infinite;
        }

        .city-layer-far::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: 
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 40px,
              rgba(0, 255, 255, 0.03) 40px,
              rgba(0, 255, 255, 0.03) 42px
            ),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 80px,
              rgba(255, 0, 255, 0.02) 80px,
              rgba(255, 0, 255, 0.02) 84px
            );
        }

        .city-layer-mid {
          opacity: 0.5;
          animation: cityMove 40s linear infinite reverse;
        }

        .city-layer-mid::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 55%;
          background: 
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 30px,
              rgba(0, 255, 255, 0.05) 30px,
              rgba(0, 255, 255, 0.05) 32px
            ),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 60px,
              rgba(255, 0, 255, 0.03) 60px,
              rgba(255, 0, 255, 0.03) 64px
            );
        }

        .city-layer-near {
          opacity: 0.7;
          animation: cityMove 25s linear infinite;
        }

        .city-layer-near::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 70%;
          background: 
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 20px,
              rgba(0, 255, 255, 0.08) 20px,
              rgba(0, 255, 255, 0.08) 22px
            ),
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 45px,
              rgba(255, 0, 255, 0.05) 45px,
              rgba(255, 0, 255, 0.05) 48px
            );
        }

        /* Building silhouettes */
        .city-layer::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'%3E%3Cpath fill='rgba(0,255,255,0.1)' d='M0,400 L0,300 L30,300 L30,250 L50,250 L50,280 L80,280 L80,320 L100,320 L100,260 L120,260 L120,240 L140,240 L140,290 L160,290 L160,310 L200,310 L200,200 L220,200 L220,180 L250,180 L250,220 L280,220 L280,270 L310,270 L310,150 L340,150 L340,130 L360,130 L360,180 L390,180 L390,250 L420,250 L420,120 L450,120 L450,100 L470,100 L470,140 L500,140 L500,200 L530,200 L530,280 L560,280 L560,160 L590,160 L590,140 L620,140 L620,190 L650,190 L650,110 L680,110 L680,90 L710,90 L710,130 L740,130 L740,180 L770,180 L770,260 L800,260 L800,170 L830,170 L830,150 L860,150 L860,200 L890,200 L890,130 L920,130 L920,110 L950,110 L950,160 L980,160 L980,230 L1010,230 L1010,290 L1040,290 L1040,200 L1070,200 L1070,180 L1100,180 L1100,240 L1130,240 L1130,300 L1160,300 L1160,270 L1200,270 L1200,400 Z'/%3E%3C/svg%3E");
          background-size: 100% 100%;
          background-repeat: repeat-x;
          animation: citySway 20s ease-in-out infinite;
        }

        .city-layer-mid::after {
          opacity: 0.6;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'%3E%3Cpath fill='rgba(255,0,255,0.08)' d='M0,400 L0,350 L40,350 L40,280 L70,280 L70,250 L100,250 L100,300 L140,300 L140,220 L180,220 L180,180 L210,180 L210,240 L250,240 L250,310 L290,310 L290,200 L330,200 L330,160 L370,160 L370,210 L410,210 L410,280 L450,280 L450,140 L490,140 L490,110 L530,110 L530,170 L570,170 L570,240 L610,240 L610,150 L650,150 L650,120 L690,120 L690,180 L730,180 L730,260 L770,260 L770,170 L810,170 L810,140 L850,140 L850,200 L890,200 L890,270 L930,270 L930,180 L970,180 L970,150 L1010,150 L1010,210 L1050,210 L1050,290 L1090,290 L1090,220 L1130,220 L1130,280 L1170,280 L1170,330 L1200,330 L1200,400 Z'/%3E%3C/svg%3E");
        }

        .city-layer-near::after {
          opacity: 0.8;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'%3E%3Cpath fill='rgba(0,255,255,0.12)' d='M0,400 L0,360 L50,360 L50,290 L90,290 L90,250 L130,250 L130,310 L170,310 L170,230 L210,230 L210,190 L260,190 L260,260 L300,260 L300,330 L340,330 L340,210 L380,210 L380,170 L420,170 L420,240 L460,240 L460,300 L500,300 L500,180 L540,180 L540,140 L580,140 L580,210 L620,210 L620,280 L660,280 L660,160 L700,160 L700,130 L740,130 L740,200 L780,200 L780,270 L820,270 L820,180 L860,180 L860,150 L900,150 L900,220 L940,220 L940,290 L980,290 L980,200 L1020,200 L1020,170 L1060,170 L1060,240 L1100,240 L1100,310 L1140,310 L1140,260 L1180,260 L1180,340 L1200,340 L1200,400 Z'/%3E%3C/svg%3E");
        }

        @keyframes cityMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes citySway {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(-5px) scaleY(1.02); }
        }

        /* ========== MARQUEE ========== */
        .marquee-container {
          mask-image: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
        }

        .marquee-content {
          display: flex;
          animation: marquee 20s linear infinite;
        }

        .marquee-text {
          white-space: nowrap;
          font-size: clamp(1rem, 3vw, 1.5rem);
          font-weight: bold;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #00ffff, #ff00ff, #00ffff);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientMove 3s linear infinite;
          padding-right: 4rem;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        /* ========== GLITCH HEADLINE ========== */
        .glitch-headline {
          position: relative;
          font-family: monospace;
          letter-spacing: 0.1em;
          animation: glitchText 3s infinite;
        }

        .glitch-headline::before,
        .glitch-headline::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-headline::before {
          color: #ff00ff;
          animation: glitchBefore 2s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
          transform: translate(-2px, -2px);
        }

        .glitch-headline::after {
          color: #00ffff;
          animation: glitchAfter 2s infinite;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
          transform: translate(2px, 2px);
        }

        @keyframes glitchText {
          0%, 90%, 100% { opacity: 1; }
          92% { opacity: 0.8; }
          94% { opacity: 1; }
          96% { opacity: 0.9; }
        }

        @keyframes glitchBefore {
          0%, 90%, 100% { transform: translate(0); }
          92% { transform: translate(-5px, 2px); }
          94% { transform: translate(5px, -2px); }
          96% { transform: translate(-2px, 5px); }
        }

        @keyframes glitchAfter {
          0%, 90%, 100% { transform: translate(0); }
          91% { transform: translate(5px, -2px); }
          93% { transform: translate(-5px, 2px); }
          95% { transform: translate(2px, -5px); }
        }

        /* ========== CYBER BUTTONS ========== */
        .cyber-button {
          position: relative;
          padding: 1rem 2.5rem;
          font-size: 1rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          border: none;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s ease;
          clip-path: polygon(
            0 0,
            calc(100% - 15px) 0,
            100% 15px,
            100% 100%,
            15px 100%,
            0 calc(100% - 15px)
          );
        }

        .cyber-button.primary {
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 255, 255, 0.1));
          color: #00ffff;
          border: 2px solid #00ffff;
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.3),
            inset 0 0 20px rgba(0, 255, 255, 0.1);
        }

        .cyber-button.secondary {
          background: linear-gradient(135deg, rgba(255, 0, 255, 0.2), rgba(255, 0, 255, 0.1));
          color: #ff00ff;
          border: 2px solid #ff00ff;
          box-shadow: 
            0 0 20px rgba(255, 0, 255, 0.3),
            inset 0 0 20px rgba(255, 0, 255, 0.1);
        }

        .cyber-button:hover {
          transform: scale(1.05);
        }

        .cyber-button.primary:hover {
          box-shadow: 
            0 0 40px rgba(0, 255, 255, 0.5),
            inset 0 0 30px rgba(0, 255, 255, 0.2);
          text-shadow: 0 0 10px #00ffff;
        }

        .cyber-button.secondary:hover {
          box-shadow: 
            0 0 40px rgba(255, 0, 255, 0.5),
            inset 0 0 30px rgba(255, 0, 255, 0.2);
          text-shadow: 0 0 10px #ff00ff;
        }

        .button-content {
          position: relative;
          z-index: 2;
        }

        .button-glitch {
          position: absolute;
          inset: 0;
          background: inherit;
          opacity: 0;
        }

        .cyber-button:hover .button-glitch {
          animation: buttonGlitch 0.3s ease;
        }

        @keyframes buttonGlitch {
          0%, 100% { opacity: 0; transform: translate(0); }
          20% { opacity: 0.8; transform: translate(-2px, 2px); }
          40% { opacity: 0.6; transform: translate(2px, -2px); }
          60% { opacity: 0.4; transform: translate(-2px, -2px); }
          80% { opacity: 0.2; transform: translate(2px, 2px); }
        }

        /* ========== SCROLL INDICATOR ========== */
        .scroll-indicator {
          animation: scrollBounce 2s ease-in-out infinite;
        }

        .scroll-arrow {
          width: 30px;
          height: 50px;
          border: 2px solid rgba(0, 255, 255, 0.5);
          border-radius: 25px;
          position: relative;
        }

        .scroll-arrow::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: #00ffff;
          border-radius: 50%;
          animation: scrollDot 1.5s ease-in-out infinite;
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        @keyframes scrollDot {
          0%, 100% { top: 10px; opacity: 1; }
          50% { top: 25px; opacity: 0.5; }
        }

        /* ========== PROFILE CARD ========== */
        .profile-card {
          perspective: 1000px;
          width: 100%;
          max-width: 350px;
          height: 400px;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .profile-card:hover .card-inner {
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(20, 20, 40, 0.9), rgba(30, 30, 60, 0.9));
          border: 1px solid rgba(0, 255, 255, 0.3);
          box-shadow: 
            0 0 30px rgba(0, 255, 255, 0.2),
            inset 0 0 30px rgba(0, 255, 255, 0.05);
        }

        .card-back {
          transform: rotateY(180deg);
          background: linear-gradient(135deg, rgba(40, 20, 40, 0.9), rgba(60, 30, 60, 0.9));
          border-color: rgba(255, 0, 255, 0.3);
          box-shadow: 
            0 0 30px rgba(255, 0, 255, 0.2),
            inset 0 0 30px rgba(255, 0, 255, 0.05);
        }

        .avatar-container {
          position: relative;
          width: 120px;
          height: 120px;
        }

        .avatar-ring {
          position: absolute;
          inset: 0;
          border: 3px solid transparent;
          border-radius: 50%;
          background: linear-gradient(45deg, #00ffff, #ff00ff, #00ffff) border-box;
          -webkit-mask: 
            linear-gradient(#fff 0 0) padding-box, 
            linear-gradient(#fff 0 0);
          mask: 
            linear-gradient(#fff 0 0) padding-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: ringRotate 4s linear infinite;
        }

        @keyframes ringRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .avatar {
          position: absolute;
          inset: 10px;
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: avatarPulse 2s ease-in-out infinite;
        }

        @keyframes avatarPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 0, 255, 0.5); }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          width: 100%;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 2rem;
          font-weight: bold;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ========== TERMINAL WINDOW ========== */
        .terminal-window {
          background: rgba(10, 10, 20, 0.9);
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(0, 255, 255, 0.2);
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.1);
        }

        .terminal-header {
          background: rgba(30, 30, 50, 0.9);
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .terminal-dot.red { background: #ff5f56; }
        .terminal-dot.yellow { background: #ffbd2e; }
        .terminal-dot.green { background: #27ca40; }

        .terminal-title {
          margin-left: 1rem;
          color: #888;
          font-size: 0.8rem;
          font-family: monospace;
        }

        .terminal-body {
          padding: 1.5rem;
          font-family: monospace;
        }

        .terminal-line {
          color: #00ffff;
          margin-bottom: 0.5rem;
        }

        .terminal-prompt {
          color: #ff00ff;
          margin-right: 0.5rem;
        }

        .terminal-output {
          color: #ccc;
          line-height: 1.6;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .skill-tag {
          background: rgba(0, 255, 255, 0.1);
          border: 1px solid rgba(0, 255, 255, 0.3);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          color: #00ffff;
          transition: all 0.3s ease;
        }

        .skill-tag:hover {
          background: rgba(0, 255, 255, 0.2);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        /* ========== PROJECTS GRID ========== */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .project-card {
          background: rgba(20, 20, 40, 0.8);
          border-radius: 15px;
          overflow: hidden;
          border: 1px solid rgba(0, 255, 255, 0.2);
          transition: all 0.4s ease;
        }

        .project-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 255, 255, 0.5);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 30px rgba(0, 255, 255, 0.2);
        }

        .project-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .project-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pixel-icon {
          font-size: 4rem;
          filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.5));
          transition: all 0.3s ease;
        }

        .project-card:hover .pixel-icon {
          transform: scale(1.2) rotate(10deg);
          filter: drop-shadow(0 0 30px rgba(255, 0, 255, 0.8));
        }

        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .overlay-text {
          color: #00ffff;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          text-shadow: 0 0 10px #00ffff;
        }

        .project-info {
          padding: 1.5rem;
        }

        .project-title {
          font-size: 1.25rem;
          font-weight: bold;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        .project-desc {
          color: #888;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .project-tags span {
          background: rgba(255, 0, 255, 0.1);
          border: 1px solid rgba(255, 0, 255, 0.3);
          padding: 0.2rem 0.6rem;
          border-radius: 15px;
          font-size: 0.7rem;
          color: #ff00ff;
        }

        /* ========== CONTACT FORM ========== */
        .contact-container {
          display: grid;
          md:grid-cols-2;
          gap: 3rem;
        }

        @media (min-width: 768px) {
          .contact-container {
            grid-template-columns: 1fr 1fr;
          }
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          color: #888;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .cyber-input {
          background: rgba(20, 20, 40, 0.8);
          border: 1px solid rgba(0, 255, 255, 0.3);
          border-radius: 8px;
          padding: 1rem;
          color: #fff;
          font-size: 1rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .cyber-input:focus {
          border-color: #00ffff;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
        }

        .cyber-input::placeholder {
          color: #555;
        }

        .cyber-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .social-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          background: rgba(20, 20, 40, 0.6);
          border: 1px solid rgba(255, 0, 255, 0.2);
          border-radius: 10px;
          text-decoration: none;
          color: #fff;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          border-color: rgba(255, 0, 255, 0.5);
          background: rgba(255, 0, 255, 0.1);
          transform: translateX(10px);
          box-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
        }

        .social-icon {
          font-size: 1.5rem;
        }

        .social-text {
          font-size: 0.9rem;
          color: #aaa;
        }

        /* ========== CORNER DECORATIONS ========== */
        .corner-decoration {
          position: fixed;
          width: 100px;
          height: 100px;
          pointer-events: none;
          z-index: 100;
        }

        .corner-decoration.top-left {
          top: 20px;
          left: 20px;
          border-left: 2px solid rgba(0, 255, 255, 0.3);
          border-top: 2px solid rgba(0, 255, 255, 0.3);
        }

        .corner-decoration.top-right {
          top: 20px;
          right: 20px;
          border-right: 2px solid rgba(255, 0, 255, 0.3);
          border-top: 2px solid rgba(255, 0, 255, 0.3);
        }

        .corner-decoration.bottom-left {
          bottom: 20px;
          left: 20px;
          border-left: 2px solid rgba(255, 0, 255, 0.3);
          border-bottom: 2px solid rgba(255, 0, 255, 0.3);
        }

        .corner-decoration.bottom-right {
          bottom: 20px;
          right: 20px;
          border-right: 2px solid rgba(0, 255, 255, 0.3);
          border-bottom: 2px solid rgba(0, 255, 255, 0.3);
        }

        /* ========== RESPONSIVE DESIGN ========== */
        @media (max-width: 768px) {
          .glitch-headline {
            font-size: 3rem !important;
          }

          .subtitle {
            font-size: 1rem !important;
            letter-spacing: 0.15em;
          }

          .cyber-button {
            padding: 0.8rem 1.5rem;
            font-size: 0.8rem;
          }

          .profile-card {
            max-width: 100%;
            height: 350px;
          }

          .stats-grid {
            gap: 1rem;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          .corner-decoration {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 480px) {
          .glitch-headline {
            font-size: 2.5rem !important;
          }

          .projects-grid {
            grid-template-columns: 1fr;
          }

          .terminal-body {
            padding: 1rem;
          }
        }
      `}</style>
    </main>
  )
}

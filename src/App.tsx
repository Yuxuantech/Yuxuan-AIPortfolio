/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageSquare, Phone, PhoneOff, Globe, X } from 'lucide-react';
import { I18N_DATA, IMAGES } from './constants';
import { Language, SkillItem } from './types';

function TarotCard({ skill, index, hint, isLong }: { skill: SkillItem; index: number; hint: string; isLong?: boolean; key?: any }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const gradients = [
    'linear-gradient(135deg, #e0e7ff 0%, #fae8ff 100%)', // Indigo to Fuchsia
    'linear-gradient(135deg, #ffedd5 0%, #fee2e2 100%)', // Orange to Red
    'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)', // Green to Emerald
    'linear-gradient(135deg, #fef9c3 0%, #fff7ed 100%)', // Yellow to Orange
    'linear-gradient(135deg, #cffafe 0%, #dbeafe 100%)', // Cyan to Blue
    'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', // Slate to Purple
    'linear-gradient(135deg, #fff1f2 0%, #fff5f5 100%)', // Rose to Red
  ];

  return (
    <motion.div
      className={`relative ${isLong ? 'h-[160px]' : 'h-[400px]'} w-full cursor-pointer perspective-1000`}
      onClick={() => setIsFlipped(!isFlipped)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        className="relative h-full w-full transition-all duration-700 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 backface-hidden rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center border-2 border-white/50 shadow-lg"
          style={{ background: gradients[index % gradients.length] }}
        >
          <h3 className={`${isLong ? 'text-xl' : 'text-2xl'} font-display italic text-earth/80`}>{skill.title}</h3>
          {!isLong && <div className="mt-8 text-[9px] uppercase tracking-[0.3em] opacity-30">{hint}</div>}
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden glass-module rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center bg-stone-900/5 border-2 border-orange-accent/40 overflow-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <p className={`${isLong ? 'text-xs md:text-sm' : 'text-sm'} leading-relaxed text-earth/80 font-light whitespace-pre-line`}>
            {skill.desc}
          </p>
          {!isLong && <div className="mt-auto text-[9px] uppercase tracking-[0.3em] opacity-40">Click to Return</div>}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ExpItem {
  date: string;
  title: string;
  active?: boolean;
  details?: string;
  image?: string;
  externalLink?: string;
}

function ResumeModal({ onClose, labels }: { onClose: () => void; labels: any }) {
  const options = [
    { 
      title: "中文简历 (项目·产品版)", 
      link: "https://github.com/yson3892/Ai-/raw/main/%E5%AE%8B%E5%AE%87%E8%BD%A9%20%20%E7%AE%80%E5%8E%86%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%E9%A1%B9%E7%9B%AE%3A%E4%BA%A7%E5%93%81%E7%89%88.pdf" 
    },
    { 
      title: "中文简历 (市场·运营版)", 
      link: "https://github.com/yson3892/Ai-/raw/main/%E5%AE%8B%E5%AE%87%E8%BD%A9%20%E7%AE%80%E5%8E%86%20%20%20%20%20%20%20%20%20%E5%B8%82%E5%9C%BA%3A%E8%BF%90%E8%90%A5%E7%89%88.pdf" 
    },
    { 
      title: "ENGLISH RESUME", 
      link: "https://github.com/yson3892/Ai-/raw/main/Yuxuan%20Song%20%20Resume.pdf" 
    },
  ];

  return (
    <motion.div 
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="w-full max-w-md bg-white/30 backdrop-blur-[60px] border-2 border-white/50 rounded-[3rem] p-10 shadow-[0_30px_70px_rgba(0,0,0,0.2)]"
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-10">
          <h3 className="text-[10px] uppercase tracking-[0.5em] opacity-40 mb-4">{labels["resume-btn"]}</h3>
          <div className="h-[1px] w-12 bg-orange-accent mx-auto"></div>
        </div>

        <div className="space-y-4">
          {options.map((opt, i) => (
            <motion.a
              key={i}
              href={opt.link}
              download
              className="block w-full py-5 px-6 glass-module rounded-2xl text-[11px] uppercase tracking-[0.2em] font-medium text-earth/80 hover:bg-white/60 hover:text-orange-accent border-white/40 border transition-all flex items-center justify-between group"
              whileHover={{ x: 10 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <span>{opt.title}</span>
              <Globe className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="mt-12 w-full py-4 text-[10px] uppercase tracking-[0.4em] opacity-30 hover:opacity-100 transition-opacity"
        >
          {labels["modal-back"]}
        </button>
      </motion.div>
    </motion.div>
  );
}

function BrowserModal({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <motion.div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-stone-900/40 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="w-full h-full max-w-6xl bg-white/30 backdrop-blur-[60px] border-2 border-white/50 rounded-[3rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.2)] flex flex-col relative"
        initial={{ scale: 0.95, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 30, opacity: 0 }}
      >
        {/* Browser Header */}
        <div className="h-14 bg-white/40 border-b border-white/40 flex items-center px-6 gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400 opacity-60"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-60"></div>
            <div className="w-3 h-3 rounded-full bg-green-400 opacity-60"></div>
          </div>
          <div className="flex-grow bg-white/30 rounded-lg px-4 py-1 text-[10px] text-earth/50 truncate font-mono">
            {url}
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/40 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Iframe content */}
        <div className="flex-grow bg-white/10 relative">
          <iframe 
            src={url} 
            className="w-full h-full border-none"
            title="External Link Preview"
          />
          {/* Note overlay in case of iframe blocking */}
          <div className="absolute bottom-6 right-6 z-10">
            <div className="glass-module p-6 rounded-2xl max-w-xs shadow-xl border-white/40">
              <p className="text-[10px] text-earth/60 mb-3 leading-relaxed">
                * Note: Feishu/Lark links may prevent internal reading due to security settings.
              </p>
              <a 
                href={url} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[10px] uppercase tracking-widest text-orange-accent hover:underline flex items-center gap-2"
              >
                Open in new tab <Globe className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Y2KModal({ item, onClose, onOpenLink, backLabel, linkLabel }: { 
  item: ExpItem; 
  onClose: () => void; 
  onOpenLink: (url: string) => void;
  backLabel: string;
  linkLabel: string;
}) {
  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-stone-900/20 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="w-full max-w-2xl bg-white/40 backdrop-blur-[40px] border-2 border-white/50 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col relative"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="h-12 bg-white/30 border-b border-white/40 flex items-center justify-between px-6">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">{item.date}</span>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-red-400/20 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12 overflow-y-auto max-h-[70vh]">
          <div className="mb-8">
            <h3 className="text-4xl font-display italic mb-4">{item.title}</h3>
            <div className="h-1 w-12 bg-orange-accent/40 mb-8"></div>
          </div>

          {/* Image Display */}
          <div className="w-full aspect-video rounded-2xl bg-stone-200/50 border border-white/30 mb-6 flex items-center justify-center overflow-hidden">
            {item.image ? (
              <img src={item.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <span className="text-[10px] uppercase tracking-widest opacity-30 italic">Experience Visual Placeholder</span>
            )}
          </div>

          {/* External Link Section - More Prominent below Image */}
          {item.externalLink && (
            <motion.button
              className="w-full mb-8 py-4 glass-module rounded-2xl text-[11px] uppercase tracking-[0.3em] font-bold text-orange-accent hover:bg-orange-accent/10 border-orange-accent/30 flex items-center justify-center gap-3 transition-all group"
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 126, 80, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenLink(item.externalLink!)}
            >
              <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              {linkLabel}
            </motion.button>
          )}

          {/* Experience Description */}
          <div className="space-y-4 text-earth/70 leading-relaxed font-light whitespace-pre-line">
            {item.details ? (
              <p>{item.details}</p>
            ) : (
              <p>
                这段经历的详细描述将在这里呈现。我们将探讨项目背景、核心职责以及取得的成果。通过数字美学与技术集成的视角，重新审视这段时间的成长与沉淀。
              </p>
            )}
            {item.externalLink && (
              <p className="text-xs italic text-earth/50">
                * 您可以点击上方图片区域的按钮，在站内预览相关详细案例或 Wiki 内容。
              </p>
            )}
          </div>
        </div>

        {/* Footer / Back Button */}
        <div className="p-8 flex justify-center border-t border-white/20">
          <button 
            onClick={onClose}
            className="px-12 py-3 bg-white/20 hover:bg-white/40 border border-white/40 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold transition-all backdrop-blur-sm"
          >
            {backLabel}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function IncomingCall({ lang }: { lang: Language }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false); // Ref to track actual state for timers
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const bgmTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const content = I18N_DATA[lang];

  const VOICE_URL = "https://raw.githubusercontent.com/yson3892/Ai-/main/%E8%AF%AD%E9%9F%B3%E6%92%AD%E6%94%BE%E4%BB%8B%E7%BB%8D.m4a";
  const BGM_URL = "https://raw.githubusercontent.com/yson3892/Ai-/main/In%20The%20Forest.mp3";

  useEffect(() => {
    // 1. Voice Audio
    const audio = new Audio();
    audio.loop = false;
    audioRef.current = audio;

    // 2. BGM Audio
    const bgm = new Audio();
    bgm.loop = false;
    bgm.volume = 0;
    bgm.addEventListener('ended', () => stopAll());
    bgmRef.current = bgm;

    return () => {
      stopAll();
      audioRef.current = null;
      bgmRef.current = null;
    };
  }, []);

  const stopAll = () => {
    if (bgmTimeoutRef.current) clearTimeout(bgmTimeoutRef.current);
    isPlayingRef.current = false;
    setIsPlaying(false);
    
    const resetAudio = (audio: HTMLAudioElement | null) => {
      if (audio) {
        audio.onloadedmetadata = null;
        if (!audio.paused) {
          audio.pause();
        }
        audio.currentTime = 0;
      }
    };
    
    resetAudio(audioRef.current);
    resetAudio(bgmRef.current);
  };

  const handleAnswer = () => {
    stopAll();
    setIsPlaying(true);
    isPlayingRef.current = true;
    setShowHint(false);

    const voiceUrl = "https://raw.githubusercontent.com/yson3892/Ai-/main/%E8%AF%AD%E9%9F%B3%E6%92%AD%E6%94%BE%E4%BB%8B%E7%BB%8D.m4a";
    const bgmUrl = "https://raw.githubusercontent.com/yson3892/Ai-/main/In%20The%20Forest.mp3";

    if (audioRef.current && bgmRef.current) {
      audioRef.current.src = voiceUrl;
      bgmRef.current.src = bgmUrl;
      bgmRef.current.volume = 0;

      const triggerFadeIn = () => {
        if (!isPlayingRef.current || !audioRef.current) return;
        
        const duration = audioRef.current.duration;
        // Start fading in 3s before the end. If audio is shorter than 3s, start almost immediately.
        const fadeStartTime = Math.max(50, (duration - 3) * 1000);

        bgmTimeoutRef.current = setTimeout(() => {
          if (bgmRef.current && isPlayingRef.current) {
            let vol = 0;
            const fadeInterval = setInterval(() => {
              if (bgmRef.current && isPlayingRef.current && vol < 0.25) {
                vol += 0.02;
                bgmRef.current.volume = vol;
              } else {
                clearInterval(fadeInterval);
              }
            }, 200);
          }
        }, fadeStartTime);
      };

      // Set up metadata listener to get duration
      audioRef.current.onloadedmetadata = triggerFadeIn;

      setTimeout(() => {
        if (!isPlayingRef.current) return;

        audioRef.current?.play().catch(err => {
          if (err.name !== 'AbortError') console.error("Voice playback failed:", err);
        });

        bgmRef.current?.play().catch(err => {
          if (err.name !== 'AbortError') console.error("BGM immediate play failed:", err);
        });

        // If metadata already loaded, trigger immediately
        if (audioRef.current?.readyState && audioRef.current.readyState >= 1) {
          triggerFadeIn();
        }
      }, 50);
    }
  };

  const handleHangUp = () => {
    stopAll();
    setShowHint(false);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showHint && (
          <motion.div 
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 bg-stone-900/80 backdrop-blur-md rounded-full border border-white/20 text-[9px] uppercase tracking-[0.2em] text-white font-bold pointer-events-none shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {lang === 'zh' ? '🟢 点击播放语音 · 🔴 停止' : '🟢 PLAY VOICE · 🔴 STOP'}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="flex items-center gap-4 bg-stone-900/90 backdrop-blur-2xl border border-white/10 p-2 pr-5 rounded-2xl shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
      {/* Picture Frame (图片框) */}
      <div className="w-12 h-12 rounded-xl bg-stone-800 overflow-hidden border border-white/20 flex-shrink-0 shadow-inner relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
        <img 
          src={IMAGES.memoji} 
          alt="Avatar" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          referrerPolicy="no-referrer" 
        />
      </div>

      {/* Info - Side by Side */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-[7px] uppercase tracking-[0.3em] text-white/30 whitespace-nowrap mb-0.5">{content["call-incoming"]}</span>
          <span className="text-[12px] font-bold text-white tracking-wider whitespace-nowrap">{content["call-name"]}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 ml-2">
        <button 
          onClick={handleHangUp}
          className="w-9 h-9 rounded-full bg-[#ff4d4d] flex items-center justify-center text-white hover:bg-red-600 transition-all shadow-lg active:scale-90"
        >
          <PhoneOff className="w-4 h-4 rotate-[135deg]" />
        </button>
        <button 
          onClick={handleAnswer}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-all shadow-lg active:scale-90 ${isPlaying ? 'bg-green-600 animate-pulse' : 'bg-[#2ecc71] hover:bg-green-600'}`}
        >
          <Phone className="w-4 h-4" />
        </button>
      </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [selectedExp, setSelectedExp] = useState<ExpItem | null>(null);
  const [activeBrowserLink, setActiveBrowserLink] = useState<string | null>(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const content = I18N_DATA[lang];

  const toggleLang = () => {
    setLang((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  return (
    <div className="scroll-smooth">
      <AnimatePresence>
        {selectedExp && (
          <Y2KModal 
            item={selectedExp} 
            onClose={() => setSelectedExp(null)} 
            onOpenLink={(url) => setActiveBrowserLink(url)}
            backLabel={content["modal-back"]} 
            linkLabel={content["exp-link-btn"]}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showResumeModal && (
          <ResumeModal 
            onClose={() => setShowResumeModal(false)} 
            labels={content}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeBrowserLink && (
          <BrowserModal 
            url={activeBrowserLink} 
            onClose={() => setActiveBrowserLink(null)} 
          />
        )}
      </AnimatePresence>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-10 py-8 flex justify-between items-center mix-blend-multiply">
        <div className="text-[10px] font-light tracking-[0.5em] uppercase opacity-60">
          {content["nav-portfolio"]}
        </div>
        <div className="hidden md:flex gap-12 text-[9px] uppercase tracking-[0.4em] opacity-40 font-bold">
          <a href="#about" className="hover:opacity-100 transition-opacity">{content["nav-about"]}</a>
          <a href="#education" className="hover:opacity-100 transition-opacity">{content["nav-edu"]}</a>
          <a href="#experience" className="hover:opacity-100 transition-opacity">{content["nav-exp"]}</a>
          <a href="#skills" className="hover:opacity-100 transition-opacity">{content["nav-skills"]}</a>
          <a href="#contact" className="hover:opacity-100 transition-opacity">{content["nav-cta"]}</a>
        </div>
        <button 
          onClick={toggleLang}
          className="text-[9px] uppercase tracking-widest border border-stone-800 px-3 py-1 rounded-full opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2"
        >
          <Globe className="w-3 h-3" />
          {lang === 'zh' ? 'EN' : '中'}
        </button>
      </nav>

      {/* Hero Section */}
      <div className="section-hero min-h-screen relative overflow-hidden">
        <section id="about" className="min-h-screen max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 md:px-10 gap-20 pt-32 relative z-20">
          
          {/* Unveil Container */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <motion.div 
              className="relative w-[300px] h-[350px] md:w-[400px] md:h-[450px] group"
              initial="initial"
              whileHover="hover"
            >
              {/* Card 4 - Horizontal */}
              <motion.div 
                className="absolute left-1/2 top-1/2 w-[200px] h-[140px] md:w-[260px] md:h-[180px] -ml-[100px] -mt-[70px] md:-ml-[130px] md:-mt-[90px] glass-module rounded-[1.8rem] overflow-hidden p-2 z-[2] opacity-80 group-hover:opacity-100"
                variants={{
                  initial: { rotate: 15, x: 40, y: 10 },
                  hover: { rotate: 20, x: 260, y: -60 }
                }}
                transition={{ duration: 0.9, ease: [0.2, 1, 0.3, 1] }}
                whileHover={{ zIndex: 100, scale: 1.15, rotate: 0, x: 0, y: 0 }}
                style={{ transformOrigin: 'center' }}
              >
                <img src={IMAGES.h2} className="w-full h-full object-cover rounded-[1.3rem] bg-stone-200" referrerPolicy="no-referrer" />
              </motion.div>

              {/* Card 3 - Horizontal */}
              <motion.div 
                className="absolute left-1/2 top-1/2 w-[200px] h-[140px] md:w-[260px] md:h-[180px] -ml-[100px] -mt-[70px] md:-ml-[130px] md:-mt-[90px] glass-module rounded-[1.8rem] overflow-hidden p-2 z-[2] opacity-80 group-hover:opacity-100"
                variants={{
                  initial: { rotate: -20, x: -40, y: 10 },
                  hover: { rotate: -20, x: -260, y: -60 }
                }}
                transition={{ duration: 0.9, ease: [0.2, 1, 0.3, 1] }}
                whileHover={{ zIndex: 100, scale: 1.15, rotate: 0, x: 0, y: 0 }}
                style={{ transformOrigin: 'center' }}
              >
                <img src={IMAGES.h1} className="w-full h-full object-cover rounded-[1.3rem] bg-stone-200" referrerPolicy="no-referrer" />
              </motion.div>

              {/* Card 2 - Vertical */}
              <motion.div 
                className="absolute left-1/2 top-1/2 w-[160px] h-[220px] md:w-[220px] md:h-[300px] -ml-[80px] -mt-[110px] md:-ml-[110px] md:-mt-[150px] glass-module rounded-[2rem] overflow-hidden p-2 z-[4]"
                variants={{
                  initial: { rotate: 5, x: 20, y: 0 },
                  hover: { rotate: 10, x: 140, y: -20 }
                }}
                transition={{ duration: 0.9, ease: [0.2, 1, 0.3, 1] }}
                whileHover={{ zIndex: 100, scale: 1.15, rotate: 0, x: 0, y: 0 }}
                style={{ transformOrigin: 'center' }}
              >
                <img src={IMAGES.v2} className="w-full h-full object-cover rounded-[1.5rem] bg-stone-200" referrerPolicy="no-referrer" />
              </motion.div>

              {/* Card 1 - Vertical (Main) */}
              <motion.div 
                className="absolute left-1/2 top-1/2 w-[160px] h-[220px] md:w-[220px] md:h-[300px] -ml-[80px] -mt-[110px] md:-ml-[110px] md:-mt-[150px] glass-module rounded-[2.5rem] overflow-hidden p-3 shadow-2xl z-[5]"
                variants={{
                  initial: { rotate: -12, x: -20, y: 0 },
                  hover: { rotate: -10, x: -140, y: -20 }
                }}
                transition={{ duration: 0.9, ease: [0.2, 1, 0.3, 1] }}
                whileHover={{ zIndex: 100, scale: 1.15, rotate: 0, x: 0, y: 0 }}
                style={{ transformOrigin: 'center' }}
              >
                <img src={IMAGES.main} className="w-full h-full object-cover rounded-[2rem] bg-stone-200" referrerPolicy="no-referrer" />
              </motion.div>
            </motion.div>
          </div>

          {/* Intro Area */}
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="space-y-4 mb-10">
              <span className="text-[10px] uppercase tracking-[0.8em] text-orange-accent/60 block">
                {content["hero-sub"]}
              </span>
              <h1 className="text-3xl md:text-5xl font-normal tracking-tighter text-earth font-display flex flex-row items-center gap-6 flex-nowrap justify-center lg:justify-start">
                <span className="whitespace-nowrap">{content["display-name"]}</span>
                <IncomingCall lang={lang} />
              </h1>
              <p className="text-xl md:text-3xl italic opacity-50 font-light font-display">
                {content["hero-role"]}
              </p>
            </div>
            <p className="text-earth/60 font-light leading-relaxed text-sm md:text-base max-w-md mx-auto lg:mx-0 mb-8 whitespace-pre-line">
              {content["hero-desc"]}
            </p>
            
            <motion.button
              className="px-10 py-4 glass-module rounded-full text-xs uppercase tracking-[0.4em] font-bold shadow-2xl border-white/60 text-earth hover:bg-white/60 transition-all backdrop-blur-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => setShowResumeModal(true)}
            >
              <span className="relative z-10 text-earth drop-shadow-sm">
                {content["resume-btn"]}
              </span>
            </motion.button>
          </motion.div>
        </section>

        <div className="land-wave"></div>
      </div>

      {/* Content Section */}
      <div className="section-content">
        {/* Education */}
        <section id="education" className="max-w-7xl mx-auto px-6 md:px-10 py-32 border-b border-stone-200">
          <motion.div 
            className="mb-16 flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] tracking-[0.5em] uppercase opacity-30">{content["nav-edu"]}</h2>
            <div className="h-[0.5px] flex-grow bg-stone-300"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div 
              className="glass-module rounded-[3.5rem] p-6 md:p-10 flex flex-col gap-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-full h-64 rounded-3xl overflow-hidden bg-stone-200">
                <img src={IMAGES.hku} className="w-full h-full object-cover opacity-80 hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="px-2">
                <p className="text-[10px] tracking-widest text-orange-accent/60 uppercase mb-2">2023 - 2025</p>
                <h3 className="text-3xl italic font-display mb-2">{content["edu-hku-major"]}</h3>
                <p className="text-sm opacity-60 leading-relaxed whitespace-pre-line">{content["edu-hku-desc"]}</p>
              </div>
            </motion.div>

            <motion.div 
              className="glass-module rounded-[3.5rem] p-6 md:p-10 flex flex-col gap-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-full h-64 rounded-3xl overflow-hidden bg-stone-200">
                <img src={IMAGES.cuhk} className="w-full h-full object-cover opacity-80 hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="px-2">
                <p className="text-[10px] tracking-widest text-orange-accent/60 uppercase mb-2">2018 - 2022</p>
                <h3 className="text-3xl italic font-display mb-2">{content["edu-cuhk-major"]}</h3>
                <p className="text-sm opacity-60 leading-relaxed whitespace-pre-line mb-6">{content["edu-cuhk-desc"]}</p>
                
                <motion.a
                  href={IMAGES.cert}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 glass-module rounded-2xl text-[11px] uppercase tracking-[0.3em] font-bold text-orange-accent hover:bg-orange-accent/10 border-orange-accent/30 flex items-center justify-center gap-3 transition-all group"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 126, 80, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  {content["edu-cert-btn"]}
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section id="experience" className="max-w-4xl mx-auto px-6 md:px-10 py-32 relative">
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] tracking-[0.5em] uppercase opacity-30 mb-2">{content["nav-exp"]}</h2>
            <div className="h-[0.5px] w-12 bg-orange-accent"></div>
          </motion.div>

          <div className="relative space-y-12 pl-12">
            <div className="timeline-line"></div>
            
            {[
              { 
                date: "2026", 
                title: content["exp-1-t"], 
                details: content["exp-1-d"],
                image: IMAGES.exp1, 
                active: true,
                externalLink: "https://scndxgb34asc.feishu.cn/wiki/T9CvwHLe9iDiW6kQiZrcHI3wn0d?from=from_copylink" 
              },
              { 
                date: "2024.08 - 2024.12", 
                title: content["exp-2-t"], 
                details: content["exp-2-d"],
                image: IMAGES.exp2,
                externalLink: "https://scndxgb34asc.feishu.cn/wiki/Jn73wr2tXioIgEk27EHce3tSnbh?from=from_copylink"
              },
              { 
                date: "2024.08 - 2024.11", 
                title: content["exp-3-t"], 
                details: content["exp-3-d"],
                image: IMAGES.exp3 
              },
              { 
                date: "2023.11 - 2024.01", 
                title: content["exp-4-t"], 
                details: content["exp-4-d"],
                image: IMAGES.exp4,
                externalLink: "https://scndxgb34asc.feishu.cn/wiki/ZL0AwkgqqirOUxkwErlcS9tTnCe?from=from_copylink"
              },
              { 
                date: "2021.06 - 2021.09", 
                title: content["exp-5-t"], 
                details: content["exp-5-d"],
                image: IMAGES.exp5 
              },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="relative glass-module p-8 rounded-[2.5rem] hover:translate-x-3 cursor-pointer group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedExp(item)}
              >
                <div className={`absolute -left-[38.5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${item.active ? 'bg-orange-accent' : 'bg-stone-400'}`}></div>
                <span className="text-[9px] opacity-40 mb-1 block tracking-widest uppercase">{item.date}</span>
                <h3 className="text-lg font-medium group-hover:text-orange-accent transition-colors">{item.title}</h3>
                <div className="mt-4 text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{content["timeline-hint"]}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Personal Skills (Tarot Cards) */}
        <section id="skills" className="max-w-7xl mx-auto px-6 md:px-10 py-32">
          <motion.div 
            className="mb-16 flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-baseline gap-4">
              <h2 className="text-[10px] tracking-[0.5em] uppercase opacity-30">{content["nav-skills"]}</h2>
              <span className="text-[9px] tracking-[0.1em] font-medium opacity-50 text-earth italic">({content["tarot-hint"]})</span>
            </div>
            <div className="h-[0.5px] flex-grow bg-stone-300"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.skills.slice(0, 6).map((skill, idx) => (
              <TarotCard key={idx} skill={skill} index={idx} hint={content["tarot-hint"]} />
            ))}
            {content.skills[6] && (
              <div className="col-span-1 md:col-span-3">
                <TarotCard skill={content.skills[6]} index={6} hint={content["tarot-hint"]} isLong />
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Contact Section */}
      <div id="contact" className="section-contact px-6 md:px-10 pt-40 pb-20">
        <motion.div 
          className="max-w-5xl mx-auto glass-module p-10 md:p-24 rounded-[3rem] md:rounded-[4.5rem] text-center bg-white/20 border-white/30 shadow-2xl backdrop-blur-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[10px] tracking-[1em] opacity-40 uppercase mb-12 md:mb-20 text-earth">
            {content["nav-cta"]}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 text-left mb-16 md:mb-24 text-earth/90">
            <div className="space-y-10">
              <div>
                <span className="text-[9px] opacity-40 block mb-4 uppercase tracking-[0.3em] flex items-center gap-3">
                  <Mail className="w-3 h-3" /> {content["contact-email"]}
                </span>
                <a href="mailto:15234185351@163.com" className="text-xl md:text-2xl font-light hover:text-white transition-colors break-all">
                  15234185351@163.com
                </a>
              </div>
              <div>
                <span className="text-[9px] opacity-40 block mb-4 uppercase tracking-[0.3em] flex items-center gap-3">
                  <MessageSquare className="w-3 h-3" /> {content["contact-wechat"]}
                </span>
                <span className="text-xl md:text-2xl font-light">15234185351</span>
              </div>
            </div>
            <div className="md:text-right flex flex-col justify-end">
              <div>
                <span className="text-[9px] opacity-40 block mb-4 uppercase tracking-[0.3em] flex items-center md:justify-end gap-3">
                  <Phone className="w-3 h-3" /> {content["contact-phone"]}
                </span>
                <a href="tel:15234185351" className="text-xl md:text-2xl font-light hover:text-white transition-colors">15234185351</a>
              </div>
            </div>
          </div>
          
          <p className="breathe-text text-5xl md:text-[8rem] italic font-normal text-white opacity-60 font-display">
            {content["c-welcome"]}
          </p>
        </motion.div>

        <footer className="mt-32 text-center relative pb-20">
          <div className="relative inline-block mb-12">
            {/* Radial Word Cloud */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {content["footer-words"].map((word, idx) => {
                // Create a more organic "word cloud" feel with varying positions and sizes
                const angle = (idx / content["footer-words"].length) * Math.PI * 2;
                const rx = 240 + (idx % 3) * 30; // Varied horizontal radius
                const ry = 110 + (idx % 2) * 20; // Varied vertical radius
                const x = Math.cos(angle) * rx;
                const y = Math.sin(angle) * ry;
                
                // Vary font sizes for cloud effect
                const fontSizes = ['text-base', 'text-lg', 'text-xl', 'text-2xl'];
                const fontSize = fontSizes[idx % fontSizes.length];
                
                return (
                  <motion.span
                    key={idx}
                    className={`absolute text-earth/30 ${fontSize} font-light whitespace-nowrap italic`}
                    initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 1.2, ease: "easeOut" }}
                    style={{ 
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                      letterSpacing: '0.1em'
                    }}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </div>

            <h2 className="text-4xl md:text-6xl italic font-medium text-earth opacity-80 font-display relative z-10" style={{ textShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              {content["footer-stay-curious"]}
            </h2>
          </div>
          
          <p className="text-[9px] text-earth/40 uppercase tracking-[0.4em]">
            © 2026 YUXUAN SONG. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </div>
    </div>
  );
}

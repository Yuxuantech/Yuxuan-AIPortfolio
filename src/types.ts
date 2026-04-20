export type Language = 'zh' | 'en';

export interface SkillItem {
  title: string;
  desc: string;
}

export interface I18nContent {
  "nav-about": string;
  "nav-edu": string;
  "nav-exp": string;
  "nav-skills": string;
  "nav-cta": string;
  "hero-sub": string;
  "hero-role": string;
  "hero-desc": string;
  "edu-hku-major": string;
  "edu-hku-desc": string;
  "edu-cuhk-major": string;
  "edu-cuhk-desc": string;
  "edu-cert-btn": string;
  "exp-1-t": string;
  "exp-1-d": string;
  "exp-2-t": string;
  "exp-2-d": string;
  "exp-3-t": string;
  "exp-3-d": string;
  "exp-4-t": string;
  "exp-4-d": string;
  "exp-5-t": string;
  "exp-5-d": string;
  "c-welcome": string;
  "display-name": string;
  "skills": SkillItem[];
  "footer-words": string[];
  "tarot-hint": string;
  "timeline-hint": string;
  "modal-back": string;
  "exp-link-btn": string;
  "contact-email": string;
  "contact-wechat": string;
  "contact-phone": string;
  "voice-welcome-text": string;
  "nav-portfolio": string;
  "resume-btn": string;
  "footer-stay-curious": string;
  "call-incoming": string;
  "call-name": string;
}

import { useState, useEffect } from 'react';
import { PRICING_PLANS } from './data';
import EnrollModal from './components/EnrollModal';
import { 
  Play, 
  Shield, 
  Check, 
  Trophy, 
  Flame, 
  ChevronRight, 
  ArrowUpRight,
  ChevronDown,
  ArrowRight,
  Sun,
  Moon,
  FolderOpen,
  Search,
  Eye
} from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "Кому подойдет эта детективная игра?",
    answer: "Игра разработана для экспертов, фрилансеров, бьюти-мастеров и владельцев бизнеса, которые хотят распутать дело о пропавших охватах, привлечь клиентов и выстроить стабильный поток заявок без выгорания."
  },
  {
    question: "Кто ведет расследование?",
    answer: "Ведущий следователь и автор игры — Алёна Кордон-Меловацкая. Она вместе с кураторами-детективами проведет вас по всем уликам и поможет раскрыть дело."
  },
  {
    question: "Какова длительность игры?",
    answer: "Активное следствие длится 4 недели. Каждая неделя — это новое секретное досье (модуль) и набор оперативных миссий, которые вы внедряете в свой блог."
  },
  {
    question: "Есть ли рассрочка?",
    answer: "Да, доступна официальная рассрочка от белорусских и международных банков на срок до 24 месяцев. Заявка подается онлайн и одобряется за несколько минут."
  }
];

const SIMULATOR_MISSIONS = [
  {
    title: "Миссия 1: Поиск улик",
    subtitle: "Анализ болей свидетелей (ЦА)",
    task: "Вы расследуете дело о пропавших продажах свечей. Какая улика указывает на главную скрытую боль покупателя?",
    options: [
      { text: "Покупатель ищет свечи только из натурального воска", isCorrect: false, feedback: "Это логическая улика, но не эмоциональная боль. Ищите глубже!" },
      { text: "Страх подарить банальный подарок и показаться невнимательным", isCorrect: true, feedback: "Верно! Психологическая улика найдена. Клиент покупает не свечу, а статус оригинального дарителя. +100 💎" },
      { text: "Покупателю важно время горения свечи в часах", isCorrect: false, feedback: "Это техническое описание, а не истинная боль свидетеля. Попробуйте еще раз!" }
    ]
  },
  {
    title: "Миссия 2: Зацепка внимания",
    subtitle: "Создание заголовка-приманки",
    task: "Нужно зацепить внимание подозреваемого бьюти-мастера в ленте. Какая приманка сработает мгновенно?",
    options: [
      { text: "Мой личный блог о жизни в салоне", isCorrect: false, feedback: "Слишком нейтрально. Подозреваемый пролистает мимо." },
      { text: "Обзор новых ножниц для стрижки", isCorrect: false, feedback: "Не вызывает острого желания прочесть прямо сейчас." },
      { text: "Как колористу поднять чек на сложные техники на 40% без потери базы", isCorrect: true, feedback: "Раскрытие века! Четкая выгода, цифры и снятие главного страха. Цель зацеплена! +150 💎" }
    ]
  }
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<'standard' | 'premium' | 'vip' | null>(null);
  
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // 3D Card Perspective State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Interactive Simulator State
  const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  // FAQ State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll Animations using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    setTilt({
      x: -(y / (box.height / 2)) * 12,
      y: (x / (box.width / 2)) * 12
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const openEnrollModal = (planId: 'standard' | 'premium' | 'vip') => {
    setSelectedPlanId(planId);
    setIsModalOpen(true);
  };

  const handleOptionSelect = (idx: number, isCorrect: boolean) => {
    setSelectedOptionIdx(idx);
    setShowFeedback(true);
    if (isCorrect && selectedOptionIdx === null) {
      setScore(prev => prev + (currentMissionIdx === 0 ? 100 : 150));
    }
  };

  const handleNextMission = () => {
    setSelectedOptionIdx(null);
    setShowFeedback(false);
    setCurrentMissionIdx((prev) => (prev + 1) % SIMULATOR_MISSIONS.length);
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-20 transition-colors duration-300 overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--accent-light)] rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-[var(--accent-light)] rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-[var(--border-color)]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-color)] flex items-center justify-center font-syne font-bold text-white text-xl shadow-[0_0_20px_var(--accent-light)]">
            K
          </div>
          <div>
            <span className="font-syne font-extrabold tracking-widest text-lg uppercase block text-[var(--text-primary)]">KVESTOGRAM</span>
            <span className="text-[9px] text-[var(--text-secondary)] font-mono tracking-wider block uppercase">Детективное Расследование</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          <a href="#about" className="hover:text-[var(--accent-color)] transition duration-300">О расследовании</a>
          <a href="#simulator" className="hover:text-[var(--accent-color)] transition duration-300">Миссия-Демо</a>
          <a href="#levels" className="hover:text-[var(--accent-color)] transition duration-300">Досье уровней</a>
          <a href="#pricing" className="hover:text-[var(--accent-color)] transition duration-300">Тарифы доступа</a>
          <a href="#faq" className="hover:text-[var(--accent-color)] transition duration-300">Вопросы</a>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition duration-300 cursor-pointer text-[var(--text-primary)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button 
            onClick={() => openEnrollModal('premium')}
            className="px-6 py-2.5 rounded-full bg-[var(--accent-color)] text-white text-xs uppercase font-bold tracking-wider hover:bg-opacity-90 shadow-[0_4px_15px_var(--accent-light)] transition-all duration-300 cursor-pointer"
          >
            Вступить в штаб
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 md:pt-20 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] mb-8">
          <Flame size={12} className="text-[var(--accent-color)]" />
          <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-primary)] font-bold">
            Расследование Алёны Кордон-Меловацкой
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left max-w-6xl mx-auto">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="font-serif text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
              Дело о пропавших <span className="text-[var(--accent-color)]">Охватах</span> и Продажах
            </h1>

            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
              За 4 недели в нашем оперативном штабе Квестограма нам предстоит распутать каждую ниточку. Это не просто обучение, а настоящая детективная игра, где каждый урок — новая улика, каждый модуль — новое досье, а каждый твой шаг приближает к раскрытию громких дел в твоем блоге!
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button 
                onClick={() => openEnrollModal('premium')}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-[var(--accent-color)] hover:bg-opacity-95 shadow-[0_4px_20px_var(--accent-light)] transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                <span>Начать дело</span>
                <Play size={12} className="ml-2 fill-white text-white" />
              </button>
              
              <a 
                href="#simulator"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition duration-300 flex items-center justify-center"
              >
                Снять отпечатки (Демо)
              </a>
            </div>
          </div>

          {/* Right 3D Tilt Card Mockup */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ 
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
              className="relative w-full max-w-sm aspect-[3/4] bg-[var(--bg-secondary)] border-2 border-[var(--text-primary)] rounded-2xl p-6 shadow-2xl preserve-3d cursor-grab overflow-hidden"
            >
              {/* Card Texture details */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 to-black/5 pointer-events-none" />
              
              {/* Dossier Tape Effect */}
              <div className="absolute top-6 -left-8 w-32 py-1 bg-[#dcd7cb] border-y border-[var(--text-primary)] text-center text-[8px] font-mono text-[var(--text-primary)] uppercase tracking-wider -rotate-45">
                СЕКРЕТНО
              </div>

              <div className="h-full flex flex-col justify-between border border-[var(--text-primary)] p-4 rounded-xl relative z-10 bg-glass-heavy shadow-inner">
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b border-[var(--border-color)] pb-3">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-[var(--accent-color)]">
                      CASE NO: 193630252
                    </span>
                    <FolderOpen size={16} className="text-[var(--text-primary)]" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[8px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">ПОДОЗРЕВАЕМЫЙ:</span>
                    <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">Исчезнувший Клиент</h3>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[8px] uppercase tracking-widest text-[var(--text-secondary)] font-bold">СОСТАВ ПРЕСТУПЛЕНИЯ:</span>
                    <p className="text-[10px] font-light text-[var(--text-secondary)] leading-relaxed">
                      Полное отсутствие реакций на сторис, молчание в Direct, падение охватов на 60% за последний месяц.
                    </p>
                  </div>
                </div>

                <div className="border-t border-[var(--border-color)] pt-3 flex justify-between items-center">
                  <div>
                    <span className="text-[8px] text-[var(--text-secondary)] block">СЛЕДОВАТЕЛЬ:</span>
                    <span className="text-[10px] font-bold text-[var(--text-primary)] font-serif">А. Кордон-Меловацкая</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-[var(--accent-color)] flex items-center justify-center text-[8px] text-[var(--accent-color)] font-mono font-bold -rotate-12 border-dashed">
                    APPROVED
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 md:mt-36 text-left scroll-reveal opacity-0 translate-y-8 transition-all duration-1000">
          <div className="p-8 rounded-3xl bg-[var(--bg-glass)] border border-[var(--border-color)] shadow-sm hover:border-[var(--accent-color)] hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mb-6 border border-[var(--border-color)] text-[var(--accent-color)]">
              <Search size={22} />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3 text-[var(--text-primary)]">Улики & Анализ</h3>
            <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
              Проведите детальное расследование и соберите улики, чтобы понять истинные потребности и скрытые мотивы ваших клиентов.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[var(--bg-glass)] border border-[var(--border-color)] shadow-sm hover:border-[var(--accent-color)] hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mb-6 border border-[var(--border-color)] text-[var(--accent-color)]">
              <Eye size={22} />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3 text-[var(--text-primary)]">Интрига & Прогрев</h3>
            <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
              Выстраивайте сюжетную линию блога как настоящее детективное расследование, удерживая внимание аудитории до самого финала.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[var(--bg-glass)] border border-[var(--border-color)] shadow-sm hover:border-[var(--accent-color)] hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mb-6 border border-[var(--border-color)] text-[var(--accent-color)]">
              <Trophy size={22} />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3 text-[var(--text-primary)]">Раскрытие & Результат</h3>
            <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
              Закройте висящие дела. Получите стабильные заявки, лояльную аудиторию и продажи без давления и выгорания.
            </p>
          </div>
        </section>

        {/* Interactive Mission Simulator Section */}
        <section id="simulator" className="mt-28 md:mt-40 text-left scroll-reveal opacity-0 translate-y-8 transition-all duration-1000">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] tracking-widest text-[var(--accent-color)] font-mono font-bold uppercase block">Оперативный тренажер</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">Пройди тренировочную миссию</h2>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
                Выступите в роли детектива. Соберите ключевые улики и получите моментальную оценку от ведущего следователя.
              </p>
              
              <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase block font-semibold">Ваш счет:</span>
                  <span className="font-mono text-xl font-bold text-[var(--accent-color)]">{score} 💎</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[var(--text-secondary)] uppercase block font-semibold">База данных:</span>
                  <span className="text-xs font-semibold text-[var(--text-primary)]">Активна 🟢</span>
                </div>
              </div>
            </div>

            {/* Right side phone-simulator mockup */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="relative w-full max-w-md bg-[var(--bg-glass)] border-2 border-[var(--text-primary)] rounded-[40px] p-6 shadow-xl overflow-hidden">
                {/* Phone Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-[var(--text-primary)] rounded-full" />
                
                {/* Simulator Header */}
                <div className="border-b border-[var(--border-color)] pb-4 mb-4 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-mono text-[var(--accent-color)] font-bold">
                      {SIMULATOR_MISSIONS[currentMissionIdx].subtitle}
                    </span>
                    <h4 className="text-sm font-bold text-[var(--text-primary)]">
                      {SIMULATOR_MISSIONS[currentMissionIdx].title}
                    </h4>
                  </div>
                  <span className="text-[10px] bg-[var(--bg-secondary)] border border-[var(--border-color)] px-2 py-1 rounded-full text-[var(--text-primary)] font-mono">
                    Миссия {currentMissionIdx + 1}/2
                  </span>
                </div>

                {/* Simulator Body */}
                <div className="space-y-4 min-h-[180px]">
                  <p className="text-xs text-[var(--text-primary)] font-medium leading-relaxed bg-[var(--bg-secondary)] p-4 rounded-2xl border border-[var(--border-color)]">
                    {SIMULATOR_MISSIONS[currentMissionIdx].task}
                  </p>

                  <div className="space-y-2.5">
                    {SIMULATOR_MISSIONS[currentMissionIdx].options.map((opt, idx) => {
                      const isSelected = selectedOptionIdx === idx;
                      let optionStyle = "border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:border-[var(--accent-color)]";
                      
                      if (isSelected) {
                        optionStyle = opt.isCorrect 
                          ? "border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300"
                          : "border-rose-600 bg-rose-50 text-rose-800 dark:bg-rose-950/20 dark:text-rose-300";
                      }

                      return (
                        <button
                          key={idx}
                          disabled={showFeedback}
                          onClick={() => handleOptionSelect(idx, opt.isCorrect)}
                          className={`w-full p-4 rounded-xl border text-left text-xs font-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed ${optionStyle}`}
                        >
                          <div className="flex items-start">
                            <span className="font-mono font-bold mr-3 text-[var(--accent-color)]">{String.fromCharCode(65 + idx)}.</span>
                            <span>{opt.text}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback Screen */}
                {showFeedback && selectedOptionIdx !== null && (
                  <div className="mt-4 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs space-y-3">
                    <p className={`font-semibold ${
                      SIMULATOR_MISSIONS[currentMissionIdx].options[selectedOptionIdx].isCorrect 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {SIMULATOR_MISSIONS[currentMissionIdx].options[selectedOptionIdx].isCorrect ? '✅ Улика подтверждена!' : '❌ Ложный след'}
                    </p>
                    <p className="text-[var(--text-secondary)] font-light leading-relaxed">
                      {SIMULATOR_MISSIONS[currentMissionIdx].options[selectedOptionIdx].feedback}
                    </p>
                    
                    <button
                      onClick={handleNextMission}
                      className="w-full py-2.5 rounded-xl bg-[var(--accent-color)] text-white hover:bg-opacity-90 font-bold text-xs uppercase tracking-wider transition duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Следующее досье</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Game Levels Section */}
        <section id="levels" className="mt-28 md:mt-40 text-left scroll-reveal opacity-0 translate-y-8 transition-all duration-1000">
          <div className="max-w-3xl mb-12">
            <span className="text-[10px] tracking-widest text-[var(--accent-color)] font-mono font-bold uppercase block mb-2">Оперативные дела</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[var(--text-primary)]">Программа расследования</h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-3 font-light leading-relaxed">
              Вся программа обучения разделена на 4 следственных дела. Каждое дело — это новые улики, разборы и практические задания.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { num: '01', title: 'Дело №1: Личность & Позиционирование', desc: 'Выявляем скрытые активы эксперта, определяем сильные стороны и упаковываем их в продающую концепцию.' },
              { num: '02', title: 'Дело №2: Упаковка & Сторителлинг', desc: 'Учимся удерживать внимание подписчиков как в лучших сериалах. Пишем детективные сценарии прогрева.' },
              { num: '03', title: 'Дело №3: Каналы трафика', desc: 'Запускаем стабильный поток потенциальных клиентов в профиль через Reels, хэштеги и рассылки.' },
              { num: '04', title: 'Дело №4: Продажи в Direct', desc: 'Создаем автоворонки продаж. Учимся закрывать сделки в переписке без давления на клиента.' }
            ].map((lvl, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-2xl bg-[var(--bg-glass)] hover:bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:shadow-md transition-all duration-300 gap-4 group">
                <div className="flex items-center space-x-6">
                  <span className="font-mono text-3xl font-extrabold text-[var(--text-secondary)] opacity-50 group-hover:text-[var(--accent-color)] group-hover:opacity-100 transition-colors duration-300">{lvl.num}</span>
                  <div>
                    <h4 className="font-serif text-lg md:text-xl font-bold text-[var(--text-primary)]">{lvl.title}</h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 font-light max-w-2xl leading-relaxed">{lvl.desc}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs text-[var(--text-secondary)] font-semibold group-hover:text-[var(--text-primary)] transition-colors duration-300">
                  <span>Доступно в live и записи</span>
                  <ChevronRight size={14} className="ml-1 text-[var(--accent-color)] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing/Plans Section */}
        <section id="pricing" className="mt-28 md:mt-40 scroll-reveal opacity-0 translate-y-8 transition-all duration-1000">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] tracking-widest text-[var(--accent-color)] font-mono font-bold uppercase block mb-2">Уровни Доступа</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[var(--text-primary)]">Тарифы Участия</h2>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] mt-3 font-light leading-relaxed">
              Выберите подходящий формат прохождения. Рассрочка доступна для всех тарифов от ведущих банков-партнеров.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left items-stretch">
            {PRICING_PLANS.map((plan) => {
              const isPremium = plan.id === 'premium';
              return (
                <div 
                  key={plan.id}
                  className={`relative p-8 rounded-3xl bg-[var(--bg-glass)] flex flex-col justify-between border transition-all duration-300 hover:shadow-lg ${
                    isPremium 
                      ? 'border-[var(--accent-color)] shadow-md scale-105 z-10' 
                      : 'border-[var(--border-color)]'
                  }`}
                >
                  {isPremium && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent-color)] text-white text-[9px] uppercase font-bold tracking-widest px-4 py-1 rounded-full shadow-sm">
                      🔥 ПОПУЛЯРНОЕ ДЕЛО
                    </span>
                  )}
                  
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)] mb-2">{plan.name}</h3>
                    <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest font-semibold mb-6">
                      Старт 1 июля • 6 недель обучения
                    </p>
                    
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-mono font-bold text-[var(--accent-color)]">{plan.price}</span>
                      <span className="text-sm text-[var(--text-secondary)] ml-2 uppercase font-semibold">{plan.currency}</span>
                    </div>

                    <ul className="space-y-4 mb-8 text-xs text-[var(--text-secondary)] font-light">
                      {[
                        'Доступ ко всем 4 модулям программы',
                        'Интерактивная проверка домашних заданий',
                        plan.id !== 'standard' ? 'Закрытый чат участников в Telegram' : 'Общий канал с анонсами',
                        plan.id !== 'standard' ? '2 групповые сессии вопрос-ответ с автором' : 'Без личного разбора',
                        plan.id === 'vip' ? 'Личный коучинг и разбор вашей воронки автором' : '',
                        plan.id === 'vip' ? 'Индивидуальный чат поддержки 24/7' : '',
                      ].filter(Boolean).map((feat, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check size={14} className="text-[var(--accent-color)] mt-0.5 mr-2 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => openEnrollModal(plan.id)}
                    className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                      isPremium
                        ? 'bg-[var(--accent-color)] text-white hover:bg-opacity-95 shadow-sm'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-glass)]'
                    }`}
                  >
                    <span>Забронировать дело</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mt-28 md:mt-40 text-left scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-widest text-[var(--accent-color)] font-mono font-bold uppercase block mb-2">База Знаний</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[var(--text-primary)]">Ответы на Вопросы</h2>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-glass)] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-xs md:text-sm hover:text-[var(--accent-color)] duration-300 cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <ChevronDown 
                      size={16} 
                      className={`text-[var(--text-secondary)] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--accent-color)]' : ''}`} 
                    />
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs text-[var(--text-secondary)] leading-relaxed font-light border-t border-[var(--border-color)] pt-4">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust Section */}
        <section className="mt-28 md:mt-36 p-8 md:p-12 rounded-3xl bg-[var(--bg-glass)] border border-[var(--border-color)] max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-left gap-8 scroll-reveal opacity-0 translate-y-8 transition-all duration-1000">
          <div>
            <div className="flex items-center space-x-2 text-[var(--accent-color)] mb-3">
              <Shield size={18} />
              <span className="text-xs uppercase font-mono font-bold tracking-widest">Безопасная Сделка & Гарантия</span>
            </div>
            <h3 className="font-serif text-2xl font-bold mb-3 text-[var(--text-primary)]">100% Гарантия Возврата</h3>
            <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed max-w-xl">
              Если в течение первой недели обучения вы поймете, что игровой формат вам не подходит, мы вернем полную стоимость без лишних вопросов. Договор оферты защищает ваши права.
            </p>
          </div>
          <div className="w-full md:w-auto flex-shrink-0 text-center md:text-right">
            <span className="text-[10px] text-[var(--text-secondary)] block uppercase tracking-widest mb-1">ИП Ловадская А.И.</span>
            <span className="text-[9px] text-[var(--text-secondary)] opacity-60 font-mono block">УНП 193630252 • Минск, Беларусь</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 mt-32 pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between text-[11px] text-[var(--text-secondary)] gap-4">
        <div>
          <span>© 2026 Kvestogram. Все права защищены. Разработано для ИП Ловадская А.И.</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-[var(--text-primary)] transition">Политика конфиденциальности</a>
          <a href="#" className="hover:text-[var(--text-primary)] transition">Публичная оферта</a>
        </div>
      </footer>

      {/* Enrollment Modal */}
      <EnrollModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPlanId={selectedPlanId} 
      />
    </div>
  );
}

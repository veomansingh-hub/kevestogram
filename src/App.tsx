import { useState, useEffect } from 'react';
import { PRICING_PLANS } from './data';
import EnrollModal from './components/EnrollModal';
import { 
  Play, 
  Shield, 
  Check, 
  Trophy, 
  Flame, 
  Sparkles, 
  ChevronRight, 
  Target, 
  ArrowUpRight,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

// FAQ Items
const FAQ_ITEMS = [
  {
    question: "Кому подойдет эта игра?",
    answer: "Игра разработана для экспертов, фрилансеров, бьюти-мастеров и владельцев локального бизнеса, которые хотят привлекать клиентов из соцсетей (Instagram, Telegram) без выгорания, используя сюжетные прогревы."
  },
  {
    question: "Можно ли оплатить в рассрочку?",
    answer: "Да, для граждан Беларуси и СНГ доступна рассрочка от ведущих банков-партнеров без первоначального взноса сроком от 3 до 24 месяцев. Рассрочка оформляется онлайн за 10 минут."
  },
  {
    question: "Сколько времени нужно уделять обучению?",
    answer: "В среднем 3-4 часа в неделю. Миссии короткие, по 15-20 минут, и сразу направлены на внедрение в ваш рабочий аккаунт. Вы учитесь прямо в процессе ведения своего блога."
  },
  {
    question: "Что делать, если у меня совсем маленький блог?",
    answer: "Это идеальный момент для старта. В игре мы учим выстраивать продажи даже на охватах в 50-100 человек. Качественный анализ ниши и позиционирование важнее миллионов подписчиков."
  }
];

// Interactive Game Simulator Questions
const SIMULATOR_MISSIONS = [
  {
    title: "Миссия 1: Боль клиента",
    subtitle: "Анализ целевой аудитории",
    task: "Вы продаете свечи ручной работы. Какая боль клиента самая сильная при покупке подарка на праздник?",
    options: [
      { text: "Свеча сделана из натурального соевого воска", isCorrect: false, feedback: "Это характеристика продукта, а не боль клиента. Попробуйте еще раз!" },
      { text: "Страх подарить банальный подарок, который передарят или выбросят", isCorrect: true, feedback: "Идеально! Это глубинная психологическая боль (желание выглядеть оригинально). На нее и нужно давить в сторис! +100 💎" },
      { text: "Время горения свечи составляет более 40 часов", isCorrect: false, feedback: "Это техническое преимущество, а не глубинная эмоциональная боль. Попробуйте еще раз!" }
    ]
  },
  {
    title: "Миссия 2: Зацепка внимания",
    subtitle: "Заголовок для Reels/Поста",
    task: "Вам нужно зацепить бьюти-мастера в первые 3 секунды ролика. Какой заголовок сработает лучше всего?",
    options: [
      { text: "Мой обычный день в салоне красоты", isCorrect: false, feedback: "Слишком банально. Зрителю интересен он сам, а не вы (пока вы не стали брендом)." },
      { text: "Как делать крутые укладки волос быстро", isCorrect: false, feedback: "Слишком общий совет. Мастера и так это знают." },
      { text: "Секрет: Как колористу поднять чек на окрашивание на 40% без потери базы", isCorrect: true, feedback: "Отлично! Заголовок бьет точно в ЦА (колористы), содержит цифры и решает их главную проблему (рост дохода без риска). +150 💎" }
    ]
  }
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<'standard' | 'premium' | 'vip' | null>(null);
  
  // Interactive Simulator State
  const [currentMissionIdx, setCurrentMissionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  // FAQ State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

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
    <div className="relative min-h-screen bg-[#090212] text-white selection:bg-[#e040fb]/30 selection:text-white pb-20 overflow-hidden">
      {/* Visual background elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-[#e040fb]/10 to-[#7b1fa2]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-[#f4a7b9]/5 to-[#e040fb]/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[400px] left-1/10 w-[500px] h-[500px] bg-gradient-to-r from-[#e040fb]/5 to-[#f4a7b9]/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Header / Navbar */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#e040fb] to-[#f4a7b9] flex items-center justify-center font-syne font-bold text-[#100320] text-xl shadow-[0_0_20px_rgba(224,64,251,0.3)]">
            K
          </div>
          <div>
            <span className="font-syne font-extrabold tracking-widest text-lg uppercase block bg-gradient-to-r from-white to-[#f4a7b9] bg-clip-text text-transparent">KVESTOGRAM</span>
            <span className="text-[9px] text-[#f4a7b9]/60 font-mono tracking-wider block uppercase">Иммерсивная Бизнес-Игра</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-[#f4a7b9]/70">
          <a href="#about" className="hover:text-white transition duration-300">Об игре</a>
          <a href="#simulator" className="hover:text-white transition duration-300">Демо-Миссия</a>
          <a href="#levels" className="hover:text-white transition duration-300">Уровни</a>
          <a href="#pricing" className="hover:text-white transition duration-300">Тарифы</a>
          <a href="#faq" className="hover:text-white transition duration-300">FAQ</a>
        </nav>

        <button 
          onClick={() => openEnrollModal('premium')}
          className="px-6 py-2.5 rounded-full border border-[#e040fb]/40 bg-[#e040fb]/5 text-xs uppercase font-bold tracking-wider hover:bg-[#e040fb] hover:text-[#100320] hover:shadow-[0_0_25px_rgba(224,64,251,0.4)] transition-all duration-300 cursor-pointer"
        >
          Вступить в игру
        </button>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-28 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm animate-bounce">
          <Flame size={12} className="text-[#e040fb]" />
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#f4a7b9]/90 font-bold">
            Запуск нового сезона • 1 июля 2026
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-tight max-w-5xl mx-auto transition-transform duration-700 hover:scale-[1.01]">
          Выйди на новый уровень продаж через <span className="bg-gradient-to-r from-[#e040fb] via-[#f4a7b9] to-white bg-clip-text text-transparent">Интерактивный Сюжет</span>
        </h1>

        <p className="text-sm md:text-lg text-[#f4a7b9]/75 font-light max-w-2xl mx-auto mt-6 leading-relaxed">
          Квестограм — это первая иммерсивная игра для экспертов и предпринимателей. Исследуйте целевую аудиторию, создавайте взрывной контент и совершайте продажи в формате увлекательных миссий.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button 
            onClick={() => openEnrollModal('premium')}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-[#100320] bg-gradient-to-r from-[#e040fb] to-[#f4a7b9] hover:opacity-95 hover:shadow-[0_0_25px_rgba(224,64,251,0.5)] transition-all duration-300 flex items-center justify-center cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Начать Квест</span>
            <Play size={12} className="ml-2 fill-[#100320]" />
          </button>
          
          <a 
            href="#simulator"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition duration-300 flex items-center justify-center"
          >
            Тест-драйв Игры
          </a>
        </div>

        {/* Feature Highlights Grid */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 md:mt-36 text-left scroll-reveal opacity-0 translate-y-8 transition-all duration-1000">
          <div className="p-8 rounded-3xl bg-glass-light border border-white/5 relative overflow-hidden group hover:border-[#e040fb]/30 hover:shadow-[0_10px_30px_rgba(224,64,251,0.05)] transition-all duration-500 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e040fb]/5 rounded-full blur-xl group-hover:bg-[#e040fb]/10 transition duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-[#e040fb] group-hover:rotate-12 transition-transform duration-300">
              <Target size={22} />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3 text-white">Глубокий Анализ Ниши</h3>
            <p className="text-xs text-[#f4a7b9]/60 font-light leading-relaxed">
              Забудьте о скучных таблицах. Пройдите игровые симуляции, чтобы понять истинные мотивы и боли вашей аудитории.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-glass-light border border-white/5 relative overflow-hidden group hover:border-[#f4a7b9]/30 hover:shadow-[0_10px_30px_rgba(244,167,185,0.05)] transition-all duration-500 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#f4a7b9]/5 rounded-full blur-xl group-hover:bg-[#f4a7b9]/10 transition duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-[#f4a7b9] group-hover:-rotate-12 transition-transform duration-300">
              <Sparkles size={22} />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3 text-white">Интерактивный Сторителлинг</h3>
            <p className="text-xs text-[#f4a7b9]/60 font-light leading-relaxed">
              Научитесь удерживать внимание подписчиков как в лучших сериалах Нетфликс. Пошаговые шаблоны прогревов и сценариев.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-glass-light border border-white/5 relative overflow-hidden group hover:border-[#e040fb]/30 hover:shadow-[0_10px_30px_rgba(224,64,251,0.05)] transition-all duration-500 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e040fb]/5 rounded-full blur-xl group-hover:bg-[#e040fb]/10 transition duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-[#e040fb] group-hover:scale-110 transition-transform duration-300">
              <Trophy size={22} />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3 text-white">Реальные Результаты</h3>
            <p className="text-xs text-[#f4a7b9]/60 font-light leading-relaxed">
              Зарабатывайте внутриигровую валюту, соревнуйтесь в рейтинге с другими участниками и забирайте ценные призы за лучшие кейсы.
            </p>
          </div>
        </section>

        {/* Interactive Mission Simulator Section */}
        <section id="simulator" className="mt-28 md:mt-40 text-left scroll-reveal opacity-0 translate-y-8 transition-all duration-1000">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] tracking-widest text-[#e040fb] font-mono font-bold uppercase block">Интерактивное демо</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight">Попробуй игру прямо сейчас</h2>
              <p className="text-xs md:text-sm text-[#f4a7b9]/60 font-light leading-relaxed">
                Пройдите первую тренировочную миссию на выбор целевой аудитории. Проверьте свою интуицию и получите кураторский вердикт в режиме реального времени.
              </p>
              
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#f4a7b9]/50 uppercase block font-semibold">Ваши баллы:</span>
                  <span className="font-mono text-xl font-bold text-[#e040fb]">{score} 💎</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#f4a7b9]/50 uppercase block font-semibold">Куратор:</span>
                  <span className="text-xs font-semibold text-white">На связи 🟢</span>
                </div>
              </div>
            </div>

            {/* Right side phone-simulator mockup */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="relative w-full max-w-md bg-glass-heavy border border-white/10 rounded-[40px] p-6 shadow-[0_0_50px_rgba(224,64,251,0.15)] overflow-hidden">
                {/* Phone Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-full" />
                
                {/* Simulator Header */}
                <div className="border-b border-white/5 pb-4 mb-4 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-mono text-[#e040fb] font-bold">
                      {SIMULATOR_MISSIONS[currentMissionIdx].subtitle}
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {SIMULATOR_MISSIONS[currentMissionIdx].title}
                    </h4>
                  </div>
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded-full text-white font-mono">
                    Миссия {currentMissionIdx + 1}/2
                  </span>
                </div>

                {/* Simulator Body */}
                <div className="space-y-4 min-h-[180px]">
                  <p className="text-xs text-[#f4a7b9]/85 font-medium leading-relaxed bg-[#1b082e]/50 p-4 rounded-2xl border border-[#e040fb]/10">
                    {SIMULATOR_MISSIONS[currentMissionIdx].task}
                  </p>

                  <div className="space-y-2.5">
                    {SIMULATOR_MISSIONS[currentMissionIdx].options.map((opt, idx) => {
                      const isSelected = selectedOptionIdx === idx;
                      let optionStyle = "border-white/5 bg-white/5 text-white hover:border-[#f4a7b9]/30";
                      
                      if (isSelected) {
                        optionStyle = opt.isCorrect 
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                          : "border-rose-500 bg-rose-500/10 text-rose-300";
                      }

                      return (
                        <button
                          key={idx}
                          disabled={showFeedback}
                          onClick={() => handleOptionSelect(idx, opt.isCorrect)}
                          className={`w-full p-4 rounded-xl border text-left text-xs font-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed ${optionStyle}`}
                        >
                          <div className="flex items-start">
                            <span className="font-mono font-bold mr-3 text-[#e040fb]">{String.fromCharCode(65 + idx)}.</span>
                            <span>{opt.text}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback Screen */}
                {showFeedback && selectedOptionIdx !== null && (
                  <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5 text-xs space-y-3 animate-pulse-glow">
                    <p className={`font-semibold ${
                      SIMULATOR_MISSIONS[currentMissionIdx].options[selectedOptionIdx].isCorrect 
                        ? 'text-emerald-400' 
                        : 'text-rose-400'
                    }`}>
                      {SIMULATOR_MISSIONS[currentMissionIdx].options[selectedOptionIdx].isCorrect ? '✅ Правильно!' : '❌ Попробуйте еще раз'}
                    </p>
                    <p className="text-[#f4a7b9]/75 font-light leading-relaxed">
                      {SIMULATOR_MISSIONS[currentMissionIdx].options[selectedOptionIdx].feedback}
                    </p>
                    
                    <button
                      onClick={handleNextMission}
                      className="w-full py-2.5 rounded-xl bg-[#e040fb] hover:bg-opacity-95 text-[#100320] font-bold text-xs uppercase tracking-wider transition duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Дальше</span>
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
            <span className="text-[10px] tracking-widest text-[#e040fb] font-mono font-bold uppercase block mb-2">Геймификация Обучения</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">Карта Твоего Прохождения</h2>
            <p className="text-xs md:text-sm text-[#f4a7b9]/60 mt-3 font-light leading-relaxed">
              Вся программа обучения разделена на 4 ключевых уровня. Каждый уровень — это набор миссий с обратной связью от кураторов.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { num: '01', title: 'Распаковка Личности и Анализ Ниши', desc: 'Определяем сильные стороны, позиционирование и ключевой продукт. Анализируем истинные мотивы ЦА.' },
              { num: '02', title: 'Создание Упаковки & Storytelling', desc: 'Оформиляем профиль в Instagram и Telegram. Создаем визуальную концепцию и пишем первые прогревы.' },
              { num: '03', title: 'Генерация Лидов и Трафик', desc: 'Запускаем органический и платный трафик. Учимся работать с Reels, хэштегами и взаимным пиаром.' },
              { num: '04', title: 'Продажи & Автоматизация', desc: 'Выстраиваем автоворонки, чат-ботов и учимся закрывать сделки в переписке без давления.' }
            ].map((lvl, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-2xl bg-glass-light hover:bg-white/5 border border-white/5 hover:border-white/10 hover:shadow-[0_10px_25px_rgba(224,64,251,0.03)] transition-all duration-500 gap-4 group">
                <div className="flex items-center space-x-6">
                  <span className="font-mono text-3xl font-extrabold text-[#e040fb]/40 group-hover:text-[#e040fb] transition-colors duration-300">{lvl.num}</span>
                  <div>
                    <h4 className="font-serif text-lg md:text-xl font-bold text-white">{lvl.title}</h4>
                    <p className="text-xs text-[#f4a7b9]/60 mt-1 font-light max-w-2xl leading-relaxed">{lvl.desc}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs text-[#f4a7b9]/60 font-semibold group-hover:text-white transition-colors duration-300">
                  <span>Доступно в записи и live</span>
                  <ChevronRight size={14} className="ml-1 text-[#e040fb] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing/Plans Section */}
        <section id="pricing" className="mt-28 md:mt-40 scroll-reveal opacity-0 translate-y-8 transition-all duration-1000">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] tracking-widest text-[#e040fb] font-mono font-bold uppercase block mb-2">Выберите Свой Тариф</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">Вступить в Игру Kvestogram</h2>
            <p className="text-xs md:text-sm text-[#f4a7b9]/60 mt-3 font-light leading-relaxed">
              Выберите подходящий формат участия. Рассрочка доступна для всех тарифов от ведущих банков Беларуси и СНГ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left items-stretch">
            {PRICING_PLANS.map((plan) => {
              const isPremium = plan.id === 'premium';
              return (
                <div 
                  key={plan.id}
                  className={`relative p-8 rounded-3xl bg-glass-heavy flex flex-col justify-between border transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(224,64,251,0.08)] ${
                    isPremium 
                      ? 'border-[#e040fb] shadow-[0_0_30px_rgba(224,64,251,0.2)] scale-105 z-10' 
                      : 'border-white/10 hover:border-[#f4a7b9]/40'
                  }`}
                >
                  {isPremium && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#e040fb] to-[#f4a7b9] text-[#100320] text-[9px] uppercase font-bold tracking-widest px-4 py-1 rounded-full shadow-[0_0_15px_rgba(224,64,251,0.4)]">
                      🔥 Популярный Выбор
                    </span>
                  )}
                  
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-[10px] text-[#f4a7b9]/50 uppercase tracking-widest font-semibold mb-6">
                      Старт 1 июля • 6 недель обучения
                    </p>
                    
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-mono font-bold text-[#e040fb]">{plan.price}</span>
                      <span className="text-sm text-[#f4a7b9]/70 ml-2 uppercase font-semibold">{plan.currency}</span>
                    </div>

                    <ul className="space-y-4 mb-8 text-xs text-[#f4a7b9]/80 font-light">
                      {[
                        'Доступ ко всем 4 модулям программы',
                        'Интерактивная проверка домашних заданий',
                        plan.id !== 'standard' ? 'Закрытый чат участников в Telegram' : 'Общий канал с анонсами',
                        plan.id !== 'standard' ? '2 групповые сессии вопрос-ответ с автором' : 'Без личного разбора',
                        plan.id === 'vip' ? 'Личный коучинг и разбор вашей воронки автором' : '',
                        plan.id === 'vip' ? 'Индивидуальный чат поддержки 24/7' : '',
                      ].filter(Boolean).map((feat, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check size={14} className="text-[#e040fb] mt-0.5 mr-2 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => openEnrollModal(plan.id)}
                    className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                      isPremium
                        ? 'bg-[#e040fb] text-white hover:bg-opacity-90 shadow-[0_0_15px_rgba(224,64,251,0.3)]'
                        : 'bg-white/5 text-white border border-white/10 hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    <span>Забронировать Место</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section id="faq" className="mt-28 md:mt-40 text-left scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-widest text-[#e040fb] font-mono font-bold uppercase block mb-2">Ответы на вопросы</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">Часто Задаваемые Вопросы</h2>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-white/5 bg-glass-heavy overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-xs md:text-sm hover:text-[#e040fb] duration-300 cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <ChevronDown 
                      size={16} 
                      className={`text-[#f4a7b9] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#e040fb]' : ''}`} 
                    />
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs text-[#f4a7b9]/70 leading-relaxed font-light border-t border-white/5 pt-4 animate-pulse-glow">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust & Guarantee Section */}
        <section className="mt-28 md:mt-36 p-8 md:p-12 rounded-3xl bg-glass-heavy border border-white/5 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-left gap-8 scroll-reveal opacity-0 translate-y-8 transition-all duration-1000">
          <div>
            <div className="flex items-center space-x-2 text-[#e040fb] mb-3">
              <Shield size={18} />
              <span className="text-xs uppercase font-mono font-bold tracking-widest">Безопасная Сделка & Гарантия</span>
            </div>
            <h3 className="font-serif text-2xl font-bold mb-3">100% Гарантия Возврата</h3>
            <p className="text-xs text-[#f4a7b9]/60 font-light leading-relaxed max-w-xl">
              Если в течение первой недели обучения вы поймете, что игровой формат вам не подходит, мы вернем полную стоимость без лишних вопросов. Договор оферты защищает ваши права.
            </p>
          </div>
          <div className="w-full md:w-auto flex-shrink-0 text-center md:text-right">
            <span className="text-[10px] text-[#f4a7b9]/50 block uppercase tracking-widest mb-1">ИП Ловадская А.И.</span>
            <span className="text-[9px] text-[#f4a7b9]/40 font-mono block">УНП 193630252 • Минск, Беларусь</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#f4a7b9]/40 gap-4">
        <div>
          <span>© 2026 Kvestogram. Все права защищены. Разработано для ИП Ловадская А.И.</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-white transition">Политика конфиденциальности</a>
          <a href="#" className="hover:text-white transition">Публичная оферта</a>
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

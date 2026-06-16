import { useState } from 'react';
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
  ArrowUpRight 
} from 'lucide-react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<'standard' | 'premium' | 'vip' | null>(null);

  const openEnrollModal = (planId: 'standard' | 'premium' | 'vip') => {
    setSelectedPlanId(planId);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#090212] text-white selection:bg-[#e040fb]/30 selection:text-white pb-20">
      {/* Visual background elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-[#e040fb]/10 to-[#7b1fa2]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-[#f4a7b9]/5 to-[#e040fb]/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      
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
          <a href="#levels" className="hover:text-white transition duration-300">Уровни</a>
          <a href="#pricing" className="hover:text-white transition duration-300">Тарифы</a>
        </nav>

        <button 
          onClick={() => openEnrollModal('premium')}
          className="px-6 py-2.5 rounded-full border border-[#e040fb]/40 bg-[#e040fb]/5 text-xs uppercase font-bold tracking-wider hover:bg-[#e040fb] hover:text-[#100320] hover:shadow-[0_0_15px_rgba(224,64,251,0.3)] transition-all duration-300 cursor-pointer"
        >
          Вступить в игру
        </button>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-28 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <Flame size={12} className="text-[#e040fb] animate-bounce" />
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#f4a7b9]/90 font-bold">
            Запуск нового сезона • 1 июля 2026
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-tight max-w-5xl mx-auto">
          Выйди на новый уровень продаж через <span className="bg-gradient-to-r from-[#e040fb] via-[#f4a7b9] to-white bg-clip-text text-transparent">Интерактивный Сюжет</span>
        </h1>

        <p className="text-sm md:text-lg text-[#f4a7b9]/75 font-light max-w-2xl mx-auto mt-6 leading-relaxed">
          Квестограм — это первая иммерсивная игра для экспертов и предпринимателей. Исследуйте целевую аудиторию, создавайте взрывной контент и совершайте продажи в формате увлекательных миссий.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button 
            onClick={() => openEnrollModal('premium')}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-[#100320] bg-gradient-to-r from-[#e040fb] to-[#f4a7b9] hover:opacity-95 hover:shadow-[0_0_25px_rgba(224,64,251,0.5)] transition-all duration-300 flex items-center justify-center cursor-pointer"
          >
            <span>Начать Квест</span>
            <Play size={12} className="ml-2 fill-[#100320]" />
          </button>
          
          <a 
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition duration-300 flex items-center justify-center"
          >
            Смотреть Тарифы
          </a>
        </div>

        {/* Feature Highlights Grid */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 md:mt-36 text-left">
          <div className="p-8 rounded-3xl bg-glass-light border border-white/5 relative overflow-hidden group hover:border-[#e040fb]/30 transition duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e040fb]/5 rounded-full blur-xl group-hover:bg-[#e040fb]/10 transition duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-[#e040fb]">
              <Target size={22} />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3 text-white">Глубокий Анализ Ниши</h3>
            <p className="text-xs text-[#f4a7b9]/60 font-light leading-relaxed">
              Забудьте о скучных таблицах. Пройдите игровые симуляции, чтобы понять истинные мотивы и боли вашей аудитории.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-glass-light border border-white/5 relative overflow-hidden group hover:border-[#e040fb]/30 transition duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#f4a7b9]/5 rounded-full blur-xl group-hover:bg-[#f4a7b9]/10 transition duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-[#f4a7b9]">
              <Sparkles size={22} />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3 text-white">Интерактивный Сторителлинг</h3>
            <p className="text-xs text-[#f4a7b9]/60 font-light leading-relaxed">
              Научитесь удерживать внимание подписчиков как в лучших сериалах Нетфликс. Пошаговые шаблоны прогревов и сценариев.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-glass-light border border-white/5 relative overflow-hidden group hover:border-[#e040fb]/30 transition duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e040fb]/5 rounded-full blur-xl group-hover:bg-[#e040fb]/10 transition duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-[#e040fb]">
              <Trophy size={22} />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3 text-white">Реальные Результаты</h3>
            <p className="text-xs text-[#f4a7b9]/60 font-light leading-relaxed">
              Зарабатывайте внутриигровую валюту, соревнуйтесь в рейтинге с другими участниками и забирайте ценные призы за лучшие кейсы.
            </p>
          </div>
        </section>

        {/* Game Levels Section */}
        <section id="levels" className="mt-28 md:mt-40 text-left">
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
              { num: '02', title: 'Создание Упаковки & Storytelling', desc: 'Оформляем профиль в Instagram и Telegram. Создаем визуальную концепцию и пишем первые прогревы.' },
              { num: '03', title: 'Генерация Лидов и Трафик', desc: 'Запускаем органический и платный трафик. Учимся работать с Reels, хэштегами и взаимным пиаром.' },
              { num: '04', title: 'Продажи & Автоматизация', desc: 'Выстраиваем автоворонки, чат-ботов и учимся закрывать сделки в переписке без давления.' }
            ].map((lvl, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-2xl bg-glass-light hover:bg-white/5 border border-white/5 hover:border-white/10 transition duration-300 gap-4">
                <div className="flex items-center space-x-6">
                  <span className="font-mono text-3xl font-extrabold text-[#e040fb]/40">{lvl.num}</span>
                  <div>
                    <h4 className="font-serif text-lg md:text-xl font-bold text-white">{lvl.title}</h4>
                    <p className="text-xs text-[#f4a7b9]/60 mt-1 font-light max-w-2xl leading-relaxed">{lvl.desc}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs text-[#f4a7b9]/60 font-semibold">
                  <span>Доступно в записи и live</span>
                  <ChevronRight size={14} className="ml-1 text-[#e040fb]" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing/Plans Section */}
        <section id="pricing" className="mt-28 md:mt-40">
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
                  className={`relative p-8 rounded-3xl bg-glass-heavy flex flex-col justify-between border transition-all duration-300 ${
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

        {/* Trust & Guarantee Section */}
        <section className="mt-28 md:mt-36 p-8 md:p-12 rounded-3xl bg-glass-heavy border border-white/5 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-left gap-8">
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

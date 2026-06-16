/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { PRICING_PLANS } from '../data';
import { formatPhoneNumber } from '../utils';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId: 'standard' | 'premium' | 'vip' | null;
}

export default function EnrollModal({ isOpen, onClose, selectedPlanId }: EnrollModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    telegram: '',
    niche: '',
    planId: 'premium' as 'standard' | 'premium' | 'vip',
    agreeToTerms: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Update selected plan if changed by parent
  useEffect(() => {
    if (selectedPlanId) {
      setFormData(prev => ({ ...prev, planId: selectedPlanId }));
    }
  }, [selectedPlanId]);

  if (!isOpen) return null;

  const currentPlan = PRICING_PLANS.find(p => p.id === formData.planId) || PRICING_PLANS[1];

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
    
    // Simple basic Belarus format validation length checks
    if (formatted.replace(/[^\d]/g, '').length < 12) {
      setPhoneError('Введите полный номер телефона (код +375 или +7)');
    } else {
      setPhoneError('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Final basic validations before submit
    const digitsOnly = formData.phone.replace(/[^\d]/g, '');
    if (digitsOnly.length < 11) {
      setPhoneError('Пожалуйста, введите корректный номер телефона');
      return;
    }

    setIsSubmitting(true);

    // Simulating rich API database flow or analytics tracking trigger
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Dark overlay backdrop click hider */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#100320]/90 backdrop-blur-md cursor-pointer"
        id="modal-backdrop-overlay"
      />

      {/* Main glass frame body */}
      <div
        className="relative w-full max-w-xl bg-glass-heavy border border-white/10 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(224,64,251,0.25)] overflow-hidden z-10 transition-transform duration-300"
        id="enroll-modal-box"
      >
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#e040fb]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#f4a7b9]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#e040fb] flex items-center justify-center text-[#f4a7b9] hover:text-[#e040fb] duration-300 cursor-pointer z-50"
          aria-label="Close modal"
          id="modal-close-btn"
        >
          <X size={15} />
        </button>

        {!isSuccess ? (
          /* Enrollment Input Form */
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            <div className="text-center md:text-left mb-2">
              <span className="text-[10px] uppercase font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[#f4a7b9] tracking-widest font-bold">
                🔒 Безопасное подключение
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mt-3">
                Вступить в игру Kvestogram
              </h3>
              <p className="text-xs text-[#f4a7b9]/60 font-light mt-1.5 leading-relaxed">
                Заполните анкету предзаписи. Наш сертифицированный куратор свяжется с вами в Telegram для подтверждения брони и деталей рассрочки.
              </p>
            </div>

            {/* Split plan selector tabs */}
            <div className="space-y-2">
              <label className="text-[10px] tracking-widest text-[#f4a7b9]/70 font-semibold uppercase">
                Тариф Обучения
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PRICING_PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, planId: plan.id }))}
                    className={`p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                      formData.planId === plan.id
                        ? 'border-[#e040fb] bg-[#e040fb]/15 text-white shadow-[0_0_15px_rgba(224,64,251,0.2)]'
                        : 'border-white/5 bg-white/5 text-[#f4a7b9]/60 hover:text-white hover:border-[#f4a7b9]/30'
                    }`}
                  >
                    <div className="text-xs font-bold leading-none">{plan.name.split(' ')[0]}</div>
                    <div className="text-[10px] mt-1 text-[#e040fb] font-mono font-bold">
                      {plan.price} {plan.currency}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Plan Details Card Summary */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center text-xs">
              <div>
                <span className="font-semibold text-white uppercase tracking-wider block">Выбран: {currentPlan.name}</span>
                <span className="text-[10px] text-[#f4a7b9]/60 block mt-1">Доступ к платформе обучения • Старт 1 июля 2026</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-base font-bold text-[#e040fb] tracking-tight block">
                  {currentPlan.price} {currentPlan.currency}
                </span>
                <span className="text-[9px] text-[#f4a7b9]/60 uppercase block">Рассрочка от 56 BYN/мес</span>
              </div>
            </div>

            {/* Input Inputs Stack */}
            <div className="space-y-4">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-widest text-[#f4a7b9]/70 font-semibold uppercase block">
                  Ваше имя и фамилия (ФИО)
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Вероника Шумакова"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs placeholder:text-[#f4a7b9]/30 focus:border-[#e040fb] focus:outline-none transition-colors"
                />
              </div>

              {/* Phone with auto region helper prefix */}
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-widest text-[#f4a7b9]/70 font-semibold uppercase block">
                  Номер телефона (с кодом страны)
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+375 (29) 123-45-67 или +7..."
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white text-xs placeholder:text-[#f4a7b9]/30 focus:outline-none transition-colors ${
                    phoneError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#e040fb]'
                  }`}
                />
                {phoneError && (
                  <p className="text-[10px] text-red-400 font-medium tracking-wide mt-1">{phoneError}</p>
                )}
              </div>

              {/* Telegram Username */}
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-widest text-[#f4a7b9]/70 font-semibold uppercase block">
                  Ваш юзернейм в Telegram
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-xs text-[#f4a7b9]/40 font-mono">@</span>
                  <input
                    type="text"
                    name="telegram"
                    required
                    placeholder="my_love_account"
                    value={formData.telegram}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs placeholder:text-[#f4a7b9]/30 focus:border-[#e040fb] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Business field/Niche */}
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-widest text-[#f4a7b9]/70 font-semibold uppercase block">
                  Ваша ниша или сфера бизнеса
                </label>
                <input
                  type="text"
                  name="niche"
                  required
                  placeholder="Косметология / Бренд одежды / Свечи ручной работы"
                  value={formData.niche}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs placeholder:text-[#f4a7b9]/30 focus:border-[#e040fb] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Checkbox agreement */}
            <div className="flex items-start space-x-2.5 pt-1">
              <input
                type="checkbox"
                id="agreeToTerms"
                required
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                className="mt-0.5 rounded text-[#e040fb] focus:ring-[#e040fb]/30 accent-[#e040fb] flex-shrink-0 cursor-pointer"
              />
              <label htmlFor="agreeToTerms" className="text-[10px] text-[#f4a7b9]/50 font-light leading-relaxed select-none cursor-pointer">
                Я согласна с условиями Правил бронирования, политикой конфиденциальности и публичной офертой ИП Ловадская А.И.
              </label>
            </div>

            {/* Final Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest text-[#100320] bg-gradient-to-r from-[#e040fb] to-[#f4a7b9] hover:opacity-95 hover:shadow-[0_0_20px_rgba(224,64,251,0.4)] disabled:opacity-50 transition-all duration-300 flex items-center justify-center cursor-pointer"
              id="modal-submit-btn"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-[#100320] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Подтвердить Участие в Квесте</span>
                  <ArrowRight size={14} className="ml-2 font-bold" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Flawless Congratulations Success View */
          <div className="text-center py-8 space-y-6 relative z-10" id="enroll-modal-success-box">
            <div className="w-16 h-16 rounded-full bg-[#e040fb]/10 border border-[#e040fb]/40 flex items-center justify-center mx-auto animate-bounce shadow-[0_0_20px_rgba(224,64,251,0.3)]">
              <CheckCircle2 className="w-8 h-8 text-[#e040fb]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono px-3 py-1 bg-[#e040fb]/10 text-[#e040fb] rounded-full border border-[#e040fb]/20 tracking-widest font-extrabold block max-w-max mx-auto">
                🎉 Место Бронирования Зафиксировано
              </span>
              <h3 className="font-serif text-3xl font-extrabold text-white tracking-tight mt-3">
                Вы в игре, {formData.name.split(' ')[0]}!
              </h3>
              <p className="text-sm text-[#f4a7b9]/80 font-light leading-relaxed max-w-md mx-auto">
                Ваша анкета тарифа <span className="font-semibold text-white">{currentPlan.name}</span> успешно зарегистрирована под защитным номером <span className="font-mono font-bold text-white">#KV-{(Math.floor(Math.random() * 8000) + 1000)}</span>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-left text-xs max-w-md mx-auto space-y-2">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#f4a7b9]/60 uppercase font-semibold">Ваша Ниша:</span>
                <span className="text-white font-medium">{formData.niche}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#f4a7b9]/60 uppercase font-semibold">Telegram Связь:</span>
                <span className="text-white font-mono font-medium">@{formData.telegram}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#f4a7b9]/60 uppercase font-semibold">Ближайший Поток:</span>
                <span className="text-[#e040fb] font-semibold">1 июля 2026 года</span>
              </div>
            </div>

            <p className="text-[11px] text-[#f4a7b9]/50 max-w-sm mx-auto leading-relaxed">
              Наш главный менеджер-куратор уже получил заявку и свяжется с вами в Telegram (или по телефону {formData.phone}) в течение 15 минут для окончательного согласования оферты. Готовьтесь взлетать!
            </p>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#1a0533] bg-[#f4a7b9] hover:bg-[#e040fb] hover:text-white transition duration-300 cursor-pointer"
              id="success-close-btn"
            >
              Закрыть Окно
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

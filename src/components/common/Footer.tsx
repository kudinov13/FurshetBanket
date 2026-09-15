import { Phone, Envelope, MapPin } from '@phosphor-icons/react/dist/ssr'

export function Footer() {
  return (
    <footer className="bg-primary text-white/80 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-white mb-3 tracking-tight">
              Фуршет-банкет
            </h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-[30ch]">
              Праздничные фуршеты и банкеты с доставкой. Стаж более 3 лет, работаем без выходных.
            </p>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-medium mb-5">Контакты</h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+79619777115"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm cursor-pointer"
              >
                <Phone size={16} weight="fill" className="text-accent shrink-0" />
                8 (961) 977-71-15
              </a>
              <a
                href="tel:+79059800611"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm cursor-pointer"
              >
                <Phone size={16} weight="duotone" className="text-accent shrink-0" />
                8 (905) 980-06-11
              </a>
              <a
                href="mailto:nyusha-korobova@mail.ru"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm cursor-pointer"
              >
                <Envelope size={16} weight="fill" className="text-accent shrink-0" />
                nyusha-korobova@mail.ru
              </a>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <MapPin size={16} weight="fill" className="text-accent shrink-0" />
                с. Малоугренево
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-medium mb-5">Информация</h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <p>Режим работы: без выходных</p>
              <p>Выполнение заказа: 2-3 дня</p>
              <p>Бесплатная доставка от 3000 ₽</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © <a href="/login" className="hover:text-white/70 transition-colors" aria-label="Вход для администратора">2026</a> Фуршет-банкет. Все права защищены.
          </p>
          <p className="text-white/40 text-sm">
            Коробова Анна Николаевна
          </p>
        </div>
      </div>
    </footer>
  )
}

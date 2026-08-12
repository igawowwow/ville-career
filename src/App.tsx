import { useEffect, useRef, useState, type ReactNode } from 'react'

// ページ内の応募フォームセクションへスクロール
const APPLY_URL = '#apply'

// FormSubmit経由で応募内容をメール通知する(初回送信時に有効化メールが届く)
const FORM_ENDPOINT = 'https://formsubmit.co/9a619cba29ce9aaae2fb88526033f002'
const SITE_URL = 'https://career.ville-ville.com'

const WISH_OPTIONS = [
  '月収30万円以上',
  '年間休日120日以上',
  '正社員',
  '寮・社宅あり',
  '未経験OKの仕事',
]

const BADGES = ['月収30万円以上', '年間休日120日以上', '正社員', '未経験OK']

const REASONS = [
  '給料を上げたい。',
  '休みを増やしたい。',
  '正社員になりたい。',
  '貯金したい。',
  '一人暮らししたい。',
  'もっと安定したい。',
]

const CONDITIONS = [
  { t: '高収入を目指せる', n: '01' },
  { t: '年間休日120日以上', n: '02' },
  { t: '正社員', n: '03' },
  { t: '賞与・昇給あり', n: '04' },
  { t: '寮・社宅あり', n: '05' },
  { t: '未経験OK', n: '06' },
]

const QUESTIONS = [
  'いくらもらえる？',
  '何日休める？',
  'どこで働く？',
  '何時から何時まで？',
  '残業はどれくらい？',
  '自分でも応募できる？',
]

const STEPS = [
  { n: '01', t: '紹介', d: '友人・知人などからVILLE CAREERの紹介を受ける。' },
  { n: '02', t: '応募', d: '紹介者から案内された専用フォームから申し込み。' },
  { n: '03', t: '求人をご案内', d: '応募内容を確認し、対象となる求人をご案内します。' },
  { n: '04', t: '選考', d: '応募したい企業が決まれば選考へ。' },
  { n: '05', t: '内定・入社', d: '入社までサポートします。' },
]

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add('is-in')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}

function Marquee({ text, reverse = false }: { text: string; reverse?: boolean }) {
  const row = Array.from({ length: 8 }, () => text).join('')
  return (
    <div className={`marquee ${reverse ? 'marquee--reverse' : ''}`} aria-hidden="true">
      <div className="marquee__track">
        <span>{row}</span>
        <span>{row}</span>
      </div>
    </div>
  )
}

function ApplyForm() {
  const sent = new URLSearchParams(window.location.search).has('sent')
  if (sent) {
    return (
      <div className="apply__done">
        <p className="apply__done-mark" aria-hidden="true">
          ✓
        </p>
        <p className="statement statement--big">送信が完了しました。</p>
        <p className="body body--dim">
          ご応募ありがとうございます。内容を確認のうえ、担当者よりご連絡します。
        </p>
      </div>
    )
  }
  return (
    <form className="apply__form" action={FORM_ENDPOINT} method="POST">
      <input type="hidden" name="_subject" value="【VILLE CAREER】新しい応募が届きました" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value={`${SITE_URL}/?sent=1#apply`} />
      <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <div className="apply__grid">
        <label className="field">
          <span className="field__label">
            お名前<em className="field__req">必須</em>
          </span>
          <input className="field__input" type="text" name="お名前" required autoComplete="name" />
        </label>
        <label className="field">
          <span className="field__label">
            フリガナ<em className="field__req">必須</em>
          </span>
          <input className="field__input" type="text" name="フリガナ" required />
        </label>
        <label className="field">
          <span className="field__label">
            電話番号<em className="field__req">必須</em>
          </span>
          <input className="field__input" type="tel" name="電話番号" required autoComplete="tel" />
        </label>
        <label className="field">
          <span className="field__label">
            メールアドレス<em className="field__req">必須</em>
          </span>
          <input className="field__input" type="email" name="メールアドレス" required autoComplete="email" />
        </label>
        <label className="field">
          <span className="field__label">
            生年月日<em className="field__req">必須</em>
          </span>
          <input className="field__input" type="text" name="生年月日" placeholder="例:1998年4月1日" required />
        </label>
        <label className="field">
          <span className="field__label">
            お住まいの都道府県<em className="field__req">必須</em>
          </span>
          <input className="field__input" type="text" name="お住まいの都道府県" required />
        </label>
        <label className="field field--wide">
          <span className="field__label">
            紹介者のお名前<em className="field__req">必須</em>
          </span>
          <input
            className="field__input"
            type="text"
            name="紹介者のお名前"
            placeholder="どなたからのご紹介ですか?"
            required
          />
        </label>
        <fieldset className="field field--wide apply__fieldset">
          <legend className="field__label">
            現在の状況<em className="field__req">必須</em>
          </legend>
          <div className="apply__chips">
            {['在職中', '離職中', '学生'].map((s) => (
              <label key={s} className="chip">
                <input type="radio" name="現在の状況" value={s} required />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="field field--wide apply__fieldset">
          <legend className="field__label">希望する条件(複数選択可)</legend>
          <div className="apply__chips">
            {WISH_OPTIONS.map((w) => (
              <label key={w} className="chip">
                <input type="checkbox" name="希望する条件" value={w} />
                <span>{w}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="field field--wide">
          <span className="field__label">質問・伝えたいこと</span>
          <textarea className="field__input field__input--area" name="質問・伝えたいこと" rows={4} />
        </label>
      </div>

      <button className="btn btn--accent btn--big apply__submit" type="submit">
        この内容で応募する
        <span className="btn__arrow" aria-hidden="true">
          →
        </span>
      </button>
      <p className="body body--dim apply__note">求職者の利用料は0円です。送信後、担当者よりご連絡します。</p>
    </form>
  )
}

function SectionTag({ en, num }: { en: string; num: string }) {
  return (
    <div className="section-tag">
      <span className="section-tag__num">{num}</span>
      <span className="section-tag__line" aria-hidden="true" />
      <span className="section-tag__en">{en}</span>
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="site">
      <div className="grain" style={{ backgroundImage: NOISE_URI }} aria-hidden="true" />

      <header className={`header ${scrolled ? 'header--solid' : ''}`}>
        <a className="header__logo" href="#top">
          VILLE<span className="header__logo-accent">CAREER</span>
        </a>
        <a className="header__cta" href={APPLY_URL}>
          紹介を受けて応募する
        </a>
      </header>

      <main id="top">
        {/* ============ HERO ============ */}
        <section className="hero">
          <p className="hero__kicker">
            <span className="hero__kicker-dot" aria-hidden="true" />
            原則紹介制の就職・転職支援｜INVITATION ONLY
          </p>
          <h1 className="hero__title">
            <span className="hero__title-line">
              <span className="hero__title-inner">未経験から、</span>
            </span>
            <span className="hero__title-line">
              <span className="hero__title-inner hero__title-inner--delay">
                今より<em className="hero__em">いい条件</em>へ。
              </span>
            </span>
          </h1>
          <ul className="hero__badges">
            {BADGES.map((b, i) => (
              <li key={b} className="hero__badge" style={{ animationDelay: `${600 + i * 120}ms` }}>
                {b}
              </li>
            ))}
          </ul>
          <p className="hero__lead">
            経験がなくても、条件まで妥協する必要はない。
            <br />
            VILLE CAREERは、未経験からの就職・転職を支援する、原則紹介制の転職サービスです。
          </p>
          <div className="hero__scroll" aria-hidden="true">
            <span>SCROLL</span>
            <span className="hero__scroll-bar" />
          </div>
          <div className="hero__ghost" aria-hidden="true">
            VILLE
          </div>
        </section>

        <Marquee text="INVITATION ONLY ✳ VILLE CAREER ✳ " />

        {/* ============ 01 INVITATION ONLY ============ */}
        <section className="section section--invite">
          <SectionTag num="01" en="INVITATION ONLY" />
          <Reveal>
            <h2 className="section__title">
              原則、
              <br />
              ご紹介の方のみ。
            </h2>
          </Reveal>
          <div className="invite__grid">
            <Reveal className="invite__main">
              <p className="statement">
                VILLE CAREERは、
                <br />
                <strong>誰でも登録できる転職サイトではありません。</strong>
              </p>
              <p className="body">
                友人・知人・既存利用者などからご紹介いただいた方を中心に、就職・転職をサポートしています。
              </p>
            </Reveal>
            <Reveal className="invite__sub" delay={120}>
              <p className="body">
                大量の求人を掲載して、大量の登録者を集めることが目的ではありません。
              </p>
              <p className="statement statement--accent">
                一人ひとりに向き合える範囲で、
                <br />
                仕事をご紹介します。
              </p>
              <p className="body body--dim">ご紹介を受けた方は、専用フォームからお申し込みください。</p>
              <a className="btn btn--accent" href={APPLY_URL}>
                紹介を受けて応募する
                <span className="btn__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* ============ 02 BETTER LIFE ============ */}
        <section className="section section--life">
          <SectionTag num="02" en="BETTER LIFE" />
          <Reveal>
            <h2 className="section__title">
              転職するなら、
              <br />
              生活を良くしよう。
            </h2>
          </Reveal>
          <ul className="reasons">
            {REASONS.map((r, i) => (
              <li key={r} className="reasons__item">
                <Reveal delay={i * 60}>
                  <span className="reasons__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="reasons__text">{r}</span>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="life__closing">
            <p className="statement statement--big">
              転職する理由は、<em className="em-underline">立派じゃなくていい。</em>
            </p>
            <p className="statement">
              自分の生活を良くするために、仕事を変える。
              <br />
              <strong className="accent-text">それで十分です。</strong>
            </p>
          </Reveal>
        </section>

        <Marquee text="BETTER LIFE ✳ GOOD CONDITIONS ✳ " reverse />

        {/* ============ 03 GOOD CONDITIONS ============ */}
        <section className="section section--conditions">
          <SectionTag num="03" en="GOOD CONDITIONS" />
          <Reveal>
            <h2 className="section__title">
              未経験でも、
              <br />
              条件は<em className="hero__em">妥協しない</em>。
            </h2>
          </Reveal>
          <div className="conditions">
            {CONDITIONS.map((c, i) => (
              <Reveal key={c.t} className="conditions__cell" delay={i * 70}>
                <span className="conditions__num">{c.n}</span>
                <span className="conditions__label">{c.t}</span>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="note">
              など、さまざまな条件の求人を取り扱っています。
              <br />
              ※実際の募集条件は求人によって異なります。
            </p>
          </Reveal>
        </section>

        {/* ============ 04 SIMPLE ============ */}
        <section className="section section--simple">
          <SectionTag num="04" en="SIMPLE" />
          <Reveal>
            <h2 className="section__title">
              大事なことを、
              <br />
              わかりやすく。
            </h2>
          </Reveal>
          <Reveal>
            <p className="body">仕事を選ぶときに知りたいのは、</p>
          </Reveal>
          <ul className="questions">
            {QUESTIONS.map((q, i) => (
              <li key={q} className="questions__item">
                <Reveal delay={i * 50}>
                  <span className="questions__q" aria-hidden="true">
                    Q
                  </span>
                  <span className="questions__text">{q}</span>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal>
            <p className="statement">
              VILLE CAREERでは、仕事選びに必要な情報を
              <br />
              <strong className="accent-text">できるだけシンプルに</strong>お伝えします。
            </p>
          </Reveal>
        </section>

        {/* ============ 05 HOW IT WORKS ============ */}
        <section className="section section--flow">
          <SectionTag num="05" en="HOW IT WORKS" />
          <Reveal>
            <h2 className="section__title">ご紹介から、入社まで。</h2>
          </Reveal>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.n} className="steps__item">
                <Reveal delay={i * 60}>
                  <span className="steps__num">{s.n}</span>
                  <div className="steps__body">
                    <h3 className="steps__title">{s.t}</h3>
                    <p className="steps__desc">{s.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="flow__free">
            <p>
              求職者の利用料は<span className="flow__zero">0</span>円です。
            </p>
          </Reveal>
        </section>

        {/* ============ CLOSING ============ */}
        <section className="section section--closing">
          <Reveal>
            <ul className="closing__no">
              <li>
                <s>大量登録。</s>
              </li>
              <li>
                <s>大量応募。</s>
              </li>
              <li>
                <s>大量の求人メール。</s>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <p className="statement statement--big">
              そんな転職サービスではなく、
              <br />
              <strong>
                人から人へつながる、
                <br className="sp-only" />
                原則紹介制の転職支援。
              </strong>
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="closing__thesis">
              誰にでも紹介するのではなく、
              <br />
              紹介された人を、<em className="hero__em">ちゃんと支える</em>。
            </p>
          </Reveal>
          <Reveal delay={240}>
            <h2 className="closing__final">
              未経験から、
              <br />
              今よりいい条件へ。
            </h2>
            <a className="btn btn--accent btn--big" href={APPLY_URL}>
              紹介を受けて応募する
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </Reveal>
        </section>

        {/* ============ APPLY ============ */}
        <section className="section section--apply" id="apply">
          <SectionTag num="06" en="APPLY" />
          <Reveal>
            <h2 className="section__title">
              紹介を受けて、
              <br />
              応募する。
            </h2>
            <p className="body">
              ご紹介を受けた方専用の応募フォームです。入力内容を確認のうえ、担当者よりご連絡します。
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ApplyForm />
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__wordmark" aria-hidden="true">
          VILLE CAREER
        </div>
        <div className="footer__meta">
          <p className="footer__brand">VILLE CAREER</p>
          <p className="footer__company">
            株式会社ヴィレ
            <span className="footer__sep">｜</span>
            代表取締役　伊賀 輝
          </p>
        </div>
      </footer>
    </div>
  )
}

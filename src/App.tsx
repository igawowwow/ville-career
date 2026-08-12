import { useEffect, useRef, useState, type ReactNode } from 'react'

// 応募フォーム(Googleフォーム)。送信されると career@ville-ville.com に通知が届く
const APPLY_FORM_URL = 'https://forms.gle/Hk1X5Zn9UFhW5W768'
// 企業様お問い合わせフォーム(Googleフォーム)。同じく career@ville-ville.com に通知
const COMPANY_FORM_URL = 'https://forms.gle/1zq41ePyPGHetiSB6'

const LICENSE = '厚生労働大臣許可 有料職業紹介事業 許可番号 13-ユ-313803'

const BADGES = [
  { t: '月収30万円〜', e: '💰' },
  { t: '年間休日120日〜', e: '🏖️' },
  { t: '正社員', e: '🧑‍💼' },
  { t: '未経験OK', e: '🌱' },
  { t: '寮・社宅あり', e: '🏠' },
  { t: '賞与・昇給あり', e: '📈' },
]

const INPUTS = ['お名前', '電話 or LINE', '紹介者の名前']

const CHAT = [
  { who: 'friend', text: 'いい仕事探してるって言ってたよね？ヴィレキャリア紹介するよ🙌' },
  { who: 'you', text: 'ほんと？応募めんどくさくない？' },
  { who: 'friend', text: '入力3つだけ、30秒で終わるよ' },
  { who: 'you', text: 'それならやってみる！' },
  { who: 'staff', text: 'ご応募ありがとうございます！担当のヴィレキャリアです。ぴったりの求人を探してご連絡しますね📞' },
]

const FAQS = [
  {
    q: 'お金はかかる？',
    a: 'かかりません。求職者の利用料はずっと0円です。',
  },
  {
    q: '紹介してくれる人がいないとダメ？',
    a: '原則、友人・知人・既存利用者からご紹介を受けた方向けのサービスです。紹介者の名前をフォームに書いてください。',
  },
  {
    q: '応募したらどうなる？',
    a: '担当者が内容を確認して、折り返しご連絡します。あなたに合いそうな求人をご案内して、応募したい企業が決まれば選考へ進みます。',
  },
  {
    q: '経験もスキルもないけど大丈夫？',
    a: '大丈夫です。未経験OKの求人を中心に、今より条件のいい仕事を一緒に探します。',
  },
]

const COMPANY_POINTS = [
  {
    t: '紹介ベースの母集団',
    d: '友人・知人の紹介を通じて集まった求職者をご案内します。',
    e: '🤝',
  },
  {
    t: '若手・未経験層に強い',
    d: '「未経験から条件のいい仕事へ」を軸に、若手層の応募が集まっています。',
    e: '🌱',
  },
  {
    t: 'まずは無料相談から',
    d: '募集職種・人数・時期をお聞かせください。1営業日以内にご連絡します。',
    e: '💬',
  },
]

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

function ApplyButton({ big = false, label = '30秒でカンタン応募' }: { big?: boolean; label?: string }) {
  return (
    <a className={`apply-btn ${big ? 'apply-btn--big' : ''}`} href={APPLY_FORM_URL} target="_blank" rel="noopener">
      <span className="apply-btn__label">{label}</span>
      <span className="apply-btn__sub">入力は3つだけ・利用料0円</span>
    </a>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__brand">VILLE CAREER（ヴィレキャリア）</p>
      <p className="footer__line">運営：株式会社ヴィレ</p>
      <p className="footer__line footer__line--license">{LICENSE}</p>
      <nav className="footer__nav">
        <a href="#top">求職者の方はこちら</a>
        <span aria-hidden="true">・</span>
        <a href="#company">企業様はこちら</a>
      </nav>
    </footer>
  )
}

function SeekerPage() {
  return (
    <>
      <main id="top">
        {/* ============ HERO ============ */}
        <section className="hero">
          <p className="hero__kicker">🎫 紹介制の就職・転職サポート</p>
          <h1 className="hero__title">
            友だちの紹介で、
            <br />
            <em>いまよりいい仕事</em>へ。
          </h1>
          <p className="hero__lead">
            経験ゼロでもOK。むずかしい登録もなし。
            <br />
            紹介を受けたら、あとは30秒で応募するだけ。
          </p>

          <div className="ticket" role="presentation">
            <p className="ticket__head">入力するのはこの3つだけ</p>
            <ul className="ticket__items">
              {INPUTS.map((t, i) => (
                <li key={t} className="ticket__item">
                  <span className="ticket__num">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <ApplyButton big />

          <ul className="hero__badges" aria-label="取り扱い求人の例">
            {BADGES.map((b, i) => (
              <li key={b.t} className="badge" style={{ animationDelay: `${300 + i * 90}ms` }}>
                <span aria-hidden="true">{b.e}</span> {b.t}
              </li>
            ))}
          </ul>
          <p className="hero__note">※実際の募集条件は求人によって異なります。</p>
        </section>

        {/* ============ ABOUT ============ */}
        <section className="section">
          <Reveal>
            <h2 className="section__title">
              <span className="section__title-mark">🤝</span>
              ヴィレキャリアって？
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="section__text">
              誰でも登録できる転職サイトとはちがって、<strong>友だち・知り合いの紹介でつながる</strong>
              就職・転職サポートです。大量の求人メールは送りません。紹介された一人ひとりに、担当がちゃんと向き合います。
            </p>
          </Reveal>
        </section>

        {/* ============ FLOW (chat) ============ */}
        <section className="section section--chat">
          <Reveal>
            <h2 className="section__title">
              <span className="section__title-mark">💬</span>
              応募までは、こんな感じ
            </h2>
          </Reveal>
          <div className="chat">
            {CHAT.map((m, i) => (
              <Reveal key={i} delay={i * 90} className={`chat__row chat__row--${m.who}`}>
                <span className="chat__who" aria-hidden="true">
                  {m.who === 'friend' ? '👦' : m.who === 'you' ? '🙂' : '🧑‍💻'}
                </span>
                <p className="chat__bubble">{m.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="section__cta">
            <ApplyButton />
          </Reveal>
        </section>

        {/* ============ FAQ ============ */}
        <section className="section">
          <Reveal>
            <h2 className="section__title">
              <span className="section__title-mark">❓</span>
              よくある質問
            </h2>
          </Reveal>
          <div className="faq">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 70}>
                <details className="faq__item">
                  <summary className="faq__q">{f.q}</summary>
                  <p className="faq__a">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ CLOSING ============ */}
        <section className="section section--closing" id="apply">
          <Reveal>
            <h2 className="closing__title">
              紹介を受けたら、
              <br />
              <em>30秒</em>で応募しよう。
            </h2>
          </Reveal>
          <Reveal delay={120} className="section__cta">
            <ApplyButton big />
          </Reveal>
          <Reveal delay={200}>
            <p className="closing__note">送信すると、担当者から折り返しご連絡します。</p>
          </Reveal>
        </section>
      </main>

      {/* スマホ用 固定応募バー */}
      <div className="sticky-cta">
        <a href={APPLY_FORM_URL} target="_blank" rel="noopener">
          🚀 30秒でカンタン応募（無料）
        </a>
      </div>
    </>
  )
}

function CompanyPage() {
  return (
    <main id="company-top" className="company">
      <section className="hero hero--company">
        <p className="hero__kicker hero__kicker--company">🏢 企業様向け</p>
        <h1 className="hero__title">
          若手・未経験層の採用、
          <br />
          <em className="em--company">紹介ベース</em>でお手伝いします。
        </h1>
        <p className="hero__lead">
          ヴィレキャリアは、人から人への紹介でつながる有料職業紹介サービスです。
          <br />
          採用のご相談は、フォームから1分で送れます。
        </p>
        <a className="apply-btn apply-btn--big apply-btn--company" href={COMPANY_FORM_URL} target="_blank" rel="noopener">
          <span className="apply-btn__label">採用の相談をする</span>
          <span className="apply-btn__sub">1営業日以内にご連絡します</span>
        </a>
      </section>

      <section className="section">
        <Reveal>
          <h2 className="section__title">
            <span className="section__title-mark">✨</span>
            ヴィレキャリアの特徴
          </h2>
        </Reveal>
        <div className="points">
          {COMPANY_POINTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 90} className="points__card">
              <span className="points__emoji" aria-hidden="true">
                {p.e}
              </span>
              <h3 className="points__title">{p.t}</h3>
              <p className="points__desc">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--closing">
        <Reveal>
          <h2 className="closing__title">
            まずは、
            <br />
            お気軽にご相談ください。
          </h2>
        </Reveal>
        <Reveal delay={120} className="section__cta">
          <a className="apply-btn apply-btn--big apply-btn--company" href={COMPANY_FORM_URL} target="_blank" rel="noopener">
            <span className="apply-btn__label">採用の相談をする</span>
            <span className="apply-btn__sub">募集職種・人数・時期をお聞かせください</span>
          </a>
        </Reveal>
        <Reveal delay={200}>
          <p className="closing__note">{LICENSE}</p>
        </Reveal>
      </section>
    </main>
  )
}

export default function App() {
  const [page, setPage] = useState<'seeker' | 'company'>(() =>
    window.location.hash.startsWith('#company') ? 'company' : 'seeker',
  )
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onHash = () => {
      const next = window.location.hash.startsWith('#company') ? 'company' : 'seeker'
      setPage(next)
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`site ${page === 'company' ? 'site--company' : ''}`}>
      <header className={`header ${scrolled ? 'header--solid' : ''}`}>
        <a className="header__logo" href="#top" onClick={() => setPage('seeker')}>
          VILLE<span>CAREER</span>
        </a>
        {page === 'seeker' ? (
          <a className="header__link" href="#company">
            企業様はこちら
          </a>
        ) : (
          <a className="header__link" href="#top">
            求職者の方はこちら
          </a>
        )}
      </header>

      {page === 'seeker' ? <SeekerPage /> : <CompanyPage />}

      <Footer />
    </div>
  )
}

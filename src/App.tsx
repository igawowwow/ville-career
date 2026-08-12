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
  { who: 'you', text: 'ほんと？なんか手続きめんどくさそう…' },
  { who: 'friend', text: '入力3つだけ、30秒で終わるよ。あとはLINEで話すだけ' },
  { who: 'you', text: 'それならやってみる！' },
  { who: 'staff', text: 'はじめまして！ご紹介ありがとうございます🙌 ここからはLINEで、友だちに相談する感覚で希望を聞かせてください！' },
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
    a: '担当とLINEでつながります。友だちに相談する感覚で希望を聞かせてください。合いそうな求人を探してご案内し、応募したい企業が決まれば選考へ進みます。',
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
  },
  {
    t: '若手・未経験層に強い',
    d: '「未経験から条件のいい仕事へ」を軸に、若手層の応募が集まっています。',
  },
  {
    t: '許可を受けた職業紹介',
    d: '厚生労働大臣の許可を受けた有料職業紹介事業として運営しています。',
  },
]

const COMPANY_FLOW = [
  { n: '01', t: 'ご相談', d: 'フォームから募集職種・人数・時期をお送りください。1営業日以内にご連絡します。' },
  { n: '02', t: 'ヒアリング', d: '募集条件と求める人物像を伺い、進め方をご提案します。' },
  { n: '03', t: 'ご紹介', d: '条件に合う求職者をご紹介します。' },
  { n: '04', t: '選考・入社', d: '面接日程の調整から入社まで、間に入ってサポートします。' },
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

function Wave({ flip = false, tone = 'white' }: { flip?: boolean; tone?: 'white' | 'paper' | 'ink' }) {
  return (
    <div className={`wave wave--${tone} ${flip ? 'wave--flip' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none">
        <path d="M0,28 C180,56 360,4 720,22 C1080,40 1260,10 1440,28 L1440,56 L0,56 Z" />
      </svg>
    </div>
  )
}

function Marquee({ text }: { text: string }) {
  const row = Array.from({ length: 6 }, () => text).join('')
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <span>{row}</span>
        <span>{row}</span>
      </div>
    </div>
  )
}

function SunChan() {
  return (
    <div className="sun-chan" aria-hidden="true">
      <span className="sun-chan__ring" />
      <span className="sun-chan__face">
        <span className="sun-chan__eye" />
        <span className="sun-chan__eye" />
        <span className="sun-chan__cheek sun-chan__cheek--l" />
        <span className="sun-chan__cheek sun-chan__cheek--r" />
        <span className="sun-chan__smile" />
      </span>
    </div>
  )
}

function ApplyButton({ big = false, label = '30秒でカンタン応募' }: { big?: boolean; label?: string }) {
  return (
    <a className={`apply-btn ${big ? 'apply-btn--big' : ''}`} href={APPLY_FORM_URL} target="_blank" rel="noopener">
      <span className="apply-btn__label">{label}</span>
      <span className="apply-btn__sub">入力3つだけ・あとはLINEでOK・利用料0円</span>
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
          <span className="cloud cloud--1" aria-hidden="true" />
          <span className="cloud cloud--2" aria-hidden="true" />
          <span className="cloud cloud--3" aria-hidden="true" />
          <span className="confetti confetti--1" aria-hidden="true" />
          <span className="confetti confetti--2" aria-hidden="true" />
          <span className="confetti confetti--3" aria-hidden="true" />
          <span className="confetti confetti--4" aria-hidden="true" />

          <SunChan />

          <p className="hero__kicker rise" style={{ animationDelay: '100ms' }}>
            🎫 紹介制の就職・転職サポート
          </p>
          <h1 className="hero__title">
            <span className="rise" style={{ animationDelay: '200ms' }}>
              友だちの紹介で、
            </span>
            <span className="rise" style={{ animationDelay: '340ms' }}>
              <em>いまよりいい仕事</em>へ。
            </span>
          </h1>
          <p className="hero__lead rise" style={{ animationDelay: '480ms' }}>
            経験ゼロでもOK。むずかしい登録もなし。
            <br />
            30秒で応募したら、あとは担当と<strong>LINEでつながるだけ</strong>。
          </p>

          <div className="ticket rise" style={{ animationDelay: '600ms' }} role="presentation">
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

          <div className="rise" style={{ animationDelay: '720ms' }}>
            <ApplyButton big />
          </div>

          <ul className="hero__badges" aria-label="取り扱い求人の例">
            {BADGES.map((b, i) => (
              <li key={b.t} className="badge" style={{ animationDelay: `${850 + i * 90}ms` }}>
                <span aria-hidden="true">{b.e}</span> {b.t}
              </li>
            ))}
          </ul>
          <p className="hero__note rise" style={{ animationDelay: '1300ms' }}>
            ※実際の募集条件は求人によって異なります。
          </p>
        </section>

        <Marquee text="いまよりいい仕事へ ✳ 30秒でカンタン応募 ✳ 利用料0円 ✳ " />

        {/* ============ ABOUT ============ */}
        <div className="band band--white">
          <Wave tone="white" />
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
                就職・転職サポートです。紹介で来てくれたあなたは、いわば「友だちの友だち」。だから適当な求人は出せません。
                友だちと話すみたいに<strong>LINEで相談しながら</strong>、親身にいい仕事を探します。
              </p>
            </Reveal>
          </section>
          <Wave tone="paper" />
        </div>

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

        {/* ============ PROMISE ============ */}
        <section className="section">
          <Reveal>
            <h2 className="section__title">
              <span className="section__title-mark">🤙</span>
              友だちだから、裏切らない。
            </h2>
          </Reveal>
          <div className="promise">
            {[
              { e: '🙅', t: '適当な求人は出さない', d: '友だちの友だちに紹介する仕事だから、条件はちゃんと選びます。' },
              { e: '💚', t: '相談はぜんぶLINEでOK', d: '電話が苦手でも大丈夫。友だちとやりとりする感覚で相談できます。' },
              { e: '🔕', t: 'しつこい連絡はしない', d: '大量の求人メールも、営業電話の嵐もありません。' },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 90} className="promise__card">
                <span className="promise__emoji" aria-hidden="true">
                  {c.e}
                </span>
                <h3 className="promise__title">{c.t}</h3>
                <p className="promise__desc">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <div className="band band--white">
          <Wave tone="white" />
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
          <Wave tone="paper" />
        </div>

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
            <p className="closing__note">送信すると、担当からLINEまたは電話でご連絡します。</p>
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
      {/* ============ HERO (dark / trust) ============ */}
      <section className="chero">
        <p className="chero__kicker">FOR EMPLOYERS｜企業様向け</p>
        <h1 className="chero__title">
          採用を、
          <br />
          <em>紹介の力</em>で。
        </h1>
        <p className="chero__lead">
          VILLE CAREERは、人から人への紹介でつながる有料職業紹介サービスです。
          <br />
          若手・未経験層の採用を、紹介ベースでご支援します。
        </p>
        <a className="apply-btn apply-btn--big apply-btn--company" href={COMPANY_FORM_URL} target="_blank" rel="noopener">
          <span className="apply-btn__label">採用の相談をする</span>
          <span className="apply-btn__sub">1営業日以内にご連絡します</span>
        </a>
        <p className="chero__license">{LICENSE}</p>
      </section>

      {/* ============ POINTS ============ */}
      <section className="section section--cpoints">
        <Reveal>
          <h2 className="csection__title">VILLE CAREERの特徴</h2>
        </Reveal>
        <div className="cpoints">
          {COMPANY_POINTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 90} className="cpoints__card">
              <span className="cpoints__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="cpoints__title">{p.t}</h3>
              <p className="cpoints__desc">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ FLOW ============ */}
      <section className="section section--cflow">
        <Reveal>
          <h2 className="csection__title">ご相談から入社まで</h2>
        </Reveal>
        <ol className="cflow">
          {COMPANY_FLOW.map((s, i) => (
            <li key={s.n} className="cflow__item">
              <Reveal delay={i * 70} className="cflow__inner">
                <span className="cflow__num">{s.n}</span>
                <div>
                  <h3 className="cflow__title">{s.t}</h3>
                  <p className="cflow__desc">{s.d}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* ============ CLOSING ============ */}
      <section className="cclosing">
        <Reveal>
          <h2 className="cclosing__title">
            まずは、お気軽に
            <br />
            ご相談ください。
          </h2>
        </Reveal>
        <Reveal delay={120} className="section__cta">
          <a className="apply-btn apply-btn--big apply-btn--company" href={COMPANY_FORM_URL} target="_blank" rel="noopener">
            <span className="apply-btn__label">採用の相談をする</span>
            <span className="apply-btn__sub">募集職種・人数・時期をお聞かせください</span>
          </a>
        </Reveal>
        <Reveal delay={200}>
          <p className="cclosing__license">{LICENSE}</p>
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

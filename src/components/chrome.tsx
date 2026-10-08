import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { ShieldCheck, Newspaper, Tag, MessageCircleWarning, Home, Bell, Megaphone, BadgePercent, UserRound } from 'lucide-react'
import { tickerItems } from '../data/mock'

export type Screen =
  | 'home' | 'news' | 'alerts' | 'deals' | 'account'
  | 'report' | 'directory' | 'impact' | 'ward' | 'shop' | 'contribute' | 'proof'

export type Go = (s: Screen) => void

/* ------------------------------- Toast ----------------------------------- */

const ToastCtx = createContext<(msg: string) => void>(() => {})

export const useToast = () => useContext(ToastCtx)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null)
  const show = useCallback((m: string) => {
    setMsg(m)
    window.setTimeout(() => setMsg(null), 2600)
  }, [])
  return (
    <ToastCtx.Provider value={show}>
      {children}
      {msg && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 w-full max-w-[430px] px-5 pointer-events-none">
          <div className="toast-in bg-ink text-paper-2 text-[13px] font-medium px-4 py-3 rounded-lg shadow-xl border border-white/10 text-center">
            {msg}
          </div>
        </div>
      )}
    </ToastCtx.Provider>
  )
}

/* --------------------------- Trust label system -------------------------- */
/* The single most important component: four visually unmistakable content
   classes — news / official government / sponsored retail / unverified
   community. Colour, iconography, texture and wording all differ. */

export type Trust = 'news' | 'gov' | 'retail' | 'comm'

export function TrustTag({ kind, label, small }: { kind: Trust; label?: string; small?: boolean }) {
  const base = `inline-flex items-center gap-1 font-ui font-bold uppercase tracking-[0.08em] ${small ? 'text-[9px] px-1.5 py-[2px]' : 'text-[10px] px-2 py-[3px]'} rounded-[3px] shrink-0`
  if (kind === 'news')
    return (
      <span className={`${base} bg-press text-paper-2`}>
        <Newspaper size={small ? 9 : 11} strokeWidth={2.75} />
        {label ?? 'News'}
      </span>
    )
  if (kind === 'gov')
    return (
      <span className={`${base} bg-gov text-paper-2`}>
        <ShieldCheck size={small ? 9 : 11} strokeWidth={2.75} />
        {label ?? 'Official'}
      </span>
    )
  if (kind === 'retail')
    return (
      <span className={`${base} bg-retail text-paper-2`}>
        <Tag size={small ? 9 : 11} strokeWidth={2.75} />
        {label ?? 'Sponsored'}
      </span>
    )
  return (
    <span className={`${base} border border-dashed border-comm text-comm bg-transparent`}>
      <MessageCircleWarning size={small ? 9 : 11} strokeWidth={2.75} />
      {label ?? 'Community · Unverified'}
    </span>
  )
}

/* ------------------------------ Section head ----------------------------- */

export function SectionHead({
  no, title, action, onAction,
}: { no: string; title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-end justify-between border-b-2 border-ink pb-1.5 mb-3">
      <h2 className="font-ui text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink">
        <span className="text-press align-super text-[9px] mr-1">{no}</span>
        {title}
      </h2>
      {action && (
        <button onClick={onAction} className="font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-ink-soft hover:text-press transition-colors">
          {action} →
        </button>
      )}
    </div>
  )
}

/* -------------------------------- Ticker --------------------------------- */

export function Ticker() {
  const items = [...tickerItems, ...tickerItems]
  return (
    <div className="bg-ink text-paper-2 overflow-hidden flex items-stretch">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-press shrink-0 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-paper-2 pulse-dot" />
        <span className="font-ui text-[9px] font-extrabold uppercase tracking-[0.14em]">Live</span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="ticker-track items-center py-1.5">
          {items.map((t, i) => (
            <span key={i} className="font-ui text-[11px] font-medium tracking-wide px-4 flex items-center gap-4">
              {t}
              <span className="text-press text-[9px]">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------- Masthead -------------------------------- */

export function Masthead({ go }: { go: Go }) {
  return (
    <header className="bg-paper-2 border-b border-line paper-grain">
      <div className="h-1 bg-press" />
      <div className="px-4 pt-2.5 pb-2 flex items-center justify-between">
        <button onClick={() => go('home')} className="text-left">
          <div className="font-ui text-[9px] font-bold uppercase tracking-[0.28em] text-ink-soft leading-none mb-1">
            Tuesday 6 October 2026 · Orlando, Soweto
          </div>
          <div className="font-display font-black text-[26px] leading-none tracking-tight text-ink">
            <span className="text-[14px] font-bold mr-1">The</span><span className="text-press uppercase">Soweto Bulletin</span>
          </div>
        </button>
        <button
          onClick={() => go('account')}
          aria-label="Account and settings"
          className="w-9 h-9 rounded-full border border-line bg-paper-3 flex items-center justify-center text-ink hover:border-press hover:text-press transition-colors"
        >
          <UserRound size={17} />
        </button>
      </div>
      <Ticker />
    </header>
  )
}

/* ------------------------------ Sub header ------------------------------- */

export function SubHeader({ title, kicker, go }: { title: string; kicker: string; go: Go }) {
  return (
    <header className="bg-paper-2 border-b border-line sticky top-0 z-30 paper-grain">
      <div className="h-1 bg-press" />
      <div className="px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => go('home')}
          className="font-ui text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink-soft border border-line rounded-[3px] px-2 py-1.5 hover:border-press hover:text-press transition-colors"
        >
          ← Home
        </button>
        <div className="min-w-0">
          <div className="font-ui text-[9px] font-bold uppercase tracking-[0.22em] text-press leading-none mb-0.5">{kicker}</div>
          <div className="font-display font-bold text-[19px] leading-none text-ink truncate">{title}</div>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------ Bottom nav ------------------------------- */

const tabs: { key: Screen; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'news', label: 'News', icon: Newspaper },
  { key: 'alerts', label: 'Notices', icon: Bell },
  { key: 'deals', label: 'Deals', icon: BadgePercent },
]

export function BottomNav({ screen, go }: { screen: Screen; go: Go }) {
  const left = tabs.slice(0, 2)
  const right = tabs.slice(2)
  const Item = ({ t }: { t: (typeof tabs)[number] }) => {
    const active = screen === t.key
    const Icon = t.icon
    return (
      <button onClick={() => go(t.key)} className={`flex flex-col items-center gap-0.5 flex-1 py-1.5 transition-colors ${active ? 'text-press' : 'text-ink-faint hover:text-ink'}`}>
        <Icon size={20} strokeWidth={active ? 2.5 : 2} />
        <span className="font-ui text-[9px] font-bold uppercase tracking-[0.1em]">{t.label}</span>
      </button>
    )
  }
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-paper-2/95 backdrop-blur border-t border-line z-40">
      {/* centre report action — the one thing a resident must never hunt for */}
      <div className="flex items-start px-2 pb-[max(6px,env(safe-area-inset-bottom))]">
        {left.map((t) => <Item key={t.key} t={t} />)}
        <button onClick={() => go('report')} className="flex-1 flex flex-col items-center -mt-5 group">
          <span className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-paper transition-colors ${screen === 'report' ? 'bg-press-deep text-paper-2' : 'bg-press text-paper-2 group-hover:bg-press-deep'}`}>
            <Megaphone size={19} strokeWidth={2.4} />
          </span>
          <span className={`font-ui text-[9px] font-extrabold uppercase tracking-[0.1em] mt-0.5 ${screen === 'report' ? 'text-press' : 'text-ink'}`}>
            Report
          </span>
        </button>
        {right.map((t) => <Item key={t.key} t={t} />)}
      </div>
    </nav>
  )
}

/* ------------------------------ Small bits ------------------------------- */

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    'Reported': 'bg-paper-3 text-ink-soft border border-line',
    'Posted': 'bg-paper-3 text-ink-soft border border-line',
    'Confirmed': 'bg-gov-tint text-gov-deep border border-gov/30',
    'Marked fixed': 'bg-retail-tint text-retail-deep border border-retail/30',
    'In progress': 'bg-gov-tint text-gov-deep border border-gov/30',
    'Resolved': 'bg-retail-tint text-retail-deep border border-retail/30',
    'In review': 'bg-gov-tint text-gov-deep border border-gov/30',
    'Approved': 'bg-press-tint text-press-deep border border-press/30',
    'Published': 'bg-retail-tint text-retail-deep border border-retail/30',
  }
  return (
    <span className={`font-ui text-[9px] font-extrabold uppercase tracking-[0.08em] px-1.5 py-[3px] rounded-[3px] ${map[status] ?? map['Reported']}`}>
      {status}
    </span>
  )
}

export function PrimaryButton({ children, onClick, tone = 'press' }: { children: ReactNode; onClick?: () => void; tone?: 'press' | 'ink' | 'retail' | 'gov' }) {
  const tones = {
    press: 'bg-press hover:bg-press-deep text-paper-2',
    ink: 'bg-ink hover:bg-black text-paper-2',
    retail: 'bg-retail hover:bg-retail-deep text-paper-2',
    gov: 'bg-gov hover:bg-gov-deep text-paper-2',
  }
  return (
    <button onClick={onClick} className={`font-ui text-[12px] font-extrabold uppercase tracking-[0.1em] px-4 py-2.5 rounded-[4px] transition-colors ${tones[tone]}`}>
      {children}
    </button>
  )
}

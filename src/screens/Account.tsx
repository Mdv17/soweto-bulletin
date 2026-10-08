import { useState } from 'react'
import { Bookmark, PenLine, Briefcase, Printer, ShieldCheck, Scale, MessageSquareText, Smartphone, ChevronDown } from 'lucide-react'
import { SectionHead, TrustTag, useToast, type Go } from '../components/chrome'
import { pressCouncilLine } from '../data/mock'

const areas = ['Diepkloof', 'Orlando', 'Pimville', 'Klipspruit', 'Meadowlands', 'Jabulani']
const langs = ['English', 'isiZulu', 'Sesotho']

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${on ? 'bg-press' : 'bg-line'}`}
      role="switch"
      aria-checked={on}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-paper-2 shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  )
}

export default function Account({ go }: { go: Go }) {
  const [area, setArea] = useState('Diepkloof')
  const [openArea, setOpenArea] = useState(false)
  const [lang, setLang] = useState('English')
  const [channel, setChannel] = useState<'push' | 'whatsapp'>('whatsapp')
  const [prefs, setPrefs] = useState({ breaking: true, alerts: true, deals: false, digest: true })
  const toast = useToast()

  const prefRows = [
    { key: 'breaking' as const, label: 'Breaking news', note: 'Only urgent stories' },
    { key: 'alerts' as const, label: 'Government alerts', note: 'Outages, water, emergencies' },
    { key: 'deals' as const, label: 'New deals near me', note: 'From shops you follow' },
    { key: 'digest' as const, label: 'Weekly digest', note: 'Sunday morning summary' },
  ]

  return (
    <div className="rise-in pb-8 px-4 pt-4">
      <h1 className="font-display font-black text-[24px] leading-none text-ink">Account &amp; settings</h1>

      {/* area */}
      <div className="mt-5">
        <SectionHead no="01" title="Your area" />
        <div className="relative">
          <button onClick={() => setOpenArea(!openArea)} className="w-full flex items-center justify-between bg-paper-2 border border-line rounded-[4px] px-3 py-2.5">
            <span className="font-ui text-[13px] font-bold text-ink">{area}</span>
            <ChevronDown size={14} className={`text-ink-faint transition-transform ${openArea ? 'rotate-180' : ''}`} />
          </button>
          {openArea && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-paper-2 border border-line rounded-[4px] shadow-lg z-20 overflow-hidden">
              {areas.map((a) => (
                <button key={a} onClick={() => { setArea(a); setOpenArea(false); toast(`Area set to ${a}`) }}
                  className={`w-full text-left px-3 py-2.5 font-ui text-[12.5px] transition-colors ${a === area ? 'bg-press-tint font-bold text-press-deep' : 'text-ink hover:bg-paper-3'}`}>
                  {a}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="mt-1.5 font-ui text-[10.5px] text-ink-faint">News, alerts, deals and your councillor follow your area.</p>
      </div>

      {/* language */}
      <div className="mt-6">
        <SectionHead no="02" title="Language" />
        <div className="grid grid-cols-3 border border-line rounded-md overflow-hidden">
          {langs.map((l) => (
            <button key={l} onClick={() => { setLang(l); toast(l === 'English' ? 'Language: English' : l === 'isiZulu' ? 'Ulimi: isiZulu' : 'Puo: Sesotho') }}
              className={`py-2.5 font-ui text-[12px] font-bold transition-colors ${lang === l ? 'bg-ink text-paper-2' : 'bg-paper-2 text-ink-soft hover:text-ink'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* delivery channel — WhatsApp first-class */}
      <div className="mt-6">
        <SectionHead no="03" title="How you receive notifications" />
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setChannel('whatsapp')}
            className={`text-left rounded-md border-2 px-3 py-3 transition-colors ${channel === 'whatsapp' ? 'border-retail bg-retail-tint' : 'border-line bg-paper-2'}`}
          >
            <MessageSquareText size={18} className={channel === 'whatsapp' ? 'text-retail' : 'text-ink-soft'} />
            <div className="mt-1.5 font-ui text-[13px] font-extrabold text-ink">WhatsApp</div>
            <p className="mt-0.5 font-ui text-[10.5px] leading-snug text-ink-soft">
              Very little data, no app storage. Recommended for most phones.
            </p>
            {channel === 'whatsapp' && <div className="mt-1.5 font-ui text-[9px] font-extrabold uppercase tracking-[0.1em] text-retail-deep">Selected ✓</div>}
          </button>
          <button
            onClick={() => setChannel('push')}
            className={`text-left rounded-md border-2 px-3 py-3 transition-colors ${channel === 'push' ? 'border-press bg-press-tint' : 'border-line bg-paper-2'}`}
          >
            <Smartphone size={18} className={channel === 'push' ? 'text-press' : 'text-ink-soft'} />
            <div className="mt-1.5 font-ui text-[13px] font-extrabold text-ink">Push</div>
            <p className="mt-0.5 font-ui text-[10.5px] leading-snug text-ink-soft">
              Instant banners on your lock screen. Needs the app installed.
            </p>
            {channel === 'push' && <div className="mt-1.5 font-ui text-[9px] font-extrabold uppercase tracking-[0.1em] text-press-deep">Selected ✓</div>}
          </button>
        </div>
      </div>

      {/* notification prefs */}
      <div className="mt-6">
        <SectionHead no="04" title="What you receive" />
        <div className="bg-paper-2 border border-line rounded-md divide-y divide-line">
          {prefRows.map((r) => (
            <div key={r.key} className="flex items-center justify-between px-3.5 py-3">
              <div>
                <div className="font-ui text-[13px] font-bold text-ink">{r.label}</div>
                <div className="font-ui text-[10.5px] text-ink-faint">{r.note} · via {channel === 'whatsapp' ? 'WhatsApp' : 'push'}</div>
              </div>
              <Toggle on={prefs[r.key]} onChange={() => setPrefs({ ...prefs, [r.key]: !prefs[r.key] })} />
            </div>
          ))}
        </div>
      </div>

      {/* saved + shortcuts */}
      <div className="mt-6">
        <SectionHead no="05" title="Yours" />
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Bookmark, label: 'Saved articles & shops', n: '6 saved', act: () => toast('Saved items — demo') },
            { icon: PenLine, label: 'Submit an article', n: 'Paid contributions', act: () => go('contribute') },
            { icon: Briefcase, label: 'Manage my shop', n: 'Maria’s Fresh Produce', act: () => go('shop') },
            { icon: Printer, label: 'Print edition', n: 'Monthly, free at libraries', act: () => toast('Print edition pickup points — demo') },
          ].map((s) => {
            const Icon = s.icon
            return (
              <button key={s.label} onClick={s.act} className="text-left bg-paper-2 border border-line rounded-md px-3 py-3 hover:border-ink transition-colors">
                <Icon size={16} className="text-ink" />
                <div className="mt-1.5 font-ui text-[12.5px] font-bold leading-tight text-ink">{s.label}</div>
                <div className="font-ui text-[10px] text-ink-faint">{s.n}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* trust & transparency — visible, not buried */}
      <div className="mt-6">
        <SectionHead no="06" title="Trust &amp; transparency" />
        <div className="bg-paper-2 border border-line rounded-md px-3.5 py-3">
          <div className="font-ui text-[10px] font-extrabold uppercase tracking-[0.14em] text-ink-soft mb-2">How we label content</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2"><TrustTag kind="news" small /><span className="font-ui text-[11px] text-ink-soft">Editor-reviewed journalism</span></div>
            <div className="flex items-center gap-2"><TrustTag kind="gov" small /><span className="font-ui text-[11px] text-ink-soft">Verified City of Johannesburg</span></div>
            <div className="flex items-center gap-2"><TrustTag kind="retail" small /><span className="font-ui text-[11px] text-ink-soft">Paid advertising, always labelled</span></div>
            <div className="flex items-center gap-2"><TrustTag kind="comm" small /><span className="font-ui text-[11px] text-ink-soft">From residents, not verified</span></div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button onClick={() => toast('POPIA privacy policy — demo')} className="flex items-center gap-2.5 bg-paper-2 border border-line rounded-md px-3 py-3 hover:border-ink transition-colors text-left">
            <ShieldCheck size={16} className="text-ink shrink-0" />
            <span className="font-ui text-[11.5px] font-bold leading-tight text-ink">Privacy policy (POPIA)</span>
          </button>
          <button onClick={() => toast('Press Council complaints procedure — demo')} className="flex items-center gap-2.5 bg-paper-2 border border-line rounded-md px-3 py-3 hover:border-ink transition-colors text-left">
            <Scale size={16} className="text-ink shrink-0" />
            <span className="font-ui text-[11.5px] font-bold leading-tight text-ink">Press Council complaints</span>
          </button>
        </div>
        <p className="mt-3 font-ui text-[10.5px] leading-relaxed text-ink-faint text-center">
          {pressCouncilLine}
        </p>
      </div>
    </div>
  )
}

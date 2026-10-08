import { useState } from 'react'
import { Phone, Mail, Clock, ChevronDown, MessageSquareText } from 'lucide-react'
import { ward } from '../data/mock'
import { SectionHead, TrustTag, useToast, type Go } from '../components/chrome'

const areas = ['Orlando (Ward 25)', 'Diepkloof (Ward 26)', 'Pimville (Ward 22)', 'Klipspruit (Ward 19)']

export default function Ward(_: { go: Go }) {
  const [area, setArea] = useState(areas[0])
  const [openSel, setOpenSel] = useState(false)
  const toast = useToast()
  const c = ward.councillor

  return (
    <div className="rise-in pb-8 px-4 pt-4">
      <h1 className="font-display font-black text-[24px] leading-none text-ink">Find your councillor</h1>
      <p className="mt-1 font-ui text-[11px] text-ink-faint">Your ward office works for you. Here is how to reach it.</p>

      {/* area selector */}
      <div className="mt-3 relative">
        <button
          onClick={() => setOpenSel(!openSel)}
          className="w-full flex items-center justify-between bg-paper-2 border border-line rounded-[4px] px-3 py-2.5"
        >
          <span className="font-ui text-[13px] font-bold text-ink">{area}</span>
          <ChevronDown size={14} className={`text-ink-faint transition-transform ${openSel ? 'rotate-180' : ''}`} />
        </button>
        {openSel && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-paper-2 border border-line rounded-[4px] shadow-lg z-20 overflow-hidden">
            {areas.map((a) => (
              <button
                key={a}
                onClick={() => { setArea(a); setOpenSel(false) }}
                className={`w-full text-left px-3 py-2.5 font-ui text-[12.5px] transition-colors ${a === area ? 'bg-press-tint font-bold text-press-deep' : 'text-ink hover:bg-paper-3'}`}
              >
                {a}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* councillor card */}
      <div className="mt-4 bg-paper-2 border border-line rounded-md overflow-hidden">
        <div className="bg-gov-tint border-b border-gov/20 px-3 py-1.5 flex items-center justify-between">
          <TrustTag kind="gov" label="Official · CoJ Ward Directory" small />
          <span className="font-ui text-[10px] font-bold text-gov-deep uppercase tracking-[0.08em]">Ward {ward.number}</span>
        </div>
        <div className="p-3.5 flex gap-3.5">
          <div className="w-20 h-20 rounded-md bg-gov-tint border border-gov/30 text-gov-deep flex items-center justify-center font-display font-black text-[26px] shrink-0">{c.name.replace('Cllr. ', '').split(' ').map((w) => w[0]).join('')}</div>
          <div className="min-w-0">
            <div className="font-display font-black text-[19px] leading-tight text-ink">{c.name}</div>
            <div className="font-ui text-[10.5px] font-bold uppercase tracking-[0.1em] text-gov-deep mt-0.5">{c.role}</div>
            <div className="mt-1 font-ui text-[11px] text-ink-faint leading-snug">{ward.area}</div>
          </div>
        </div>
        <div className="border-t border-line divide-y divide-line">
          <button onClick={() => toast(`Calling ${c.phone} — demo`)} className="w-full flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-paper-3 transition-colors">
            <Phone size={14} className="text-ink" />
            <span className="font-ui text-[13px] font-bold text-ink">{c.phone}</span>
          </button>
          <button onClick={() => toast('Opening email — demo')} className="w-full flex items-center gap-2.5 px-3.5 py-2.5 hover:bg-paper-3 transition-colors">
            <Mail size={14} className="text-ink" />
            <span className="font-ui text-[13px] font-medium text-ink">{c.email}</span>
          </button>
          <div className="flex items-center gap-2.5 px-3.5 py-2.5">
            <Clock size={14} className="text-ink" />
            <span className="font-ui text-[12px] text-ink-soft">{c.officeHours}</span>
          </div>
        </div>
        <div className="p-3 border-t border-line">
          <button
            onClick={() => toast('Message sent to the Ward 25 office — demo')}
            className="w-full flex items-center justify-center gap-2 bg-gov text-paper-2 rounded-[4px] py-2.5 font-ui text-[11.5px] font-extrabold uppercase tracking-[0.08em] hover:bg-gov-deep transition-colors"
          >
            <MessageSquareText size={14} /> Message the ward office
          </button>
        </div>
      </div>

      {/* ward updates */}
      <div className="mt-6">
        <SectionHead no="" title={`Ward ${ward.number} updates`} />
        <div className="divide-y divide-line border-y border-line">
          {ward.updates.map((u) => (
            <button key={u.id} onClick={() => toast('Ward update — demo')} className="w-full text-left py-2.5 group">
              <div className="font-ui text-[13px] font-bold leading-snug text-ink group-hover:text-press transition-colors">{u.title}</div>
              <div className="mt-0.5 font-ui text-[10px] text-ink-faint">{u.time}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

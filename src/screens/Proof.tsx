import { SectionHead, TrustTag, useToast, type Go } from '../components/chrome'

const delivery = [
  { v: '2,400', l: 'Sent' },
  { v: '2,311', l: 'Delivered' },
  { v: '1,386', l: 'Read' },
]

const branches = [
  { name: 'Branch A (Jabulani)', users: 412, clicks: 188, downloads: 97, redeemed: 31 },
  { name: 'Branch B (Protea Glen)', users: 366, clicks: 142, downloads: 81, redeemed: 0 },
  { name: 'Branch C (Maponya)', users: 326, clicks: 82, downloads: 60, redeemed: 0 },
]

export default function Proof({ go }: { go: Go }) {
  const toast = useToast()
  return (
    <div className="rise-in pb-8 px-4 pt-4">
      <div className="border border-dashed border-comm/60 bg-comm-tint/40 rounded-md px-3 py-2 font-ui text-[11px] leading-snug text-comm">
        <span className="font-extrabold uppercase tracking-[0.06em]">Sample report.</span> All figures below are made up to show the layout. A real report is sent to each advertiser every month.
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <div className="font-ui text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink-faint">Advertiser</div>
          <div className="font-display font-black text-[20px] leading-tight text-ink">Sample retail chain</div>
          <div className="font-ui text-[11px] text-ink-faint">Month 3 · print plus digital pilot</div>
        </div>
        <TrustTag kind="retail" label="Sponsored" small />
      </div>

      <div className="mt-5">
        <SectionHead no="01" title="Delivered to opted-in phones" />
        <div className="grid grid-cols-3 border border-line divide-x divide-line bg-paper-2 rounded-md overflow-hidden">
          {delivery.map((d) => (
            <div key={d.l} className="px-3 py-3 text-center">
              <div className="font-display font-black text-[24px] leading-none text-ink">{d.v}</div>
              <div className="mt-1 font-ui text-[9px] font-bold uppercase tracking-[0.1em] text-ink-faint">{d.l}</div>
            </div>
          ))}
        </div>
        <p className="mt-2 font-ui text-[10.5px] leading-snug text-ink-faint">
          Source: WhatsApp Business delivery report. Sent only to people who opted in. 96% delivered, 60% read.
        </p>
      </div>

      <div className="mt-6">
        <SectionHead no="02" title="What people did next" />
        <div className="grid grid-cols-2 gap-2">
          {[
            { v: '1,104', l: 'Unique users on your specials pages' },
            { v: '412', l: 'Clicks from the message' },
            { v: '238', l: 'Flyer downloads' },
            { v: '96', l: 'Directions to store taps' },
          ].map((s) => (
            <div key={s.l} className="bg-paper-2 border border-line rounded-md px-3 py-2.5">
              <div className="font-display font-black text-[21px] leading-none text-ink">{s.v}</div>
              <div className="mt-1 font-ui text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-faint leading-snug">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <SectionHead no="03" title="By branch" />
        <div className="border border-line rounded-md overflow-hidden bg-paper-2">
          <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-1 px-3 py-2 bg-paper-3 font-ui text-[8.5px] font-extrabold uppercase tracking-[0.08em] text-ink-faint">
            <span>Branch</span><span className="text-right">Users</span><span className="text-right">Clicks</span><span className="text-right">Saves</span><span className="text-right">Till</span>
          </div>
          {branches.map((b) => (
            <div key={b.name} className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-1 px-3 py-2.5 border-t border-line font-ui text-[11.5px] text-ink">
              <span className="font-bold leading-tight">{b.name}</span>
              <span className="text-right">{b.users}</span>
              <span className="text-right">{b.clicks}</span>
              <span className="text-right">{b.downloads}</span>
              <span className="text-right">{b.redeemed > 0 ? b.redeemed : '–'}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 font-ui text-[10.5px] leading-snug text-ink-faint">
          Till-code redemptions are counted only at branches that agree to the pilot. A dash means the branch is not in the pilot.
        </p>
      </div>

      <div className="mt-6">
        <SectionHead no="04" title="Print and Channel" />
        <div className="bg-paper-2 border border-line rounded-md px-3 py-3 space-y-2">
          <div className="flex justify-between font-ui text-[12px]"><span className="text-ink-soft">Print copies in your drop-off areas</span><span className="font-bold text-ink">20,000 per edition</span></div>
          <div className="flex justify-between font-ui text-[12px]"><span className="text-ink-soft">Channel joins from the print QR code</span><span className="font-bold text-ink">640</span></div>
          <div className="flex justify-between font-ui text-[12px]"><span className="text-ink-soft">Channel views of your special</span><span className="font-bold text-ink">3,870</span></div>
        </div>
        <p className="mt-2 font-ui text-[10.5px] leading-snug text-ink-faint">
          Channel views come from WhatsApp's own admin figures and are shown as a dated screenshot.
        </p>
      </div>

      <div className="mt-6 bg-retail-tint border border-retail/30 rounded-md px-3 py-3">
        <div className="font-ui text-[10px] font-extrabold uppercase tracking-[0.14em] text-retail-deep">How we count</div>
        <ul className="mt-1.5 font-ui text-[11px] leading-relaxed text-ink-soft list-disc pl-4 space-y-0.5">
          <li>Every special has its own link per branch, so each click is counted once per person.</li>
          <li>Paid sends report sent, delivered and read from WhatsApp.</li>
          <li>We tell you plainly when a number is small. It will grow month on month.</li>
        </ul>
      </div>

      <div className="mt-5 flex gap-2">
        <button onClick={() => toast('Report downloaded as PDF — demo')} className="flex-1 bg-press text-paper-2 rounded-md py-3 font-ui text-[12px] font-extrabold uppercase tracking-[0.1em] hover:bg-press-deep transition-colors">Download PDF</button>
        <button onClick={() => go('shop')} className="flex-1 border border-ink rounded-md py-3 font-ui text-[12px] font-extrabold uppercase tracking-[0.1em] text-ink hover:bg-paper-3 transition-colors">Back to dashboard</button>
      </div>
    </div>
  )
}

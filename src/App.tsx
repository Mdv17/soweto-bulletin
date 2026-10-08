import { useEffect, useState } from 'react'
import { BottomNav, Masthead, SubHeader, ToastProvider, type Screen } from './components/chrome'
import Home from './screens/Home'
import News from './screens/News'
import Civic from './screens/Civic'
import Deals from './screens/Deals'
import Account from './screens/Account'
import Report from './screens/Report'
import Directory from './screens/Directory'
import Impact from './screens/Impact'
import Ward from './screens/Ward'
import Shop from './screens/Shop'
import Contribute from './screens/Contribute'
import Proof from './screens/Proof'

const subMeta: Partial<Record<Screen, { title: string; kicker: string }>> = {
  report: { title: 'Street alerts', kicker: 'Community' },
  directory: { title: 'Local services', kicker: 'Directory' },
  impact: { title: 'Community impact', kicker: 'Our numbers' },
  ward: { title: 'Your councillor', kicker: 'Ward 25' },
  shop: { title: 'Shop dashboard', kicker: 'Advertisers' },
  contribute: { title: 'Submit a story', kicker: 'Contributors' },
  proof: { title: 'Proof report', kicker: 'Advertisers · sample' },
  account: { title: 'Account', kicker: 'Settings' },
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')

  const go = (s: Screen) => setScreen(s)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [screen])

  const sub = subMeta[screen]

  return (
    <ToastProvider>
      {/* outer backdrop — the app presents as a phone-width column */}
      <div className="min-h-screen bg-[#221b12] sm:py-6">
        <div className="mx-auto w-full max-w-[430px] bg-paper paper-grain min-h-screen sm:min-h-[calc(100vh-3rem)] sm:rounded-xl sm:shadow-2xl sm:ring-1 sm:ring-black/40 overflow-hidden relative">
          {sub ? <SubHeader title={sub.title} kicker={sub.kicker} go={go} /> : <Masthead go={go} />}

          <main className="pb-24">
            {screen === 'home' && <Home go={go} />}
            {screen === 'news' && <News go={go} />}
            {screen === 'alerts' && <Civic go={go} />}
            {screen === 'deals' && <Deals go={go} />}
            {screen === 'account' && <Account go={go} />}
            {screen === 'report' && <Report go={go} />}
            {screen === 'directory' && <Directory go={go} />}
            {screen === 'impact' && <Impact go={go} />}
            {screen === 'ward' && <Ward go={go} />}
            {screen === 'shop' && <Shop go={go} />}
            {screen === 'contribute' && <Contribute go={go} />}
            {screen === 'proof' && <Proof go={go} />}
          </main>

          <BottomNav screen={screen} go={go} />
        </div>
      </div>
    </ToastProvider>
  )
}

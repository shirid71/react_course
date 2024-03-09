import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { Home } from './pages/Home';
import { About } from './pages/About'
import { EmailIndex } from './pages/EmailIndex'

import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { AboutTeam } from './cmps/AboutTeam'
import { AboutVision } from './cmps/AboutVision'
import { EmailDetails } from './cmps/EmailDetails'

export function App() {

    return (
        <Router>
        <section className='main-app'>
        <AppHeader />

            <main className='container'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} >
                        <Route path="/about/team" element={<AboutTeam />} />
                        <Route path="/about/vision" element={<AboutVision />} />
                    </Route>
                    <Route path="/emails" element={<EmailIndex />} />
                    <Route path="/emails/:emailId" element={<EmailDetails />} />
                </Routes>
            </main>

            <AppFooter />
        </section>

        </Router>
    )
}


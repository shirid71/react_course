import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { EmailIndex } from './pages/EmailIndex'
import { EmailCompose } from './pages/EmailCompose'
import { EmailDetails } from './pages/EmailDetails'

export function App() {
    return (
        <Router>
            <section className='main-app'>
                <Routes>
                    <Route path="/" element={<EmailIndex />} >
                        <Route path={`/:mailStatus`} >
                            <Route path={`/:mailStatus/:emailId`} element={<EmailDetails />}></Route>
                            <Route path={`/:mailStatus/compose`} element={<EmailCompose />}></Route>
                        </Route>
                    </Route>
                </Routes>
            </section>
        </Router>
    )
}

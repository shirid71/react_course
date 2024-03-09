import {NavLink, useNavigate } from "react-router-dom";
import gmailIcon from '../assets/imgs/gmail-icon.png';

export function AppHeader() {

    const navigate = useNavigate()

    function onGoBack() {
        navigate('/')
    }

    return (
        <header className="app-header">
            <section className="container">
                <div className="app-logo">
                    <h1>Gmail</h1>
                    <img src={gmailIcon} />
                </div>
                <button onClick={onGoBack}>Go back</button>

                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/emails">Emails</NavLink>
                </nav>
            </section>
        </header>
    )
}

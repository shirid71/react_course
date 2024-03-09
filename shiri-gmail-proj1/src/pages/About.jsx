import { Link, Outlet } from "react-router-dom";

export function About() {
    return <div className="about">
        <h1>ShiMail - you best email app in the world!</h1>

        <nav>
            <Link to="/about/team">Team | </Link>
            <Link to="/about/vision">Vision</Link>
        </nav>
        <Outlet />

    </div>
}

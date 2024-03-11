//full details of a specific email
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { emailService } from "../services/email.service";

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmail()
    }, [params.emailId])

    async function loadEmail() {
        try {
            const email = await emailService.getById(params.emailId)
            setEmail(email)
        } catch (err) {
            navigate('/emails')
            console.log('Error in loadEmail', err)
        }
    }

    async function getNextEmail() {
        try {
            const emailId = await emailService.getNextEmail(params.emailId)
            console.log("@@@@ emailId", emailId);
            return emailId
        } catch (err) {
            navigate('/emails')
            console.log('Error in loadEmail', err)
        }
    }
    const nextMail = getNextEmail();
    const nextMailLink = `/emails/${nextMail}`

    console.log('params', params)
    if (!email) return <div>Loading..</div>
    return (
        <section className="email-details">
            <h1>Email details</h1>
            <h2>Subject: {email.subject}</h2>
            <h2>Body: {email.body}</h2>
            <h2>Date: {email.sentAt}</h2>
            <Link to={`/${params.mailStatus}`}>Go back</Link>
            <Link to={nextMailLink}>Next mail</Link>
        </section>
    )
}

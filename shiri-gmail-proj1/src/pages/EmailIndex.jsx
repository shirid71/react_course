import { useEffect, useState } from "react"
import { emailService } from '../services/email.service.js';
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from './../cmps/EmailFilter';

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [email, setEmail] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    
    useEffect(() => {
        loadEmails()
    }, [filterBy])

    useEffect(() => {
        loadEmail()
    }, [email])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch (err) {
            console.log('Error in loadEmails', err)
        }
    }

    async function loadEmail(emailId) {
        try {
            if(emailId){
                const savedEmail = await emailService.getById(emailId)
                setEmail(savedEmail)
            }
        } catch (err) {
            console.log('Error in loadEmails', err)
        }
    }
    

    async function onRemoveEmail(emailId) {
        try {
            // removedAt
            await emailService.remove(emailId)

            setEmails((prevEmails) => {
            return prevEmails.filter(email => email.id !== emailId)
            })
        } catch (err) {
            console.log('Error in onRemoveEmail', err)
        }
    }

    async function onUpdateEmail(email) {
        try {
            const updatedEmail = await emailService.save(email)
            setEmails(prevEmails => prevEmails.map(currEmail => currEmail.id === updatedEmail.id ? updatedEmail : currEmail))
        } catch (err) {
            console.log('Error in onUpdateEmail', err)
        }
    }

    console.log('emails', emails)
    if (!emails) return <div>Loading..</div>
    return <section className="email-index">
        <h1>Welcome! this is our emails app</h1>
        <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <div className="email-list-container">
        <EmailList 
            emails={emails}
            onRemoveEmail={onRemoveEmail}
            onUpdateEmail={onUpdateEmail} 
            />
        </div>
    </section>
}
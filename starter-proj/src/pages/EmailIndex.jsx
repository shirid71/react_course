import { useEffect, useState } from "react"
import { emailService } from '../services/email.service.js';
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from './../cmps/EmailFilter';
import { EmailFolderList } from './../cmps/EmailFolderList';
import { AppHeader } from './../cmps/AppHeader';
import { useParams } from "react-router";

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [email, setEmail] = useState(null)
    const [error, setError] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    const params = useParams();

    useEffect(() => {
        loadEmails()
    }, [filterBy])

    useEffect(() => {
        loadEmail()
    }, [email])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            setEmails(emails)
            setError(null)
        } catch (err) {
            setError(err)
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

    function onSetFilter(fieldsToUpdate) {
        if (fieldsToUpdate.mail === 'compose') {
            navigate(`${location.pathname}/compose`)
        }
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }));
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
    console.log('errore', error)
    if (!emails) return <div>Loading..</div>
    return <section className="email-index">
        <AppHeader />
        <EmailFolderList filterBy={filterBy} onSetFilter={onSetFilter}/>
        <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <EmailList 
            emails={emails}
            onRemoveEmail={onRemoveEmail}
            onUpdateEmail={onUpdateEmail} 
            />

    </section>
}
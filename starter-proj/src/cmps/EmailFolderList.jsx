import { NavLink } from "react-router-dom";
import { FaStar, FaInbox } from 'react-icons/fa';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { BiSend } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
// Inbox : Show only received emails.
// o Starred : Show only starred emails in the “starred” folder
// o Sent : Show only sent emails in the “sent” folder
// o Trash : When removing an email (e.g. from inbox) it should be
// displayed in the trash folder (use the removedAt field).
// When removing from trash – email gets truly deleted.
// o Drafts

export function EmailFolderList(onSetFilter) {

    const navigationLinks = [
        { to: 'inbox', name: 'Inbox', icon: FaInbox },
        { to: 'sent', name: 'Sent', icon: BiSend },
        { to: 'starred', name: 'Starred', icon: FaStar },
        { to: 'drafts', name: 'Drafts', icon: AiOutlineEdit },
        { to: 'trash', name: 'Trash', icon: AiOutlineDelete },
    ]

    return (
        <div className='folders-list'>
        <button className="compose-btn" onClick={() => onSetFilter({ mail: 'compose' })}>
            <MdEmail/>
            Compose
        </button>
        <nav>
            {navigationLinks.map((status, index) => {
                return <NavLink key={index}
                    to={status.to}
                    onClick={() => onSetFilter({ mail: status.to })}>
                        <status.icon/>
                    <span>{status.name}</span>
                </NavLink>
            })}
        </nav>
    </div>
    )

}
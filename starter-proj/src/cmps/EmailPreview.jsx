// a preview with basic email details
import { useState } from "react";
import { Link } from "react-router-dom";
import { utilService } from "../services/util.service.js";
import { GoStarFill } from "react-icons/go";
import { MdDelete, MdMailOutline, MdMail } from "react-icons/md";

export function EmailPreview({ email, onDelete, onStar, onChangeReadStatus }) {
    const [hovered, setHovered] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    // let [isRead, setIsRead] = useState();

    const handleCheckboxChange = (id) => {
        if (selectedRows.includes(id)) {
          setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
          setSelectedRows([...selectedRows, id]);
        }
      };

    // Function to toggle read/unread status
    const toggleReadStatus = (email) => {
        onChangeReadStatus(email);
    };

    const isRead = email.isRead ? 'read' : 'unread'
    const dynClass = `email-link-${isRead}`

	return <article className={`email-preview ${email.isRead ? "read" : "unread"} ${email.isStarred ? "starred" : ""}`} 
     onMouseEnter={() => setHovered(true)}
     onMouseLeave={() => setHovered(false)}>
        <div className="email-item" key={email.id}>
        <button className="star-button" onClick={() => onStar(email)}>
            {<GoStarFill />}</button>
            <input
                    type="checkbox"
                    checked={selectedRows.includes(email.id)}
                    onChange={() => handleCheckboxChange(email.id)}
                />
            <Link to={`/emails/${email.id}`} className={dynClass} >
                <div className="from">{email.from}</div>
                <div className="subject">{email.subject}</div>
                <div className="email-body">{email.body}</div>
            </Link>
            {/* <Outlet /> */}
            <div className="timestamp">{utilService.formattedDate([email.sentAt])}</div>
            {hovered && (
                <div className="action-buttons">
                    <button className="delete-button" onClick={() => onDelete(email.id)}><MdDelete /></button>
					<button onClick={() => toggleReadStatus(email)}>{email.isRead? <MdMail/>:<MdMailOutline/>}</button>
                </div>
            )}
        </div>
	</article>
}

// id,
// subject,
// body,
// isRead,
// isStarred,
// sentAt,
// removedAt,
// from,
// to
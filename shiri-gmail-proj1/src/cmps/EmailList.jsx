//Renders a list of <EmailPreview> components
import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemoveEmail, onUpdateEmail }) {

	function onStarEmail(email) {
        const newEmail = { ...email, isStarred: !email.isStarred };
        onUpdateEmail(newEmail);
    }

    function onChangeReadStatus(email) {
        const newEmail = { ...email, isRead: !email.isRead };
        onUpdateEmail(newEmail);
    }

	function onRemoveEmail(email) {
		console.log("@@@email was removed: ", email.id)
		const newEmail = { ...email, removedAt: new Date() };
        onUpdateEmail(newEmail);
    }


    if (!emails) return <div>Loading..</div>;

	return <ul className="email-list">
		{
			emails.map(email => 
			<li key={email.id}>
				<EmailPreview email={email} 
				onDelete={()=> onRemoveEmail(email)} 
				onStar={() => onStarEmail(email)} 
				onChangeReadStatus={() => onChangeReadStatus(email)} />
			</li>
			)
		}
	</ul>
}
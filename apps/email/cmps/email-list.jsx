import { EmailPreview } from './email-preview.jsx'


export function EmailList({ emails, handleEmailRead, onRemove, handleEmailDelete, handleEmailStarred }) {
    return <section className="email-list">
        {emails.map((email, index) => <EmailPreview email={email} handleEmailDelete={handleEmailDelete} key={email.id} index={index} handleEmailRead={handleEmailRead} onRemove={onRemove} handleEmailStarred={handleEmailStarred}/>)}
    </section>
}
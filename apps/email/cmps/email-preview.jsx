const { Link } = ReactRouterDOM;
import { LongText } from "./long-text.jsx";

export function EmailPreview({ email, index, handleEmailRead, handleEmailDelete, handleEmailStarred }) {

  const handleOnClick = (e) => {
    handleEmailRead(index);
  };

  const handleOnStarClick = (e) => {
    handleEmailStarred(index);
  };
  
  const handleDelete = (e, emailId, folderType) => {
    handleEmailDelete(emailId, folderType);
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <div className="emails-preview">
      <div className={email.isRead ? 'email-list-item item-read' : 'email-list-item item-unread'}>
        <div><input type="checkbox" id="checked" name="checked" /></div>
        <div onClick={(e) => handleOnStarClick(e)} className={email.starred ? ' item-starred' : 'item-not-starred'}><i className="fa-solid fa-star"></i></div>
        <div className="link-container" onClick={(e) => handleOnClick(e)}>
          <Link to={`/email/${email.id}`} onClick={(e) => handleOnClick(e)}>
            <div className="received-name"> {email.from}
              <div className="email-subject"> {email.subject} <span className="email-preview-body">{<LongText text={'  ---' + email.body} />}</span></div>
            </div>
          </Link>
        </div>
        <div className="delete-email" onClick={(e) => handleDelete(e, email.id, email.folder)}> <i className="fa-solid fa-trash-can"></i></div>
        <div className="received-date">{email.sentAt}</div>
      </div>
    </div>
  );
}
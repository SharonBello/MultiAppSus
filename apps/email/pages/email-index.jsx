import { EmailService } from "../services/email-service.js"
import { EmailList } from "../cmps/email-list.jsx"
import { EmailCompose } from "../cmps/email-compose.jsx"
import { EmailFolders } from "../cmps/email-folders.jsx"
import { eventBusService } from "../../../services/event-bus-service.js";

const { Link } = ReactRouterDOM

export class EmailIndex extends React.Component {
  state = {
    emails: [],
    unreadEmailsCount: '',
    isBin: false,
  }

  componentDidMount() {
    this.loadEmails('inbox')
    eventBusService.emit('whereToSearch', 'emails');
    eventBusService.on('searchResultsEmails', (searchResults) => {
      this.setState({ emails: searchResults })
    })
    eventBusService.on('folder-msg', (folderType) => {
        this.loadEmails(folderType.txt)
    });
  }

  loadEmails = (folderType) => {
    EmailService.query().then((emails) => {
      const _emails = emails.filter(email => email.folder === folderType);
      this.handleUnreadCount(emails)
      this.setState({ emails: _emails })
      this.setState({ isBin: folderType === 'bin' })
    })
  }

  onStatusIsRead = (emailId) => {
    EmailService.setReadState(emailId).then(this.loadEmails);
  }

  handleEmailRead = (index) => {
    console.log("handle read " + index)
    let emails = this.state.emails
    emails[index].isRead = true
    this.setState({ emails: emails })
    EmailService.setReadState(emails).then(() => {
      console.log("save read state")
    })
  }
  
  handleEmailStarred = (index) => {
    let emails = this.state.emails
    emails[index].starred = true
    this.setState({ emails: emails })
    EmailService.setStarredState(emails).then(() => {
      console.log("save star state")
    })
  }

  handleUnreadCount = (emails) => {
    let counter = 0
    for (let i = 0; i < emails.length; i++) {
      if (emails[i].folder === 'inbox' && !emails[i].isRead) counter++
    }
    this.setState({ unreadEmailsCount: counter })
  }

  updateSentEmails = (emails) => {
    this.setState({ emails })
  }

  handleEmailDelete = (emailId, folderType) => {
    if (this.state.isBin) {
      EmailService.removeEmail(emailId)
        .then(() => {
          eventBusService.emit('user-msg', {
            type: 'success', txt: 'Deleted email successfully'
          })
          this.loadEmails(folderType)
        });
    } else {
      EmailService.moveEmailToBin(emailId)
        .then(() => {
          eventBusService.emit('user-msg', {
            type: 'success', txt: 'Move email to bin'
          })
          this.loadEmails(folderType)
        });
    }
  }

  renderEmailList = () => {
    return (<EmailList
      emails={this.state.emails}
      handleEmailRead={this.handleEmailRead}
      handleEmailDelete={this.handleEmailDelete}
      handleEmailStarred={this.handleEmailStarred} />)
  }

  render() {
    return (
      <div className="main-content-container">
        <section className="email-index">
          <div className="left-side">
            <EmailCompose updateSentEmails={this.updateSentEmails} emails={this.state.emails} />
            <EmailFolders unreadEmailsCount={this.state.unreadEmailsCount} />
            {/* <EmailFilter emails={this.state.emails} handleEmailRead={this.handleEmailRead} handleEmailDelete={this.handleEmailDelete}unreadEmailsCount={this.state.unreadEmailsCount} /> */}
          </div>
          <div className="right-side">
            <React.Fragment>
              <Link to="/email/details"></Link>
              {this.renderEmailList()}
            </React.Fragment>
          </div>
        </section>
      </div>
    )
  }
}
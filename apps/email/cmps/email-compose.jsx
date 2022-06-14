import { utilService } from "../../../services/util-service.js"
import { EmailService } from "../services/email-service.js"
const { Link } = ReactRouterDOM

export class EmailCompose extends React.Component {
  constructor(props) {
    super(props)
    // this.senderRef = React.createRef()
    this.toRef = React.createRef()
    this.subjectRef = React.createRef()
    this.bodyRef = React.createRef()

    this.state = {
      sentEmail: {
        id: utilService.makeId(),
        // sender: "me",
        to: '',
        subject: '',
        body: '',
        isDraft: false,
        isSent: true,
      },
      isFormOpen: false,
    }
  }

  componentDidMount() {
    // this.setState({sentEmail: {...this.state.sentEmail, ["subject"]: subject, ['body']: body, ['to']: to}})
  }

  onSendEmail = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()
    if (!this.toRef.current.value || !this.subjectRef.current.value || !this.bodyRef.current.value) {
      return
    }
    const mSentEmail = {...this.state.sentEmail, ['isDraft']: false}

    this.setState({
      sentEmail: mSentEmail,
    })
    let email = { ...mSentEmail }
    email.sentAt = new Date().toLocaleDateString('en-us', { day: 'numeric', month: "short" })
    email.isDraft = false
    email.isSent = true
    email.folder = 'sent'
    email.sentTo = email.to
    email.starred = false
    EmailService.saveToSentEmails(this.props.emails, email).then((emails) => {
      this.props.updateSentEmails(emails)
    })
    this.setState({isFormOpen: false})
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    this.setState((prevState) => ({ sentEmail: { ...prevState.sentEmail, [field]: value } }))
  }

  saveAsDraft = (e) => {
    let draft = { ...this.state.sentEmail, isDraft: true }
    EmailService.saveToDrafts(draft)
  }

  onComposeEmail = () => {
    this.setState({ isFormOpen: true })
  }

  onCloseModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!this.toRef.current.value || !this.subjectRef.current.value || !this.bodyRef.current.value) {
      return
    }
    const mSentEmail = {...this.state.sentEmail, ['isDraft']: true}

    this.setState({
      sentEmail: mSentEmail,
    })
    let email = { ...mSentEmail }
    email.sentAt = new Date().toLocaleDateString('en-us', { day: 'numeric', month: "short" })
    email.isDraft = false
    email.isSent = true
    email.folder = 'drafts'
    email.sentTo = email.to
    email.starred = false
    EmailService.saveToSentEmails(this.props.emails, email).then((emails) => {
      this.props.updateSentEmails(emails)
    })
    this.setState({isFormOpen: false})
    this.setState({
      isFormOpen: false,
    })
  }
  
  onGoBack = (e) => {
    e.preventDefault()
    this.setState({
      isFormOpen: false,
    })
  }

  renderComposeEmail = () => {
    const { sender, to, subject, body } = this.state.sentEmail
    if (this.state.isFormOpen) {
      return (
          <div className="backdrop-container">
        <div open={this.state.isFormOpen}>
          <section className="compose-container">
            <div className="compose-header">
              <h4>New Email</h4>
              <button className="compose-close-button" onClick={this.onCloseModal}>X</button>
            </div>
            <div className="compose-left"></div>
            <form className="compose-form">

              {/* <div className="sender">
                <input
                  type="email"
                  ref={this.senderRef}
                  name="sender"
                  placeholder="me"
                  value={sender}
                  onChange={this.handleChange} />
                <label className="from-label" htmlFor="sender"></label>
              </div> */}

              <div className="to">
                <input
                  type="email"
                  ref={this.toRef}
                  name="to"
                  placeholder="to"
                  value={to}
                  required
                  onChange={this.handleChange}
                />
                <label className="to-label" htmlFor="to"></label>
              </div>

              <div className="subject">
                <input
                  type="text"
                  ref={this.subjectRef}
                  name="subject"
                  placeholder="subject"
                  value={subject}
                  required
                  onChange={this.handleChange}
                />
                <label className="subject-label" htmlFor="subject"></label>
              </div>

              <div className="compose-body">
                <textarea
                  id="body"
                  ref={this.bodyRef}
                  value={body}
                  name="body"
                  cols="70"
                  rows="8"
                  onChange={this.handleChange}
                />
                <label className="body-label" htmlFor="body"></label>
              </div>
              <div className="compose-right"></div>
            </form>

              <section className="compose-footer-sent-actions">
                <Link to="/email">
                  <button className="btn-send-email" onClick={this.onSendEmail}>send</button>
                </Link>
                <Link to="/email">
                  <button className="go-back-email" onClick={this.onGoBack}>Go back</button>
                </Link>
                <Link to="/email">
                  <button className="btn-save-draft" onClick={(e) => { this.saveAsDraft(e); this.onCloseModal(e) }}>draft</button>
                </Link>
                {/* <Link to={`/note?title=${subject}&body=${body}`}>
                  <button className="btn-send-to-note">Notes</button>
                </Link> */}
                <Link to="/email">
                  <button className="btn-compose-delete">delete</button>
                </Link>
              </section>
          </section>
        </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.onComposeEmail()} className="btn-compose">
          Compose
        </button>
        {this.renderComposeEmail()}
      </div>
    )
  }
}

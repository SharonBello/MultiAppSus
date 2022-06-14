import { EmailService } from "../services/email-service.js"
import { eventBusService } from "../../../services/event-bus-service.js"


const { Link } = ReactRouterDOM

export class EmailDetails extends React.Component {

state = {
      email: undefined
    }
  

  componentDidMount() {
    EmailService.getEmailById(this.props.match.params.emailId).then(result => {
      this.setState({email: result})
    })
  }

  onGoBack = () => {
    eventBusService.emit('folder-msg', {
      type: 'success', txt: this.state.email.folder
    })
    this.props.history.push('/email')
  }

  onRemoveEmail = () => {
    EmailService.moveEmailToBin(this.props.email.id)
    .then(() => {
      this.onGoBack()
      eventBusService.emit('user-msg', {
          type: 'success', txt: 'Deleted email successfully'
      })
  })
  .catch(() => {
      eventBusService.emit('user-msg', {
          type: 'danger', txt: 'Could not delete email :('
      })
  })
}

  render() {
    const { email } = this.state
    if (!email) return <div>Loading..</div>
    // const nextEmailId = EmailService.getNextEmailId(email.id)
    return <section className="email-details">
      <div className="subject-details">{email.subject}</div>
      <div className="folder-details">{email.folder}</div>
      <div className="receivedFrom-details">{email.from}</div>
      {/* <h4>to me ▾</h4> */}
      <div className="body-details">{email.body}</div>

      <div className="email-details-user-btn">
        <button className="go-back-email-details-user-btn" onClick={this.onGoBack}>Go Back</button>
        <button className="delete-btn" onClick={this.onRemoveEmail}>Delete</button>
        {/* <Link to={`/email/${nextEmailId}`}><button>Next Email</button></Link> */}
        <Link to={`/email/edit/${email.id}`}><button  className="email-edit-btn">Notes</button></Link>
      </div>
    </section>
  }
}
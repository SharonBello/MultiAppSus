import { eventBusService } from "../../../services/event-bus-service.js"

export class EmailFolders extends React.Component {


    folderClick = (e, folderType) => {
        eventBusService.emit('folder-msg', {
            type: 'success', txt: folderType
        })
    }

    render() {
        return (
            <div className="folders">
                <div className="inbox" onClick={(e) => this.folderClick(e, 'inbox')}>
                    <div>
                        <i className="fa-solid fa-inbox"></i>
                    </div>
                    <div>Inbox</div>
                    <div>
                        <span>{this.props.unreadEmailsCount}</span></div>
                </div>

                <div className="starred" onClick={(e) => this.folderClick(e, 'starred')}>
                    <div>
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div>Starred</div>
                    <div>
                        <span>{this.props.unreadEmailsCount}</span></div>
                </div>

                <div className="sent" onClick={(e) => this.folderClick(e, 'sent')}>
                    <div>
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                    <div>Sent</div>
                    <div>
                        <span>{this.props.unreadEmailsCount}</span></div>
                </div>


                <div className="drafts" onClick={(e) => this.folderClick(e, 'drafts')}>
                    <div>
                        <i className="fa-solid fa-file-pen"></i>
                    </div>
                    <div>Drafts</div>
                    <div>
                        <span>{this.props.unreadEmailsCount}</span></div>
                </div>

                <div className="important" onClick={(e) => this.folderClick(e, 'important')}>
                    <div>
                        <i className="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div>Important</div>
                    <div>
                        <span>{this.props.unreadEmailsCount}</span></div>
                </div>

                <div className="folder-bin" onClick={(e) => this.folderClick(e, 'bin')}>
                    <div>
                        <i className="fa-solid fa-trash-can"></i>
                    </div>
                    <div>Bin</div>
                    <div>
                        <span>{this.props.unreadEmailsCount}</span></div>
                </div>
            </div>
        )
    }
}
{/* <i className="fa-thin fa-star"></i> */ }
{/* // read - <i className="fa-solid fa-envelope-open"></i> */ }
{/* // unread - <i className="fa-solid fa-envelope-dot"></i> */ }
{/* // back - <i class="fa-solid fa-arrow-left"></i> */ }
{/* //  notes - <i class="fa-solid fa-notes"></i> */ }

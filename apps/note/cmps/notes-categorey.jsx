import { NoteService } from "../services/note-service"

export class NotesCategorey extends React.Component {

    state = {
        notesCount: {
            txtCount: 0,
            imgCount: 0,
            listCount: 0,
            all: 0,
        },
    }

    componentDidMount() {

        this.onUpdateNotesCount()
    }

    onUpdateNotesCount() {
        const notes = NoteService.getNotes()
            .then((notes) => {
                if (!notes) return
                const { notesCount } = this.state
                NoteService.updateNotesCount(notesCount)
                    .then((notesCount) => {
                        this.setState({ notesCount })
                    })
                    .catch(err => console.log('Err on notesCount from service - in updateNotesCount', err))
            })
            .catch(err => console.log('Err on getting notes fron service - in onUpdateNotesCount', err))
    }


    //like onFilter
    onType = (ev) => {

        this.props.onSetType(this.state.type)
    }

    render() {

        const { txtCount, imgCount, listCount, all } = this.state.notesCount

        return <section className="notes-category">
            <div className="note-all-title note-card-quantity" onClick={() => this.props.onSetType('')}>
                <img src="assets/img/lists.png" className="action-img"></img>
                Notes
                <span className="notes-quantity">{all}</span>
            </div>
            <div className="note-txt-title note-card-quantity" onClick={() => this.props.onSetType('note-txt')}>
                <img src="assets/img/note-txt.png" className="action-img"></img>
                Note text
                <span className="notes-quantity">{txtCount}</span>
            </div>
            <div className="note-img-title note-card-quantity" onClick={() => this.props.onSetType('note-img')}>
                <img src="assets/img/image.png" className="action-img"></img>
                Note image
                <span className="notes-quantity">{imgCount}</span>
            </div>
            <div className="note-list-title note-card-quantity" onClick={() => this.props.onSetType('note-todos')}>
                <img src="assets/img/to-do-list.png" className="action-img"></img>
                Note list
                <span className="notes-quantity">{listCount}</span>
            </div>

        </section>
    }
}

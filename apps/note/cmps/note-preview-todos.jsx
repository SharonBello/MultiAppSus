import { NoteService } from "../services/note-service"

const { Link } = ReactRouterDOM

export class NotePreviewTodos extends React.Component {

    state = {
        note: this.props.note,
        title: 'No title',
        bgColor: {
            backgroundColor: '',
        },
    }

    componentDidMount() {

        this.setState((prevState) => ({ note: { ...prevState.note, bgColor: { backgroundColor: this.props.note.style.backgroundColor } } }))
    }

    onToggleNoteLine(noteIdx, listIdx) {

        NoteService.updateTodosLine(noteIdx, listIdx)
            .then((note) =>
                this.setState({ note })
            )
    }


    render() {
        const { note, bgColor } = this.state
        const { onDeleteNote, onTogglePin } = this.props

        return <section className="note-preview-list note-modal note-preview" style={{ backgroundColor: this.props.note.style.backgroundColor }} key={note.id}>
            <div className="note-card">
                <h4 className="note-title">
                    <img src={`assets/img/${(note.isPinned) ? 'push-pin' : 'un-pin'}.png`}
                        className="action-img" onClick={() => onTogglePin(note.id)}></img>
                    {note.info.title}
                </h4>
                <ul className="todos-list clean-list">
                    {note.info.todos.map((todo, idx) => {
                        return <div className="todo-line" key={idx}>
                            <li className={`clean-list note-txt-body`} onClick={() => this.onToggleNoteLine(note.id, idx)}>
                                {todo.doneAt ? <img className="action-img" src="assets/img/checkbox.png"></img>
                                    : <img className="action-img" src="assets/img/square.png"></img>}
                                {todo.txt}
                            </li>
                        </div>
                    })
                    }
                </ul>
                <div className="note-bottom-btn-container">
                    <button className="delete-note-btn action-img" onClick={() => onDeleteNote(note.id)}>
                        <img className="action-img" src="assets/img/bin.png"></img>
                    </button>
                </div>
            </div>
        </section>

    }
}


// TODO - show in keep and mail that item was shared on the note and the email
//TODO - make video note

import { NoteList } from "../cmps/note-list.jsx"
import { NoteService } from "../services/note-service.js"
import { NoteAdd } from "../cmps/note-add.jsx"
import { NotesCategorey } from "../cmps/notes-categorey.jsx"
import { eventBusService } from "../../../services/event-bus-service.js";


export class NoteApp extends React.Component {

    state = {
        notes: [],
        filterBy: null,
        type: null,
        notesCount: null

    }

    componentDidMount() {

        this.loadNotes()
        eventBusService.emit('whereToSearch', 'notes');
        eventBusService.on('searchResultsNotes', (searchResults) => {
            this.setState({ notes: searchResults })
        })
    }

    loadNotes = () => {

        NoteService.query(this.state.filterBy, this.state.type)
            .then(notes => this.setState({ notes }))
    }

    onSaveNote = (note, type) => {

        NoteService.saveNote(note, type)
            .then((notes) => {

                this.setState({ notes })
                eventBusService.emit('user-msg', {
                    type: 'success', txt: 'Note saved successfully'
                })
            })
            .catch(() => {
                eventBusService.emit('user-msg', {
                    type: 'danger', txt: 'Could not save note :('
                })
            })
        // this.props.onUpdateNotesCount({})
    }

    onDeleteNote = (noteId) => {

        NoteService.deleteNote(noteId)
            .then(() => {
                this.loadNotes()
                eventBusService.emit('user-msg', {
                    type: 'success', txt: 'Note deleted successfully'
                })
            })
            .catch(() => {
                eventBusService.emit('user-msg', {
                    type: 'danger', txt: 'Could not delete note :('
                })
            })
        // this.props.onUpdateNotesCount(notesCount)
    }


    onTogglePin = (noteId) => {
        NoteService.togglePin(noteId)
            .then(() => {
                this.loadNotes()
            })
    }

    onSetType = (type) => {

        this.setState({ type }, this.loadNotes)
    }


    render() {
        const { notes, type } = this.state
        if (!notes) return <React.Fragment></React.Fragment>
        return <section className="note-app">
            <div className="container-sides-note">
                <div className="note-app-left-side">
                    <NotesCategorey onSetType={this.onSetType} onShowCatNotesCount={() => this.onShowCatNotesCount()} />
                </div>
                <div className="note-app-right-side">
                    {/* <h1 className="note-title">My notes</h1> */}
                    <NoteAdd onSaveNote={this.onSaveNote} />
                    <NoteList notes={notes} onDeleteNote={this.onDeleteNote} onTogglePin={this.onTogglePin} />
                </div>
            </div>
        </section>
    }

}



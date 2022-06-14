import { NotePreviewText } from './note-preview-text.jsx'
import { NotePreviewImg } from './note-preview-img.jsx'
import { NotePreviewTodos } from './note-preview-todos.jsx'

export function NoteList({ notes, onDeleteNote, onToggleNoteLine, onTogglePin }) {

    return <section className="note-list">
        {notes.map(note =>
            <DynamicCmp note={note} key={note.id} onDeleteNote={onDeleteNote} onTogglePin={onTogglePin}
                onToggleNoteLine={() => onToggleNoteLine()} />
        )}
    </section>
}

function DynamicCmp(props) {
    switch (props.note.type) {
        case 'note-txt':
            return <NotePreviewText  {...props} />
        case 'note-img':
            return <NotePreviewImg {...props} />
        case 'note-todos':
            return <NotePreviewTodos {...props} />
    }

}
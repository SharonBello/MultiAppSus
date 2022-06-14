
const { Link } = ReactRouterDOM

export function NotePreviewImg({ note, onDeleteNote, onTogglePin }) {
    const bgColor = { backgroundColor: note.style.backgroundColor }

    return <section className="note-preview-img note-modal note-preview" style={bgColor} key={note.id}>
        <div className="note-card">

            <img src={`assets/img/${(note.isPinned) ? 'push-pin' : 'un-pin'}.png`}
                className="action-img" onClick={() => onTogglePin(note.id)}></img>
            <img className="note-img" src={note.info.url}></img>
            <h4 className="note-title">{note.info.title}</h4>
            <p className="note-txt-body">{!note.info.txt ? '' : note.info.txt}</p>
            <div className="note-bottom-btn-container">
                <button className="delete-note-btn action-img" onClick={() => onDeleteNote(note.id)}>
                    <img className="action-img" src="assets/img/bin.png"></img>
                </button>
            </div>
        </div>
    </section>
}



export function NotePreviewText({ note, onDeleteNote, onTogglePin }) {
    // let title = (!note.info.title) ? 'No title' : note.info.title

    const bgColor = { backgroundColor: note.style.backgroundColor }

    return <section className="note-preview-text note-modal note-preview" style={bgColor} key={note.id}>
        <div className="note-card">
            <h4 className="note-title">
                <img src={`assets/img/${(note.isPinned) ? 'push-pin' : 'un-pin'}.png`}
                    className="action-img" onClick={() => onTogglePin(note.id)}></img>
                {note.info.title}
            </h4>

            <p className="note-txt-body">{!note.info.txt ? '' : note.info.txt}</p>
            <div className="note-bottom-btn-container">
                <button className="delete-note-btn action-img note-img-hide" onClick={() => onDeleteNote(note.id)}>
                    <img className="action-img" src="assets/img/bin.png"></img>
                </button>
                <button className="action-img note-img-hide">
                    {/* <button className="action-img note-img-hide" onClick={() => onSetColor('color-picker-display')}> */}
                    <img className="action-img" src="assets/img/color-palette.png"></img>
                </button>
            </div>
        </div>
    </section>
}


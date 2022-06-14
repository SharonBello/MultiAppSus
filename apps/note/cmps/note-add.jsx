import { NoteService } from "../services/note-service.js"
import { ColorInput } from "./color.input.jsx"

export class NoteAdd extends React.Component {


    state = {
        note: {
            title: '',
            content: '',
            backgroundColor: '',
            selectedImg: '',
            changeClass: '',
            isPinned: false,

        },
        noteBackground: {
            backgroundColor: '',
            fontSize: ''
        },
        isExpended: false,
        isListItem: false,
        disableClick: false,
        placeHolderMsg: 'Take a note ...'

    }


    handelChange = ({ target }) => {

        const value = target.value
        const field = target.name
        this.setState((prevState) => ({ note: { ...prevState.note, [field]: value } }))
    }

    onSubmitNewNote = (ev) => {

        ev.preventDefault()
        let { note } = this.state
        if (note.title === '' && note.selectedImg === '' && note.content === '') return

        if (note.selectedImg) this.props.onSaveNote(note, 'note-img')
        else if (this.state.isListItem) this.props.onSaveNote(note, 'note-todos')
        else this.props.onSaveNote(note, 'note-txt')


        this.setState({
            note: { title: '', content: '', backgroundColor: '', selectedImg: '', changeClass: '', isPinned: false },
            isExpended: false, noteBackground: { backgroundColor: '', fontSize: '' }, isListItem: false, placeHolderMsg: 'Take a note ...', disableClick: false
        })

    }

    onAddImg = () => {

        const { note } = this.state
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _ => {

            let file = input.files;
            this.getBase64(file).then(base64 => {
                localStorage["fileBase64"] = base64;
                this.setState({ note: { ...note, selectedImg: base64 }, disableClick: true })
            });
        };
        input.click();
    }

    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }


    imageUpload = (e) => {
        const { note } = this.state
        const file = e.target.files[0];
        this.getBase64(file).then(base64 => {
            localStorage["fileBase64"] = base64;
            this.setState({ note: { ...note, selectedImg: base64 }, disableClick: true })
        });
    };


    onSetColor = (value) => {
        this.setState((prevState) => ({ note: { ...prevState.note, changeClass: value } }))
    }

    handleStyleChange = (backgroundColor, value) => {

        const { note, noteBackground } = this.state
        this.setState({ noteBackground: { ...noteBackground, backgroundColor: value }, note: { ...note, backgroundColor: value } })
    }

    onCloseColors = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        this.setState({ note: { ...this.state.note, changeClass: '' } })
    }

    onAddPin = () => {

        const { note } = this.state
        this.setState({ note: { ...note, isPinned: true } })
    }

    onClearList = () => {
        this.setState({ note: { title: '', content: '', backgroundColor: '', selectedImg: '', changeClass: '', isPinned: false }, isExpended: false, disableClick: false })
    }

    handelExpended = () => {
        this.setState({ isExpended: true })
        console.log('expended', this.state)
    }

    onNoteList = () => {

        let listMsg = "Press enter after each line..."
        this.setState({ isListItem: true, placeHolderMsg: listMsg, disableClick: true })
    }

    render() {

        const { noteBackground, isExpended, disableClick, note: { title, content, selectedImg, changeClass, isPinned } } = this.state
        return <section className="note-add">
            <div className="note-add-modal">
                <form style={noteBackground} className={`note-add-form`} onSubmit={this.onSubmitNewNote} >

                    <img src="assets/img/push-pin.png" hidden={!isPinned} className="action-img"></img>
                    {isExpended && <input type="text" placeholder="Title" name="title" value={title} onChange={this.handelChange} />}
                    <p className="note-wraper" >

                        <textarea name="content" className="note-textarea" placeholder={this.state.placeHolderMsg}
                            style={noteBackground} value={content} onFocus={this.handelExpended} rows={isExpended ? 3 : 1}
                            onChange={this.handelChange}></textarea>
                        <img src={selectedImg} className="note-load-img"></img>
                    </p>

                    <ColorInput changeClass={changeClass} handleStyleChange={this.handleStyleChange} onCloseColors={this.onCloseColors} />
                    <div className="note-btn-container">
                        <button type="button" onClick={this.onClearList} className="img-note-btn action-img tooltip">
                            <span className="tooltiptext">Clear list</span>
                            <img className="action-img" src="assets/img/bin.png"></img>
                        </button>

                        <button type="button" onClick={this.onAddPin} className="img-note-btn action-img tooltip">
                            <span className="tooltiptext">Pin</span>
                            <img className="action-img" src="assets/img/push-pin.png"></img>
                        </button>

                        <button type="button" onClick={() => this.onSetColor('color-picker-display')}
                            className="color-note-btn action-img tooltip">
                            <span className="tooltiptext">Set color</span>
                            <img className="action-img" src="assets/img/color-palette.png"></img>
                        </button>

                        <button type="button" onClick={this.onNoteList} className="img-note-btn action-img tooltip" disabled={disableClick}>
                            <span className="tooltiptext">Todos list</span>
                            <img className="action-img" src="assets/img/to-do-list.png" disabled={disableClick}></img>
                        </button>

                        <label htmlFor="imageFile" className="label-for-img tooltip" disabled={disableClick}>
                            <span className="tooltiptext">Load image</span>
                            <img className="action-img note-img-select" src="assets/img/image.png" disabled={disableClick}></img>
                            <input className="img-input" hidden={true} type="file" accept="image/*" id="imageFile" name='imageFile' disabled={disableClick} onChange={this.imageUpload} />
                        </label>

                        <button onClick={this.onAddNote} className="add-note-btn action-img tooltip" >
                            <span className="tooltiptext">Save</span>
                            <img className="action-img" src="assets/img/floppy-disk.png"></img>
                        </button>

                    </div>
                </form>
            </div>
        </section>
    }
}
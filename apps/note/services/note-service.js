import { storageService } from '../../../services/storage-service.js'

export const NoteService = {
    query,
    saveNote,
    deleteNote,
    genQuery,
    updateNotesCount,
    updateTodosLine,
    getNotes,
    togglePin,
}

const KEY = 'noteDB'

var gIdx = 1
var gNotes = [
    {
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!",
            title: "My first note"
        }
    },
    {
        type: "note-img",
        isPinned: false,
        info: {
            url: "http://coding-academy.org/books-photos/20.jpg",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#8EECF5"
        }
    },
    {
        type: "note-todos",
        isPinned: false,
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    },
    {
        type: "note-todos",
        isPinned: false,
        info: {
            todos: [
                { txt: "Nadav", doneAt: null },
                { txt: "Daniel", doneAt: null },
                { txt: "Idan", doneAt: null },
                { txt: "Alon", doneAt: null },
                { txt: "Shahaf", doneAt: null },
                { txt: "Guy", doneAt: null },
                { txt: "Sorry if I forgot someone", doneAt: null },
            ],
            title: "Coding academy more staff",
        },
        style: {
            backgroundColor: "#CFBAF0"
        }
    },
    {
        type: "note-todos",
        isPinned: true,
        info: {
            todos: [
                { txt: "Anna", doneAt: null },
                { txt: "Rona", doneAt: null },
                { txt: "Elhanan", doneAt: null },
                { txt: "Michal", doneAt: null },
                { txt: "Tommy", doneAt: null },
                { txt: "Ori", doneAt: null }
            ],
            title: "Coding academy staff",
        },
        style: {
            backgroundColor: "#FFCFD2"
        }
    },
    {
        type: "note-img",
        isPinned: true,
        info: {
            url: "https://cdn.pixabay.com/photo/2019/04/04/15/17/smartphone-4103051_1280.jpg",
            title: "Whit love"
        },
        style: {
            backgroundColor: ""
        }
    },
    {
        // id: "n-2", 
        type: "note-img",
        isPinned: false,
        info: {
            url: "https://cdn.pixabay.com/photo/2016/07/29/14/33/ballet-1553359__480.jpg",
            title: "Dancing is like hovering"
        },
        style: {
            backgroundColor: "#F2F2F2"
        }
    },
    {
        // id: "n-3",  
        type: "note-todos",
        isPinned: false,
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "House", doneAt: null },
                { txt: "Car", doneAt: 187111111 },
                { txt: "IRobot", doneAt: null },
                { txt: "Big Tv", doneAt: null }
            ],
            title: "Shopping list",
        },
        style: {
            backgroundColor: "#90DBF4"
        }
    },
    {
        // id: "n-2", 
        type: "note-img",
        isPinned: true,
        info: {
            url: "https://cdn.pixabay.com/photo/2013/12/11/03/13/puzzle-226743__480.jpg",
            title: "Life is one big puzzle"
        },
        style: {
            backgroundColor: "#F2F2F2"
        }
    },

]

function query(filterBy, type) {

    let notes = _loadFromStorage()
    if (!notes) {
        notes = _createNotes()
        _saveToStorage(notes)
    }

    if (type) {
        notes = notes.filter(note => note.type === type)
    }

    if (filterBy) {
        let { title, content } = filterBy

        notes = notes.filter(note =>
            note.title.toLowerCase().includes(title.toLowerCase()) &&
            note.content.toLowerCase().includes(content.toLowerCase())
        )
    }
    gNotes = notes
    _getIdx()
    return Promise.resolve(notes)
}

function getNotes() {

    const notes = _loadFromStorage()
    return Promise.resolve(notes)
}

function _getIdx() {
    let notes = _loadFromStorage()
    if (!notes) return gIdx++
    notes.map(note => {
        let arr = note.id.split('-')
        if (+arr[1] > gIdx) gIdx = +arr[1]
    })
    gIdx++
}

function saveNote(note, type) {

    return new Promise((resolve, reject) => {
        try {

            var newNote
            let notes = _loadFromStorage()

            _getIdx()
            if (type === 'note-todos') {
                var lists = note.content.split(/\r?\n/)
                var NewList = lists.map(list => {
                    if (list !== '') return { txt: list, doneAt: null }

                }).filter(Boolean)

                newNote = _createNote({
                    type: type, isPinned: note.isPinned,
                    info: { title: note.title, url: note.selectedImg, todos: NewList },
                    style: { backgroundColor: note.backgroundColor }
                })
            } else {
                newNote = _createNote({ type: type, isPinned: note.isPinned, info: { title: note.title, txt: note.content, url: note.selectedImg }, style: { backgroundColor: note.backgroundColor } })
            }


            if (newNote.isPinned === true) notes.unshift(newNote)
            else notes.push(newNote)
            _saveToStorage(notes)
            gNotes = notes
            resolve(notes)
        } catch (err) {
            reject(err)
        }
    })
}

function updateTodosLine(noteId, listId) {

    const notes = _loadFromStorage()
    const noteIdx = notes.findIndex(note => note.id === noteId)
    let doneAt = notes[noteIdx].info.todos[listId].doneAt
    if (!doneAt) {
        notes[noteIdx].info.todos[listId].doneAt = Date.now()
    } else {
        //sending null
        notes[noteIdx].info.todos[listId].doneAt = null
    }
    gNotes = notes
    _saveToStorage(notes)
    return Promise.resolve(notes[noteIdx])
}


function togglePin(noteId) {
    const notes = _loadFromStorage()
    const noteIdx = notes.findIndex(note => note.id === noteId)
    if (notes[noteIdx].isPinned === true) {
        const note = notes.splice(noteIdx, 1)
        // const obj = Object.fromEntries(note);
        note[0].isPinned = !note[0].isPinned
        notes.push(note.slice()[0])
    } else {
        const note = notes.splice(noteIdx, 1)
        note[0].isPinned = !note[0].isPinned
        notes.unshift(note.slice()[0])
    }
    gNotes = notes
    _saveToStorage(notes)
    return Promise.resolve(notes)
}


function genQuery(searchTerm, whereToSearch, searchFields = undefined) {
    return new Promise((resolve, reject) => {
        try {
            let data = _loadFromStorage(whereToSearch.toString() + 'DB')
            if (!data) {
                resolve([])
            } else {
                resolve(
                    data.filter(
                        datum => (datum.info && datum.info.label && datum.info.label.includes(searchTerm)) ||
                            (datum.info && datum.info.title && datum.info.title.includes(searchTerm)) ||
                            (datum.info && datum.info.txt && datum.info.txt.includes(searchTerm)) ||
                            (datum.info && datum.info.todos && datum.info.todos.includes(searchTerm))

                    )
                )
            }
        } catch (error) {
            reject(error)
        }
    });
}

function deleteNote(noteId) {
    let notes = _loadFromStorage()
    const noteIdx = notes.findIndex(note => noteId === note.id)

    notes.splice(noteIdx, 1)
    gNotes = notes
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function updateNotesCount(notesCount) {

    const notes = _loadFromStorage()

    if (!notes) return
    notes.map(note => {
        if (note.type === 'note-txt') notesCount.txtCount++
        else if (note.type === 'note-img') notesCount.imgCount++
        else if (note.type === 'note-todos') notesCount.listCount++

    })
    notesCount.all = notes.length
    return Promise.resolve(notesCount)
}

function _createNotes() {

    const notes = []
    gNotes.map((note, idx) => {
        if (note.isPinned === true) notes.unshift(_createNote(note))
        else notes.push(_createNote(note))
        _getIdx()

    })
    gNotes = notes
    return gNotes
}

function _createNote(note) {
    return {
        id: 'N-' + gIdx,
        type: note.type,
        isPinned: note.isPinned,
        info: (note.info) ? note.info : '',
        style: (note.style) ? note.style : ''
    }
}


function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}


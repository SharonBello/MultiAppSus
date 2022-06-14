import { bookService } from "../services/book-service.js"

export class BookEdit extends React.Component {

    state = {
        book: {
            title: 'hello',
            price: '',
        },
    }

    componentDidMount() {
        console.log('props from bookEdit', this.props);
        this.loadBook()
    }

    loadBook = () => {
        const { bookId } = this.props.match.params
        if(!bookId) return
        bookService.getById(bookId)
            .then(book => this.setState({ book }))
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({ book: { ...prevState.book, [field]: value } }))
    }

    onSaveBook = (ev) => {
        ev.preventDefault()
        bookService.saveBook(this.state.book)
            .then(() => {
                this.props.history.push('/book')
            })
    }

    render() {
        const { title, price } = this.state.book
        return <section className="book-edit">
            <form className="flex column align-center" onSubmit={this.onSaveBook}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title"
                    value={title} onChange={this.handleChange} />

                <label htmlFor="price">Price</label>
                <input type="number" id="price" name="price"
                    value={price} onChange={this.handleChange} />

                <button>Save Book!</button>
            </form>
        </section>
    }
}
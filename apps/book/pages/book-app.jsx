import { bookService } from "../services/book-service.js"
import { BookList } from '../cmps/book-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'
import { BookDetails } from '../pages/book-details.jsx'
import { BookEdit } from './book-edit.jsx'
import { AddGoogleBooks } from '../cmps/google-book-add.jsx'
const { Link, Route, Switch } = ReactRouterDOM

export class BookApp extends React.Component {

    state = {
        books: [],
        filterBy: null,
        selectedBook: null
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then(books => this.setState({ books }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    onSelectBook = (book) => {
        this.setState({ selectedBook: book })
    }

    render() {
        const { books, selectedBook } = this.state
        return <div className="books-main-content-container">
            <section className="book-app">
                {!selectedBook && <React.Fragment>
                    <div className="left-side">
                    <Link to="/book/edit"><button className="add-book">Add Book</button></Link>
                    <BookFilter onSetFilter={this.onSetFilter} history={this.props.history} />
                    </div>
                    <div className="books-right-side">
                    <BookList books={books} onSelectBook={this.onSelectBook} />
                    </div>
                    {/* <AddGoogleBooks /> */}
                    <Route path="/book/edit/:bookId?" component={BookEdit} />
                    <Route path="/book/:bookId" component={BookDetails} />
                </React.Fragment>
                }
            </section>
        </div>
    }
}
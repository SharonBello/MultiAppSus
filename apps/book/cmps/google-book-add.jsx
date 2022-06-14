
import { bookService } from '../services/book-service.js'

export class AddGoogleBooks extends React.Component {

    state = {
        googleBooks: [],
        searchTerm: ''
    }

    searchTerm = React.createRef()

    componentDidMount() {
        console.log('start from book-add')
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            bookService.getBookFromAxios(this.state.searchTerm).then(googleBooks => {
                this.setState({googleBooks})
            })
        }
    }

    onInputChange = (e) => {
        this.setSearchTerm(e.target.value)
    }

    setSearchTerm = (searchTerm) => {
        this.setState({searchTerm })
    }

    handleAddBook = (index) => {
        bookService.addGoogleBook(this.state.googleBooks.items[index]).then(() => {
            console.log("book added")
        })
    }

    render() {
        return <section>
            <form>
                <label>
                    <span>Search for books</span>
                    <input
                        type="search"
                        placeholder="microservice, restful design, etc.,"
                        value={this.state.searchTerm}
                        onChange={this.onInputChange} 
                        ref={this.searchTerm}
                    />
                    <ul>
                        {this.state.googleBooks && this.state.googleBooks.items && this.state.googleBooks.items.map((book, index) => {
                            return (
                                <li key={index}>
                                    <div className="search-result flex-row">
                                        <h3>{book.volumeInfo.title}</h3>
                                        <button onClick={() => this.handleAddBook(index)}>+</button>
                                    </div>
                                </li>
                            )})}
                    </ul>
                    <button type="submit">Search</button>
                </label>
            </form>
        </section>
    }
}

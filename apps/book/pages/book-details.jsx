import { LongText } from '../cmps/long-text.jsx'
import { BookReview } from '../cmps/book-review.jsx'
import { bookService } from "../services/book-service.js"
import { BookReviewList } from "../cmps/book-review-list.jsx"
import { eventBusService } from "../../../services/event-bus-service.js"

const { Link } = ReactRouterDOM

export class BookDetails extends React.Component {

  state = {
    book: null
  }

  componentDidMount() {
    this.loadBook()
  }

  loadBook = () => {
    const { bookId } = this.props.match.params
    bookService.getById(bookId)
      .then(book => {
        if (!book) return this.props.history.push('/')
        this.setState({ book })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.loadBook()
    }
  }

  componentWillUnmount() {
    console.log('Book details unmounted!');
  }

  onGoBack = () => {
    this.props.history.push('/book')
  }

  onRemoveBook = () => {
    bookService.removeBook(this.state.book.id)
      .then(() => {
        this.onGoBack()
        eventBusService.emit('user-msg', {
          type: 'success', txt: 'Deleted book successfully'
        })
      })
      .catch(() => {
        eventBusService.emit('user-msg', {
          type: 'danger', txt: 'Could not delete book :('
        })
      })
  }

  onRemoveReview = (reviewId, bookId) => {
    bookService.removeReview(reviewId, bookId)
      .then(() => this.loadBook())
  }

  onSaveReview = (review) => {
    const { bookId } = this.props.match.params
    bookService.addReview(review, bookId)
      .then(() => this.loadBook())
  }

  render() {
    const { book } = this.state
    if (!book) return <div>Loading..</div>
    const nextBookId = bookService.getNextBookId(book.id)

    return <section className="book-details">
      <div className={(book.listPrice.amount > 150) ? 'red' :
        (book.listPrice.amount < 20) ? 'green' : ''}></div>
      <h3>Book title: {book.title}</h3>
      <h5>Author/s: {book.authors[0]}</h5>

      <div className="img-container">
        <img src={book.thumbnail} />
      </div>

      <h5 className="desc"> Description:
        {<LongText text={book.description} />}
      </h5>

      <h4>Subtitles: {book.subtitle}</h4>
      <h5>Published at: {book.publishedDate}</h5>
      <h5>Categories: {book.categories.map(cat => cat + ' ')}</h5>
      <h5>Page Number: {book.pageCount}
        {book.pageCount > 500 && <span> - Long reading </span>}
        {book.pageCount > 200 && book.pageCount < 500 && <span> - Decent reading </span>}
        {book.pageCount < 200 && <span> - Light reading </span>}
      </h5>

      <h5> Price:
        {book.listPrice.amount < 150 && book.listPrice.amount > 20 && <span> {book.listPrice.amount} </span>}
        {book.listPrice.amount > 150 && <span style={{ color: "red" }}> {book.listPrice.amount} </span>}
        {book.listPrice.amount < 20 && <span style={{ color: "green" }}> {book.listPrice.amount} </span>}
      </h5>

      <h5>Language: {book.language}</h5>
      <p>{(2022 - book.publishDate > 10) ? 'Veteran book' :
        (2022 - book.publishedDate < 1) ? 'New' : ''}</p>
      <p>{(book.listPrice.isOnSale) ? 'This book is now on sale!' : ''}</p>

      <div className="user-btn">
        <button onClick={this.onGoBack}>Go Back!</button>
        <button className="delete-btn" onClick={this.onRemoveBook}>Delete</button>
        <Link to={`/book/${nextBookId}`}><button>Next Book</button></Link>
        <Link to={`/book/edit/${book.id}`}><button>Edit Book</button></Link>
      </div>
      <BookReview book={book} onSaveReview={this.onSaveReview} />
      <BookReviewList reviews={book.reviews} bookId={book.id} onRemove={this.onRemoveReview} />
    </section>
  }
}
const { Link } = ReactRouterDOM

export function BookPreview({ book }) {
  let text = ''
  switch (book.title && book.listPrice && book.listPrice.currencyCode) {
    case 'EUR':
      text = '€'
      break;
    case 'ILS':
      text = '₪'
      break;
    case 'USD':
      text = '$'
      break
  }

  return <Link to={`/book/${book.id}`}>
    <article className="book-preview" >
      <h3>Title : {book.title}</h3>
      <h3>Price : {book.price} <span> {text}</span> </h3>
      <div className="img-container">
        <img src={book.thumbnail} />
      </div>
    </article>
  </Link>
}
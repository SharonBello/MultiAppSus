export function ReviewPreview({ bookId, onRemove ,review}) {
    return (
      <div key={review.id} className='review-card'>
        <button
          onClick={() => {
            onRemove(review.id, bookId)
          }}>
          x
        </button>
        <p>Name: {review.username}</p>
        <p>Rate: {review.rate}</p>
        <p>Date of review: {review.date}</p>
        <p>Your Review: {review.reviewTxt}</p>
      </div>
    )
  }
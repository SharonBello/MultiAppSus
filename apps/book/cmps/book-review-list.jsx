import { ReviewPreview } from "./book-review-preview.jsx"

export function BookReviewList({ reviews, bookId, onRemove }) {
    if (!reviews) return <section></section>
    return (
        <section>
            {reviews.map((review) => {
                return (
                    <ReviewPreview bookId={bookId} onRemove={onRemove} review={review} />
                )
            })}
        </section>
    )
}



const { useState } = React
import { utilService } from "../services/util.service.js"
import { bookService } from "../services/book.service.js"

export function AddReview({ bookId, onReviewAdded }) {
    const [fullname, setFullname] = useState('')
    const [rating, setRating] = useState('1')
    const [readAt, setReadAt] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        const review = {
            id: utilService.makeId(),
            fullname,
            rating,
            readAt,
        }
        bookService.addReview(bookId, review)
            .then(updatedBook => {
                setFullname('')
                setRating('')
                setReadAt('')
                console.log('Review added successfully')
                onReviewAdded(updatedBook) // Pass the updated book object
            })
            .catch(err => {
                console.error('Error adding review:', err)
            })
    }

    return <form onSubmit={handleSubmit} className="review-form flex justify-center align-center">
        <label htmlFor="fullname">Full Name: </label>
        <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} required placeholder="Enter your full name" />
        <label htmlFor="rating">Rating: </label>
        <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="1">★☆☆☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="3">★★★☆☆</option>
            <option value="4">★★★★☆</option>
            <option value="5">★★★★★</option>
        </select>
        <label htmlFor="readAt">Read at: </label>
        <input type="date" onChange={(e) => setReadAt(e.target.value)} />
        <button type="submit">Submit Review</button>
    </form>
}


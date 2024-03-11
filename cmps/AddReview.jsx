const { useState } = React
import { utilService } from "../services/util.service.js"
import { bookService } from "../services/book.service.js"

export function AddReview(bookId) {
    const [fullname, setFullname] = useState('')
    const [rating, setRating] = useState('')
    const [readAt, setReadAt] = useState('')
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const review = {
            id: utilService.makeId(),
            fullname,
            rating,
            readAt,
        }
        bookService.addReview(bookId, review)
    }

    return <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">Full Name: </label>
        <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} required placeholder="Enter your full name" />
        <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="star">★☆☆☆☆</option>
            <option value="two-stars">★★☆☆☆</option>
            <option value="three-stars">★★★☆☆</option>
            <option value="four-stars">★★★★☆</option>
            <option value="five-stars">★★★★★</option>
        </select>
        <label htmlFor="readAt">Read at: </label>
        <input type="date" onChange={(e) => setReadAt(e.target.value)}/>
        <button type="submit">Submit Review</button>
    </form>
}


const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { AddReview } from '../cmps/AddReview.jsx'
import { bookService } from '../services/book.service.js'
import { BookCategories } from "../cmps/BookCategories.jsx"
import { BookAuthors } from '../cmps/BookAuthors.jsx'
import { LongTxt } from "../cmps/LongTxt.jsx"
import { ReviewList } from '../cmps/ReviewList.jsx'

export function BookDetails() {
    const [isSaleModalVisible, setSaleModalVisible] = useState(true);
    const [length, setLength] = useState(100)
    const [isShowMore, setShowMoreMode] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [reviews, setReviews] = useState([])
    const params = useParams()
    const navigate = useNavigate()
    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
        console.log(params.bookId)
    }, [params.bookId])


    function loadBook() {
        setIsLoading(true)
        bookService.get(params.bookId)
            .then(book => {
                setBook(book)
                setReviews(book.reviews || [])
            })
            .catch(err => {
                console.log('Had issues loading book', err)
                navigate('/book')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleReviewAdded(updatedBook) {
        setReviews(updatedBook.reviews)
    }

    function checkPageCount() {
        if (book.pageCount > 500) return <h4>Serious Reading</h4>
        else if (book.pageCount > 200) return <h4>Descent Reading</h4>
        else if (book.pageCount < 100) return <h4>Light Reading</h4>
    }

    function checkBookByDate() {
        const currYear = new Date().getFullYear()
        if (book.publishedDate < currYear - 10) return <h4>Vintage</h4>
        else if (book.publishedDate === currYear) return <h4>New</h4>
    }

    function checkPriceValue() {
        const price = book.listPrice.amount
        if (price > 150) return 'red'
        else if (price < 20) return 'green'
    }

    function toggleShowMore(ev) {
        ev.preventDefault()
        setShowMoreMode(isShowMore => !isShowMore)
    }

    function onChangeLength({ target }) {
        const value = +target.value
        if (value > 100) setLength(value)
        return
    }

    function onExitModal(ev) {
        ev.stopPropagation()
        setSaleModalVisible(false)
    }

    if (isLoading) return <div>Loading details...</div>
    return (
        <div className="book-details-modal flex flex-column align-center">
            <Link to="/book"><button>Go back</button></Link>
            <div className='prev-next-cars flex space-between'>
                <Link to={`/book/${book.prevBookId}`}><button>Previous</button></Link>
                <Link to={`/book/${book.nextBookId}`}><button>Next</button></Link>
            </div>
            <h1>{JSON.stringify(book.title)}</h1>
            <h2>{JSON.stringify(book.subtitle)}</h2>
            <BookAuthors book={book} />
            <div>Published Date: {JSON.stringify(book.publishedDate)} {checkBookByDate()}</div>
            <h3>Description: </h3>
            <p>{book.description.slice(0, 100)}</p>
            {!isShowMore && <button onClick={toggleShowMore}>Show More</button>}
            {isShowMore && (
                <React.Fragment>
                    <label htmlFor="length">How many characters?</label>
                    <input type="number" value={length} step="5" min="100" max={`${book.description.length}`} onChange={onChangeLength} />
                    {isShowMore && <LongTxt txt={book.description} length={length} />}
                    <button onClick={toggleShowMore}>Show Less</button>
                </React.Fragment>
            )}
            <div>Page Count: {JSON.stringify(book.pageCount)} {checkPageCount()}</div>
            <BookCategories book={book} />
            <img src={book.thumbnail} />
            <p>Language: {book.language}</p>
            <p>Price: <span className={`span ${checkPriceValue()}`}>{JSON.stringify(book.listPrice.amount)}</span></p>
            <p>Currency Code: {JSON.stringify(book.listPrice.currencyCode)}</p>
            <p>Is it on sale: {book.listPrice.isOnSale ? 'Yes' : 'No'}</p>
            {book.listPrice.isOnSale && isSaleModalVisible && (
                <div className="on-sale-modal flex align-center" onClick={onExitModal}>
                    Pay attention!<br />This book is on sale!
                    <button onClick={onExitModal}>X</button></div>)}
            <div className="reviews">
                {!reviews.length && <div className="no-reviews-div">No reviews yet. Add yours!</div>}
                {reviews.length > 0 && <ReviewList reviews={reviews} />}
                <AddReview bookId={book.id} onReviewAdded={handleReviewAdded} />
            </div>
        </div>
    )

}
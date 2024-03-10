const { useState } = React
import { BookCategories } from "./BookCategories.jsx"
import { BookAuthors } from './BookAuthors.jsx'
import { LongTxt } from "./LongTxt.jsx"

export function BookDetails({ book }) {
    const [length, setLength] = useState(100)
    const [isShowMore, setShowMoreMode] = useState(false)
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

    return <dialog open className="book-details-modal">
        <form method="dialog">
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
                    {isShowMore && <LongTxt txt={book.description} length={length}/>}
                    <button onClick={toggleShowMore}>Show Less</button>
                </React.Fragment>
            )}
        
            <div>Page Count: {JSON.stringify(book.pageCount)} {checkPageCount()}</div>
            <BookCategories book={book}/>
            <img src={book.thumbnail} />
            <p>Language: {book.language}</p>
            <p>Price: <span className={`span ${checkPriceValue()}`}>{JSON.stringify(book.listPrice.amount)}</span></p>
            <p>Currency Code: {JSON.stringify(book.listPrice.currencyCode)}</p>
            <p>Is it on sale: {book.listPrice.isOnSale ? 'Yes' : 'No'}</p>
            {book.listPrice.isOnSale && <dialog open className="on-sale-modal">Pay attention!<br />This book is on sale!<form method="dialog"><button>X</button></form></dialog>}
            <button>X</button>
        </form>
    </dialog>
}


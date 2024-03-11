const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [userMsg, setUserMsg] = useState('')


    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
        console.log(fieldsToUpdate)
    }

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg(`Book removed successfully (${bookId})`)
            })
            .catch((err) => {
                console.log('Had issues removing book', err)
                showErrorMsg(`Book removed successfully (${bookId})`)
            })
    }

    // function onUpdateBook(bookToUpdate) {
    //     bookService.save(bookToUpdate)
    //         .then((savedBook) => {
    //             setBooks(prevBooks => prevBooks.map(book => book.id === savedBook.id ? savedBook : book))
    //             showSuccessMsg(`Book updated successfully (${bookToUpdate.id})`)
    //         })
    //         .catch(err => {
    //             console.log('Had issues with updating book', err)
    //             showErrorMsg(`Could not update book (${bookToUpdate.id})`)
    //         })
    // }

    function flashMsg(txt) {
        setUserMsg(txt)
        setTimeout(() => {
            setUserMsg('')
        }, 3000)
    }

    if (!books) return <div className="gwendolyn loading-div">loading...</div>
    return <section className="book-index">
        <BookFilter
            onSetFilter={onSetFilter}
            filterBy={filterBy} />
            <Link to="/book/edit"><button>Add a Book</button></Link>
        <h1 className="gwendolyn books-list-header">Our Books</h1>
        <BookList books={books} onRemoveBook={onRemoveBook}/>
    </section>
}


const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())


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


    if (!books) return <div className="gwendolyn loading-div">loading...</div>
    return <section className="book-index">
            <BookFilter
                onSetFilter={onSetFilter}
                filterBy={filterBy} />
            <Link to="/book/edit"><button>Add a book</button></Link>
            <h1 className="gwendolyn books-list-header">Our Books</h1>
        <BookList books={books}/>
    </section>
}


const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookDetails } from "./BookDetails.jsx"

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedbook] = useState(null)


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

    function onSelectBook(book) {
        setSelectedbook(book)
    }

    if (!books) return <div className="gwendolyn loading-div">loading...</div>
    return <section className="book-index">
        {<React.Fragment>
            <BookFilter
                onSetFilter={onSetFilter}
                filterBy={filterBy} />
            <h1 className="gwendolyn books-list-header">Our Books</h1></React.Fragment>}
        {!selectedBook && <BookList books={books}
        onSelectBook={onSelectBook}/>}
        {
            selectedBook && <BookDetails
                book={selectedBook}
                onGoBack={() => onSelectBook(null)}
            />
        }


    </section>
}


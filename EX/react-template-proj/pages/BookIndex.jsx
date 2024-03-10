const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)


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

    if (!books) return <div>loading...</div>
    return <section className="book-index">
        {<React.Fragment>
            <BookFilter
                onSetFilter={onSetFilter}
                filterBy={filterBy} />
            <h1>Our Books</h1></React.Fragment>}
        <BookList books={books}
        // onRemoveBook={onRemoveBook}
        // onUpdateBook={onUpdateBook}
        // onSelectBook={onSelectBook}
        />

        {
            selectedBook && <BookDetails
                book={selectedBook}
                onGoBack={() => onSelectBook(null)}
            />
        }
    </section>
}


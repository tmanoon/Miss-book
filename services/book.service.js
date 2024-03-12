import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { booksArr } from '../books.js'

const BOOK_KEY = 'bookDB'
let reviews = []
// var filterBy = {title: '', price: 0}
// _createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    addReview,
    getFilterBy,
    setFilterBy,
    getDefaultFilter
}


_createBooks()

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = booksArr
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

window.bs = bookService

function query(filterBy = getDefaultFilter()) {
    return storageService.query(BOOK_KEY)

        .then(books => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }

            if (filterBy.pageCount) {
                books = books.filter(book => book.pageCount <= filterBy.pageCount)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => _setNextPrevBookId(book))
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = '') {
    return {
        "id": '',
        "title": '',
        "subtitle": '',
        "authors": [],
        "publishedDate": 0,
        "description": '',
        "pageCount": 0,
        "categories": [],
        "thumbnail": '',
        "language": '',
        "listPrice": {
            "amount": 0,
            "currencyCode": '',
            "isOnSale": false
        }
    }
}

function getFilterBy() {
    return { ...filterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.title !== undefined) filterBy.title = filterBy.title
    if (filterBy.price !== undefined) filterBy.price = filterBy.price
    return filterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

function getDefaultFilter() {
    return { title: '', price: 0, pageCount: 0 }
}

function addReview(bookId, review) {
    return get(bookId)
        .then(book => {
            if (!book.reviews) {
                book.reviews = [review]
            } else {
                book.reviews.push(review)
            }
            return save(book) // Return the promise from the save function
        })
        .catch(err => console.log(err))
}
function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        console.log(book)
        return book
    })
}
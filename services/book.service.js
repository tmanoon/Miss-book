import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { booksArr } from '../../books.js'

const BOOK_KEY = 'bookDB'
// var filterBy = {title: '', price: 0}
// _createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    // getNextCarId,
    getFilterBy,
    setFilterBy,
    getDefaultFilter
}

utilService.saveToStorage(BOOK_KEY, booksArr)
window.bs = bookService

function query(filterBy) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }
            return books
        })
}

function get(carId) {
    return storageService.get(BOOK_KEY, carId)
}

function remove(carId) {
    return storageService.remove(BOOK_KEY, carId)
}

function save(car) {
    if (car.id) {
        return storageService.put(BOOK_KEY, car)
    } else {
        return storageService.post(BOOK_KEY, car)
    }
}

function getEmptyBook(title, listPrice) {
    return { id: '', title, listPrice }
}

function getFilterBy() {
    return {...filterBy}
}

function setFilterBy(filterBy = {}) {
     if (filterBy.title !== undefined) filterBy.title = filterBy.title
    if (filterBy.price !== undefined) filterBy.price = filterBy.price
    return filterBy
}

function getNextBookId(carId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(car => car.id === carId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

function getDefaultFilter() {
    return {title: '', price: 0}
}
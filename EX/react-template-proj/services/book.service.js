import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
// var gFilterBy = {txt: '', minSpeed: 0}
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    // getNextCarId,
    getFilterBy,
    setFilterBy
}

window.bs = bookService

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            // if (gFilterBy.txt) {
            //     const regex = new RegExp(gFilterBy.txt, 'i')
            //     books = books.filter(book => regex.test(book.vendor))
            // }
            // if (gFilterBy.minSpeed) {
            //     books = books.filter(book => book.maxSpeed >= gFilterBy.minSpeed)
            // }
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

function getEmptyBook(title, description, thumbnail, listPrice) {
    return { id: '', title, description, thumbnail, listPrice }
}

function getFilterBy() {
    return {...gFilterBy}
}

function setFilterBy(filterBy = {}) {
     if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextBookId(carId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(car => car.id === carId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook("metus hendrerit", {
            "amount": 109,
            "currencyCode": "EUR",
            "isOnSale": false
     }))
        books.push(_createBook('morbi', {
            "amount": 44,
            "currencyCode": "EUR",
            "isOnSale": true
          }))
        books.push(_createBook('at viverra venenatis', {
            "amount": 108,
            "currencyCode": "ILS",
            "isOnSale": false
          }))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

//afterwards add thumbnail and desc

function _createBook(title, listPrice) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    return book
}

function getDefaultFilter() {
    return {title: ''}
}


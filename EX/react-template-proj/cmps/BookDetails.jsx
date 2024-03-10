import { BookCategories } from "./BookCategories.jsx"

export function BookDetails( { book } ) {
    return <dialog open>
        <form method="dialog">
            <h1>{JSON.stringify(book.title)}</h1>
            <h2>{JSON.stringify(book.subtitle)}</h2>
            <h4>Author: {JSON.stringify(book.authors[0])}</h4>
            <p>Published Date: {JSON.stringify(book.publishedDate)}</p>
            <p>Description: {JSON.stringify(book.description)}</p>
            <p>Page Count: {JSON.stringify(book.pageCount)}</p>
            <div>Categories: <BookCategories book={book}/></div>
            <p>Amount: {JSON.stringify(book.listPrice.amount)}</p>
            <p>Currency Code: {JSON.stringify(book.listPrice.currencyCode)}</p>
            <p>Is it on sale: {book.listPrice.isOnSale ? 'Yes' : 'No'}</p>
            <button>X</button>
        </form>
    </dialog>
}

/* {
    "id": "OXeMG8wNskc",
    "title": "metus hendrerit",
    "subtitle": "mi est eros convallis auctor arcu dapibus himenaeos",
    "authors": [
      "Barbara Cartland"
    ],
    "publishedDate": 1999,
    "description": "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
    "pageCount": 713,
    "categories": [
      "Computers",
      "Hack"
    ],
    "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
    "language": "en",
    "listPrice": {
      "amount": 109,
      "currencyCode": "EUR",
      "isOnSale": false
    }
  }, */
import { BookCategories } from "./BookCategories.jsx"
import { BookAuthors} from './BookAuthors.jsx'

export function BookDetails( { book } ) {

    function checkPageCount() {
        if(book.pageCount > 500) return <h4>Serious Reading</h4>
        else if(book.pageCount > 200) return <h4>Descent Reading</h4>
        else if(book.pageCount < 100) return <h4>Light Reading</h4>
    }

    return <dialog open>
        <form method="dialog">
            <h1>{JSON.stringify(book.title)}</h1>
            <h2>{JSON.stringify(book.subtitle)}</h2>
            <BookAuthors book={book}/>
            <p>Published Date: {JSON.stringify(book.publishedDate)}</p>
            <p>Description: {JSON.stringify(book.description)}</p>
            <p>Page Count: {JSON.stringify(book.pageCount)} {checkPageCount()}</p>
            <BookCategories book={book}/>
            <img src={book.thumbnail}/>
            <p>Language: {book.language}</p>
            <p>Amount: {JSON.stringify(book.listPrice.amount)}</p>
            <p>Currency Code: {JSON.stringify(book.listPrice.currencyCode)}</p>
            <p>Is it on sale: {book.listPrice.isOnSale ? 'Yes' : 'No'}</p>
            <button>X</button>
        </form>
    </dialog>
}


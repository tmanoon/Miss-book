
import { BookDetails } from "./BookDetails.jsx"
const { useState } = React 
export function BookPreview( {book} ) {
        return <article className="book-preview">
            <h2>{book.title}</h2>
            <h5>Price : {book.listPrice.amount}</h5>
            <img className="thumbnail" src={book.thumbnail} />
            {/* {isFullDetails && <BookDetails book={book}/>} */}
        </article>
}

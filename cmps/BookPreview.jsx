
const { useState } = React 
export function BookPreview( {book} ) {
        return <article className="book-preview flex flex-column align-center">
            <h1>{book.title}</h1>
            <h5>Price : {book.listPrice.amount}</h5>
            <img className="thumbnail" src={book.thumbnail} />
        </article>
}

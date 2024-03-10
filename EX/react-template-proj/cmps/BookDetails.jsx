export function BookDetails( { book } ) {
    return <dialog open>
        <form method="dialog">
            <h1>{JSON.stringify(book.title)}</h1>
            <p>Amount: {JSON.stringify(book.listPrice.amount)}</p>
            <p>Currency Code: {JSON.stringify(book.listPrice.currencyCode)}</p>
            <p>Is it on sale: {book.listPrice.isOnSale ? 'Yes' : 'No'} </p>
            <button>X</button>
        </form>
    </dialog>
}
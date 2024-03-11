const { Link } = ReactRouterDOM
import { BookPreview } from "./BookPreview.jsx"


export function BookList({ books, onRemoveBook }) {

	if (!books.length) return <div>No books to show</div>
	return <ul className="books-list">
		{
			books.map(book => <li key={book.id}>
				<BookPreview book={book} />
				<div className="book-actions">
				<button className="remove-btn" onClick={() => onRemoveBook(book.id)}>X</button>
					<Link to={`/book/${book.id}`}><button>Select Book</button></Link>
					<Link to={`/book/edit/${book.id}`}><button>Edit this Book</button></Link>
				</div>
			</li>)
		}
	</ul>
}
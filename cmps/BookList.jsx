import { BookPreview } from "./BookPreview.jsx"


export function BookList({ books, onSelectBook }) {

	// function onChangeSpeed(car) {
	// 	car = { ...car, maxSpeed: car.maxSpeed + 10 }
	// 	onUpdateCar(car)
	// }

	if (!books.length) return <div>No books to show</div>
	return <ul className="books-list">
		{
			books.map(book => <li key={book.id}>
				<BookPreview book={book} />
				<div className="book-actions">
					{/* <button className="remove-btn" onClick={() => onRemoveCar(car.id)}>X</button>
					<button onClick={() => { onChangeSpeed(car) }}>Increase speed</button> */}
					<button onClick={() => { onSelectBook(book) }}>Select Book</button>
				</div>
			</li>)
		}
	</ul>
}
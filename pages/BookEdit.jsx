const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouter

import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function BookEdit() {
	const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
	const navigate = useNavigate()
	const { bookId } = useParams()

	useEffect(() => {
		if (bookId) loadBook()
	}, [])

	function loadBook() {
		bookService.get(bookId)
			.then(book => setBookToEdit(book))
			.catch(err => {
				console.log('Had issues loading book', err)
				navigate('/book')
			})
	}


	function onSaveBook(ev) {
		ev.preventDefault()

		bookService.save(bookToEdit)
			.then(savedBook => {
				navigate('/book')
				showSuccessMsg('Book saved successfully')
				console.log('savedBook', savedBook)
			})
			.catch(err => {
				console.log('Had issues saving book', err)
				showErrorMsg('could not save book')
			})

	}

	function handleChange({ target }) {
		const field = target.name
		let value = target.value
    

		switch (target.type) {
			case 'number':
			case 'range':
				value = +value || ''
				break

			case 'checkbox':
				value = target.checked
				break

			default:
				break
		}
        if(field === 'price') setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, listPrice: {amount: value} }))
		else setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, [field]: value }))
        // console.log(bookToEdit)
	}

	const { title, listPrice} = bookToEdit
    const { amount:price } = listPrice
    console.log(bookToEdit)
    // console.log(listPrice)
    if(!bookToEdit) return <div>loading...</div>
	return (
		<section className="book-edit">
			<form onSubmit={onSaveBook} >
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					id="title"
					placeholder="Enter a title"

					name="title"
					onChange={handleChange}
					value={bookToEdit ? bookToEdit.title : ''}
				/>

				<label htmlFor="price">Price:</label>
				<input
					type="number"
					id="price"
					placeholder="Enter a price"

					name="price"
					onChange={handleChange}
					value={bookToEdit.listPrice.amount}
				/>

				<button>Save</button>
			</form>
		</section>
	)
}




const { useState, useEffect } = React

export function BookFilter({ onSetFilter, filterBy }) {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

	useEffect(() => {
		onSetFilter(filterByToEdit)
	}, [filterByToEdit])

	function onFilter(ev) {
		ev.preventDefault()
		onSetFilter(filterByToEdit)
	}

	function handleChange({ target }) {
		let { value, name: field, type } = target
		if (type === 'number') value = +value
		// if(type ==='checkbox') value = target.checked
		setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
	}

	return <section className="book-filter">
		<h2>Filter our books</h2>

		<form onSubmit={onFilter}>
			<label htmlFor="title">Title</label>
			<input type="text"
				id="title"
				name="title"
				value={filterByToEdit.title}
				onChange={handleChange}
				placeholder="By title" />

			<label htmlFor="price">Price</label>
			<input type="number"
				id="price"
				name="price"
				value={filterByToEdit.price}
				onChange={handleChange}
				placeholder="By price" />

			<button>Filter</button>
		</form>
	</section>
}
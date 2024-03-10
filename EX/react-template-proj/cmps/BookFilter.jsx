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

	console.log('filterByToEdit', filterByToEdit)
	return <section className="car-filter">
		<h2>Filter our books</h2>

		<form onSubmit={onFilter}>
			<label htmlFor="title">Title</label>
			<input type="text"
				id="title"
				name="txt"
				value={filterByToEdit.txt}
				onChange={handleChange}
				placeholder="By title" />
{/* 
			<label htmlFor="categories">Categories</label>
			<input type="number"
				id="minSpeed"
				name="minSpeed"
				value={filterByToEdit.minSpeed}
				onChange={handleChange}
				placeholder="By min speed" /> */}

			<button>Filter</button>
		</form>
	</section>
}
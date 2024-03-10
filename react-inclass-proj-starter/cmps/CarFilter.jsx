const { useState, useEffect } = React



export function CarFilter({ onSetFilter, filterBy }) {
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
		// onSetFilter(filterByToEdit)
	}

	// // DRY
	// function handleTxtChange(ev) {
	// 	const { value } = ev.target
	// 	setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, txt: value }))
	// }

	// function handleSpeedChange(ev) {
	// 	const { value } = ev.target
	// 	setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, minSpeed: +value }))
	// }

	console.log('filterByToEdit', filterByToEdit)
	return <section className="car-filter">
		<h2>Filter our cars</h2>

		<form onSubmit={onFilter}>
			<label htmlFor="vendor">Vendor</label>
			<input type="text"
				id="vendor"
				name="txt"
				value={filterByToEdit.txt}
				onChange={handleChange}
				placeholder="By vendor" />

			<label htmlFor="minSpeed">Min Speed</label>
			<input type="number"
				id="minSpeed"
				name="minSpeed"
				value={filterByToEdit.minSpeed}
				onChange={handleChange}
				placeholder="By min speed" />

			<button>Filter</button>
		</form>
	</section>
}
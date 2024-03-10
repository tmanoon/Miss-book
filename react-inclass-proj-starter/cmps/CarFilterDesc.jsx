const { useState, useEffect } = React

import { carService } from '../services/car.service.js'


export function CarFilterDesc({ onSetFilter, filterBy }) {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

	useEffect(() => {
		onSetFilter(filterByToEdit)
	}, [filterByToEdit])


	function handleChange(ev) {
		console.log(ev.target.value);
		let { value, name: field, type } = ev.target
		if (type === 'number') value = +value
		setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
	}

	const { desc } = filterByToEdit
	return <section className="car-filter">
		<label htmlFor="desc">Description</label>
		<input type="text"
			id="desc"
			name="desc"
			value={desc}
			onChange={handleChange}
			placeholder="By desc" />
	</section>
}
import { CarPreview } from "./CarPreview.jsx"


export function CarList({ cars, onRemoveCar, onUpdateCar, onSelectCar }) {

	function onChangeSpeed(car) {
		car = { ...car, maxSpeed: car.maxSpeed + 10 }
		onUpdateCar(car)
	}

	if (!cars.length) return <div>No cars to show</div>
	return <ul className="car-list">
		{
			cars.map(car => <li key={car.id}>
				<CarPreview car={car} />
				<div className="car-actions">
					<button className="remove-btn" onClick={() => onRemoveCar(car.id)}>X</button>
					<button onClick={() => { onChangeSpeed(car) }}>Increase speed</button>
					<button onClick={() => { onSelectCar(car) }}>Select car</button>
				</div>
			</li>)
		}
	</ul>
}
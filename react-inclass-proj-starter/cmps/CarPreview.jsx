
export function CarPreview({ car }) {
	return <article className="car-preview">
		<h2>{car.vendor}</h2>
		<h5>speed : {car.maxSpeed}</h5>
		<img src={`assets/img/${car.vendor}.png`} />
	</article>
}
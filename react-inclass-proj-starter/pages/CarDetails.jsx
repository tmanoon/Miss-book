

export function CarDetails({ car, onGoBack }) {

	// Render time methods
	function getSpeedClass() {
		if (car.maxSpeed > 100) return 'fast'
		else if (car.maxSpeed < 80) return 'slow'
		else return ''
	}
	
	return <section className="car-details">
		<button onClick={onGoBack}>Go back</button>
		<h1>Vendor : {car.vendor}</h1>
		<h5 className={getSpeedClass()}>Max speed: {car.maxSpeed}</h5>
		<img src={`assets/img/${car.vendor}.png`} />
		<p>{car.desc}</p>
	</section>
}
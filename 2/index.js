// Функция для расчета расстояния в декартовой системе координат 
function distanceCartesian3D(x1, y1, z1, x2, y2, z2) {
	return Math.sqrt(
		Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
	)
}

// Функция для расчета расстояния в полярной системе координат 
function distancePolar2D(r1, theta1, r2, theta2) {
	return Math.sqrt(
		Math.pow(r1, 2) + Math.pow(r2, 2) - 2 * r1 * r2 * Math.cos(theta2 - theta1)
	)
}

// Функция для преобразования сферических координат в декартовы
function sphericalToCartesian(r, theta, phi) {
	const x = r * Math.sin(phi) * Math.cos(theta)
	const y = r * Math.sin(phi) * Math.sin(theta)
	const z = r * Math.cos(phi)
	return { x, y, z }
}

// Функция для расчета расстояния в сферической системе координат
function distanceSphericalVolume(r1, theta1, phi1, r2, theta2, phi2) {
	return Math.sqrt(
		Math.pow(r1, 2) +
			Math.pow(r2, 2) -
			2 *
				r1 *
				r2 *
				(Math.sin(phi1) * Math.sin(phi2) * Math.cos(theta1 - theta2) +
					Math.cos(phi1) * Math.cos(phi2))
	)
}

// Функция для расчета дуговой дистанции
function distanceSphericalSurface(r, phi1, phi2, theta1, theta2) {
	return (
		r *
		Math.acos(
			Math.sin(phi1) * Math.sin(phi2) +
				Math.cos(phi1) * Math.cos(phi2) * Math.cos(theta1 - theta2)
		)
	)
}

// Функция для обработки данных формы
function handleFormSubmit(event) {
	event.preventDefault() 

	const point1 = document.getElementById('point1').value.split(',').map(Number)
	const point2 = document.getElementById('point2').value.split(',').map(Number)

	const [r1, theta1, phi1] = point1
	const [r2, theta2, phi2] = point2

	// Преобразование в декартовые координаты
	const { x: x1, y: y1, z: z1 } = sphericalToCartesian(r1, theta1, phi1)
	const { x: x2, y: y2, z: z2 } = sphericalToCartesian(r2, theta2, phi2)

	// Расчеты расстояний
	const cartesianDistance = distanceCartesian3D(x1, y1, z1, x2, y2, z2)
	const polarDistance = distancePolar2D(r1, theta1, r2, theta2)
	const sphericalVolumeDistance = distanceSphericalVolume(
		r1,
		theta1,
		phi1,
		r2,
		theta2,
		phi2
	)
	const sphericalSurfaceDistance = distanceSphericalSurface(
		r1,
		phi1,
		phi2,
		theta1,
		theta2
	)

	const outputDiv = document.getElementById('output')
	outputDiv.innerHTML = `
        <p>Расстояние в декартовой системе координат (3D): ${cartesianDistance.toFixed(
					2
				)}</p>
        <p>Расстояние в полярной системе координат (2D): ${polarDistance.toFixed(
					2
				)}</p>
        <p>Расстояние в сферической системе координат (через объем): ${sphericalVolumeDistance.toFixed(
					2
				)}</p>
        <p>Расстояние в сферической системе координат (по поверхности): ${sphericalSurfaceDistance.toFixed(
					2
				)}</p>
    `
}

document
	.getElementById('distanceForm')
	.addEventListener('submit', handleFormSubmit)

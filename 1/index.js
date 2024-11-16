// Функция для преобразования из сферической в декартову систему координат
function sphericalToCartesian(r, theta, phi) {
	const x = r * Math.sin(phi) * Math.cos(theta)
	const y = r * Math.sin(phi) * Math.sin(theta)
	const z = r * Math.cos(phi)
	return { x, y, z }
}

// Функция для преобразования из декартовой в сферическую систему координат
function cartesianToSpherical(x, y, z) {
	const r = Math.sqrt(x * x + y * y + z * z)
	const theta = Math.atan2(y, x) // Азимут
	const phi = Math.acos(z / r) // Полярный угол
	return { r, theta, phi }
}

// Функция для добавления текста на страницу
function appendToOutput(text) {
	const outputDiv = document.getElementById('output')
	const paragraph = document.createElement('p')
	paragraph.textContent = text
	outputDiv.appendChild(paragraph)
}

// Функция для обработки данных формы
function handleFormSubmit(event) {
	event.preventDefault() 

	// Получаем количество точек
	const pointsCount = parseInt(document.getElementById('pointsCount').value, 10)
	const sphericalPoints = []
	const cartesianPoints = []

	// Генерация случайных сферических координат и преобразование в декартовые
	for (let i = 0; i < pointsCount; i++) {
		const r = Math.random() * 10 // Радиус от 0 до 10
		const theta = Math.random() * 2 * Math.PI // Азимут от 0 до 2π
		const phi = Math.random() * Math.PI // Полярный угол от 0 до π
		sphericalPoints.push({ r, theta, phi })

		const cartesian = sphericalToCartesian(r, theta, phi)
		cartesianPoints.push(cartesian)
	}

	document.getElementById('output').innerHTML = ''

	appendToOutput('Сферические координаты и их преобразование в декартовые:')
	sphericalPoints.forEach((point, index) => {
		const cartesian = cartesianPoints[index]
		appendToOutput(
			`Точка ${index + 1}: r = ${point.r.toFixed(
				2
			)}, theta = ${point.theta.toFixed(2)}, phi = ${point.phi.toFixed(2)}` +
				` -> x = ${cartesian.x.toFixed(2)}, y = ${cartesian.y.toFixed(
					2
				)}, z = ${cartesian.z.toFixed(2)}`
		)
	})

	// Преобразование обратно в сферические координаты
	const sphericalConvertedPoints = cartesianPoints.map(point =>
		cartesianToSpherical(point.x, point.y, point.z)
	)

	appendToOutput(
		'\nДекартовые координаты и их преобразование обратно в сферические:'
	)
	sphericalConvertedPoints.forEach((point, index) => {
		appendToOutput(
			`Точка ${index + 1}: r = ${point.r.toFixed(
				2
			)}, theta = ${point.theta.toFixed(2)}, phi = ${point.phi.toFixed(2)}`
		)
	})

	// Проверка корректности
	appendToOutput('\nПроверка корректности:')
	sphericalPoints.forEach((original, index) => {
		const converted = sphericalConvertedPoints[index]
		const rMatches = Math.abs(original.r - converted.r) < 0.01
		const thetaMatches = Math.abs(original.theta - converted.theta) < 0.01
		const phiMatches = Math.abs(original.phi - converted.phi) < 0.01
		appendToOutput(
			`Точка ${
				index + 1
			}: Радиус совпадает? ${rMatches}, Азимут совпадает? ${thetaMatches}, Полярный угол совпадает? ${phiMatches}`
		)
	})
}

document
	.getElementById('coordinatesForm')
	.addEventListener('submit', handleFormSubmit)

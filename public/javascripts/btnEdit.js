const btns = Array.from(document.querySelectorAll('.shower'))
const allDoubles= Array.from(document.getElementsByClassName('doubleBtn'))

const show = idx => {

	const inputs = document.querySelectorAll(`#form${idx} .input`)
	const double = document.querySelectorAll(`#form${idx} .doubleBtn`)

	Array.from(inputs).forEach(inpt => inpt.readOnly = !inpt.readOnly)
	Array.from(double)[0].style.maxHeight === '0px' ? Array.from(double)[0].style.maxHeight = '41px' : Array.from(double)[0].style.maxHeight = '0px'
}

const initialize = () => allDoubles.forEach(btn => btn.style.maxHeight = '0px')

document.addEventListener('load', initialize())
btns.forEach((btn, idx) => btn.addEventListener('click', () => show(idx) ))

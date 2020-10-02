const btns = Array.from(document.querySelectorAll('.shower'))
const allDoubles= Array.from(document.getElementsByClassName('doubleBtn'))

const show = idx => {

	const inputs = document.querySelectorAll(`#form${idx} .input`)
	const double = document.querySelectorAll(`#form${idx} .doubleBtn`)
	const selections = document.querySelectorAll(`#form${idx} .selection`)
	const radios = document.querySelectorAll(`#form${idx} .radio`)
	Array.from(inputs).forEach(inpt => inpt.readOnly = !inpt.readOnly)
	Array.from(double)[0].style.maxHeight === '0px' ? Array.from(double)[0].style.maxHeight = '41px' : Array.from(double)[0].style.maxHeight = '0px'
	Array.from(selections).forEach(slct => slct.disabled = !slct.disabled)
	Array.from(radios).forEach(rd=> rd.disabled = !rd.disabled)
}

const initialize = () => allDoubles.forEach(btn => btn.style.maxHeight = '0px')

document.addEventListener('load', initialize())
btns.forEach((btn, idx) => btn.addEventListener('click', () => show(idx) ))

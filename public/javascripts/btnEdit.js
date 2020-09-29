const inputs = document.querySelectorAll('.input')
const double = document.getElementById('double')
double.style.visibility = 'hidden'

const show = () => {
	console.log('here!')
	Array.from(inputs).forEach(inpt => inpt.readOnly = !inpt.readOnly)
	double.style.visibility === 'hidden' ? double.style.visibility = 'visible' : double.style.visibility = 'hidden'
}

document.getElementById('show').addEventListener('click', show)
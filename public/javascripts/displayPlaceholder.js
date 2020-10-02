const placeholderContainer = document.getElementById('placeholderContainer')
const output = document.getElementById('output')

const loadFile = e => {
	placeholderContainer.innerHTML = ''
	const image = document.createElement('img')
	image.classList.add('image')
	image.classList.add('is-128x128')
	image.style.margin = 'auto'
	image.src = URL.createObjectURL(e.target.files[0])
	console.log(image)
	placeholderContainer.append(image)
}

output.addEventListener('change', loadFile)
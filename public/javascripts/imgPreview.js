const selection = document.getElementById('lens')
const preview = document.getElementById('preview')

const changePreview =() => {
	const newSrc = selection.options[selection.selectedIndex].dataset.src
	preview.src = newSrc
}

selection.addEventListener('change', changePreview)

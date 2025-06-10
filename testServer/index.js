const c = document.getElementById('c')
const b = document.getElementById('b')
const d = document.getElementById('d')
c.addEventListener('click', () => {
    window.CatWidget.create()
})
d.addEventListener('click', () => {
    window.CatWidget.destroy()
})
b.addEventListener('click', () => {
    alert('Button')
})
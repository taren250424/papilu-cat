const c = document.getElementById('c')
const d = document.getElementById('d')
const t = document.getElementById('t')
c.addEventListener('click', () => {
    window.CatWidget.create()
})
d.addEventListener('click', () => {
    window.CatWidget.destroy()
})
t.addEventListener('click', () => {
    alert('t!')
})
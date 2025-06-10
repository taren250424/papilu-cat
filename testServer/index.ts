const c = document.getElementById('c')
const b = document.getElementById('b')
const d = document.getElementById('d')
if (! c) throw new Error('')
if (! d) throw new Error('')
if (! b) throw new Error('')

c.addEventListener('click', () => {
    
})
d.addEventListener('click', () => {

})
b.addEventListener('click', () => {
    alert('Button')
})
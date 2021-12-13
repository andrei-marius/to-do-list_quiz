document.querySelector('.showq').addEventListener('click', e => {
    document.querySelector('.q-container').classList.remove('hidden')
    document.querySelector('.tdl-container').classList.add('hidden')
    document.querySelector('body').style.background = '#fff'
    e.target.classList.add('hidden')
    document.querySelector('.showtdl').classList.remove('hidden')
})

document.querySelector('.showtdl').addEventListener('click', e => {
    document.querySelector('.tdl-container').classList.remove('hidden')
    document.querySelector('.q-container').classList.add('hidden')
    document.querySelector('body').style.background = '#352f5b'
    e.target.classList.add('hidden')
    document.querySelector('.showq').classList.remove('hidden')
})

const addForm = document.querySelector('.add')
const list = document.querySelector('.todos')
const search = document.querySelector('.search input')

const generateTemplate = todo => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `

    list.innerHTML += html
}

addForm.addEventListener('submit', e => {
    e.preventDefault()
    
    const todo = addForm.add.value.trim()

    if(todo.length){
        generateTemplate(todo)
        addForm.reset()
    }
})

list.addEventListener('click', e => {
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove()
    }
})

const filterTodos = term => {
    Array.from(list.children)
        .filter(child => !child.textContent.toLowerCase().includes(term))
        .forEach(child => child.classList.add('filtered'))

    Array.from(list.children)
        .filter(child => child.textContent.toLowerCase().includes(term))
        .forEach(child => child.classList.remove('filtered'))
}

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase()
    filterTodos(term)
})

const correctAnswers = ['B', 'B', 'B', 'B']
const form = document.querySelector('.quiz-form')

form.addEventListener('submit', e => {
    e.preventDefault()

    let score = 0;
    const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value]

    userAnswers.forEach((answer, index) => {
        if(answer === correctAnswers[index]){
            score += 25
        }
    })

    scrollTo(0, 0)
    document.querySelector('.result').classList.remove('d-none')

    let output = 0
    const timer = setInterval(() => {
        document.querySelector('.result span').textContent = `${output}%`
        if(output === score){
            clearInterval(timer)
        }else{
            output++
        }
    }, 10)
})
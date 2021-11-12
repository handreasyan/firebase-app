import './styles.css'
import { isValid, createModal } from './utils'
import { Question } from './question'
import { getAuthForm, authWithEmailAndPassword } from './auth'

const form = document.getElementById('form')
const input = form.querySelector('#questionInput')
const modalBtn = document.getElementById('modal-btn')
const submitBtn = form.querySelector('#submit')

window.addEventListener('load', Question.renderList)

form.addEventListener('submit', submitFormHandler)

modalBtn.addEventListener('click', openModal)

input.addEventListener('input', (event) => {
  submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
  event.preventDefault()

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    }

    submitBtn.disabled = true
    Question.create(question).then(() => {
      input.value = ''
      input.className = ''
      submitBtn.disabled = false
    })
  }
}

function openModal() {
  createModal('Authorization', getAuthForm())
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, { once: true })
}

function authFormHandler(event) {
  event.preventDefault()

  const email = event.target.querySelector('#email').value
  const btn = event.target.querySelector('#sign-in')
  const password = event.target.querySelector('#password').value
  btn.disabled = true
  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => (btn.disabled = false))
}

function renderModalAfterAuth(content) {
  if (typeof content === 'string') {
    createModal('Error!', content)
  } else {
    createModal('Question list!', Question.listToHTML(content))
  }
  console.log(content)
}

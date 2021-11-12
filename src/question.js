const BASE_URL =
  'https://podcast-app-6e364-default-rtdb.firebaseio.com/questions.json'

export class Question {
  static create(question) {
    return fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        question.id = response.name
        return question
      })
      .then(addToLocalStorage)
      .then(Question.renderList)
  }

  static renderList() {
    const questions = getQuestionsFromLS()
    const html = questions.length
      ? questions.map(toCard).join('')
      : `<div class="mui--text-headline">Not have a questions!</div>`

    const list = document.getElementById('list')
    list.innerHTML = html
  }

  static fetch(token) {
    if (!token) {
      return Promise.resolve(`<p class='error'>You don't have a token</p>`)
    }
    return fetch(`${BASE_URL}?auth=${token}`)
      .then((res) => res.json())
      .then((response) => {
        if (response && response.error)
          return `<p class='error'>${response.error}</p>`

        return response
          ? Object.keys(response).map((key) => ({
              ...response[key],
              id: key,
            }))
          : []
      })
  }

  static listToHTML(questions) {
    return questions.length
      ? `
         <ol>
            ${questions.map((q) => `<li>${q.text}</li>`).join('')}
         </ol>
     `
      : `<p>Not have a questions</p>`
  }
}

function addToLocalStorage(question) {
  const all = getQuestionsFromLS()
  all.push(question)
  localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLS() {
  return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
  return `
  <div class="mui--text-black-54">
   ${new Date(question.date).toLocaleDateString()}
   ${new Date(question.date).toLocaleTimeString()}
  </div>
  <div>${question.text}</div>
   <br />
  `
}

const questionEl = document.querySelector('#questionInput')
const answerEl = document.querySelector('#answerInput')
const inputForm = document.querySelector(".input-section");
const flashcardGrid = document.querySelector(`.flashcard-grid`)
const card = document.querySelector('.flashcard')

let flashCards = [];

function init() {
  const data = JSON.parse(localStorage.getItem('flashCards'))
  // console.log(data)

  if (!data) return

  flashCards = data

  render(flashCards)
}

init()

function setLocalStorage() {
  localStorage.setItem('flashCards', JSON.stringify(flashCards) )
}

function render(cards) {

  const markup = cards.map(card => {
    return `
        <div class="flashcard">
            <button class="delete-btn">×</button>
            <div class="card-question">
                <h3>${card.question}</h3>
            </div>
            <div class="card-answer">
                <p>${card.answer}</p>
            </div>
        </div>`
  }).join('')
  
    flashcardGrid.innerHTML = ''
    flashcardGrid.insertAdjacentHTML('beforeEnd', markup)
}

inputForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = [...new FormData(this)];
  const formObject = Object.fromEntries(formData);

  flashCards.push(formObject);
  render(flashCards)

  questionEl.value = ''
  answerEl.value = ''

  setLocalStorage()
});


flashcardGrid.addEventListener('click', function(e) {
  const button = e.target.closest('.delete-btn')
  const cardSel = e.target.closest('.flashcard')
  const cards = flashcardGrid.querySelectorAll('.flashcard')
  
  if (button) {
    const arrCards = Array.from(cards)
    const card = button.closest('.flashcard')

    // delete from flashcard
    const cardQuestion = card.querySelector('h3').innerHTML

    // console.log(cardQuestion)
    const delIndex = flashCards.findIndex(card => card.question === cardQuestion )
    // console.log(delIndex)
    flashCards.splice(delIndex, 1)
    
    render(flashCards)

    setLocalStorage()
  } else { 
    // console.log(cards)
    cards.forEach(function(card) {
      if (card !== cardSel) {
        card.classList.remove('is-revealed')
      } else {
        card.classList.toggle('is-revealed')
      }
    })
  }
  
})






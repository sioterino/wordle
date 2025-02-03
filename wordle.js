let games = JSON.parse(localStorage.getItem('games')) || []

let keyboard = [...'abcdefghijklmnopqrstuvwxyz'].map(letter => ({ letter: letter, value: true }));
const wordLength = 5
const chances = 6

let wordles = JSON.parse(localStorage.getItem('data'))
let answer = getAnswer()
function getAnswer() {
    let index = randint(wordles.length)
    while (!wordles[index].value) {
        index = randint(wordles.length)
    }
    wordles[index].value = false
    console.log(wordles[index].key)
    return wordles[index].key
}


let input = document.getElementById('1')
input.addEventListener('keyup', controller)
function controller(e) {
    let key = e.key
    let id = e.target.id
    let value = formatString(e.target.value).replace(/[^a-zA-Z]/g, "")

    if (value.length > wordLength) {
        e.target.value = value.substring(0, wordLength)
    }
    
    if (key == 'Enter' && value.length == wordLength) {
        if (id != chances) {
            input.setAttribute('disabled', true)
            input = document.getElementById(`${parseInt(id) + 1}`)
            input.removeAttribute('disabled')
            input.focus()
            input.addEventListener('keyup', controller)
            check(id, value)
        } else {
            input.setAttribute('disabled', true)
            check(id, value)
            finish(false, id)
        }
    } else {
        write(id, value)
    }
}

function write(id, value) {
    const letter1 = document.getElementById(`${id}-1`)
    const letter2 = document.getElementById(`${id}-2`)
    const letter3 = document.getElementById(`${id}-3`)
    const letter4 = document.getElementById(`${id}-4`)
    const letter5 = document.getElementById(`${id}-5`)

    const display = [letter1, letter2, letter3, letter4, letter5]
    const word = new Array(wordLength)

    for (let i = 0; i < value.length; i++) {
        word[i] = value[i]
    }

    for (let i = 0; i < word.length; i++) {
        if (word[i]) {
            display[i].textContent = word[i]
        } else {
            display[i].textContent = ""
        }
    }
}

function check(id, value) {
    const letter1 = document.getElementById(`${id}-1`)
    const letter2 = document.getElementById(`${id}-2`)
    const letter3 = document.getElementById(`${id}-3`)
    const letter4 = document.getElementById(`${id}-4`)
    const letter5 = document.getElementById(`${id}-5`)

    const display = [letter1, letter2, letter3, letter4, letter5]
    let formatedAnswer = formatString(answer)
    let winner = true

    const word = new Array(wordLength)
    for (let i = 0; i < value.length; i++) {
        word[i] = value[i]
    }
    
    const arrAnswer = new Array(wordLength)
    for (let i = 0; i < formatedAnswer.length; i++) {
        arrAnswer[i] = formatedAnswer[i]
    }

    const className = new Array(wordLength).fill('gray')
    for (let i = 0; i < value.length; i++) {

        if (word[i] == arrAnswer[i]) {
            className[i] = 'green'
        } else {
            for (let j = 0; j < value.length; j++) {
                if (word[i] == arrAnswer[j]) {
                    className[i] = 'yellow'
                }
                winner = false
            }
        }
    }

    for (let i = 0; i < value.length; i++) {
        display[i].classList.add(className[i])
    }

    for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < keyboard.length; j++) {
            if (word[i] == keyboard[j].letter) {
                document.getElementById(keyboard[j].letter).classList.add(className[i])
                keyboard[j].value = false
            }
        }
    }

    if (winner) {
        document.getElementById(id)
        won(id)
        finish(true, id)
    }

}

function won(id) {
    const letter1_1 = document.getElementById(`1-1`)
    const letter1_2 = document.getElementById(`1-2`)
    const letter1_3 = document.getElementById(`1-3`)
    const letter1_4 = document.getElementById(`1-4`)
    const letter1_5 = document.getElementById(`1-5`)
    const letter2_1 = document.getElementById(`2-1`)
    const letter2_2 = document.getElementById(`2-2`)
    const letter2_3 = document.getElementById(`2-3`)
    const letter2_4 = document.getElementById(`2-4`)
    const letter2_5 = document.getElementById(`2-5`)
    const letter3_1 = document.getElementById(`3-1`)
    const letter3_2 = document.getElementById(`3-2`)
    const letter3_3 = document.getElementById(`3-3`)
    const letter3_4 = document.getElementById(`3-4`)
    const letter3_5 = document.getElementById(`3-5`)
    const letter4_1 = document.getElementById(`4-1`)
    const letter4_2 = document.getElementById(`4-2`)
    const letter4_3 = document.getElementById(`4-3`)
    const letter4_4 = document.getElementById(`4-4`)
    const letter4_5 = document.getElementById(`4-5`)
    const letter5_1 = document.getElementById(`5-1`)
    const letter5_2 = document.getElementById(`5-2`)
    const letter5_3 = document.getElementById(`5-3`)
    const letter5_4 = document.getElementById(`5-4`)
    const letter5_5 = document.getElementById(`5-5`)
    const letter6_1 = document.getElementById(`6-1`)
    const letter6_2 = document.getElementById(`6-2`)
    const letter6_3 = document.getElementById(`6-3`)
    const letter6_4 = document.getElementById(`6-4`)
    const letter6_5 = document.getElementById(`6-5`)

    const boxes = [
        [letter1_1, letter1_2, letter1_3, letter1_4, letter1_5], 
        [letter2_1, letter2_2, letter2_3, letter2_4, letter2_5], 
        [letter3_1, letter3_2, letter3_3, letter3_4, letter3_5], 
        [letter4_1, letter4_2, letter4_3, letter4_4, letter4_5], 
        [letter5_1, letter5_2, letter5_3, letter5_4, letter5_5], 
        [letter6_1, letter6_2, letter6_3, letter6_4, letter6_5], 
    ]

    for (let i = id; i < chances; i++) {
        for (let j = 0; j < wordLength; j++) {
            boxes[i][j].classList.add('winner')
        }
    }

    for (let i = 0; i < keyboard.length; i++) {
        if (keyboard[i].value) {
            document.getElementById(keyboard[i].letter).classList.add('winner')
        }
    }
}

function finish(status, id) {
    document.querySelectorAll('.input').forEach(input => {
        input.setAttribute('disabled', true)
    })
    showAnswer()
    setLocalStorage(status, id)
    populate(calc(), status)
    openDialog()
}

function formatString(input) {
    return input
        .replace(/[íìĩịîí]/g, 'i')
        .replace(/[áàãäâ]/g, 'a')
        .replace(/[éèẽëê]/g, 'e')
        .replace(/[óòõöô]/g, 'o')
        .replace(/[úùũüû]/g, 'u')
        .replace(/[ç]/g, 'c')
        .toLowerCase()
}

function randint(max) {
    return Math.floor(Math.random() * max)
}

function showAnswer() {
    const body = document.querySelector('body')
    const p = document.createElement('p')
    p.classList.add('topAnswer')
    p.textContent = answer
    body.append(p)
}

function setLocalStorage(status, id) {
    if (status) {
        games.push(id);
    } else {
        games.push(0);
    }
    localStorage.setItem('games', JSON.stringify(games))
    localStorage.setItem('data', JSON.stringify(wordles))
}

function calc() {
    const plays = JSON.parse(localStorage.getItem('games'))

    const played = plays.length
    const won = plays.filter(element => element !== 0).length
    const victory = Math.round((won / played) * 100)

    let streak = 0
    let currentStreak = 0

    for (let i = 0; i < plays.length; i++) {
        if (plays[i] !== 0) {
            currentStreak++
        } else {
            streak = Math.max(streak, currentStreak)
            currentStreak = 0
        }
    }
    streak = Math.max(streak, currentStreak)

    return {
        "played": played,
        "won": won,
        "victory": victory,
        "streak": streak,
        "currentStreak": currentStreak,
    }
}

function populate(obj, status) {
    const dialog = document.querySelector('.dialog')
    const played = dialog.querySelector('.played')
    const victory = dialog.querySelector('.victory')
    const streak = dialog.querySelector('.streak')
    const currentStreak = dialog.querySelector('.currentStreak')
    const span = dialog.querySelector('.answer')
        span.style.color = 'green'

    if (!status) {
        dialog.querySelector('.feedback').textContent = 'Você Errou :('
        span.style.color = 'red'
    }

    played.textContent = obj.played
    victory.textContent = `${obj.victory}%`
    streak.textContent = obj.streak
    currentStreak.textContent = obj.currentStreak
    span.textContent = answer
    
}

function refresh() {
    document.querySelector('dialog').close()

    keyboard = [...'abcdefghijklmnopqrstuvwxyz'].map(letter => ({ letter: letter, value: true }))
    answer = getAnswer()

    resetDisplay()

    input = document.getElementById('1')
    input.removeAttribute('disabled')
    input.value = ''
    input.focus()
    input.addEventListener('keyup', controller)

}

function resetDisplay() {
    const pletters = document.querySelectorAll('.letter')
    pletters.forEach(box => {
        box.textContent = ''
        box.classList.remove('green', 'yellow', 'gray', 'winner')
    })

    keyboard.forEach(key => {
        const keyElement = document.getElementById(key.letter)
        keyElement.classList.remove('green', 'yellow', 'gray', 'winner')
    })

    const textinputs = document.querySelectorAll('.input')
    textinputs.forEach(input => {
        input.value = ''
        input.setAttribute('disabled', true)
    })
    textinputs[0].removeAttribute('disabled')

    const topAnswer = document.querySelector('.topAnswer')
    topAnswer.remove()
}

function openDialog() {
    document.querySelector('dialog').showModal()
}

const dialog = document.querySelector('dialog')
dialog.addEventListener('click', (e) => {
    dialog.classList.toggle('hidden')
})
const dialogDiv = document.querySelector('.dialog')
dialogDiv.addEventListener('click', (e) => e.stopPropagation());


const body = document.querySelector('body')
body.addEventListener('click', (e) => console.log(e.target));
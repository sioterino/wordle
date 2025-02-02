const keyboard = [...'abcdefghijklmnopqrstuvwxyz'].map(letter => ({ letter: letter, value: true }));
const wordLength = 5
const chances = 6

let wordles = []
let answer = ''

fetch('./words.json')
.then(response => response.json())
.then(data => {
    wordles = data
    let index = randint(data.length)
    
    if (wordles[index].value) {
        answer = wordles[index].key
    }    
    console.log(answer)
})


let input = document.getElementById('1')
input.addEventListener('keyup', controller)

function controller(e) {
    let key = e.key
    let id = e.target.id
    let value = formatString(e.target.value.replace(/[^a-zA-Z]/g, ""))

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
            finish()
            input.setAttribute('disabled', true)
            check(id, value)
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
        finish()
        won(id)
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

function finish() {
    const body = document.querySelector('body')

    const p = document.createElement('p')
    p.classList.add('answer')
    p.textContent = answer

    body.append(p)
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
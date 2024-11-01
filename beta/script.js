let correctWord = '';
let maxAttempts = 5;
let customWords = JSON.parse(localStorage.getItem('customWords')) || [];

// Open and close settings modal
function openSettings() {
    document.getElementById('settingsModal').style.display = 'flex';
    updateCustomWordList();
}

function closeSettings() {
    document.getElementById('settingsModal').style.display = 'none';
}

// Add and manage custom words
function addCustomWord() {
    const customWordInput = document.getElementById('customWordInput').value.trim().toLowerCase();
    if (customWordInput.length >= 3 && customWordInput.length <= 9 && /^[a-z]+$/.test(customWordInput)) {
        customWords.push(customWordInput);
        localStorage.setItem('customWords', JSON.stringify(customWords));
        document.getElementById('customWordInput').value = '';
        updateCustomWordList();
    } else {
        alert('Word must be 3-9 letters and contain only letters.');
    }
}

function updateCustomWordList() {
    const customWordList = document.getElementById('customWordList');
    customWordList.innerHTML = '';
    customWords.forEach((word) => {
        const listItem = document.createElement('li');
        listItem.textContent = word;
        customWordList.appendChild(listItem);
    });
}

function clearCustomWords() {
    if (confirm('Are you sure you want to clear all custom words?')) {
        customWords = [];
        localStorage.removeItem('customWords');
        updateCustomWordList();
    }
}

// Fetch random or custom word
function fetchRandomOrCustomWord(wordLength) {
    if (customWords.length > 0 && Math.random() < 0.5) {
        correctWord = customWords[Math.floor(Math.random() * customWords.length)];
        maxAttempts = correctWord.length;
        createBoard(correctWord.length);
        prepareGuessingInputs(correctWord.length);
    } else {
        fetchRandomWord(wordLength);
    }
}

function startGame() {
    const randomLengthMode = document.getElementById('randomLengthMode').checked;
    if (randomLengthMode) {
        const randomLength = Math.floor(Math.random() * (9 - 3 + 1)) + 3;
        fetchRandomOrCustomWord(randomLength);
    } else {
        const wordLength = parseInt(document.getElementById('wordLengthInput').value);
        if (wordLength < 3 || wordLength > 9) {
            document.getElementById('message').innerText = 'Please enter a length between 3 and 9.';
            return;
        }
        fetchRandomOrCustomWord(wordLength);
    }
}

function makeGuess() {
    const guessInput = document.getElementById('guessInput').value.trim().toLowerCase();
    // Logic to handle guesses, check against `correctWord`, and update UI.
}

// Create the game board dynamically based on word length
function createBoard(wordLength) {
    const board = document.getElementById('board');
    board.innerHTML = '';  // Clear existing board
    for (let i = 0; i < maxAttempts; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < wordLength; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

// Prepare inputs for guessing
function prepareGuessingInputs(wordLength) {
    const guessInput = document.getElementById('guessInput');
    guessInput.maxLength = wordLength;
    guessInput.classList.remove('hidden');
    document.getElementById('submitGuessButton').classList.remove('hidden');
}

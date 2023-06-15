// Generate a new shuffled array of numbers
function generateNumbers() {
    var numbers = Array.from(Array(15).keys()).map(num => num + 1);
    numbers.push('');
    numbers = numbers.sort(() => Math.random() - 0.5);
    return numbers;
  }
  
  // Render the game board
  function renderGameBoard() {
    var gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';
  
    numbers.forEach((number, index) => {
      var cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.textContent = number !== '' ? number : '';
      cardElement.addEventListener('click', () => moveCard(index));
      gameBoard.appendChild(cardElement);
    });
  }
  
  // Move the card
  function moveCard(index) {
    if (isAdjacent(index, blankIndex)) {
      swapNumbers(index, blankIndex);
      blankIndex = index;
      moveCount++;
      document.getElementById('moveCount').textContent = moveCount;
      checkGameWin();
      renderGameBoard();
    }
  }
  
  // Swap two numbers
function swapNumbers(index1, index2) {
    var temp = numbers[index1];
    numbers[index1] = numbers[index2];
    numbers[index2] = temp;
  }


  // Check if the game is won
  function checkGameWin() {
    if (numbers[numbers.length - 1] === '') {
      for (var i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] !== i + 1) {
          return;
        }
      }
      clearInterval(timerInterval);
      var timeElapsed = formatTime(time);
      alert(`Congratulations! You have completed the game in ${moveCount} moves and ${timeElapsed}.`);
    } else if (moveCount >= moveLimit) {
      clearInterval(timerInterval);
      alert('Game over! You have reached the move limit.');
    }
  }
  
  // Check if two cards are adjacent
  function isAdjacent(index1, index2) {
    var row1 = Math.floor(index1 / 4);
    var col1 = index1 % 4;
    var row2 = Math.floor(index2 / 4);
    var col2 = index2 % 4;
    return (
      (Math.abs(row1 - row2) === 1 && col1 === col2) ||
      (Math.abs(col1 - col2) === 1 && row1 === row2)
    );
  }
  
  // Start the game
  function startGame() {
    numbers = generateNumbers();
    blankIndex = numbers.indexOf('');
    moveCount = 0;
   
    document.getElementById('moveCount').textContent = moveCount;
    startTimer();
    renderGameBoard();
  }
  
  // Timer
  var time = 0;
  var timerInterval;
  
  function startTimer() {
    timerInterval = setInterval(() => {
      time++;
      document.getElementById('timeElapsed').textContent = formatTime(time);
    }, 1000);
  }

  // Restart the game
function restartGame() {
    // Clear the timer interval
    clearInterval(timerInterval);
    timerInterval = null;
    
    // Reset the timer and move count
    time = 0;
    document.getElementById('timeElapsed').textContent = '00:00';
    moveCount = 0;
    document.getElementById('moveCount').textContent = moveCount;
    startGame(); // to start the game once restart presed
     // Generate new numbers and render the game board
  numbers = generateNumbers();
  blankIndex = numbers.indexOf('');
  renderGameBoard();
}

  function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    return `${padZero(minutes)}:${padZero(seconds)}`;
  }
  
  function padZero(num) {
    return num.toString().padStart(2, '0');
  }
  
  // Game settings
  var moveCount = 0;
  var moveLimit = 200;
  var numbers = [];
  var blankIndex = -1;
  
  document.getElementById('startButton').addEventListener('click', startGame);
  document.getElementById('restart-btn').addEventListener('click', restartGame);
  
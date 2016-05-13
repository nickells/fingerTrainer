// todo: simulate hold shift

const gameObj = {
  keyIn: document.getElementById('keyboardInput'),
  feedback: document.getElementById('feedback'),
  letterDOM: document.getElementById('typeThis'),
  streakDOM: document.getElementById('streak'),
  letter: '',
  selections: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_'],
  getRandomSelection() {
    return this.selections[Math.floor(Math.random() * this.selections.length)];
  },
  setRandomKey() {
    this.letter = this.getRandomSelection();
    this.letterDOM.innerHTML = this.letter;
  },
  renderErrors() {
    let html = 'Errors: \n';
    for (var key in this.mistypes){
      html += '<div>' + key + ': ' + this.mistypes[key] + '</div>';
    }
    this.feedback.innerHTML = html;
  },
  renderStreak() {
    let html = 'Streak: ';
    html += this.streak;
    this.streakDOM.innerHTML = html;
  },
  currentPercent: 100,
  mistypes: {},
  streak: 0,
};

gameObj.keyIn.focus();
gameObj.setRandomKey();

gameObj.keyIn.addEventListener('keyup', function keyUpListener(e) {
  const userInput = e.target.value;
  const correctKey = this.letter;
  if (userInput === '') return;
  if (correctKey === userInput) {
    this.setRandomKey();
    this.streak++;
    this.renderStreak();
    this.keyIn.placeholder = 'nice job!';
  } else {
    this.mistypes[correctKey] ? this.mistypes[correctKey]++ : this.mistypes[correctKey] = 1;
    this.selections.push(correctKey); // weighting!
    this.renderErrors();
    this.streak = 0;
    this.keyIn.placeholder = 'try again!';
    this.renderStreak();
  }
  this.keyIn.value = '';
}.bind(gameObj));

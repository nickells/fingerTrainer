//todo
//streak

var gameObj = {
  keyIn: document.getElementById('keyboardInput'),
  feedback: document.getElementById('feedback'),
  letterDOM: document.getElementById('typeThis'),
  streakDOM: document.getElementById('streak'),
  letter: '',
  selections: ['!','@','#','$','%','^','&','*','(',')','_'],
  // selections: ['&'],
  getRandomSelection: function(){
    return this.selections[Math.floor(Math.random()*this.selections.length)];
  },
  setRandomKey: function(){
    this.letter = this.getRandomSelection();
    this.letterDOM.innerHTML = this.letter;
  },
  renderErrors: function(){
    var html = 'Errors: \n'
    for (var key in this.mistypes){
      html+='<div>'+key+': ' + this.mistypes[key] + '</div>'
    }
    this.feedback.innerHTML = html;
  },
  renderStreak: function(){
    var html = 'Streak: '
    html += this.streak;
    this.streakDOM.innerHTML = html;
  },
  currentPercent: 100,
  mistypes: {},
  streak: 0
}

gameObj.keyIn.focus()
gameObj.setRandomKey();

gameObj.keyIn.addEventListener('keyup',function(e){
  var userInput = e.target.value;
  var correctKey = this.letter;
  if (userInput === '') return;
  if (correctKey === userInput){
    this.setRandomKey();
    this.streak++;
    this.renderStreak();
  }
  else {
    this.mistypes[correctKey] ? this.mistypes[correctKey]++ : this.mistypes[correctKey] = 1;
    this.selections.push(correctKey); //weighting!
    this.renderErrors();
    this.streak = 0;
    this.renderStreak();
  }
  this.keyIn.value = '';
}.bind(gameObj))
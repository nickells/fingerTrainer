//todo
//iterate with weighting
//streak
//dont use dom as data source

var gameObj = {
  keyIn: document.getElementById('keyboardInput'),
  feedback: document.getElementById('feedback'),
  letter: document.getElementById('typeThis'),
  selections: ['!','@','#','$','%','^','&','*','(',')','_'],
  getRandomSelection: function(){
    return this.selections[Math.floor(Math.random()*this.selections.length)];
  },
  setRandomKey: function(){
    this.letter.innerHTML = this.getRandomSelection()
  },
  renderErrors: function(){
    var html = 'Errors: \n'
    for (var key in this.mistypes){
      html+='<div>'+key+': ' + this.mistypes[key] + '</div>'
    }
    this.feedback.innerHTML = html;
  },
  currentPercent: 100,
  mistypes: {}
}

gameObj.keyIn.focus()
gameObj.setRandomKey()

gameObj.keyIn.addEventListener('keyup',function(e){
  var userInput = e.target.value;
  var correctKey = this.letter.innerHTML;
  if (userInput === '') return;
  if (userInput === '&') userInput = '&amp;';
  if (correctKey === userInput){
    this.setRandomKey();
  }
  else {
    this.mistypes[correctKey] ? this.mistypes[correctKey]++ : this.mistypes[correctKey] = 1;
    this.renderErrors();
  }
  this.keyIn.value = '';
}.bind(gameObj))
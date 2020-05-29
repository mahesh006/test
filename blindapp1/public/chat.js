var socket = io.connect('https://blind123.herokuapp.com');

var message = document.getElementById('message'),
      
      
      output = document.getElementById('output');
      myElement = document.getElementById('chat-window');

var mc = new Hammer(myElement);


mc.on("panleft panright tap press swipe", function(ev) {
  if (ev.type == 'tap'){
    let val = ".";
    document.getElementById("message").value += val;
    navigator.vibrate(200);
  }else if(ev.type == 'press'){
    let val = "-";
    document.getElementById("message").value += val;
    navigator.vibrate(400);
  }else if(ev.type == 'swipe'){
    socket.emit('chat', {
      message: message.value      
    });
    message.value = "";
    navigator.vibrate([800,800,1000]);
  }

});




socket.on('chat', function(data){
       
    output.innerHTML = '<p><strong>' + data.message + ' </strong></p><br>' + '<p><strong>' + decodeMorse(data.message) + '</strong></p><br>';    
    let hello = data.message;
    convert();
    
});


function convert(){
  var T = 200;
   var letters = [ ' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ];
    var morseLetters = [ "\xa0\xa0\xa0\xa0", ".-", "- . . .", "- . - .", "- . .", ".", ". . - .", "- - .", ". . . .", ". .", ". - - -", "- . -", ". - . .",  "- -", "- .", "- - -", ". - - .", "- - . -", ". - .", ". . .", "-", ". . -", ". . . -", ". - -", "- . . -", "- . - -", "- - . .", ". - - - -", ". . - - -", ". . . - -", ". . . . -", ". . . . .", "- . . . .", "- - . . .", "- - - . .", "- - - - .", "- - - - -" ];
    
    var textToChange = hello;
    var newText = "";
    for (var i = 0; i < textToChange.length; i++) {
        for (var j = 0; j < 37; j++) {
            if (textToChange[i].toLowerCase() == letters[j]) {
                newText += morseLetters[j];
                newText += "\xa0\xa0\xa0";
                break;
            }    
        }
    }

  (function(){
var morsecode= newText;
var toPlay = playMorseCode(morsecode);
navigator.vibrate(toPlay);   

})();


function playMorseCode(code) {

var arrayToPlay = [];

for(i=0; i<code.length ; i++) {
var char = code.charAt(i);
// we first check if the code we received is a "."
if (char == '.') {
    // add vibrate of 1T
    arrayToPlay.push(T);
} else if (char == '-') {
    // add vibrate of 3T
    arrayToPlay.push(3*T);
} else if (char == ' ') {
    // add pause of 3T
    arrayToPlay.push(3*T);
} else if (char == '|') {
    arrayToPlay.push(7*T);
}

// we might need to add a spacer if the next character is either a "." or a "-"
// and the current char is either a "." or a "-"
if (((i + 1) < code.length)
    && (code.charAt(i) == "." || code.charAt(i) == "-")
    && (code.charAt(i+1) == "." || code.charAt(i+1) == "-")) {
    arrayToPlay.push(T);
}
}

return arrayToPlay;
}
}

function decodeMorse(morseCode) {
  var ref = { 
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
  };

  return morseCode
    .split('   ')
    .map(
      a => a
        .split(' ')
        .map(
          b => ref[b]
        ).join('')
    ).join(' ');
}

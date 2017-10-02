//bolbabybol()


$.ready(function(e) 
{
  setTimeout(function(){
    get_config()
  }, 500)
})
// call config.json file
var config;
function get_config() 
{
  try 
  {
    d3.json('config.json', function(d)
    {
      config = d;
    });
  }
  catch(e) 
  {
    config = {
          "pitch": 1,
          "volume": 1,
          "read_speed": 1,
          "voice_type": "native",
          "no_message_text": "No message passed, please read the document.",
          "language": "en-US",
          "punc": "/[.,]+/"
        }
  }
}

function read_me(text_val) 
{
  // call get_config function
  get_config()

  setTimeout(function()
  {
    var msg = new SpeechSynthesisUtterance();

    // these values will be changed as per the config later
    msg.voiceURI = config.voice_type;
    msg.volume = config.volume; // 0 to 1
    msg.rate = config.read_speed; // 0.1 to 10
    msg.pitch = config.pitch; //0 to 2
    msg.text = config.no_message_text;
    msg.lang = config.language;
    msg.punc = config.punc


    if(text_val != '') 
    {
      msg.text = text_val;
    }
  }, 500)
}
// function for stop speaking
function stop_S() {
    speechSynthesis.cancel();
} 
// function for pause speaking
function pause(){
    speechSynthesis.pause();
}
// function for resume speaking
function play(){
    speechSynthesis.resume();
}

// Function for select text in peragraph.
function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
      (activeElTagName == "p") ||
      (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text
}
  // Mouse events for select text and send to text box.
document.onmouseup = document.onkeyup = document.onselectionchange = function() {
document.getElementById("sel").value = getSelectionText();

};

/* exported bolbabybol */
// contain both split as well as selected text and send to the api for spoken.
function bolbabybol() 
{
  var bbb = document.getElementById("bbb");
  var nodes = $("bolbabybol");
  var punc = /[.,]+/
  var txt_to_pass_in_api = $('#bbb').text();
    // processing for getSelectText function
      if(getSelectionText() != "") {
          console.log('i am in select')
          txt_to_pass_in_api = getSelectionText();
      }
      // split text
      txt_to_pass_in_api = txt_to_pass_in_api.trim().split(punc);
      $.get('/myname/?cont=' + txt_to_pass_in_api, function(d)
      {
        txt_to_pass_in_api.forEach(function(d)
        {
          setTimeout(function()
          {
            // call speechSynthesis api
          var u = new SpeechSynthesisUtterance(d);
          speechSynthesis.speak(u);
          read_me(d);
          console.log(d);
          }, 1000)
        });
      });
}

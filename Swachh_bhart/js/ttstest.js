// JSON files using d3.
     
    // var x;
    // d3.json("speak.json", function(person) {
    // x = person
    // });

    // d3.select("body").transition()
    // .style("background-color", "silver");

    // d3.select("body").selectAll("div").transition()
    // .style("color", "blue");

    // functions.

function buttonSay_Clicked()
{
    var inputThingsToSay = document.getElementById
    
    (
        "inputThingsToSay"
    );

    var inputPitch = document.getElementById("inputPitch");
    var inputSpeed = document.getElementById("inputSpeed");
 
    var pitch = parseFloat(inputPitch.value);
    var speed = parseFloat(inputSpeed.value);
    var thingsToSay = inputThingsToSay.value;
    
    var voice = new Voice
    (
        "Default", 
        pitch, 
        speed
    );  
    voice.say(thingsToSay);
    // voice.say(x.person[0].birth);
    
}   
 
// classes 
function Voice(name, pitch, speed)
{
    
    this.name = name;
    this.pitch = (pitch == null ? 1 : pitch);
    this.speed = (speed == null ? 1 : speed);
 
    this.systemUtterance = new SpeechSynthesisUtterance();
    this.systemUtterance.onend = this.say_Ended.bind(this);
}
{
    // instance methods
 
    Voice.prototype.say = function(thingToSay, x, callback, contextForCallback)
    {
        this.callback = callback;
        this.contextForCallback = contextForCallback;
 
        this.isSpeaking = true;
 
        var voices = Voice.systemVoiceLookup;
         
        var utterance = this.systemUtterance;
        utterance.text = thingToSay;
        utterance.pitch = this.pitch;
        utterance.rate = this.speed; 
        window.speechSynthesis.speak(utterance);
        
    }
 
    Voice.prototype.say_Ended = function()
    {
        this.isSpeaking = false;
        if (this.callback != null)
        {
            this.callback.call(this.contextForCallback);
        }
   
    }
 
}

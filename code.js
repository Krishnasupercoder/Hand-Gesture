Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality: 90
});
camera= document.getElementById("webcam");
Webcam.attach('#webcam');
function Take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("captured_image").innerHTML="<img id='output' src="+data_uri+">";
    });
}
console.log("ml5 version",ml5.version);
classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/y_ZbExtPd/model.json",modeLoaded);
function modeLoaded(){
    console.log("modeLoaded");
}
prediction1="";
prediction2="";
function speak(){
    synth =window.speechSynthesis;
    speak_data="The first prediction is "+prediction1 +"and the second prediction is"+prediction2;
    utterThis= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis); 
}
function identify(){
img= document.getElementById("output");
classifier.classify(img,gotresults);
}
function gotresults(error,results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    document.getElementById("hand_gesture_name").innerHTML=results[0].label;
    
    prediction1= results[0].label;
    

    speak();

    if(prediction1=="amazing"){
        document.getElementById("emoji_1").innerHTML="&#128076;";
    }
    if(prediction1=="victory"){
        document.getElementById("emoji_1").innerHTML="&#9996;";
    }
    if(prediction1=="best"){
        document.getElementById("emoji_1").innerHTML="&#128077;";
    }
    
}
}
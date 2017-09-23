

$(document).ready(function(){
  
})

  var config = {
    apiKey: "AIzaSyDpHwud3u3Py5Cfu2ot-MVCmFi60mEMLc4",
    authDomain: "fir-homework-38b34.firebaseapp.com",
    databaseURL: "https://fir-homework-38b34.firebaseio.com",
    projectId: "fir-homework-38b34",
    storageBucket: "fir-homework-38b34.appspot.com",
    messagingSenderId: "302190075026"
  };
  firebase.initializeApp(config);
  

var database = firebase.database();

$("#add-train-button").on("click", function(event) {
  
  event.preventDefault();

  var trainName = $("#train-name").val().trim();
  var destination = $("#dest-input").val().trim();
  var firstDep = $("#first-depart").val().trim();
  var frequency = $("#freq").val().trim();
  var nextArrival = moment().add(frequency,'minutes').format("HH:mm");
  var minutesAway = moment(nextArrival, "HH:mm").subtract(frequency,'minutes').format("mm");

  var train = {
    train: trainName,
    dest: destination,
    first: firstDep,
    freq: frequency,
    next: nextArrival,
    minAway: minutesAway
  };

  database.ref().push(train);

  $("#train-name").val("");
  $("#dest-input").val("");
  $("#first-depart").val("");
  $("#freq").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  $("#schedule-head").text("Local Train Schedule (" + moment().format("HH:mm") + ")");
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().train;
  var destination = childSnapshot.val().dest;
  var firstDepart = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;


  var firstTrainDeparture = moment(firstDepart, 'HH:mm').format("HH:mm");
  console.log("first train pretty " + firstTrainDeparture);

 
  var diffTime = moment().diff(moment(firstDepart,"HH:mm"),"minutes");
  
  var remaining = diffTime % frequency;
  
  var minNextTrain = frequency-remaining;
 
  var nextArrival = moment().add(minNextTrain,'minutes').format("HH:mm");
 
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  firstTrainDeparture + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minNextTrain + "</td></tr>");
});


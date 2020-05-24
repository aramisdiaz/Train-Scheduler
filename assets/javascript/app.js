$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyAwId9lhyjwUyGv5ln_yxRuMycXukUus_s",
        authDomain: "testproject-ccd1d.firebaseapp.com",
        databaseURL: "https://testproject-ccd1d.firebaseio.com",
        storageBucket: "testproject-ccd1d.appspot.com"
      };
    firebase.initializeApp(config);


    var database = firebase.database();


    var trainName;
    var destination;
    var firstTrain;
    var frequency = 0;

    $("#add-train").on("click", function() {
        event.preventDefault();

        trainName = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#first-train").val().trim();
        frequency = $("#frequency").val().trim();


        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset();
    });

    database.ref().on("child_added", function(childSnapshot) {

   
        var newTrain = childSnapshot.val().trainName;
        var newLocation = childSnapshot.val().destination;
        var newFirstTrain = childSnapshot.val().firstTrain;
        var newFreq = childSnapshot.val().frequency;
    

        var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");
    

        var currentTime = moment();
        //console.log(currentTime)



        var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    

        var tRemainder = diffTime % newFreq;
    

        var tMinutesTillTrain = newFreq - tRemainder;
    

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var catchTrain = moment(nextTrain).format("HH:mm");
    


        $("#add-row").append(
            ' <tr><td>' + newTrain +
            ' </td><td>' + newLocation +
            ' </td><td>' + newFreq +
            ' </td><td>' + catchTrain +
            ' </td><td>' + tMinutesTillTrain + ' </td></tr>');;


        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
    });

    
});
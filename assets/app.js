$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBD0GfVUg6yHnYjPnCLNqCT-rMH-ieRSi0",
        authDomain: "timekeeper-b9011.firebaseapp.com",
        databaseURL: "https://timekeeper-b9011.firebaseio.com",
        projectId: "timekeeper-b9011",
        storageBucket: "timekeeper-b9011.appspot.com",
        messagingSenderId: "345547229374"
    };
    firebase.initializeApp(config);


    var database = firebase.database();


    $("#submit-button").on("click", function (event) {
        event.preventDefault();
        //grab user input
        var trainName = $("#inputName").val().trim();
        var trainDest = $("#inputDestination").val();
        var trainFirst = moment($("#inputTime").val(), "HH:mm").format("X");
        var trainFreq = $("#inputFrequency").val();

        console.log(trainName);
        // creates local 'temporary' object for holding employee data
        var newTrain = {
            name: trainName,
            destination: trainDest,
            firstTrainTime: trainFirst,
            frequency: trainFreq

        };
        console.log(newTrain);
        database.ref().push(newTrain)
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrainTime);
        console.log(newTrain.frequency);

        alert("train time added successfully")

        //clears the form
        $("#inputName").val("")
        $("#inputDestination").val("")
        $("#inputTime").val("")
        $("#inputFrequency").val("")
    });
    // CREATES FIREBASE EVENT TO ADD EMPLOYEES TO DATABASE
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var trainFirst = childSnapshot.val().firstTrainTime;
        var trainFreq = childSnapshot.val().frequency;


        //Prettify   EMPLOYEE START
        var tFrequency = 15;

        // Time is 3:30 AM
        var firstTime = "03:30";

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment("03:30", "HH:mm");
        // console.log('firstTimeConverted', firstTimeConverted);

        // var firstTimeConverted = moment(firstTime).format("hh:mm")
        // console.log('firstTimeConverted', firstTimeConverted);


        // // Current Time
        var currentTime = moment().format("hh:mm")
        console.log("CURRENT TIME: " + currentTime);

        // // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // // // Time apart (remainder)
        // // 7 / 3  = 2.333333

        // // 7 % 3 = 1

        var tRemainder = diffTime % tFrequency;
        console.log('Our remainder!!', tRemainder);

        // // // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        var newRow = $("<tr>").append(
            $('<td>').text(trainName),
            $('<td>').text(trainDest),
            $('<td>').text(trainFirst),
            $('<td>').text(trainFreq),
            $('<td>').text(tMinutesTillTrain)
        );

        console.log(newRow)
        $(".table").append(newRow);
    });
})

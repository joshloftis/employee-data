var config = {
  apiKey: "AIzaSyAwdjQgKrqZ3Rn0pOGIFeriSXaKxp0HlfU",
  authDomain: "employee-data-41e88.firebaseapp.com",
  databaseURL: "https://employee-data-41e88.firebaseio.com",
  projectId: "employee-data-41e88",
  storageBucket: "employee-data-41e88.appspot.com",
  messagingSenderId: "1037727084412"
};
firebase.initializeApp(config);

var database = firebase.database();
var name = "";
var role = "";
var start = "";
var monRate = ""; //note parseInt this var

$("#submit-button").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  name = $("#name").val().trim();
  role = $("#role").val().trim();
  start = $("#startdate").val().trim();
  monRate = $("#monthlyrate").val().trim();

  // Code for handling the push
  database.ref().push({
    name: name,
    role: role,
    start: start,
    monRate: monRate,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();

  // Console.loging the last user's data
  console.log(sv.name);
  console.log(sv.role);
  console.log(sv.start);
  console.log(sv.monRate);
  console.log(sv.dateAdded);

  // Change the HTML to reflect
  $("#name").text(sv.name);
  $("#role").text(sv.role);
  $("#startdate").text(sv.start);
  $("#monthlyrate").text(sv.monRate);

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

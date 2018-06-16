// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p id='"+data[i]._id + "' data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the comments from the note section
  $("#comments").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      // console.log(data);
      // The title of the article
      $("#comments").append("<h4>" + data.title + "</h4>");
      // A textarea to add a new note body
      $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#comments").append("<button class='btn btn-primary' data-id='" + data._id + "' id='savecomment'>Save Comment</button>");
      
      // If there's a note in the article
      if (data.comment) {
        // Place the body of the note in the body textarea
        // $("#bodyinput").val(data.comment.body);
        var userComment = $("<div>").text(data.comment.body)
        $("#"+ thisId).append(userComment);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savecomment", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      // Value taken from note textarea
      body: $("#bodyinput").val(),
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the comments section
      $("#comments").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#bodyinput").val("");
});

$('#comments').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})
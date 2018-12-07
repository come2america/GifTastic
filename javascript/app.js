//make array of genres and make buttons
var topics = ["pop music", "rap music", "country music"]
function makebuttons() {
  $("#topic-view").empty();

  for (var i = 0; i < topics.length; i++) {
    $("#topic-view").append("<button class='topicbtn' data-index = '" + topics[i] + "'>" + topics[i] + "</button>")
  }
}
//click add genre and add user input to array


$("#newgenre").on("click", function () {

  event.preventDefault();
  topics.push($("#genre-input").val())

  makebuttons();
})
makebuttons();
//click genre button and log name
function displaygif() {
  var genreclick = $(this).attr("data-index");
  var apikey = "7yn3Gabn0tV3wVegCwNyfuz1Bnknx9Nm"
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + genreclick + " &api_key=" + apikey + "&limit=10"
  console.log(genreclick)
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    for (var y = 0; y < response.data.length; y++) {
      var gifindex = response.data[y]
      var gifurl = gifindex.images.original_still.url
      var moving = gifindex.images.original.url
      var rating= $("<p>" +gifindex.rating + "</p>")
      var urlimg = $("<img>")



      urlimg.attr({
        src: gifurl,
        "data-still": gifurl,
        "data-animate": moving,

        "data-state": "still",
        class: "gif "
      });
      console.log(gifurl)
      $("#gif-view").append(urlimg)
      $("#gif-view").append(rating)


    }
    $(".gif").on("click", function () {
      var state = $(this).attr("data-state");
      console.log(state)
      var stillimg = $(this).attr("data-still")
      var animeimg = $(this).attr("data-animate");
      if (state === "still") {
        $(this).attr({
          src: animeimg,
      "data-state":"animate"
        })
      }
      else {
        $(this).attr({
          src: stillimg,
        "data-state": "still"
        })
      }

    })
 })
    $("#gif-view").empty()


    //end display          
 
}

$(document).on("click", ".topicbtn", displaygif)
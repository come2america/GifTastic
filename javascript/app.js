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

  var addTenGifBtn = $('#moregifs');
  addTenGifBtn.attr('data-index', genreclick);


  var apikey = "7yn3Gabn0tV3wVegCwNyfuz1Bnknx9Nm"
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + genreclick + " &api_key=" + apikey + "&limit=10"
  console.log(genreclick)
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    function caller() {
      console.log(response)
      for (var y = 0; y < response.data.length; y++) {
        var gifindex = response.data[y]
        var gifurl = gifindex.images.original_still.url
        var moving = gifindex.images.original.url
        var rating = $("<p>" + gifindex.rating + "</p>")
        var urlimg = $("<img>")

        urlimg.attr({
          src: gifurl,
          "data-still": gifurl,
          "data-animate": moving,

          "data-state": "still",
          class: "gif",
        });
        console.log(gifurl)
        $("#gif-view").prepend(urlimg)
        $("#gif-view").prepend(rating)

      }
    }

    caller(response);
 
    
  })

  $("#gif-view").empty()
}
function gifclick() {
  var state = $(this).attr("data-state");
  console.log(state)
  var stillimg = $(this).attr("data-still")
  var animeimg = $(this).attr("data-animate");
  if (state === "still") {
    $(this).attr({
      src: animeimg,
      "data-state": "animate"
    })
  }
  else {
    $(this).attr({
      src: stillimg,
      "data-state": "still"

    })
  }
}
// requestCallback.addCallbackToQueue(true, function(){
 gifclick()
$("#moregifs").on("click", function () {
  var genreclick = $(this).attr("data-index");
  console.log(genreclick);

  console.log(genreclick)
  var limit = []
  for (var t =0; t < limit.length; t++) {
    limit++
  }
  var apikey = "7yn3Gabn0tV3wVegCwNyfuz1Bnknx9Nm"
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + genreclick + " &api_key=" + apikey + "&limit=" + limit[t]


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (result) {
    function caller2() {
      console.log(result)
      for (var z = 0; z < result.data.length; z++) {
        var ngifindex = result.data[z]
        var ngifurl = ngifindex.images.original_still.url
        var nmoving = ngifindex.images.original.url
        var nrating = $("<p>" + ngifindex.rating + "</p>")
        var nurlimg = $("<img>")

        nurlimg.attr({
          src: ngifurl,
          "data-still": ngifurl,
          "data-animate": nmoving,

          "data-state": "still",
          class: "gif ",
        });
        console.log(ngifurl)
        $("#gif-view").append(nurlimg)
        $("#gif-view").append(nrating)

      }
 
    }
  
    caller2(result);

    $(".gif").on("click", function () {

      

      gifclick()
    })

})
 $("#gif-view").empty() 
  
 })



//end display           


$(document).on("click", ".topicbtn", displaygif)


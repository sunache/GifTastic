$(document).ready(function () {
    var people = ["Obama", "Mr Bean", "Iron Man", "Jackie Chan"];

    function displayGifs() {
        var person = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var personImage = $("<img animatedSrc = '" + results[i].images.fixed_height.url + "' stillSrc = '" + results[i].images.fixed_height_still.url + "'src='" + results[i].images.fixed_height_still.url + "'>");
                // personImage.attr("src", results[i].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(personImage);
                $("#display-gifs").prepend(gifDiv);
            }
        }
        });
        
    }
    
function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < people.length; i++) {
        var a = $("<button>");
        a.addClass("gif-btn");
        a.attr("data-name", people[i]);
        a.text(people[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var person = $("#gif-input").val().trim();
    people.push(person);
    renderButtons();
});

    $(document).on("click", ".gif-btn", displayGifs);
    renderButtons();
    
$(document.body).on("click", "img", function() { 
        var isAnimated = $(this).attr("isAnimated");
        if(isAnimated==null || isAnimated=='' ){
          isAnimated =  "false";
        }

        if(isAnimated=="true"){
          $(this).attr("src",  $(this).attr("stillSrc") );
          $(this).attr("isAnimated", "false");

        } else {
          $(this).attr("src",  $(this).attr("animatedSrc") );
          $(this).attr("isAnimated", "true");
        }
    });



});
// alert("hey");

var apiKey   = "sTUmiA5WacmErKjv2P86ngZcOXU3AaLQ";
var imgAnimate = [];
var imgStill = [];
var animals = [
    'cats', 'dog', 'bird', "chicken", "eagle"
    ];

      // Initial array of movies
    //   var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

      // Generic function for capturing the movie name from the data-attribute
function requestAnimalGiphy() {

  $(".animal").on("click", function(){
      var animal = $(this).attr("data-name");

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);

      $.ajax({
          url:    queryURL,
          method: 'GET'
      }).done(function(response){
          var results = response.data;
          console.log(results);

          for (var i = 0; i < results.length; i++) {
              var giphyDiv = $('<div class="col-sm-3"></div>');

              var rating = results[i].rating;

              // var p = $("<p>").text("Rating: " + rating);
              var animateScr = results[i].images.fixed_height.url ;
              console.log(animateScr + "animate")
              var stillScr = results[i].images.fixed_height_still.url;
              console.log(stillScr + "Still");
              imgAnimate.push(animateScr);
              imgStill.push(stillScr);
              var animalGiphyImage = $("<img>");
              animalGiphyImage.attr("class", "giphy");
              animalGiphyImage.attr("src", animateScr);
              animalGiphyImage.attr("data-state", "animate");
              // gifDiv.prepend(p);
              giphyDiv.prepend(animalGiphyImage);

              $("#gifs-appear-here").prepend(giphyDiv);
            }
      });
  });
  }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $('<button type="button" class="btn btn-lg btn-primary"> </button>');
          // Adding a class
          a.addClass("animal");
          // Added a data-attribute
          a.attr("data-name", animals[i]);
          // Provided the initial button text
          a.text(animals[i]);
        //   console.log(a);
          // Added the button to the HTML
          $("#buttons-view").append(a);
        }
      }

    //   This function handles events where one button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // The movie from the textbox is then added to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // function handles events where giphy is clicked
      // defualt giphy status animate
      function pauseUnpauseGiphy(){
        
        $(".giphy").on("click",function(){
          // alert("i have been clicked")
           var still = $(this).attr("data-state")
          // check if giphy paused or unpaused 
          if(still === "still"){
            $(this).attr('src', imgAnimate )
            $(this).attr("data-state", "animate")

          } else{
            $(this).attr('src', imgStill )
            $(this).attr("data-state", "still")

          }
        });
      }

      $(document).on("click", ".giphy", pauseUnpauseGiphy);

      
       

      // Function for displaying the animal info
      // We're adding a click event listener to all elements with the class "animal"
      // We're adding the event listener to the document itself because it will
      // work for dynamically generated elements
      // $(".animal").on("click") will only add listeners to elements that are on the page at that time
      $(document).on("click", ".animal", requestAnimalGiphy);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

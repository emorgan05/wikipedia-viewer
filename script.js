function loadData() {
  var $wikiElem = $("#wikiElem");
  var searchTerm = $("#searchbox").val();
  var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&namespace=0&format=json&formatversion=2&callback=wikiCallback&origin=*";
  
  // clear past data
  $wikiElem.empty();
  
  // make a request
  $.ajax({
    url: wikiUrl,
    type: "GET",
    dataType: "jsonp",
    success: function(response) {
      // first array in the response is a list of article titles
      var articleList = response[1];
      // second array in the response has a brief description
      var description = response[2];
      
      /* loop through each of the article titles, and create a listing that includes a title, link, and description */
      for (var i = 0; i < articleList.length; i++) {
        var articleStr = articleList[i];
        var descriptionStr = description[i];
        var url = "http://en.wikipedia.org/wiki/" + articleStr;
        console.log(url);
        
        $wikiElem.append(
          "<div class='container' id='result'>" 
          + "<a href='" + url + "' target='_blank'><h4>" + articleStr + "</h4></a>"
          + "<p>" + descriptionStr + "</p>"
          + "</div>"
        );
      };
    }
  });
  
  // clear the search box
  function clearField() {
    document.getElementById("searchbox").value = "";
  };
  
  clearField();
  return false;
};

// load on hitting enter or clicking the submit button
$("#form-container").submit(loadData);
$("#submit").keypress(function(){
  if(event.which == 13) {
    loadData();
  }
});

let urlId, page, concatUrl;

$(function() {
  page = window.location.pathname.split('/')[1];
  urlId = window.location.pathname.split('/')[2];
  console.log(window.location.pathname.split('/')[0])
  if (urlId) {
    concatUrl = '/headline/' + urlId;
  } else {
    concatUrl = '/headline';
  }
    console.log(concatUrl);
    fetchJson(concatUrl);
});

fetchJson = (url) => {
  $.get(url,
    function(data) {
      if (data.result.date) {
        $('#date').text(data.result.date);
        console.log(data.result.date);
      }
      if (!data.result.note) {
        $('#updatenote').text('Create Note');
      }
    });
}

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/notes/" + urlId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      console.log(data);
    });

    location.reload(true);
});

// When you click the savenote button
$(document).on("click", "#deletenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "DELETE",
    url: "/notes/" + urlId + "/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
  location.reload(true);
});
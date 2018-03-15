let urlId, page, concatUrl;

$(function() {
  page = window.location.pathname.split('/')[1];
  urlId = window.location.pathname.split('/')[2];
  if (urlId) {
    concatUrl = urlId;
  } else {
    concatUrl = page + 'Json';
  }
  if (page === 'saved') {
  fetchJson(concatUrl)
  }
});

fetchJson = (url) => {
  $.get(url,
    function(data) {
      // if (data.result.date) {
      //   $('#date').text(data.result.date);
      //   console.log(data.result.date);
      // }
      // if (!data.result.note) {
      //   $('#updatenote').text('Create Note');
      // }
        if (page === 'saved') {
        let html = "<h4 class='display-4'>Saved Headlines</h4>";
        for (let i = 0; i < data.result.length; i++) {
          if (data.result) {
          html += "<div class='card mb-3'>";
          html += "<h5 class='card-header'></h5>";
          html += "<div class='card-body'>";
          html += "<h5 class='card-title'>" + data.result[i].title + "</h5>";
          html += "<p class='card-text'><a href='" + data.result[i].link + "'>" + data.result[i].link +"</a></p>";
          html += "<button id='" + data.result[i]._id + "' class='btn btn-dark float-right' onClick='removeSaved(this.id)'>Remove Saved</button>";
          if (data.result[i].note) {          
            html += "</div><h5 class='card-header'></h5><div class='card-body'>";
            html += "<h5 class='card-title'>" + data.result[i].note.title + "</h5>";
            html += "<p class='card-text'>" + data.result[i].note.body + "</p>"; 
            html += "<button id='updatenote' class='btn btn-warning' type='button' data-toggle='collapse' data-target='#collapse" + data.result[i]._id + "' aria-expanded='false' aria-controls='collapseExample'>Update</button>";

            html += "<div class='collapse' id='collapse" + data.result[i]._id + "'><div class='card-body'>";
            html += "<div class='form-row'><label for='titleinput'>Title:</label>";
            html += "<input class='form-control' type='text' id='titleinput" + data.result[i].note._id + "' value='" + data.result[i].note.title + "'>";
            html += "</div><div class='form-row'><label for='bodyinput'>Note:</label>";
            html += "<input class='form-control' type='text' id='bodyinput" + data.result[i].note._id + "' value='" + data.result[i].note.body + "'>";
            html += "</div><br /><div class='form-row'>";
            html += "<button id='" + data.result[i]._id + "' class='btn btn-dark' onClick='updateNote(this.id)'>Update Note</button>&nbsp";
            html += "<button id='" + data.result[i]._id + "' class='btn btn-dark float-right' onClick='deleteNote(this.id)'>Delete Note</button></div></div></div>";                 
            }            
            html += "</div></div>";
          }
        }
        $("#root").html(html);
      }
    });
}

removeSaved = (id) => {
  $.ajax({
    method: "POST",
    url: "/headline/" + id + "/false",
  }).then(function(data) {
    console.log(data);
  });
  location.reload(true);
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

$(document).on("click", "#saveheadline", function(e) {
  e.preventDefault();
  let thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/headlines/" + thisId,
    data: {
      saved: true
    }
  })
  location.reload(true);
});

$(document).on("click", "#deleteheadline", function(e) {
  e.preventDefault();
  let thisId = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/headlines/" + thisId
  })
  location.reload(true);
});

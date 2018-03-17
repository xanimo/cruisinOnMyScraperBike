let urlId, page, concatUrl, user;

$(function() {
  length_url = window.location.pathname.split('/').length;

  console.log(length_url);

  if (length_url >= 1) {
      //localhost:8000/{page}
      page = window.location.pathname.split('/')[1];
      if (length_url >= 2) {
      urlId = window.location.pathname.split('/')[2];
          if (urlId) {
            concatUrl = urlId;
          } else {
          concatUrl = page + 'Json';
          }
          //switch (case)
          switch (page) {
            //if (page === 'saved')
            case 'saved':
                // fetch saved headlines
                fetchJson(concatUrl)
              break;
            case 'account':
                // grab user id for client side fetch
                let uid = $('#uid').val();
                console.log(uid);
                // client side fetch
                getUser('user', uid);  
              break;
            case 'search':
                // 
          }
      }
  }



});

fetchJson = (url) => {
  $.get(url,
    function(data) {
      console.log(data)
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
            html += "<a href='headlines/" + data.result[i]._id + "' class='btn btn-primary'>Update</a>";
            // html += "<button class='btn btn-warning' type='button' data-toggle='collapse' data-target='#collapse" + data.result[i]._id + "' aria-expanded='false' aria-controls='collapseExample'>Update</button>";
            html += "<div class='collapse' id='collapse" + data.result[i]._id + "'><div class='card-body'>";
            html += "<div class='form-row'><label for='titleinput'>Title:</label>";
            html += "<input class='form-control' type='text' id='titleinput" + data.result[i].note._id + "' value='" + data.result[i].note.title + "'>";
            html += "</div><div class='form-row'><label for='bodyinput'>Note:</label>";
            html += "<input class='form-control' type='text' id='bodyinput" + data.result[i].note._id + "' value='" + data.result[i].note.body + "'>";
            html += "</div><br /><div class='form-row'>";
            html += "<button id='updatenote' data-id='" + data.result[i]._id + "' class='btn btn-dark' onClick='location.reload(true);'>Update Note</button>&nbsp";
            html += "<button id='deletenote' data-id='" + data.result[i]._id + "' class='btn btn-dark float-right'>Delete Note</button></div></div></div>";                 
            } else {
              html += "<a href='headlines/" + data.result[i]._id + "' class='btn btn-primary'>Update</a>";
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
  }).then(data => {
    console.log(data);
  });
  location.reload(true);
}

getUser = (url, id) => {
  if (id) {
    url = 'user/' + id;
  }
  $.ajax({
    method: "GET",
    url: url, 
  }).then(data => {
    console.log(data)
    let html = "";
    html += "<h5>Welcome back ";
    html += data.firstname + " " + data.lastname + "</h1>";
    html += "<small>Last login: ";
    html += "" + localDate(data.last_login) + "</small>";
    html += "<hr />";
    $('#root').html(html);

    let tr = "";
    tr += "<td>" + data._id + "</td>";
    tr += "<td>" + data.firstname + " " + data.lastname + "</td>";
    tr += "<td>" + data.email + "</td>";
    $('#contact > tr').html(tr);
  })
}

localDate = (date) => {
  let d = new Date(date);
  d.toLocaleDateString('en-US');
  console.log(d);
  return d;
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

$(document).on("click", "#scrape", function(e) {
  e.preventDefault();
  let thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/fetch/" + thisId
  })
  .then(result => {
    console.log(result);
    location.reload(true);
  });
});

$(function () {
  // *------------- Get fetch --------------*/

  function creatingCards(data) {
    let count = 0;
    let div = $(`<div class="row" ></div>`);
    data.forEach((element) => {
      let card = $(`
        <div class="col-md-3 col-sm-6 p-3">
          <div class="card" style="width: 18rem; height:23rem">
            <img src="${element["videoThumbnails"][2]["url"]}" class="card-img-top" alt="No Image">
            <div class="card-body">
              <h6 class="card-title">${element["title"]}</h6>
              <label>Video ID</label>
              <h6 class ="videoID">${element["videoId"]}<h6>
            </div>
          </div>
        </div>`);
    
      
      if (count < 4) {
        div.append(card);
        $("#cardBox").append(div);
        count++;
      } else {
        count = 0;
      }

      // $("#cardBox").append(card);
    });
  }

  function playMusic(musicData) {
    console.log(musicData);
    let musicNav = `
    <div class="navbar">
        <nav class="navbar fixed-bottom bg-dark">
          <div class="container-fluid">
            <img src="${musicData["thumbnail"]}" alt="No Image" height=50 width=50 > 
            <h6>${musicData["title"]}</h6>
            <audio controls autoplay>
              <source src="${musicData["url"]}" type="audio/webm">
              Your browser does not support the audio element.
            </audio>
          </div>
        </nav>
      </div>`;

    $("#bottomPlayer").html(musicNav);
  }

  function getVideoLink(data) {
    $(".card").click(function () {
      let videoID = $(this).find(".videoID").text();

      // *------------- Getting the data about individual videos --------------*/
      $.get(
        "https://vid.puffyan.us/api/v1/videos/" + videoID,
        function (vidData) {
          let currentVid = {
            title: vidData["title"],
            thumbnail: vidData["videoThumbnails"][3]["url"],
            url: vidData["adaptiveFormats"][4]["url"],
          };

          playMusic(currentVid);
        }
      );
    });
  }

  $.get(
    "https://vid.puffyan.us/api/v1/trending?type=Music&region=IN",
    function (data) {
      console.log(data);
      creatingCards(data);
      getVideoLink();
    }
  );
});

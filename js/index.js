const main = 'https://wrapapi.com/use/sethxd/image/upcoming/1.0.0?wrapAPIKey=VoHD9VlDYG3OWYRWE5IMV57qw9Hs3vmR';
let month, year, date, html = "";

function alpha(a,b) {
  if (a.title < b.title)
    return -1;
  else if (a.title > b.title)
    return 1;
  else
    return 0;
}

$('.trades-check').on("change", function() {
  if ($('.trades-check').is(':checked')) {
    $('.single').addClass('hidden');
  } else {
    $('.single').removeClass('hidden');
  }
})

$(function(){
  $("#datepicker").pickadate({
    disable: [
      1, 2, 3, 5, 6, 7
    ],
    format: 'mm/dd/yyyy'
});

$('#datepicker').focus(function() {
  $(this).blur();
})

  $("#datepicker").on("change",function(){
        html = "";
        $(".upcoming-comics").html("<i class='fa fa-spinner fa-spin'></i>&nbsp;&nbsp;&nbsp;Loading...");
        date = $(this).val();
        if (date.charAt(0) === "0") {
          month = date.charAt(1);
        } else {
          month = date.slice(0,2);
        };
        year = date.slice(6,10);
        let url = main + "&year=" + year + "&month=" + month;

    $.getJSON(url, function(json) {
      let books = json.data.book;
      books = books.sort(alpha);
      console.log(books);
      books.map(function(x) {
        let formatDate = moment(x.date).format("MM/DD/YYYY");
        let lastTwo = x.title.charAt(x.title.length - 2) + x.title.charAt(x.title.length-2+1);
        lastTwo = lastTwo.toLowerCase();
        let writer, artist, cover = "";
        x.writer ? writer = x.writer : writer = "Unknown";
        x.artist ? artist = x.artist : artist = "Unknown";
        x.cover ? cover = x.cover : cover = "Unknown";
        if (formatDate == date || moment(formatDate).add('days', 1) === date || moment(formatDate).subtract('days', 1) === date) {
          if (lastTwo == "tp" || lastTwo == "hc") {
          html += '<div style="background: url(' + x.img + ')" class="flex-item collected"><div class="caption"><p><span class="title"><a target="blank" href="https://imagecomics.com' + x.url + '"><strong>' + x.title + '</strong></a></span><br>' + x.date + '<br>W: ' + writer + '<br>A: ' + artist + '<br>C: ' + cover + '</p></div></div>';
          } else {
            html += '<div style="background: url(' + x.img + ')" class="flex-item single"><div class="caption"><p><span class="title"><a target="blank" href="https://imagecomics.com' + x.url + '"><strong>' + x.title + '</strong></a></span><br>' + x.date + '<br>W: ' + writer + '<br>A: ' + artist + '<br>C: ' + cover + '</p></div></div>';
          }
        }
      })
      if (html !== "") {
        $(".upcoming-comics").html(html);
      } else {
        $(".upcoming-comics").html("Sorry, no results found.");
      }
      if ($('.trades-check').is(':checked')) {
        $('.single').addClass('hidden');
      }
    })
    });
});

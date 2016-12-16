function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ',' + cityStr;

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetviewUrl = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + address + '';

    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    var nytimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytimesUrl += '?' + $.param({
        'api-key': "5bf21c88cf7747d0b8a94faeb3fa8aac",
        'q': cityStr,
        'sort': 'newest'
    });

    $nytHeaderElem.text('New York Times Articles about ' + cityStr);

    $.getJSON(nytimesUrl, function(data) {
            articles = data.response.docs;

            for (i = 0; i < articles.length; i++) {
                var article = articles[i];
                $nytElem.append('<li class="article">' + '<a href=' + article.web_url + '>' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>')
            }
        })
        .error(function(error) {
            $nytHeaderElem.append(' could not be loaded');
        });

    var wikipediaUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikicallback';

    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text('Failed to get wikipedia resources');
    }, 8000);

    $.ajax({
        url: wikipediaUrl,
        dataType: "jsonp",
        done: function(response) {
            var articleList = response[1];
            for (i = 0; i < articleList.length; i++) {
                var articleStr = articleList[i];
                var url = "https://en.wikipedia.org/wiki/" + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };
            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};



$('#form-container').submit(loadData);
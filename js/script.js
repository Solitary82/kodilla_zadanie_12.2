$(document).ready(function() {
    var author;
    var quote;
    var tweetText;
    var tweet;
    var tweetLink = "https://twitter.com/intent/tweet?text=";
    var getURL = "https://api.forismatic.com/api/1.0/";

    function getNewQuote() {
        $.ajax ({
            url: getURL, 
            jsonp: 'jsonp',
            dataType: 'jsonp',
            data: {
                method: 'getQuote',
                lang: 'en',
                format: 'jsonp'
            },
            success: function createTweet(response) {
                author = response.quoteAuthor;
                quote = response.quoteText;
                var noAuthor = 'Unknown';
                var displayAuthor = author || noAuthor;
                tweetText = "Quote of the day - " + quote + " Author: " + displayAuthor ;
                tweet = tweetLink + encodeURIComponent(tweetText);
                if (tweetText.lenght > 140) {
                    getNewQuote();
                } else {
                    $('.quote').text(quote);
                    if (author) {
                        $('.author').text(author);
                    } else {
                        $('.author').text(noAuthor);
                    }
                    $('.tweet').attr('href', tweet);
                }
            }
        });
        $.ajaxSetup({ 
            cache: false 
        });
    }
    getNewQuote();
    $('.trigger').on('click', function() {
       getNewQuote(); 
    });
    $('.tweeter').on('click', function() {
        tweet = tweetLink + encodeURIComponent(tweetText);
        window.open(tweet); 
    });
});

        

       
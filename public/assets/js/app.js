$(function() {
    $(document).on("click", "#scrapeBtn", function(){
        $.ajax({
            method: "POST",
            url: "/scrape",
            data: {
                url: "http://www.echojs.com/"
            }
          }).then(function(response) {
            
          });
    });
});
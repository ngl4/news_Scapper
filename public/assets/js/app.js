$(function() {
    $(document).on("click", "#scrapeBtn", function(){
        $.ajax({
            method: "GET",
            url: "/scrape"
          }).then(function(response) {
            console.log(response);            
          });
    });
});
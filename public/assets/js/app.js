$(function () {
    $(document).on("click", "#scrapeBtn", function () {
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(function (response) {
            console.log(response);

            var resultsDiv = $("<div>");
            resultsDiv.addClass("card-panel white")

            response.forEach(function (elem) {

                var title = $("<h5>");
                title.text(elem.title);
                resultsDiv.append(title);

                var link = $("<a>");
                link.attr("href", elem.link);
                link.attr("target", "_blank");
                link.text("Read more");
                resultsDiv.append(link);

                var savedBtn = $("<button>")
                savedBtn.addClass("waves-effect waves-light btn red");
                savedBtn.attr("style", "margin-left: 10px; margin-bottom: 20px");
                savedBtn.attr("id", "savedBtn")
                savedBtn.text("Save Article")
                resultsDiv.append(savedBtn);

                resultsDiv.append("<hr>");

            });
            $("#displayResults").append(resultsDiv);
        });
    });

    $(document).on("click", "#savedBtn", function () {
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(function (response) {


        });

    });

});
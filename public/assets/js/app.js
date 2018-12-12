$(function () {
    $(document).on("click", "#scrapeBtn", function () {
        $("#noArticleNotice").hide();
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(function (response) {

            console.log(response);

            $.ajax({
                method: "GET",
                url: "/articles"
            }).then(function (response) {

                console.log(response);

                var resultsDiv = $("<div>");
                resultsDiv.addClass("card-panel white row");

                var table = $("<table class='striped responsive-table'>");
                    var tableHead =$("<thead>");
                    var tableFirstRow = $("<tr>");
                    var tableTitleHead = $("<th class='center-align'>");
                    tableTitleHead.html("<h5><strong>Today Scrapped Articles</strong></h5>")
                    var tableButtonHead = $("<th>");

                    tableFirstRow.append(tableTitleHead);
                    tableFirstRow.append(tableButtonHead);
                    tableHead.append(tableFirstRow);
                    table.append(tableHead);
                    
                
                    var tableBody =$("<tbody>");

                
                response.forEach(function (elem) {
 
                    var newRow = $("<tr>");
                    var newRowTitle = $("<td>");
                    newRowTitle.addClass("col s10");
                    newRowTitle.html("<h6><strong>" + elem.title + "</strong></h6>");

                    var link = $("<a>");
                    link.attr("href", elem.link);
                    link.attr("target", "_blank");
                    link.text("Read more");
                    newRowTitle.append(link);

                    var newRowButton = $("<td>");
                    newRowButton.addClass("col s2");

                    var savedBtn = $("<button>")
                    savedBtn.addClass("waves-effect waves-light btn red lighten-2");
                    savedBtn.attr("style", "margin-left: 10px; margin-bottom: 20px; margin-top: 15px");
                    savedBtn.attr("id", "savedBtn");
                    savedBtn.text("Save Article");
                    newRowButton.append(savedBtn);

                    newRow.append(newRowTitle);
                    newRow.append(newRowButton);
                    tableBody.append(newRow);
                    
                    // var titleDiv = $("<div>")
                    // titleDiv.addClass("col s9")

                    // var title = $("<h5>");
                    // title.text(elem.title);
                    // titleDiv.append(title);

                    // var link = $("<a>");
                    // link.attr("href", elem.link);
                    // link.attr("target", "_blank");
                    // link.text("Read more");
                    // titleDiv.append(link);
                    // titleDiv.append("<hr style='opacity:0.2'>");

                    // var buttonDiv = $("<div>");
                    // buttonDiv.addClass("col s2");

                    // var savedBtn = $("<button>")
                    // savedBtn.addClass("waves-effect waves-light btn red");
                    // savedBtn.attr("style", "margin-left: 10px; margin-bottom: 20px");
                    // savedBtn.attr("id", "savedBtn")
                    // savedBtn.text("Save Article")
                    // buttonDiv.append(savedBtn);
                    // buttonDiv.append("<hr style='opacity:0.2'>");


                    // resultsDiv.append(titleDiv);
                    // resultsDiv.append(buttonDiv);


                });

                
                table.append(tableBody)
                resultsDiv.append(table);
                $("#displayResults").append(resultsDiv);
            });
        });
    });

    $(document).on("click", "#savedBtn", function () {

    });

});
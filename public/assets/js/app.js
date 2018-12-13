$(function () {
    // $('.parallax').parallax();
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
                var tableHead = $("<thead>");
                var tableFirstRow = $("<tr>");
                var tableTitleHead = $("<th class='center-align'>");
                tableTitleHead.html("<h5><strong>Today Scrapped Articles</strong></h5>")
                var tableButtonHead = $("<th>");

                tableFirstRow.append(tableTitleHead);
                tableFirstRow.append(tableButtonHead);
                tableHead.append(tableFirstRow);
                table.append(tableHead);


                var tableBody = $("<tbody>");


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
                    savedBtn.attr("data-title", elem.title);
                    savedBtn.attr("data-link", elem.link)
                    savedBtn.text("Save Article");
                    newRowButton.append(savedBtn);

                    newRow.append(newRowTitle);
                    newRow.append(newRowButton);
                    tableBody.append(newRow);
                });


                table.append(tableBody)
                resultsDiv.append(table);
                $("#displayResults").append(resultsDiv);
            });
        });
    });

    $(document).on("click", "#savedBtn", function () {
        var save1Article = $(this).data();
        $.post("/save", save1Article);
    });

    $.get("/savedArticles", function (response) {
        console.log(response);
        // not sure why it is not working
        // if (response === []) {
        //     $("#noSavedArticleNotice").attr("style", "display: block");
        //     $("#displaySavedResults").attr("style", "display: none");


        // } else {
        //     $("#noSavedArticleNotice").attr("style", "display: none");
        //     $("#displaySavedResults").attr("style", "display: block");


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

                var newRowCommentButton = $("<td>");
                newRowCommentButton.addClass("");

                var commentBtn = $("<a>")
                commentBtn.addClass("waves-effect waves-light btn teal lighten-2 modal-trigger");
                commentBtn.attr("id", "commentBtn");
                commentBtn.attr("data-id", elem.id);
                commentBtn.attr("href", "#modal " + elem.id);
                commentBtn.text("Comment");
                newRowCommentButton.append(commentBtn);

                var newRowDeleteBtn = $("<td>");
                newRowDeleteBtn.addClass("");

                var deleteBtn = $("<a>")
                deleteBtn.addClass("waves-effect waves-light btn red lighten-2");
                deleteBtn.attr("id", "deleteBtn");
                deleteBtn.attr("data-id", elem.id);
                deleteBtn.text("Delete");
                newRowDeleteBtn.append(deleteBtn);

                newRow.append(newRowTitle);
                newRow.append(newRowCommentButton);
                newRow.append(newRowDeleteBtn);
                $("#savedResults").append(newRow);
            });
        //}
    });

    $(document).on("click", "#commentBtn", function () {





        //     <div id="modal1" class="modal modal-fixed-footer">
        //     <div class="modal-content">
        //       <h4>Modal Header</h4>
        //       <p>A bunch of text</p>
        //     </div>
        //     <div class="modal-footer">
        //       <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
        //     </div>
        //   </div>

    });

    $(document).on("click", "#deleteBtn", function () {

    });


});
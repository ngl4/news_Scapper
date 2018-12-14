$(document).ready(function () {
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
        if (response.length === 0) {
            console.log('my conditional evaluated to true');
            $("#noSavedArticleNotice").attr("style", "display: block");
            $("#displaySavedResults").attr("style", "display: none");


        } else {
            console.log('my conditional evaluated to false');
            $("#noSavedArticleNotice").attr("style", "display: none");
            $("#displaySavedResults").attr("style", "display: block");

        
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


            //Modal for the Comments Button ******************************************
            var modalDiv = $("<div>");
            modalDiv.attr("id", "modal-" + elem._id);
            modalDiv.addClass("modal modal-fixed-footer");

            var modalContent = $("<div>");
            modalContent.addClass("modal-content");
            var modalheader = $("<h4>");
            modalheader.text("Comment(s)");
            var modalsubheader = $("<h6>");
            modalsubheader.html("Article Name: " + "<u>" + elem.title + "</u>" + "<br>" + "<a href='" + elem.link + "' target='_blank'>Read more</a> <hr>");

            //Display Comments
            var modalDisplayComments = $("<div>");
            modalDisplayComments.attr("id", "displayComments");


            //Input New Comments
            var modalNewComments = $("<div class='row'>");
            var newCommentsHeader = $("<h5> New Comments: </h5> <h6><i>(Click on the line to start typing!)</i></h6>");
            var newCommentsForm = $("<form class='col s12'>");
            var newCommentsSubmitDiv = $("<div class='row right-align'>");
            var titleInputField = $("<div class='input-field col s6'> <input id='titleinput' type='text' data-length='10'> <label for='input_text'>Title of this Comment</label> </div>");
            var textAreaField = $("<div class='input-field col s12'> <textarea id='bodyinput' class='materialize-textarea' data-length='120'></textarea> <label for='textarea2'>Write your Comment Here</label> </div>");
            var submitBtn = $("<button id='submitBtn' class='btn waves-effect waves-light' type='submit' name='action'>Submit<i class='material-icons right'>send</i></button>")
            submitBtn.attr("data-id", elem._id);
            newCommentsSubmitDiv.append(submitBtn);

            newCommentsForm.append(titleInputField);
            newCommentsForm.append(textAreaField);

            modalNewComments.append(newCommentsHeader);
            modalNewComments.append(newCommentsForm);
            modalNewComments.append(newCommentsSubmitDiv);

            var modalFooter = $("<div class='modal-footer'>");
            var closeModal = $("<a href='#!' class='modal-close waves-effect waves-green btn-flat'>Close</a>");
            modalFooter.append(closeModal);

            modalContent.append(modalheader);
            modalContent.append(modalsubheader);
            modalContent.append(modalDisplayComments);
            modalContent.append(modalNewComments);

            modalDiv.append(modalContent);
            modalDiv.append(modalFooter);

            $("#modal").append(modalDiv);
            $(".modal").modal();

            // ^ Modal for the Comments Button ***************************************
            //Modal div must be created before or alongside with the button 
            //(see above section and below section)

            //Comment Button
            var commentBtn = $("<button>")
            commentBtn.addClass("waves-effect waves-light btn teal lighten-2 modal-trigger");
            commentBtn.attr("id", "commentBtn");
            commentBtn.attr("data-id", elem._id);
            commentBtn.attr("data-title", elem.title);
            commentBtn.attr("data-target", "modal-" + elem._id);
            commentBtn.text("Comment");
            newRowCommentButton.append(commentBtn);

            var newRowDeleteBtn = $("<td>");
            newRowDeleteBtn.addClass("");

            //Delete Button 
            var deleteBtn = $("<button>")
            deleteBtn.addClass("waves-effect waves-light btn red lighten-2");
            deleteBtn.attr("id", "deleteBtn");
            deleteBtn.attr("data-id", elem._id);
            deleteBtn.text("Delete");
            newRowDeleteBtn.append(deleteBtn);

            newRow.append(newRowTitle);
            newRow.append(newRowCommentButton);
            newRow.append(newRowDeleteBtn);
            $("#savedResults").append(newRow);
        });
        }
    });


    $(document).on("click", "#submitBtn", function () {
        var news_id = $(this).attr("data-id");

        var commentInput = {
            title: $("#titleinput").val().trim(),
            body: $("#bodyinput").val().trim()
        }

        $.post("/articles/" + news_id, commentInput, function(response){
            $("#titleinput").empty();
            $("#bodyinput").empty();
            window.onload("/saved");
        });
    });



    $(document).on("click", "#deleteBtn", function () {});


});
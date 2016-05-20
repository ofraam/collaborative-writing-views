var significantThreshold = 0.2

var docContent = {
    docName: "Test",

    paragraphs: [
        {
            id: 1,
            text: "Another option that may provide more data is to ask the author to tag the most important 3 paragraphs " +
            "that each of her co-authors should look at. The advantage would be getting more data, the  disadvantage is " +
            "the burden on the author. And it is complementary to the above approach (getting sender recipient judgment).",
            extentChange: 0.3,
            authors: [{name:'Ofra', color:'blue'},{name:'Barbara', color:'green'} ],
            previousText: "Another option that may provide more data is to ask the author to tag the most important 3 paragraphs " +
            "should look at. The advantage would be getting more data, the  disadvantage is " +
            "the burden on the author. And it is complementary to the above approach (getting sender recipient judgment).",
            section: 2,
            new: false,
            edited: true,
            lastAuthor: {name:'Ofra', color:'blue'},
            centrality: 0.3,
            authorProx: 0.4,
            focusProx: 0.2,
            doi :0.25,
            rate: false
        },
        {
            id: 2,
            text: "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
            extentChange: 1.0,
            authors: [{name:'Ofra', color:'blue'}],
            previousText: "",
            section: 2,
            new: true,
            edited: true,
            lastAuthor: {name:'Ofra', color:'blue'},
            centrality: 0.1,
            authorProx: 0.2,
            focusProx: 0.3,
            doi: 0.4,
            rate: true
        }
    ],
}

function displayDocument() {
    // $("#docName").html(docContent.docName);
    var displayHTML = "";
    for (var i=0; i<docContent.paragraphs.length; i++) {
        var currPar = docContent.paragraphs[i];
        displayHTML += '<div data-index="' + i + '">';
        // append current text of paragraph
        if (currPar.new) {
            displayHTML += '<p class="par new">' + currPar.text + '</p>';
        }
        else if (currPar.edited) {
            displayHTML += '<p class="par mod">' + currPar.text + '</p>';
        }
        else {
            displayHTML += '<p>' + currPar.text + '</p>';
        }

        // append details about the current paragraph (authors, changes, etc.) TODO: make collapsible
        if (currPar.edited & !currPar.new) {
            // var infoButtonID = 'infoButton_' + i;
            displayHTML +=  '<p><button class="mdl-button mdl-js-button mdl-button--primary info-button" data-index="' + i +   '">' +
                'More...' +
                '</button></p>';
            // var infoDivID = 'info_' + i;
            // displayHTML += '<div style=' +'display:none'+ ' id=' + infoDivID + '"">'
            displayHTML += '<div class="parInfo"' + ' data-index="' + i + '">'
            displayHTML += '<p >' + "Edited by: " + getAuthors(currPar.authors) + '</p>';
            var prevTextString = "Previous text";
            if (currPar.extentChange > significantThreshold)
                prevTextString += ' (significant changes):';
            else
                prevTextString += ' (minor changes):';

            displayHTML += '<span >' + prevTextString + '</span>';
            displayHTML += '<p >' + currPar.previousText + '</p>';
            displayHTML += '</div>'
        }



        displayHTML += "</div>";
    }


    $("#content").html(displayHTML);
    $(".parInfo").css("display", "none");
    $(".info-button").click(function() {
        showParDetails($(this).attr("data-index"))

    });

    // $(".teammate").mouseenter(function(event) {
    //     $(this).addClass("spotlight");
    //     $(".confidence", this).show()
    // });
    // $(".teammate").mouseleave(function(event) {
    //     $(this).removeClass("spotlight");
    //     $(".confidence", this).hide()
    // });
    //
    // $(".teammate").click(function() {
    //     incrementPopularity($(this).attr("data-index"))
    //
    // });
}

function showParDetails(parIndex) {
    if ($(".info-button[data-index=" + parIndex + "]").text() == "More...") {
        $(".parInfo[data-index=" + parIndex + "]").css("display", "block");
        $(".info-button[data-index=" + parIndex + "]").text('Less...');
    }
    else {
        $(".parInfo[data-index=" + parIndex + "]").css("display", "none");
        $(".info-button[data-index=" + parIndex + "]").text('More...');
    }

}

function getAuthors(authorList) {
    var authorString = '';
    for (var i=0; i<authorList.length; i++) {
        authorString += authorList[i].name
        if (i<authorList.length-1) {
            authorString += ', ';
        }
    }
    return authorString;
}

$(function() {
    displayDocument();
});

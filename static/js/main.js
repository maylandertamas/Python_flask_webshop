function printBoards(dataObject) {
    $('.boards').empty();
    for (var i = 0; i < Object.keys(dataObject.boards).length; i++) {
    $(".boards").append("<div class='col-md-3 board' data-board-id='" + i + "'>" + dataObject.boards[i].title + "</div>");
    }
}

function showCardPage(dataObject) {
    $(document).on("click" , ".board", function(){
        // Hide boards container and show cards container
        $("#boards-container").css({"display": "none"});
        $("#cards-container").css({"display": "block"});

        // Get board id from html data.
        var boardId = $(this).data("board-id");

        // Append cards container with cards
        for (var i = 0; i < Object.keys(dataObject.boards[boardId].cards).length; i++) {
        $("#cards-container").append("<div class='col-md-3 card'>" + dataObject.boards[boardId].cards[i].title + "</div>");
        }
    
    });
}

function addBoard(dataObject) {
     $("#new-board").append("<div class='board-input'><input id='input-field' type='text' placeholder='New board'><span id='add-board-button'> +</span></div>");
     $('#add-board-button').click(function(){

            // Get the new board title from impu.
            var newBoardTitle = $(this).prev().val();

            var newObject =  {
                "id": Object.keys(dataObject.boards).length,
                "title": newBoardTitle,
                "state": "active",
                "cards": []
            }
            dataObject.boards.push(newObject);
            return printBoards(dataObject);
        });
}

function addNewCard(dataObject) {
    $("#cards-container").append("<div class='card-input'><input id='card-input-field' type='text' placeholder='New card'><span id='add-card-button'> +</span></div>");
    $(document).on('click',  '#add-card-button', function() {
        var newCardTitle = $(this).prev().val();
        var boardId = $(this).attr("board-id");
        console.log(boardId);
        /*
         var newObject =  {
                "id": cardIdGenerator(dataObject).toString(),
                "title": newCardTitle,
                "status": "new",
                "order": cardOrderGenerator(dataObject, boardId)
         } */
    });
    
}


function main() {
 
    // Read JSON to get initial data.
    setupJson();

    // Create an object from local storage string.
    var dataObject = readFromJson();
    // Print boards.
    printBoards(dataObject);

    // Add create new board field.
    
    addBoard(dataObject);

    // Show the clicked board cards
    showCardPage(dataObject);
    addNewCard(dataObject);
}

$(document).ready(main);
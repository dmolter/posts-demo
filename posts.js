
function toggleBodyVisibility(header) {
    var body = $(header.closest("table")).find("tbody");

    if (body.hasClass("hidden")) {
        body.removeClass("hidden");
    } else {
        body.addClass("hidden");
    }
}


function createTable(headerCell, bodyCells) {

    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    var th = document.createElement('th');
  
    // HEADER
    th.innerHTML = headerCell;
    th.onclick = function(){
        toggleBodyVisibility(th);
    }; 
    thead.appendChild(tr);
    tr.appendChild(th);

    // BODY
    tbody.setAttribute("class", "hidden");
    bodyCells.forEach( function(v, index) {
        var bodyRow = document.createElement('tr');
        bodyRow.innerHTML = bodyCells[index];
        tbody.appendChild(bodyRow);
    });

    // TABLE 
    table.setAttribute("class", "userTable");
    table.appendChild(thead);
    table.appendChild(tbody);
    
    return table;
}


function appendPosts(containerId, userAndPosts) {
    var container = document.getElementById(containerId);
    var userKeys = Object.keys(userAndPosts);
    userKeys.forEach( function(user, i) {
        var userValues = userAndPosts[user];
        var table = createTable(user, userValues);
        container.appendChild(table);
    });
} 


function fetchPosts(containerId, url) {
    $.ajax({ 
        url: url,
        dataType: 'json',
        type: 'GET',

        success: function(data) {
          if (data===null) {
            console.error("Return data is no proper JSON!");
          } else {
            appendPosts(containerId, data);
          }
        },

        error: function( jqXhr, textStatus, errorThrown ){
            console.error( errorThrown );
        }
    });
}

function mockFetchPosts(containerId) {
    var data = {
        "John":["This is my only post. I am boring like that."],
        "Mary":["This is my first post.","Look, there's another one!"]
    };
    appendPosts(containerId, data);
}


/* switch comments to use mock function if no database set up */
$( function() {
    fetchPosts("result_view", "posts.php");
    // mockFetchPosts("result_view");
});
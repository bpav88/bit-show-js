const $input = $('input');
const $ul = $('#searchUl');

const displayShows = (myShows) => {
    for (let i = 0; i < myShows.length; i++) {
        const show = myShows[i];

        const $showList = $("<div>");
        $showList.addClass("card show-card");
        const $img = $("<img>");
        $img.addClass("card-img-top img-show");
        $img.attr("src", show.image);
        const $p = $("<p>");
        $p.text(show.name);
        $showList.append($img);
        $showList.append($p);

        $(".wrapper").append($showList);
    }
}

const collectInput = () => $input.val();

const displaySearch = (searchedShows) => {

    console.log(searchedShows[0]);
    $ul.empty();

    for (let i = 0; i < searchedShows.length; i++) {
        const $li = $('<li>');
        $li.addClass('list-group-item');
        $li.text(searchedShows[i]);
        $ul.append($li);

    }
}

export {
    displayShows,
    collectInput,
    displaySearch
}
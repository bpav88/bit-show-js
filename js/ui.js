const $input = $('input');
const $ul = $('#searchUl');
const $h1 = $('.name-show');
const $showImg = $('#show-img');
const $detail = $('.details');
const $showUl = $('#show-ul');
const $castUl = $('#cast-ul');

const displayShows = (myShows) => {
    for (let i = 0; i < myShows.length; i++) {
        const show = myShows[i];

        const $showList = $("<div>");
        $showList.addClass("card show-card");
        $showList.attr('data-id', show.id);
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
    $ul.empty();

    for (let i = 0; i < searchedShows.length; i++) {

        const $li = $('<li>');
        $li.addClass('navLi list-group-item');
        $li.attr('data-id', searchedShows[i].id);
        $li.text(searchedShows[i].name);
        $ul.append($li);

    }
}

const displaySingle = (data) => {

    $h1.text(data.name);
    $showImg.attr('src', data.image.medium);
    const detailP = data.summary;
    $detail.append(detailP);
}

const displaySeason = (data) => {

    for (let i = 0; i < data.length; i++) {

        const $showLi = $("<li>").addClass("list-group-item");
        $showLi.html(`<span class='season-span'>Premier:</span> ${data[i].premiereDate} - <span class='season-span'>End:</span> ${data[i].endDate}`)
        $showUl.append($showLi);
    }

}

const displayCasts = (data) => {
    if (data.length < 5) {
        for (let i = 0; i < data.length; i++) {

            const $castLi = $("<li>").addClass("list-group-item");
            $castLi.text(data[i].name);
            $castUl.append($castLi);
        }
    } else {
        for (let i = 0; i < 5; i++) {

            const $castLi = $("<li>").addClass("list-group-item");
            $castLi.text(data[i].name);
            $castUl.append($castLi);
        }
    }
}
export {
    displayShows,
    collectInput,
    displaySearch,
    displaySingle,
    displaySeason,
    displayCasts
}
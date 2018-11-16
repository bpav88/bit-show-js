import * as ui from './ui.js';
import * as data from './data.js';

const $ul = $('#searchUl');


const initIndex = () => {
    console.log('App initialized!');
    data.fetchData(onSuccess);
}

const initShow = () => {
    console.log('App initialized!');
    const id = getLocalStorage();
    data.getSingleShow(id, onSingle);
    data.getSeasons(id, onSeason);
    data.getCast(id, onCast);
}

const getLocalStorage = () => localStorage.getItem('id');

const $input = $("input");

let timer;

$input.on('keyup', function () {
    clearTimeout(timer)
    timer = setTimeout(search, 500);
})

$input.on('keydown', function () {
    clearTimeout(timer);
})

function search() {
    $ul.removeClass('d-none');
    const searchInput = ui.collectInput();
    data.getDataItem(searchInput, onSearch);
}

const onSuccess = (myShows) => {
    ui.displayShows(myShows);
    $('.show-card').on('click', function () {
        localStorage.clear();
        localStorage.setItem('id', $(this).attr('data-id'));
        window.location.href = "./show.html";

    });
}

function onSearch(searchedShows) {
    ui.displaySearch(searchedShows);


    $('.navLi').on('click', function () {

        localStorage.clear();
        localStorage.setItem('id', $(this).attr('data-id'));
        window.location.href = "./show.html";


    })
}

function onSingle(data) {
    ui.displaySingle(data);
}

function onSeason(data) {
    ui.displaySeason(data);
}

function onCast(data) {
    ui.displayCasts(data);
}

export {
    initIndex,
    initShow
}
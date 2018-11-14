import * as ui from './ui.js';
import * as data from './data.js';
const $ul = $('#searchUl');

const init = () => {
    console.log('App initialized!');
    data.fetchData(onSuccess);
}

const $input = $("input");
$input.on('input', search);
$input.on('blur', function () {
    $ul.addClass('d-none');
});



function search() {
    $ul.removeClass('d-none');
    const searchInput = ui.collectInput();
    console.log(ui.collectInput())
    data.getDataItem(searchInput, onSearch);

}

const onSuccess = (myShows) => {
    ui.displayShows(myShows);
}

function onSearch(searchedShows) {
    ui.displaySearch(searchedShows);
}

export {
    init
}
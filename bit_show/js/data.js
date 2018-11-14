import Show from './entities/Show.js';

const storage = {
    myShows: [],
    allShows: [],
}

const SHOW_ENDPOINT = 'http://api.tvmaze.com/shows';

const fetchData = (onSuccess) => {

    const request = $.ajax(SHOW_ENDPOINT);
    request.done((response) => {
        for (let i = 0; i < response.length; i++) {
            const element = response[i];

            const { name, image, rating } = element;
            const show = new Show(name, image.medium, rating.average);
            storage.allShows.push(show);

            storage.allShows.sort(function (a, b) {
                return b.rating - a.rating;
            });
        };


        for (let i = 0; i < 50; i++) {
            storage.myShows.push(storage.allShows[i]);
        }

        onSuccess(storage.myShows);
    });
}

const getDataItem = (searchInput, onSearch) => {
    let searchedShows = [];
    const SEARCH_ENDPOINT = `http://api.tvmaze.com/search/shows?q=${searchInput}`;
    const request = $.ajax(SEARCH_ENDPOINT);
    request.done((response) => {

        for (let i = 0; i < response.length; i++) {
            const show = response[i].show.name;
            searchedShows.push(show);
        }

        onSearch(searchedShows);

    });
};

export {
    fetchData,
    getDataItem
}
import Show from './entities/Show.js';
import Season from './entities/Season.js';
import Person from './entities/Person.js';

const storage = {
    myShows: [],
    allShows: [],
}

const SHOW_ENDPOINT = 'http://api.tvmaze.com/shows';

const fetchData = () => {

    const fetchPromise = fetch(SHOW_ENDPOINT)
        .then((response) => {
            return response.json();
        })
        .then((shows) => {

            for (let i = 0; i < shows.length; i++) {
                const element = shows[i];

                const { id, name, image, rating, summary } = element;
                const show = new Show(id, name, image.medium, rating.average, summary);
                storage.allShows.push(show);

                storage.allShows.sort(function (a, b) {
                    return b.rating - a.rating;
                })
            }
            for (let i = 0; i < 50; i++) {
                storage.myShows.push(storage.allShows[i]);
            }

            return storage.myShows;
        });


    return fetchPromise;
}

const getDataItem = (searchInput) => {
    let searchedShows = [];
    const SEARCH_ENDPOINT = `http://api.tvmaze.com/search/shows?q=${searchInput}`;

    const fetchPromise = fetch(SEARCH_ENDPOINT)
        .then((response) => {
            return response.json();
        })
        .then((shows) => {

            for (let i = 0; i < shows.length; i++) {
                const show = shows[i].show;
                searchedShows.push(show);
            }

            return searchedShows;
        });
    return fetchPromise;
};

const getSingleShow = (id) => {
    const SINGLE_ENDPOINT = `http://api.tvmaze.com/shows/${id}`;
    const fetchPromise = fetch(SINGLE_ENDPOINT)
        .then((response) => {
            return response.json();
        })
        .then((show) => {
            const { id, name, image, rating, summary } = show;

            const single = new Show(id, name, image, rating.average, summary);

            return single;
        });

    return fetchPromise;

};

const getSeasons = (id) => {
    const SEASON_ENDPOINT = `http://api.tvmaze.com/shows/${id}/seasons`;
    const fetchData = fetch(SEASON_ENDPOINT)
        .then((response) => {
            return response.json();
        })
        .then((seasonList) => {
            const { endDate, premiereDate } = seasonList;
            let seasons = [];
            for (let i = 0; i < seasonList.length; i++) {
                const { endDate, premiereDate } = seasonList[i];
                const season = new Season(premiereDate, endDate);
                seasons.push(season);
            }
            return seasons;
        });
    return fetchData;
};

const getCast = (id) => {
    const CAST_ENDPOINT = `http://api.tvmaze.com/shows/${id}/cast`;

    const fetchData = fetch(CAST_ENDPOINT)
        .then((response) => {
            return response.json();
        })
        .then((castList) => {
            let casts = [];

            for (let i = 0; i < castList.length; i++) {
                casts.push(new Person(castList[i].person.name));
            }

            return casts;
        });
    return fetchData;
};

export {
    fetchData,
    getDataItem,
    getSingleShow,
    getSeasons,
    getCast
}
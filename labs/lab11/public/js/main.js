(function ($) {
    let showList = $('#showList');
    let searchTermInput = $('#search_term');
    let showDiv = $('#show');
    let homeLink = $('#homeLink');

    function addShowsToList(shows, isSearch) {
        shows.forEach((currentShow) => {
            let showName, showLink = undefined;
            if (isSearch) {
                showName = currentShow.show.name;
                showLink = currentShow.show._links.self.href;
            } else {
                showName = currentShow.name;
                showLink = currentShow._links.self.href;
            }

            let listItem = $('<li></li>');
            let currentLink = $(`<a>${showName}</a>`);
            currentLink.attr('href', showLink);
            currentLink.click((event) => {
                event.preventDefault();
                showList.hide();
                showDiv.empty();

                let requestConfig = {
                    method: 'GET',
                    url: currentLink.attr('href')
                }

                $.ajax(requestConfig).then((response) => {
                    let reponse = !response.name ? 'N/A' : response.name;
                    let h1 = $(`<h1>${response.name}</h1>`);
                    showDiv.append(h1);

                    let src = !response.image || !response.image.medium ? '../public/images/no_image.jpeg' : response.image.medium;
                    let img = $(`<img>`);
                    img.attr('src', src);
                    showDiv.append(img);


                    // Definition list
                    let dl = $('<dl></dl>');
                    
                    // Language
                    let language = !response.language ? 'N/A' : response.language;
                    let dt1 = $('<dt>Language</dt>');
                    let dd1 = $(`<dd>${language}</dd>`);
                    dl.append(dt1);
                    dl.append(dd1);

                    // Genres
                    let genres = response.genres;
                    if (!genres) genres = [];
                    let dt2 = $('<dt>Genres</dt>');
                    let dd2 = $(`<dd></dd>`);
                    let ul = $(`<ul></ul>`);
                    for (let genre of genres) {
                        let li = $(`<li>${genre}</li>`);
                        ul.append(li);
                    }

                    if (genres.length <= 0) ul.append('N/A');
                    dd2.append(ul);
                    dl.append(dt2);
                    dl.append(dd2);

                    // Rating average
                    let rating = !response.rating || !response.rating.average ? 'N/A' : response.rating.average;
                    let dt3 = $('<dt>Average Rating</dt>');
                    let dd3 = $(`<dd>${rating}</dd>`);
                    dl.append(dt3);
                    dl.append(dd3);

                    // Network name
                    let network = !response.network || !response.network.name ? 'N/A' : response.network.name;
                    let dt4 = $('<dt>Network</dt>');
                    let dd4 = $(`<dd>${network}</dd>`);
                    dl.append(dt4);
                    dl.append(dd4);

                    // Summary
                    let summary = !response.summary ? 'N/A' : response.summary;
                    let dt5 = $('<dt>Summary</dt>');
                    let dd5 = $(`<dd>${summary}</dd>`);
                    dl.append(dt5);
                    dl.append(dd5);
                    
                    showDiv.append(dl);
                    showDiv.show();
                    homeLink.show();
                });
            });

            listItem.append(currentLink);
            showList.append(listItem);
        });
        showList.show();
        showDiv.hide();
    }

    let requestConfig = {
        method: 'GET',
        url: 'http://api.tvmaze.com/shows',
    }

    $.ajax(requestConfig).then((response) => {
        addShowsToList(response);
    });
    
    // Client-side validtion for search_term box
    let searchForm = $('#searchForm');
    let errorDiv = $('#error');
    searchForm.submit((event) => {
        event.preventDefault();
        errorDiv.hide();
        let searchText = searchTermInput.val().trim();
        if (!searchText) {
            errorDiv.html('Search term cannot be empty');
            errorDiv.show();
        } else {
            showList.empty();
            let requestConfig = {
                method: 'GET',
                url: `http://api.tvmaze.com/search/shows?q=${searchText}`,
            }

            $.ajax(requestConfig).then((response) => {
                addShowsToList(response, true);
                homeLink.show();
            });
        }
    });
    
})(jQuery);
// api reference : https://developer.themoviedb.org/reference/intro/getting-started

// get api key from configuration file
import conf from '../conf/conf'

// used class to provide better structure and reusability
class service {

    // function to fetch currently playing movies data
    async nowPlaying() {
        try {

            // reference Link : https://developer.themoviedb.org/reference/movie-now-playing-list
            const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${conf.apiKey}`, this.option)

            // checking wether response is ok(status code: 200) or not
            if (response.ok) {
                const contentType = response.headers.get('content-type')

                // checking for content type (wether it is json or not)
                if (contentType && contentType.includes('application/json')) {

                    // converting response to json
                    const data = await response.json()
                    return data.results;
                }
            }

            //if response status is 404 then throw error with response status(we will handle error in ui section)
            else if (response.status === 404) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {

            //throw error (we will handle error in ui section)
            throw error;

        }
    }


    // function to fetch movie details by movie id
    async getMovieByID(id) {
        try {

            // reference link: https://developer.themoviedb.org/reference/movie-details
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${conf.apiKey}&append_to_response=credits`)

            // checking wether response is ok(status code: 200) or not
            if (response.ok) {
                const contentType = response.headers.get('content-type');

                // checking for content type (wether it is json or not)
                if (contentType && contentType.includes('application/json')) {

                    // converting response to json
                    const data = await response.json();
                    return data;
                }
            }

            //if response status is 404 then throw error with response status(we will handle error in ui section)
            else if (response.status === 404) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {

            //throw error (we will handle error in ui section)
            throw error;
        }
    }

    // function to fetch tv series details by series id
    async getTvByID(id) {
        try {

            // reference link: https://developer.themoviedb.org/reference/tv-series-details
            const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${conf.apiKey}&append_to_response=credits`)

            // checking wether response is ok(status code: 200) or not
            if (response.ok) {
                const contentType = response.headers.get('content-type');

                // checking for content type (wether it is json or not)
                if (contentType && contentType.includes('application/json')) {

                    // converting response to json
                    const data = await response.json();
                    return data;
                }
            }

            //if response status is 404 then throw error with response status(we will handle error in ui section)
            else if (response.status === 404) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {

            //throw error (we will handle error in ui section)
            throw error;
        }
    }


    // function to fetch movie videos by movie id
    async getMovieVideo(id) {
        try {

            // reference link : https://developer.themoviedb.org/reference/movie-videos
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${conf.apiKey}`)

            // checking wether response is ok(status code: 200) or not
            if (response.ok) {
                const contentType = response.headers.get('content-type')

                // checking for content type (wether it is json or not)
                if (contentType && contentType.includes('application/json')) {

                    // converting response to json
                    const data = await response.json()
                    return data.results;
                }
            }

            //if response status is 404 then throw error with response status(we will handle error in ui section)
            else if (response.status === 404) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {

            //throw error (we will handle error in ui section)
            throw error;
        }
    }

    // function to fetch tv series videos by series id
    async getTvVideo(id) {

        try {
            // reference link : https://developer.themoviedb.org/reference/tv-series-videos
            const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${conf.apiKey}`)

            // checking wether response is ok(status code: 200) or not
            if (response.ok) {
                const contentType = response.headers.get('content-type')

                // checking for content type (wether it is json or not)
                if (contentType && contentType.includes('application/json')) {

                    // converting response to json
                    const data = await response.json()
                    return data.results;
                }
            }

            //if response status is 404 then throw error with response status(we will handle error in ui section)
            else if (response.status === 404) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {

            //throw error (we will handle error in ui section)
            throw error;
        }
    }



    // function to fetch upcoming movie 
    async getUpcomingMovies() {
        try {

            // reference link : https://developer.themoviedb.org/reference/movie-upcoming-list
            const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?page=1&api_key=${conf.apiKey}`)

            // checking wether response is ok(status code: 200) or not
            if (response.ok) {
                const contentType = response.headers.get('content-type');

                // checking for content type (wether it is json or not)
                if (contentType && contentType.includes('application/json')) {

                    // converting response to json
                    const data = await response.json();
                    return data.results;
                }
            }

            //if response status is 404 then throw error with response status(we will handle error in ui section)
            else if (response.status === 404) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {

            //throw error (we will handle error in ui section)
            throw error;
        }
    }

    // function to fetch movies categories list
    async getMovieCategoriesList() {
        try {

            // reference link : https://developer.themoviedb.org/reference/genre-movie-list
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${conf.apiKey}`);

            // checking wether response is ok(status code: 200) or not
            if (response.ok) {
                const contentType = response.headers.get('content-type');

                // checking for content type (wether it is json or not)
                if (contentType && contentType.includes('application/json')) {

                    // converting response to json
                    const data = await response.json();
                    return data.genres;
                }
            }

            //if response status is 404 then throw error with response status(we will handle error in ui section)
            else if (response.status === 404) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {

            //throw error (we will handle error in ui section)
            throw error;
        }
    }

    // function to fetch tv series categories list
    async getTvCategoriesList() {
        try {

            // reference link : https://developer.themoviedb.org/reference/genre-tv-list
            const response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${conf.apiKey}`)

            // checking wether response is ok(status code: 200) or not
            if (response.ok) {
                const contentType = response.headers.get('content-type');

                // checking for content type (wether it is json or not)
                if (contentType && contentType.includes('application/json')) {

                    // converting response to json
                    const data = await response.json()
                    return data.genres;
                }
            }

            //if response status is 404 then throw error with response status(we will handle error in ui section)
            else if (response.status === 404) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {

            //throw error (we will handle error in ui section)
            throw error;
        }
    }

    // function to fetch trending movies
    async trendingMovies() {
        try {

            // reference link : https://developer.themoviedb.org/reference/trending-movies
            const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${conf.apiKey}`)

            // checking wether response is ok(status code: 200) or not
            if (response.ok) {
                const contentType = response.headers.get('content-type');

                // checking for content type (wether it is json or not)
                if (contentType && contentType.includes('application/json')) {

                    // converting response to json
                    const data = await response.json()
                    return data.results;
                }
            }

            //if response status is 404 then throw error with response status(we will handle error in ui section)
            else if (response.status === 404) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {

            //throw error (we will handle error in ui section)
            throw error;
        }
    }

    // function to fetch movies details list by genre id
    async getMoviesListByCategories(id) {
        try {

            // reference link : https://developer.themoviedb.org/reference/discover-movie
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}&api_key=${conf.apiKey}`)

            // checking wether response is ok(status code: 200) or not
            if (response.ok) {
                const contentType = response.headers.get('content-type');

                // checking for content type (wether it is json or not)
                if (contentType && contentType.includes('application/json')) {

                    // converting response to json
                    const data = await response.json();
                    return data.results;
                }
            }

            //if response status is 404 then throw error with response status(we will handle error in ui section)
            else if (response.status === 404) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {

            //throw error (we will handle error in ui section)
            throw error;
        }
    }

    // function to get image url by fileId 
    async getImage(fileId) {
        try {
            const response = await fetch(`https://image.tmdb.org/t/p/original/${fileId}`)
            return response.url;
        }

        catch (error) {

            //throw error (we will handle error in ui section)
            throw error;
        }
    }

    // function to fetch recommended movies list by movie id
    async recommendedMovie(id) {
        try {

            // reference link : https://developer.themoviedb.org/reference/movie-recommendations
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${conf.apiKey}`)

            // checking wether response is ok(status code: 200) or not
            if (response.ok) {
                const contentType = response.headers.get('content-type');

                // checking for content type (wether it is json or not)
                if (contentType && contentType.includes('application/json')) {

                    // converting response to json
                    const data = await response.json()
                    return data.results;
                }
            }

            //if response status is 404 then throw error with response status(we will handle error in ui section)
            else if (response.status === 404) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {

            //throw error (we will handle error in ui section)
            throw error;
        }
    }

    // function to fetch recommended tv series list by series id
    async recommendedTv(id) {
        try {
            // reference link: https://developer.themoviedb.org/reference/tv-series-recommendations
            const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${conf.apiKey}`);

            // checking wether response is ok(status code: 200) or not
            if (response.ok) {
                const contentType = response.headers.get('content-type');

                // checking for content type (wether it is json or not)
                if (contentType && contentType.includes('application/json')) {

                    // converting response to json
                    const data = await response.json();
                    return data.results;
                }
            }

            //if response status is 404 then throw error with response status(we will handle error in ui section)
            else if (response.status === 404) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {

            //throw error (we will handle error in ui section)
            throw error;
        }
    }

    //  function to fetch top rated movies or tv series
    async topRated(name) {
        try {
            switch (name) {
                // if movies
                case 'movie':
                    // reference link : https://developer.themoviedb.org/reference/movie-top-rated-list
                    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${conf.apiKey}`);

                    // checking wether response is ok(status code: 200) or not
                    if (response.ok) {
                        const contentType = response.headers.get('content-type');

                        // checking for content type (wether it is json or not)
                        if (contentType && contentType.includes('application/json')) {

                            // converting response to json
                            const data = await response.json()
                            return data.results;
                        }
                    }

                    //if response status is 404 then throw error with response status(we will handle error in ui section)
                    else if (response.status === 404) {
                        throw new Error(`${response.status}`)
                    }
                    break;
                // if tv
                case 'tv':
                    // reference link : https://developer.themoviedb.org/reference/tv-series-top-rated-list
                    const TvResponse = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${conf.apiKey}`);

                    // checking wether response is ok(status code: 200) or not
                    if (TvResponse.ok) {
                        const contentType = TvResponse.headers.get('content-type');

                        // checking for content type (wether it is json or not)
                        if (contentType && contentType.includes('application/json')) {

                            // converting response to json
                            const data = await TvResponse.json()
                            return data.results;
                        }
                    }

                    //if response status is 404 then throw error with response status(we will handle error in ui section)
                    else if (response.status === 404) {
                        throw new Error(`${response.status}`)
                    }
                    break;
                default:

            }
        } catch (error) {

            //throw error (we will handle error in ui section)
            throw error;
        }

    }

    // function to fetch  movies list by query(name) search
    async searchMovie(query) {
        try {

            // reference link : https://developer.themoviedb.org/reference/search-movie 
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${conf.apiKey}`)

            // checking wether response is ok(status code: 200) or not
            if (response.ok) {
                const contentType = response.headers.get('content-type');

                // checking for content type (wether it is json or not)
                if (contentType && contentType.includes('application/json')) {

                    // converting response to json
                    const data = await response.json()
                    return data.results;
                }
            }

            //if response status is 404 then throw error with response status(we will handle error in ui section)
            else if (response.status === 404) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {

            //throw error (we will handle error in ui section)
            throw error;
        }
    }

    // function to fetch  tv series list by query(name) search
    async searchTv(query) {
        try {
            // reference link : https://developer.themoviedb.org/reference/search-tv
            const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1&api_key=${conf.apiKey}`)

            // checking wether response is ok(status code: 200) or not
            if (response.ok) {
                const contentType = response.headers.get('content-type')

                // checking for content type (wether it is json or not)
                if (contentType && contentType.includes('application/json')) {

                    // converting response to json
                    const data = await response.json()
                    return data.results;
                }
            }

            //if response status is 404 then throw error with response status(we will handle error in ui section)
            else if (response.status === 404) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {

            //throw error (we will handle error in ui section)
            throw error;
        }
    }
}

// exporting instance of service
export default new service;



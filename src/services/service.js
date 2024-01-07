import conf from '../conf/conf'
class service {

    // hero section
    async nowPlaying() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${conf.apiKey}`, this.option)
            if (response.ok) {
                const contentType = response.headers.get('content-type')
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json()
                    return data.results;
                }
            }

        } catch (error) {
            console.log('error in fetching data ', error);
        }
    }


    async getMovieID(id) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${conf.apiKey}`)
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    return data;
                }
            }

        } catch (error) {
            console.log('error in fetching data ', error);
        }
    }

    // coming soon content
    async getUpcomingMovies() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?page=1&api_key=${conf.apiKey}`)
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    // console.log('data', data.results);
                    return data.results;
                }
            }
        } catch (error) {
            console.log('error in fetching data ', error);
        }
    }

    // getCategoriesList
    async getCategoriesList() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${conf.apiKey}`);
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    // console.log('data',data.genres);
                    return data.genres;
                }
            }
        } catch (error) {
            console.log('error in fetching data ', error);
        }
    }

    // trending content
    async trendingMovies() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${conf.apiKey}`)
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json()
                    return data.results;
                }
            }
        } catch (error) {
            console.log('error in fetching data ', error);
        }
    }

    // search by category
    async getMoviesListByCategories(id) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}&api_key=${conf.apiKey}`)
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    return data.results;
                }
            }
        } catch (error) {

        }
    }

    async getImage(fileId) {
        try {
            const response = await fetch(`https://image.tmdb.org/t/p/original/${fileId}`)
            return response.url;

        } catch (error) {
            console.log('error in fetching data ', error);
        }
    }

    // recommanded movies
    // https://api.themoviedb.org/3/movie/{movie_id}/similar

    async topRated(name) {
        try {
            switch (name) {
                case 'movie':
                    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${conf.apiKey}`);
                    if (response.ok) {
                        const contentType = response.headers.get('content-type');
                        if (contentType && contentType.includes('application/json')) {
                            const data = await response.json()
                            return data.results;
                        }
                    }
                    break;
                case 'tv':
                    // console.log('tv series clicked');
                    const TvResponse = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${conf.apiKey}`);
                    if (TvResponse.ok) {
                        const contentType = TvResponse.headers.get('content-type');
                        if (contentType && contentType.includes('application/json')) {
                            const data = await TvResponse.json()
                            return data.results;
                        }
                    }
                    break;
                default:
                    console.log('invalid input');
            }
        } catch (error) {
            console.log('error is ', error);
        }

    }
}


export default new service;



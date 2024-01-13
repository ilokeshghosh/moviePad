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
            throw error;

        }
    }


    async getMovieByID(id) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${conf.apiKey}&append_to_response=credits`)
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    return data;
                }
            }
        } catch (error) {
            throw error;
        }
    }
    async getTvByID(id) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${conf.apiKey}&append_to_response=credits`)
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    return data;
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async getMovieVideo(id) {
        // https://api.themoviedb.org/3/movie/{movie_id}/videos
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${conf.apiKey}`)
            if (response.ok) {
                const contentType = response.headers.get('content-type')
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json()
                    // console.log('data at service', data);
                    return data.results;
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async getTvVideo(id) {
        // https://api.themoviedb.org/3/movie/{movie_id}/videos
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${conf.apiKey}`)
            if (response.ok) {
                const contentType = response.headers.get('content-type')
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json()
                    // console.log('data at service', data);
                    return data.results;
                }
            }
        } catch (error) {
            throw error;
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
            throw error;
        }
    }

    // getMovieCategoriesList
    async getMovieCategoriesList() {
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
            throw error;
        }
    }

    // get tv categories list
    async getTvCategoriesList() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${conf.apiKey}`)

            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json()
                    return data.genres;
                }
            }
        } catch (error) {
            throw error;
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
            throw error;
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
            throw error;
        }
    }

    async getImage(fileId) {
        try {
            const response = await fetch(`https://image.tmdb.org/t/p/original/${fileId}`)
            return response.url;

        } catch (error) {
            throw error;
        }
    }

    // recommanded movies
    async recommendedMovie(id) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${conf.apiKey}`)
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json()
                    return data.results;
                }
            }
        } catch (error) {
            throw error;
        }
    }
    async recommendedTv(id) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${conf.apiKey}`);
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    return data.results;
                }
            }
        } catch (error) {
            throw error;
        }
    }

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
                // console.log('invalid input',name);
            }
        } catch (error) {
            throw error;
        }

    }

    // search movie
    async searchMovie(query) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1&api_key=${conf.apiKey}`)
            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json()
                    return data.results;
                }
            }
        } catch (error) {
            throw error;
        }
    }

    // search tv 
    async searchTv(query) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=true&language=en-US&page=1&api_key=${conf.apiKey}`)
            if (response.ok) {
                const contentType = response.headers.get('content-type')
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json()
                    return data.results;
                }
            }
        } catch (error) {
            throw error;
        }
    }
}


export default new service;



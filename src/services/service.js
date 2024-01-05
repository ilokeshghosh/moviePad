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
            const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${conf.apiKey}`)
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
    async getCategoriesList(){
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${conf.apiKey}`);
            if(response.ok){
                const contentType = response.headers.get('content-type');
                if(contentType && contentType.includes('application/json')){
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
    async trendingMovies(){
        try {
            const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${conf.apiKey}`)
            if(response.ok){
                const contentType = response.headers.get('content-type');
                if(contentType && contentType.includes('application/json')){
                    const data =await response.json()
                    return data.results;
                }
            }
        } catch (error) {
            console.log('error in fetching data ', error);
        }
    }

    // search by category
    async getMoviesListByCategories(){
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/collection?query=${id}?api_key=${conf.apiKey}`)
            if(response.ok){
                const contentType = response.headers.get('content-type');
                if(contentType && contentType.includes('application/json')){
                    const data = await response.json();
                    // console.log('data',data.genres);
                    return data.genres;
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
}


export default new service;



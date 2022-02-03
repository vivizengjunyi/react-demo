import axios from 'axios';

export const searchUnsplash = (query) => {
    return (dispatch) => {
        axios.get(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=aKQj2hOpI16RdaGquVpydoRHjiXqlntHw_zY0LvV4ug`)
            .then(res => {
                dispatch({
                    type: 'gallery/fetched',
                    payload: res.data.results
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}
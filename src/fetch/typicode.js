import axios from 'axios';

export const fetchTypicodePosts = () => {
    return (dispatch) => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                dispatch({
                    type: 'datalist/fetched',
                    payload: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
};
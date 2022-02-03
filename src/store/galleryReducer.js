const defaultState = {
    photos: [],
    keyword: '',
};
export default function reducer(state = defaultState, action){
    switch(action.type){
        case 'gallery/fetched':
            return {
                ...state,
                photos: action.payload
            };
        case 'gallery/keywordChanged':
            return {
                ...state,
                keyword: action.payload
            };
        default:
            return state;
    }
}
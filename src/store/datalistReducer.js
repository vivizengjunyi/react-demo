const defaultState = {
    list: [],
    editItem: {},
    filteredUserId: null,
    orderField: null,
    orderType: 'asc',
};
// state management features: predict, 
export default function reducer(state = defaultState, action){
    switch(action.type){
        case 'datalist/fetched':
            return {
                ...state,
                list: action.payload
            };
        case 'datalist/setEditItem':
            return {
                ...state,
                editItem: action.payload ? {...(state.editItem || {}), ...action.payload} : {
                    title: '',
                    body: '',
                    userId: '',
                }
            };
        case 'datalist/create':
            return {
                ...state,
                list: [action.payload, ...state.list]
            };
        case 'datalist/delete':
            return {
                ...state,
                list: state.list.filter(item => item.id !== action.payload)
            };
        case 'datalist/filteredUserId':
            return {
                ...state,
                filteredUserId: action.payload
            };
        case 'datalist/setOrderField':
            return {
                ...state,
                orderField: action.payload,
                orderType: state.orderField === action.payload ? (state.orderType === 'asc' ? 'desc' : 'asc') : 'asc'
            };
        default:
            return state;
    }
}
import * as actionTypes from './actions';

const initialState ={
    ingredients: null,
    totalPrice : 4
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_NAME:
            return Object.assign({}, state, {
 
            });
        default:
            return state;
    }
};
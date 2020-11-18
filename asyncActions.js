const redux = require('redux')
const createStore = redux.createStore
/* -------------------------------------------------------------------------- */
/*                              Defining a state                              */
/* -------------------------------------------------------------------------- */

/* ---------------------------- State my default ---------------------------- */

const initialState = {
    loading: false,
    users: [],
    error: ''
}

/* -------------------------------------------------------------------------- */
/*                Declaring the CONSTANTS for the ACTION types                */
/* -------------------------------------------------------------------------- */

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

/* -------------------------------------------------------------------------- */
/*                           Create ACTION creators                           */
/* -------------------------------------------------------------------------- */

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

/* -------------------------------------------------------------------------- */
/*                          Defining reducer funtions                         */
/* -------------------------------------------------------------------------- */

const reducer = (state = initialState, action){
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return{
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return{
                ...state,
                users: action.payload
            }
        case FETCH_USERS_FAILURE:
            return{
                ...state,
                users: [],
                error: action.payload
            }
    }
}

/* -------------------------------------------------------------------------- */
/*                          Final: Create Redux Store                         */
/* -------------------------------------------------------------------------- */

const store = createStore(reducer)
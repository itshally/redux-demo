/* ------------------------- These are dependencies ------------------------- */

const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

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

const reducer = (state = initialState, action) => {
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
/*                            Async Action Creator                            */
/* -------------------------------------------------------------------------- */

/**
 * The thunk middleware brings the ability for an action creator to return 
 * a function instead of an action object
 */

const fetchUsers = () => {
    return function(dispatch) {
        // dispatch fetch users request
        dispatch(fetchUsersRequest()) // -- sets loading to true
        axios.get('https://jsonplaceholder.typicode.com/users')
            // if the request is successful, we get the response
            .then( response => {
                // response.data is the array of users
                const users = response.data.map( user => user.id )
                dispatch(fetchUsersSuccess(users))
            })
            // if the request is failed, we get back an error
            .catch( error => {
                // error.message is the error description
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

/* -------------------------------------------------------------------------- */
/*                          Final: Create Redux Store                         */
/* -------------------------------------------------------------------------- */

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers())
/* -------------------------------------------------------------------------- */
/*                        This file is a simple NodeJS                        */
/* -------------------------------------------------------------------------- */

const redux = require('redux')

/* ---------------------------- Creating a store ---------------------------- */

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

/* -------------------------------------------------------------------------- */
/*       Define a string CONSTANT that indicates the type of the action.      */
/* -------------------------------------------------------------------------- */

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICE_CREAM = 'BUY_ICE_CREAM';

/* -------------------------------------------------------------------------- */
/*           Define the ACTION - an object that has a type property           */
/* -------------------------------------------------------------------------- */

/* --------- An action creator is a function that returns an action --------- */

/* -------------------------------------------------------------------------- */
/*                         Implement an ACTION CREATOR                        */
/* -------------------------------------------------------------------------- */

function buyCake() {
    return {
        type: BUY_CAKE, // very first action
        info: 'First redux action' // another property added
    }
}

function buyIceCream() { 
    return {
        type: BUY_ICE_CREAM,
        info: 'Second redux action'
    }
 }

/* ------------------- (previousState, action) => newState ------------------ */

/**
 * Need two arguments to write a reducer function:
 *  - first parameter is "the sate of the application before making any change"
 *  - second parameter is "the action"
 * 
 * State has to be presented by a single object
 * 
 * This initialState is the default value for the state parameter in the reducer
 */

const initialState = { 
    numOfCakes: 10,
    numOfIceCream: 20
}

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCream: 20
}

/* -------------------------------------------------------------------------- */
/*                             Define the REDUCER                             */
/* -------------------------------------------------------------------------- */

/**
 * Two parameters are state and action
 * 
 * For the first parameter - which is the state - its default value will be 
 * initialState
 * 
 * Each of these reducers is managing its own part of the global state
 */

const reducer = (state = initialState, action) => {

    // return the new state of the app based on the current state & the action
    switch(action.type){
        case BUY_CAKE: return {
            ...state, // a copy of the state object
            numOfCakes: state.numOfCakes - 1
        }
        case BUY_ICE_CREAM: return {
            ...state,
            numOfIceCream: state.numOfIceCream - 1
        }
        default: return state
    }
}

const cakeReducer = (state = initialCakeState, action) => {

    // return the new state of the app based on the current state & the action
    switch(action.type){
        case BUY_CAKE: return {
            ...state, // a copy of the state object
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {

    // return the new state of the app based on the current state & the action
    switch(action.type){
        case BUY_ICE_CREAM: return {
            ...state,
            numOfIceCream: state.numOfIceCream - 1
        }
        default: return state
    }
}

/* ------------ To make use of the createStore method from line 9 ----------- */

// combine reducers before creating a store
const rootReducers = combineReducers({ // this method accepts object
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

/**
 * When dispatching an action, both the reducers receive that action.
 * The difference is that one of them acts on that action whereas the other
 * just ignores it.
 */

// const store = createStore(reducer); 
const store = createStore(rootReducers); 

/* ------------- getState() gives the current state of the store ------------ */

console.log('Initial state', store.getState())

/* --------------------- subscribe() accepts a function --------------------- */

const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))

/* --------------------- dispatch() to update the state --------------------- */

store.dispatch(buyCake()) // accepts the action as its parameter
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())

/* ---------- calling the function returned by the subscribe method --------- */

unsubscribe();
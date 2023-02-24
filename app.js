const incrementF = document.getElementById('incrementValue');
const decrementF = document.getElementById("decrementValue");
const resultEl = document.getElementById("result");
const addMatch = document.getElementById("addMatch");
const allMatch = document.getElementById("allMatches");

//Action Identifier
const INCREMENT = 'increment';
const DECREMENT = 'decrement';


//Action Creator
const increment = (value) => {
    return {
        type: INCREMENT,
        payload: value
    }
}
const decrement = (value) => {
    return {
        type: DECREMENT,
        payload: value
    }
}
//Initialize Value
const initialValue = {
    value: 0
};
//Create Reducer Function
const counterReducer = (state = initialValue, action) => {
    if (action.type === INCREMENT) {
        return {
            ...state,
            value: parseInt(state.value) + parseInt(action.payload) > 0 ? parseInt(state.value) + parseInt(action.payload) : 0
        }
    }
    else if (action.type === DECREMENT) {
        return {
            ...state,
            value: (parseInt(state.value) - parseInt(action.payload)) > 0 ? (parseInt(state.value) + parseInt(action.payload)) : 0
        }
    }
    else return state;
}

// create  store
const store = Redux.createStore(counterReducer);
const render = () => {
    const state = store.getState();
    resultEl.innerText = state.value.toString();
}
store.subscribe(render);
render();
incrementF.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        store.dispatch(increment(incrementF.value));
        incrementF.value = '';
        e.preventDefault();
    }
})
decrementF.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        store.dispatch(decrement(decrementF.value));
        decrementF.value = '';
        e.preventDefault();
    }
})
let matchNum = 1;
addMatch.addEventListener('click', () => {
    matchNum += 1;
    const newMatch = document.createElement("div");
    newMatch.classList.add("match");
    newMatch.innerHTML = `    
                <div class="wrapper">
                    <button class="lws-delete">
                        <img src="./image/delete.svg" alt="" />
                    </button>
                    <h3 class="lws-matchName">Match ${matchNum}
                    </h3>
                </div>
                <div class="inc-dec">
                    <form class="incrementForm">
                        <h4>Increment</h4>
                        <input type="number" name="increment" class="lws-increment" id="incrementValue${matchNum}" />
                    </form>
                    <form class="decrementForm">
                        <h4>Decrement</h4>
                        <input id="decrementValue${matchNum}" type="number" name="decrement" class="lws-decrement" />
                    </form>
                </div>
                <div class="numbers">
                    <h2 id="result${matchNum}" class="lws-singleResult">0</h2>
                </div>
    `
    allMatch.appendChild(newMatch);
})
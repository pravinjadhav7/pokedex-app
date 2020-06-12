import pokemonsList from '../pokemon.json';

let InitialState = {
    pokemonsList: pokemonsList
}


function getInitialState() {
    if (localStorage.getItem("pokemons")) {
        InitialState = JSON.parse(localStorage.getItem("pokemons"))
    }
}

getInitialState();


const pokemonStore = (state = InitialState,action) => {
    const newState = {...state};
    switch(action.type){
        case 'DELETE' :
            const pokemons = state.pokemonsList.filter((pk) => pk.id !== action.payload.id);
            newState.pokemonsList = pokemons;
            const storageObj = JSON.parse(localStorage.getItem("images"));
            if(action.payload.id > 151 && localStorage.getItem("images")){
                delete storageObj[action.payload.id];
               
                localStorage.setItem("images",JSON.stringify(storageObj));
            }
            state = { ...newState}
            localStorage.setItem("pokemons",JSON.stringify(state));
            return state;
        case 'ADD':
            const pokemon = action.payload;
            pokemon.id = newState.pokemonsList[newState.pokemonsList.length - 1].id + 1;
            newState.pokemonsList.push(action.payload);
            const id = pokemon.id;
            const obj = {};
            
            if(localStorage.getItem("images")){
                const storageObj = JSON.parse(localStorage.getItem("images"));
                obj[id] = action.payload.file.reader;
                Object.assign(obj,storageObj);
           }
            else{
                obj[id] = action.payload.file.reader;
            }
           
             localStorage.setItem("images",JSON.stringify(obj));
             
            state = { ...newState}
            localStorage.setItem("pokemons",JSON.stringify(state));
            return state;
        default:
            return state;        
    }
}

export {pokemonStore,InitialState};
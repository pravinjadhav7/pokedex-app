import React from 'react';
import PokedexContext from './utils/context';
import { pokemonStore, InitialState } from './reducers/reducer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Pokemons from './components/Pokemon/Pokemons';
import AddPokemon from './components/Pokemon/AddPokemon';
import './App.css';

function App() {
  const [store, pokemonDispatch] = React.useReducer(pokemonStore, InitialState);
  return (
    <div className="App">
      <PokedexContext.Provider value={[store, pokemonDispatch]}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Pokemons} />
            <Route path="/add" component={AddPokemon} />
          </Switch>
        </BrowserRouter>
      </PokedexContext.Provider>
    </div>
  );
}

export default App;

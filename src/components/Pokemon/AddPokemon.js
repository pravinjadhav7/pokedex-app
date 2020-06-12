import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PokedexContext from './../../utils/context';

const AddPokemon = (props) => {

    const [_store, pokemonDispatch] = React.useContext(PokedexContext);

    const [type, setType] = React.useState(null);
    const [pokemon, setPokemon] = React.useState({
        base: {
            Attack: 0,
            Defense: 0,
            HP: 0,
            Speed: 0
        },
        file: {},
        id: -1,
        name: {
            english: ""
        },
        type: []
    });


    
    const fileChangedHandler = event => {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            pokemon.file = { file: file, reader: reader.result };
            setPokemon(pokemon);
        }

        reader.readAsDataURL(file)
    }


    const handleChange = (event) => {
        if (event.target.name === "name") {
            pokemon.name.english = event.target.value;

        }
        else if (event.target.name === "Attack" || event.target.name === "HP" || event.target.name === "Speed"
            || event.target.name === "Defense") {
            pokemon.base[event.target.name] = event.target.value;
        }
        setPokemon({ ...pokemon });

    }

    const handleType = (event) => {
        setType(event.target.value)
    }

    const addToList = () => {
        pokemon.type.push(type);
        setPokemon({ ...pokemon });

        setType(null);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        pokemonDispatch({ type: 'ADD', payload: pokemon });
        props.history.push("/");
    }
    return (<React.Fragment>
        <div className="container">
            <h1>Pokedex Add</h1>
            <div className="add-pokemon">
                <Link to="/">
                    <button className='btn btn-sm btn-primary m-t-n-xs'>Back</button>
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-main">
                    <ul className="flex-outer">
                        <li>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder="Enter your name here" required onChange={handleChange} />
                        </li>
                        <li>
                            <label htmlFor="name">Image</label>
                            <input type="file" required onChange={fileChangedHandler} />
                        </li>
                        <li>
                            <label htmlFor="attack">Attack</label>
                            <input type="number" name="Attack" id="attack" required placeholder="Attack" onChange={handleChange} />
                        </li>
                        <li>
                            <label htmlFor="defense">Defense</label>
                            <input type="number" id="defense" name="Defense" required placeholder="Defense" onChange={handleChange} />
                        </li>
                        <li>
                            <label htmlFor="HP">HP</label>
                            <input type="number" id="HP" name="HP" placeholder="HP" required onChange={handleChange} />
                        </li>
                        <li>
                            <label htmlFor="Speed">Speed</label>
                            <input type="number" id="Speed" name="Speed" placeholder="Speed" required onChange={handleChange} />
                        </li>
                        <li>
                            <label htmlFor="Speed">Type</label>
                            <input type="text" name="type" placeholder="Enter type here" required onChange={handleType} />
                            <input type='button' value='Add to list' id='add' onClick={addToList} className='btn btn-primary ' />
                        </li>
                        <li>
                            <ul className="flex-inner">
                                {pokemon.type.map((ty) => {
                                    return <>
                                        <li ><p className='btn-primary'>{ty}</p></li>
                                    </>
                                })}
                            </ul>
                        </li>
                        <li>
                            <button type="submit" className='btn btn-primary'>Submit</button>
                        </li>
                    </ul>

                </div>
            </form>
        </div>
    </React.Fragment>);
}

export default AddPokemon;
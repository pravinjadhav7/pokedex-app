import React from 'react';
import PokedexContext from '../../utils/context';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const Pokemons = () => {
  const [currentModal, setModal] = React.useState({ current: {}, isOpen: false });
  const [store, pokemonDispatch] = React.useContext(PokedexContext);
  let storedImages = JSON.parse(localStorage.getItem("images"));

  
  /**
   *  To indicates to the modal 
   */
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '700px',
      height: '430px'
    }
  };

  return (<React.Fragment>
    <h1>Pokedex List</h1>
    <div className="add-pokemon">
      <Link to="/add">
        <button className='btn btn-sm btn-primary m-t-n-xs'>Add Pokemon</button>
      </Link>
    </div>
    <ul className="pokemon-list">
      {store.pokemonsList.map((pokemon) => {
        return (<li className="pokemon-list-item" key={pokemon.id} style={{ width: '92%', maxWidth: '270px', display: 'flex' }}>
          <div className='card'>
            {pokemon.id <= 151 ?
              <img onClick={() => setModal({ current: pokemon, isOpen: true })} src={`/img/${(pokemon.id + '').padStart(3, '0')}.png`}
                alt={pokemon.name.english} loading="lazy" style={{ width: '100%', opacity: '0.85' }}></img>
              :
              <img onClick={() => setModal({ current: pokemon, isOpen: true })} src={storedImages[pokemon.id]} alt={pokemon.name.english} loading="lazy" style={{ width: '100%', opacity: '0.85' }}></img>
            }
          </div>
          <span>{pokemon.name.english}</span>
          <button className='btn btn-sm btn-primary m-t-n-xs' onClick={() => pokemonDispatch({ type: "DELETE", payload: pokemon })}>Delete</button>
        </li>)
      })}
    </ul>
    <Modal isOpen={currentModal.isOpen} style={customStyles} ariaHideApp={false}>
      <div className='modal-container'>
        <div className="image-pokemon">
          {currentModal.current.id <= 151 ?
            <img src={`/img/${(currentModal.current.id + '').padStart(3, '0')}.png`}
              loading="lazy" style={{ width: '70%', opacity: '0.85' }}></img>
            :
            <img src={currentModal.current.id != null && storedImages[currentModal.current.id]} loading="lazy" style={{ width: '70%', opacity: '0.85' }}></img>
          }
        </div>
        <div className='content-pokemon'>
          <h3>Name : {Object.keys(currentModal.current).length > 0 ? currentModal.current.name.english : ""}</h3>
          <div className='content'>HP : {currentModal.current.base?.HP}</div>
          <div className='content'>Attack : {currentModal.current.base?.Attack}</div>
          <div className='content'>Defense : {currentModal.current.base?.Defense}</div>
          <div className='content'>Type : {currentModal.current.type?.toString()}</div>
          <button className='btn btn-sm btn-primary m-t-n-xs btn-close' onClick={() => setModal({ current: {}, isOpen: false })}>close</button>
        </div>
      </div>
    </Modal>
  </React.Fragment>)
}

export default Pokemons;
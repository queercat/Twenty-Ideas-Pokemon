import React from 'react';
import './App.css';

import { useState } from 'react';

import RadioLabel from '../src/components/RadioLabel/RadioLabel';
import PokeDisplay from './components/PokeDisplay/PokeDisplay';

function App() {
  /* @blurb 
  * As our app grows there is merit in changing this to be a single state identifier, like a string or enum,
  * so we do not have to pass in each value to our child component each time. This would be something I would
  * talk to the team / designers about or ask about.
  */
  const [sortName, updateSortName] = useState(false);
  const [sortID, updateSortID] = useState(true);

  /* Internal pagination index, used with the entriesPerPage to determine what IDs we load */
  const [pageIndex, updatePageIndex] = useState(0);
  const entriesPerPage = 12;

  /**
   * @desc knowing the internal page index generate a list of IDs offset from that.
   * @param page:number the internal page to know what offset to get.
   * @returns number[] a list of non-negative IDs to call the pokemon API from.
   */
  function generatePokemonIDs(page:number):number[] {
    let pokemonIDs:number[] = [];

    for (let i = 1; i < entriesPerPage + 1; i++) {
      pokemonIDs.push((entriesPerPage * page) + i);
    }

    return pokemonIDs;
  }

  /**
   * @desc handle updating the pagination off of the corresponding button event.
   * @param direction the direction in which we want to go, for now just 1 but could be updated to jump multiple pages.
   */
  function handleUpdatePagination(direction: number) {
    const MAX_POKEMON_ID:number = 1008; 
    let currentPage = pageIndex + 1;

    if ((currentPage + direction) > 0 && ((currentPage + direction) * entriesPerPage <= MAX_POKEMON_ID)) {
      updatePageIndex(pageIndex + direction);
    }
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="app-header-title">
          <h3>All the Pokemon!</h3>
        </div>

        <div className="app-header-radio-group">
          <RadioLabel defaultState={false} name={"header"} label={"Sort Name"} stateCallback={() => {updateSortName(true); updateSortID(false)}}/>
          <RadioLabel defaultState={true} name={"header"} label={"Sort ID"} stateCallback={() => {updateSortName(false); updateSortID(true)}}/>
        </div>
      </div>

      <PokeDisplay pokemonIDs={generatePokemonIDs(pageIndex)} sortName={sortName} sortID={sortID}/>

      <div className="app-footer">
          <button className="button" onClick={() => {handleUpdatePagination(-1)}}>Previous {entriesPerPage}</button>
          <button className="button" onClick={() => {handleUpdatePagination(1)}}>Next {entriesPerPage}</button>
        </div>
    </div>
  );
}

export default App;

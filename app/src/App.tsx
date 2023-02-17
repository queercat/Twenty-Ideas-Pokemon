import React from 'react';
import './App.css';

import { useState } from 'react';

import RadioLabel from '../src/components/RadioLabel/RadioLabel';
import PokeDisplay from './components/PokeDisplay/PokeDisplay';

function App() {
  /* @blurb 
  * As our app grows there is merit in changing this to be a single state identifier, like a string or enum,
  * so we do not have to pass in each value to our creation script each time. This would be something I would
  * talk to the team / designers about.
  */
  const [sortName, updateSortName] = useState(false);
  const [sortID, updateSortID] = useState(false);

  /* Internal pagination index, used with the entriesPerPage to determine what IDs we load */
  const [pageIndex, updatePageIndex] = useState(0);
  const entriesPerPage = 12;

  const entriesPerRow = 4;

  /**
   * @desc knowing the internal page index generate a list of IDs offset from that.
   * @blurb it's probably worth noting while this doesn't mutate state as a side-effect it does read from global state. this can be modified relatively easily but within this scope is a non-issue.
   * @returns number[] a list of non-negative IDs to call the pokemon API from.
   */
  function generatePokemonIDs():number[] {
    let pokemonIDs:number[] = [];

    for (let i = 0; i < entriesPerPage; i++) {
      pokemonIDs.push(i * (pageIndex + 1));
    }

    return pokemonIDs;
  }

  /**
   * 
   * @param direction the direction in which we want to go, previous is -1, next is 1. would be reasonable for this to just be a bool.
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
          <RadioLabel name={"header"} label={"Sort Name"} stateCallback={() => {updateSortName(true); updateSortID(false)}}/>
          <RadioLabel name={"header"} label={"Sort ID"} stateCallback={() => {updateSortName(false); updateSortID(true)}}/>
        </div>
      </div>

      <PokeDisplay numberOfRows={entriesPerPage/entriesPerRow} entriesPerRow={entriesPerRow} pokemonIDs={generatePokemonIDs()}/>

      <div className="app-footer">
          <button className="button" onClick={() => {handleUpdatePagination(-1)}}>Previous {entriesPerPage}</button>
          <button className="button" onClick={() => {handleUpdatePagination(1)}}>Next {entriesPerPage}</button>
        </div>
    </div>
  );
}

export default App;

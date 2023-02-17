import { useEffect, useState } from "react";
import PokeCard from "../PokeCard/PokeCard";
import "./PokeDisplay.css";

/**
 * @field pokemonIDs {number[]} an array of pokemonIDs to be sent to the API in order to be rendered.
 * @field sortName {boolean} whether or not we should sort the results by name.
 * @field sortID {boolean} whether or not we should sort the results by id.
 */
interface DisplayInfo {
    pokemonIDs: number[],
    sortName: boolean,
    sortID: boolean
}

/**
 * @field name {string} the name of the Pokemon.
 * @field id {number} the number identifier of the Pokemon.
 * @field imageURL {string} the image source we should be using for our Pokemon's sprite.
 */
export interface PokeBlob {
    name: string,
    id: number,
    imageURL: string,
}

/**
 * @desc the PokeDisplay component which resolves and applies our API requests to the objects.
 * @param pokemonIDs {number[]} an array of pokemonIDs to be sent to the API in order to be rendered.
 * @param sortName {boolean} whether or not we should sort the results by name.
 * @param sortID {boolean} whether or not we should sort the results by id.
 * @brief it's worth noting above we could take advantage of Typescripts tagged unions in order to simplify. 
 */
function PokeDisplay({pokemonIDs, sortID, sortName}:DisplayInfo) {
    const API_URL = "https://pokeapi.co/api/v2/pokemon/";
    const [pokeBlobs, setPokeBlobs] = useState<PokeBlob[]>([]);

    /* Every time we see the pokemonIDs change we should trigger a rerender and subsequent API query */
    useEffect(() => {
        let promises: Promise<any>[] = [];

        /* Iterate over each ID and query its API_URL, collect all the promises into the aptly named promises array. */
        pokemonIDs.forEach(id => {
            const getData = async () => {
                return (await fetch(API_URL + id)).json();
            }
    
            promises.push(getData())
        })

        /* Consume all the promises and generate a new array which we will use to update our pokeBlobs state. */
        Promise.all(promises).then(pokemons => {
            let blobs : PokeBlob[] = [];
            
            pokemons.forEach(pokemon => {
                let blob : PokeBlob = {name: "", id: -1, imageURL: ""};

                blob.name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
                blob.id = pokemon.id;
                blob.imageURL = pokemon.sprites.front_default;

                blobs.push(blob);
            });

            setPokeBlobs(blobs);
        });
    }, [pokemonIDs])


    if (sortID) {
        pokeBlobs.sort((a, b) => a.id - b.id)
    }

    if (sortName) {
        pokeBlobs.sort((a, b) => a.name.localeCompare(b.name));
    }

    return (
        <div className="poke-display">
            {pokeBlobs.map((blob, i) => {
                return <PokeCard key={i} blob={blob}/>
            })}
        </div>
    )
}

export default PokeDisplay;
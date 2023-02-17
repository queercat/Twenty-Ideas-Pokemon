import PokeCard from "../PokeCard/PokeCard";
import "./PokeDisplay.css";

interface DisplayInfo {
    pokemonIDs: number[]
}

function PokeDisplay({pokemonIDs}:DisplayInfo) {
    const API_URL = "https://pokeapi.co/api/v2/pokemon/";

    return (
        <div className="poke-display">
            {[pokemonIDs.map(id => {
                return <PokeCard key={id} url={API_URL + id}/>
            })]}
        </div>
    )
}

export default PokeDisplay;
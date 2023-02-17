import "./PokeCard.css";

import { PokeBlob } from "../PokeDisplay/PokeDisplay";

/**
 * @interface Cardinfo
 * @field blob {PokeBlob} a blob containing the needed data to render our Pokemon card (ha) / component.
 */
interface CardInfo {
    blob: PokeBlob,
}

function PokeCard({blob}:CardInfo) {
    const name = blob?.name;
    const imageURL = blob?.imageURL;

    return (
        <div className="poke-container">
            <div className="poke-body">
                {imageURL ? <img alt={name} className="poke-image" src={imageURL}></img> : <div className="placeholder-image"/>}
                <h5>{name}</h5>
            </div>
        </div>
    )
}

export default PokeCard;
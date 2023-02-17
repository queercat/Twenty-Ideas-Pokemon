import "./PokeCard.css";

import { useEffect, useState } from "react";

interface CardInfo {
    url:string
}

function PokeCard({url}:CardInfo) {
    const [name, setName] = useState("...");
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
        const getData = async () => {
            return fetch(url);
        }

        getData().then(body => {
            body.text().then(text => {
                const resp = JSON.parse(text);
                let name = resp["name"];
                let frontSpriteURL = resp["sprites"]["front_default"];

                /* https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript */
                setName(name[0].toUpperCase() + name.slice(1));
                setImageURL(frontSpriteURL);
            })
        });
    })

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
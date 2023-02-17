import React from 'react';
import './RadioLabel.css';

interface LabelInfo {
    name: string; 
    label: string;
    stateCallback: any; 
}

/**
 * @brief a radio label component that follows the spec doc.
 * @param name {string} the radio group the input will belong to.
 * @param label {string} the actual label that will be displayed after our input.
 * @param stateCallback {function} this is some kind of state update for each input when the value changes.
 */
function RadioLabel({name, label, stateCallback}:LabelInfo) {
    return (
        <div className="radio-label">
            <input name={name} className="radio-input" type="radio" onChange={stateCallback}></input>
            <p className="body-1">{label}</p>
        </div>
    )
}

export default RadioLabel;
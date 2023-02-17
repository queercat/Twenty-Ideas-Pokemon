import React from 'react';
import './RadioLabel.css';

/**
 * @interface LabelInfo
 * @field {string} name the name of our radio group.
 * @field {string} label the label that appears after the radio input.
 * @field {function} stateCallback a function callback to propagate state changes upwards.
 * @field {boolean} defaultState whether or not the radio should start selected.
 */
interface LabelInfo {
    name: string, 
    label: string,
    stateCallback: any,
    defaultState: boolean,
}

/**
 * @desc a radio label component that follows the spec doc.
 * @param name {string} the radio group the input will belong to.
 * @param label {string} the actual label that will be displayed after our input.
 * @param stateCallback {function} this is some kind of state update for each input when the value changes.
 * @param state {boolean} the state of the value referenced by the callback passed down.
*/
function RadioLabel({name, label, stateCallback, defaultState}:LabelInfo) {
    return (
        <div className="radio-label">
            <input defaultChecked={defaultState} name={name} className="radio-input" type="radio" onChange={stateCallback}></input>
            <p className="body-1">{label}</p>
        </div>
    )
}

export default RadioLabel;
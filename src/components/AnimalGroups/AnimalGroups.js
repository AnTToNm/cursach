import React, { useState } from "react";
import AnimalGroup from "./AnimalGroup";

const AnimalGroups = () => {
    const [animalGroups, setAnimalGroups] = useState([{ animalType: "", quantity: "", weight: "", notes: "" }]);

    const addAnimalGroup = () => {
        setAnimalGroups([...animalGroups, { animalType: "", quantity: "", weight: "", notes: "" }]);
    };

    const handleSubmitAll = () => {
        console.log(animalGroups);
    };

    return (
        <div>
            {animalGroups.map((group, index) => (
                <div key={index}>
                    <AnimalGroup group={group} />
                </div>
            ))}
            <button type="button" onClick={addAnimalGroup}>
                +
            </button>
            <button type="button" onClick={handleSubmitAll}>
                Submit
            </button>
        </div>
    );
};

export default AnimalGroups;

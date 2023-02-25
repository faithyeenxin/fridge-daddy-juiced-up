import React from "react";

const SearchBar = () => {
    return (
        <div className="flex gap-2">
            <input
                type="text"
                placeholder="Look for items in your fridge"
                className="w-10/12 p-2 rounded-3xl text-lg placeholder-white bg-mutedPink placeholder:font-bold font-lora px-5 py-2"
            />
            <button className="w-2/12 bg-orange text-white p-2 rounded-3xl font-bold font-lora text-lg">Search</button>
        </div>
    );
};

export default SearchBar;

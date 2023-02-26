import React, { useState } from "react";
import { showFilteredItems, showUserItems, updateFilteredItems } from "../app/slices/itemsSlice";
import { useAppDispatch, useAppSelector } from "../app/store";
import { capitalizeSpecificObjKey } from "./utility/functions/capitalizeSpecificObjKey";
import { lowercaseSpecificObjKey } from "./utility/functions/lowercaseSpecificObjKey";

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useAppDispatch()
    const filteredItems = useAppSelector(showFilteredItems);
    const allUserItems = useAppSelector(showUserItems);


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let lowercasedFilteredItems = lowercaseSpecificObjKey(allUserItems, 'name');
        let result = lowercasedFilteredItems.filter((item) => item.name.includes(searchValue.toLowerCase()))
        dispatch(updateFilteredItems(capitalizeSpecificObjKey(result, 'name')))
        setSearchValue('')
    };
    return (
        // <div className="flex gap-2">
        <form className="flex gap-2" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Looking for something?"
                value={searchValue}
                className="w-10/12 p-2 rounded-3xl text-lg text-white opacity-80 placeholder-white bg-mutedPink placeholder:font-bold font-lora px-5 py-2 focus:outline-none"
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
                className="w-2/12 bg-orange text-white p-2 rounded-3xl font-bold font-lora text-lg hover:bg-gradient-to-r from-orange to-pink"
                type="submit"
            >
                Search
            </button>
        </form>
        // </div>
    );
};

export default SearchBar;

import React, { useState } from "react";
import {
    showFilteredItems,
    showUserItemsLoadingState,
} from "../app/slices/itemsSlice";
import { useAppSelector } from "../app/store";
import { capitalizeWords } from "./utility/functions/capitalizeWord";
import differenceInDays from "date-fns/differenceInDays";
import format from "date-fns/format";
import SingleItemRow from "./SingleItemRow";

const ItemsTable = () => {
    const filteredItems = useAppSelector(showFilteredItems);
    const filterStatus = useAppSelector(showUserItemsLoadingState);
    let colorState = true;
    // console.log("items table");
    // console.log(filteredItems);
    // console.log(filteredItems.length);
    return (
        <div className="w-full h-[600px] bg-offWhite rounded-lg overflow-auto">
            <div className="relative flex flex-col justify-between">
                <div className="w-full">
                    <div
                        id="table-head"
                        className="flex bg-orange font-lora text-white text-bold text-md text-center items-center h-[45px] shadow-xl"
                    >
                        <div className="w-2/12 tracking-wide">Days Left</div>
                        <div className="w-4/12 tracking-wide">Name</div>
                        <div className="w-1/12">Quantity</div>
                        <div className="w-2/12">Stored In</div>
                        <div className="w-2/12">Purchased</div>
                        <div className="w-2/12">Expiration</div>
                        <div className="w-1/12 flex items-center justify-center">
                            <img src="images/table/untrashed.svg" />
                        </div>
                    </div>

                    {filterStatus && (
                        <div className="flex justify-center items-center text-center">
                            <img
                                className="flex w-[100px] h-[400px]"
                                src="images/table/loading-animation.svg"
                            />
                        </div>
                    )}
                    {!filterStatus && filteredItems.length === 0 && (
                        <div className="flex w-full h-[400px] justify-center items-center">
                            <div className="font-lora text-orange opacity-70 text-lg tracking-wider font-light">You don't have any items here!</div>
                        </div>
                    )}
                    {!filterStatus &&
                        filteredItems.map((item, idx) => {
                            colorState = !colorState;
                            return (
                                <SingleItemRow key={idx} item={item} colorState={colorState} />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default ItemsTable;

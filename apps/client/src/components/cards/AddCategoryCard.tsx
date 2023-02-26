import React, { useState } from "react";
import { showCategories } from "../../app/slices/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";
import DropdownButton from "../button/DropdownButton";
import { capitalizeWords } from "../utility/functions/capitalizeWord";

const AddCategoryCard = () => {

    return (
        <div className="flex flex-col w-full h-[260px] bg-offWhite rounded-lg">
            <div className="flex items-center justify-evenly flex-col h-full m-5">
                <div className="text-3xl font-lora font-bold text-orange tracking-wider">
                    Add a Category
                </div>
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none"
                />
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Pantry"
                        className="w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Fridge"
                        className="w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Freezer"
                        className="w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none"
                    />
                </div>
                <div className="flex justify-center w-full bg-orange rounded-3xl items-center hover:bg-gradient-to-r from-orange to-pink">
                    <img src="images/cards/add.svg" />
                </div>
            </div>

        </div>
    );
};

export default AddCategoryCard;
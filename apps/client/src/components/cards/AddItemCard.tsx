import React, { useState } from "react";
import { showCategories } from "../../app/slices/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";
import DropdownButton from "../button/DropdownButton";
import { capitalizeWords } from "../utility/functions/capitalizeWord";

const AddItemCard = () => {
    const categories = useAppSelector(showCategories);
    console.log(categories);
    const categoriesNameOnly = categories.map((item, idx) =>
        capitalizeWords(item.name)
    );
    console.log(categoriesNameOnly);
    const [purchasedClicked, setPurchasedClicked] = useState(false);
    const [expirationClicked, setexpirationClicked] = useState(false);

    return (
        <div className="flex flex-col w-full h-[380px] bg-offWhite rounded-lg">
            <div className="flex items-center justify-evenly flex-col h-full m-5">
                <div className="text-3xl font-lora font-bold text-orange tracking-wider">
                    Add an Item
                </div>
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none"
                />
                <input
                    type="text"
                    placeholder="Quantity"
                    className="w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none"
                />
                {/* <input
                    type="text"
                    placeholder="Category"
                    className="w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none"
                /> */}
                <DropdownButton name="Category" items={categoriesNameOnly} />
                <DropdownButton
                    name="Compartment"
                    items={["Pantry", "Fridge", "Freezer"]}
                />

                <div className="flex gap-2 justify-around w-full">
                    <div className={`${purchasedClicked ? 'hidden' : ''} px-1 w-full gap-1 flex items-center justify-center rounded-3xl bg-opacity-60 text- tracking-wide  text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none`} onClick={() => setPurchasedClicked(!purchasedClicked)}>
                        Purchased <img src="images/cards/date_small.svg" />
                    </div>
                    <input
                        className={`${purchasedClicked ? '' : 'hidden'} px-1 w-full rounded-3xl bg-opacity-60 text-sm tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none`}
                        placeholder="Purchased"
                        type="date"
                    // open={true}
                    />
                    <div className={`${expirationClicked ? 'hidden' : ''} px-1 w-full gap-1 flex items-center justify-center rounded-3xl bg-opacity-60 text- tracking-wide  text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none`} onClick={() => setexpirationClicked(!expirationClicked)}>
                        Expiration <img src="images/cards/date_small.svg" />
                    </div>
                    <input
                        className={`${expirationClicked ? '' : 'hidden'} px-1 w-full rounded-3xl bg-opacity-60 text-sm tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none `}
                        placeholder="Expiration"
                        type="date"
                    />
                    <img src="images/cards/add.svg" className="bg-orange rounded-3xl" />
                </div>
            </div>

        </div>
    );
};

export default AddItemCard;

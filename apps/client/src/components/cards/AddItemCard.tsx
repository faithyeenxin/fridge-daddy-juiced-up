import React, { useState } from "react";
import { showCategories } from "../../app/slices/categoriesSlice";
import { getUserId } from "../../app/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { ICategory, IItem } from "../../interface";
import DropdownSelect from "../button/DropdownSelect";
import { capitalizeWords } from "../utility/functions/capitalizeWord";
import { format, min, max, add, parseISO } from "date-fns";
import { getDurationFromDays } from "../utility/functions/getDurationFromDays";
import { addDurationToDate } from "../utility/functions/addDurationToDate";
import {
  createItem,
  showAddItemLoadingState,
} from "../../app/slices/itemsSlice";
interface IShelfLife {
  id: number;
  name: string;
  days: number;
}
const AddItemCard = () => {
  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const token: any = useAppSelector(getUserId);
  const addItemLoading = useAppSelector(showAddItemLoadingState);

  const dispatch = useAppDispatch();
  const categories = useAppSelector(showCategories);
  const [shelfLife, setShelfLife] = useState([
    { id: 1, name: "Pantry", days: 0 },
    { id: 2, name: "Fridge", days: 0 },
    { id: 3, name: "Freezer", days: 0 },
  ]);
  const [purchasedOnDisplay, setPurchasedOnDisplay] = useState(false);
  const [expirationOnDisplay, setExpirationOnDisplay] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState(todayStr);
  const [expiryDate, setExpiryDate] = useState(todayStr);
  const [daysInFocus, setDaysInFocus] = useState(0);
  console.log(token);
  const [newItem, setNewItem] = useState<IItem>({
    userId: token.id,
    name: "",
    purchaseDate: new Date(),
    expiryDate: new Date(),
    categoryId: "",
    storedIn: "",
    quantity: "",
    trashed: false,
  });

  const handleSubmit = (e: any) => {
    let data = { ...newItem, userId: token.id };
    dispatch(createItem(data))
      .unwrap()
      .then((originalPromiseResult) => {
        // handle result here
        console.log("item has been added to database");
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        console.log("item could not be added to database");
      });
  };

  return (
    <div
      className="flex flex-col w-full h-[380px] bg-offWhite rounded-lg"
      onMouseLeave={() => {
        setPurchasedOnDisplay(false);
        setExpirationOnDisplay(false);
      }}
    >
      <div className="flex items-center justify-evenly flex-col h-full m-5">
        <div className="text-3xl font-lora font-bold text-orange tracking-wider">
          Add an Item
        </div>
        <input
          type="text"
          id="itemName"
          name="itemName"
          placeholder="Name"
          spellCheck={true}
          maxLength={20}
          autoComplete="off"
          className="w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none"
          onChange={(e) => {
            setNewItem({ ...newItem, name: e.target.value });
          }}
        />
        <input
          type="text"
          id="quantity"
          name="quantity"
          spellCheck={true}
          maxLength={9}
          placeholder="Quantity"
          autoComplete="off"
          className="w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none"
          onChange={(e) => {
            setNewItem({ ...newItem, quantity: e.target.value });
          }}
        />
        {/* <input
                    type="text"
                    placeholder="Category"
                    className="w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none"
                /> */}
        <DropdownSelect
          name="Category"
          items={categories}
          newItem={newItem}
          setNewItem={setNewItem}
          setShelfLife={setShelfLife}
          purchaseDate={purchaseDate}
          setExpiryDate={setExpiryDate}
          setDaysInFocus={setDaysInFocus}
        />
        <DropdownSelect
          name="Compartment"
          items={shelfLife}
          newItem={newItem}
          setNewItem={setNewItem}
          setShelfLife={setShelfLife}
          purchaseDate={purchaseDate}
          setExpiryDate={setExpiryDate}
          setDaysInFocus={setDaysInFocus}
        />

        <div className="flex gap-2 justify-around w-full">
          <div
            className={`${
              purchasedOnDisplay ? "hidden" : ""
            } px-1 w-full gap-1 flex items-center justify-center rounded-3xl bg-opacity-60 text- tracking-wide  text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none`}
            onMouseEnter={() => setPurchasedOnDisplay(!purchasedOnDisplay)}
          >
            Purchased <img src="images/cards/date_small.svg" />
          </div>
          <input
            className={`${
              purchasedOnDisplay ? "" : "hidden"
            } px-1 w-full rounded-3xl bg-opacity-60 text-sm tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none`}
            placeholder="Purchased"
            defaultValue={todayStr}
            type="date"
            min={purchaseDate}
            onChange={(e) => {
              //"yyyy-MM-dd"
              setPurchaseDate(e.target.value);
              setNewItem({
                ...newItem,
                purchaseDate: parseISO(
                  format(new Date(e.target.value), "yyyy-MM-dd")
                ),
              });
              let newExpiryDate = new Date(e.target.value);
              newExpiryDate.setDate(
                new Date(e.target.value).getDate() + daysInFocus
              );
              setExpiryDate(format(newExpiryDate, "yyyy-MM-dd"));
            }}
          />
          <div
            className={`${
              expirationOnDisplay ? "hidden" : ""
            } px-1 w-full gap-1 flex items-center justify-center rounded-3xl bg-opacity-60 text- tracking-wide  text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none`}
            onMouseEnter={() => setExpirationOnDisplay(!expirationOnDisplay)}
          >
            Expiration <img src="images/cards/date_small.svg" />
          </div>
          <input
            className={`${
              expirationOnDisplay ? "" : "hidden"
            } px-1 w-full rounded-3xl bg-opacity-60 text-sm tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora text-center focus:bg-opacity-80 focus:outline-none `}
            placeholder="Expiration"
            type="date"
            min={purchaseDate}
            defaultValue={purchaseDate}
            value={expiryDate}
            onChange={(e) => {
              setNewItem({
                ...newItem,
                expiryDate: parseISO(
                  format(new Date(e.target.value), "yyyy-MM-dd")
                ),
              });
            }}
          />
          <img
            onClick={handleSubmit}
            src="images/cards/add.svg"
            className="bg-orange rounded-3xl hover:bg-gradient-to-r from-orange to-pink"
          />
        </div>
      </div>
    </div>
  );
};

export default AddItemCard;

import React, { useState } from "react";
import { showCategories } from "../app/slices/categoriesSlice";
import { createItem, showUserItems } from "../app/slices/itemsSlice";
import { getUserId } from "../app/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../app/store";
import CardItem from "../components/cards/CardItem";
import format from "date-fns/format";
import differenceInDays from "date-fns/differenceInDays";
import { addDays } from "date-fns";
import parseISO from "date-fns/parseISO";
import CardItemDisplay from "../components/cards/CardItemDisplay";

const AddItem = () => {
  const token: any = useAppSelector(getUserId);
  const categories = useAppSelector(showCategories);
  const allUserItems = useAppSelector(showUserItems);
  const [categorySelected, setCategorySelected] = useState(true);
  const [locationSelected, setLocationSelected] = useState(true);
  const [location, setLocation] = useState<any>({});
  const [purchaseDate, setPurchaseDate] = useState<Date>(new Date());
  const [shelfLifeInFocus, setShelfLifeInFocus] = useState(0);
  let dispatch = useAppDispatch();
  let today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const [expiryDate, setExpiryDate] = useState(todayStr);

  // const [itemAdded, setItem] = useState({
  //   userId: token.id,
  //   name: "",
  //   purchaseDate: new Date(),
  //   expiryDate: new Date(),
  //   categoryId: categories[0].id,
  //   quantity: "",
  //   trashed: false,
  // });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    // console.log(String(formData.get("location")).replace(/[^a-zA-Z]+/g, ""));

    if (
      formData.get("itemName")?.length !== 0 &&
      formData.get("quantity")?.length !== 0 &&
      formData.get("category")?.length !== 0 &&
      formData.get("location")?.length !== 0 &&
      formData.get("purchaseDate")?.length !== 0 &&
      formData.get("expiryDate")?.length !== 0
    ) {
      console.log("submission allowed");

      let item = {
        userId: token.id,
        name: String(formData.get("itemName")).toLowerCase(),
        purchaseDate: new Date(String(formData.get("purchaseDate"))),
        expiryDate: new Date(String(formData.get("expiryDate"))),
        categoryId: String(formData.get("category")),
        storedIn: String(formData.get("location")).replace(/[^a-zA-Z]+/g, ""),
        quantity: String(formData.get("quantity")),
        trashed: false,
      };
      dispatch(createItem(item))
        .unwrap()
        .then((originalPromiseResult) => {
          // handle result here
          console.log("item has been added to database");
        })
        .catch((rejectedValueOrSerializedError) => {
          // handle error here
          console.log("item could not be added to database");
        });
    } else {
      console.log("submission failed");
    }
  };

  return (
    <div>
      <form id="form" onSubmit={handleSubmit}>
        <div className="my-10 mx-10 md:mx-20 space-y-5 ">
          <div className="flex w-full space-x-5">
            <div className="w-full">
              {/* <label
            htmlFor="itemName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name of Item
          </label> */}
              <input
                type="text"
                id="itemName"
                name="itemName"
                spellCheck={true}
                maxLength={20}
                placeholder="Name of Item"
                autoComplete="off"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="w-full">
              {/* <label
            htmlFor="quantity"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Quantity
          </label> */}
              <input
                type="text"
                id="quantity"
                name="quantity"
                spellCheck={true}
                autoComplete="off"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Quantity"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <select
              name="category"
              id="category"
              className="w-1/4 dropdown-toggle
            disabled:opacity-40
            disabled:cursor-not-allowed
              px-6
              py-2.5
              bg-gray-200
              text-gray-700
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              shadow-md
              hover:bg-gray-300 hover:shadow-lg
              focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-gray-400 active:shadow-lg active:text-white
              transition
              duration-150
              ease-in-out
              flex
              items-center
              whitespace-nowrap"
              onChange={(e) => {
                // console.log("category has been changed");
                // console.log(e.target.value);
                let categoryChosen = categories.find(
                  (cat) => cat.id === e.target.value
                );

                setLocation({
                  Select: "",
                  Fridge: categoryChosen?.fridgeDays,
                  Freezer: categoryChosen?.freezerDays,
                  Pantry: categoryChosen?.pantryDays,
                });
                if (e.target.value !== "-") {
                  setCategorySelected(false);
                } else {
                  setCategorySelected(true);
                }
              }}
            >
              {categories.map((category, idx) => {
                return (
                  <option key={idx} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>

            <select
              name="location"
              id="location"
              disabled={categorySelected}
              className="w-1/4 dropdown-toggle
            disabled:opacity-40
            disabled:cursor-not-allowed
              px-6
              py-2.5
              bg-gray-200
              text-gray-700
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              shadow-md
              hover:bg-gray-300 hover:shadow-lg
              focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-gray-400 active:shadow-lg active:text-white
              transition
              duration-150
              ease-in-out
              flex
              items-center
              whitespace-nowrap"
              onChange={(e) => {
                // console.log("location has been changed");
                // console.log(e.target.value);
                if (e.target.value !== "Select-") {
                  setLocationSelected(false);
                  setShelfLifeInFocus(
                    Number(e.target.value.replace(/[^0-9.]+/g, ""))
                  );
                  let newExpiryDate = format(
                    addDays(
                      purchaseDate,
                      Number(e.target.value.replace(/[^0-9.]+/g, ""))
                    ),
                    "yyyy-MM-dd"
                  );
                  // console.log(newExpiryDate);
                  setExpiryDate(newExpiryDate);
                } else {
                  setLocationSelected(true);
                }
              }}
            >
              {Object.keys(location).map((loc, idx) => {
                let val = loc;
                return (
                  <option key={idx} value={`${loc}-${location[val]}`}>
                    {loc}-{location[loc]} Days
                  </option>
                );
              })}
            </select>

            <input
              type="date"
              id="purchaseDate"
              disabled={locationSelected}
              name="purchaseDate"
              className="w-1/4"
              defaultValue={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setPurchaseDate(new Date(e.target.value));
                let newExpiryDate = format(
                  addDays(new Date(e.target.value), shelfLifeInFocus),
                  "yyyy-MM-dd"
                );
                setExpiryDate(newExpiryDate);
              }}
            />

            <input
              type="date"
              disabled={locationSelected}
              id="expiryDate"
              name="expiryDate"
              min={new Date(purchaseDate).toISOString().split("T")[0]}
              // value="2023-12-12"
              className="w-1/4"
              value={expiryDate}
              onChange={(e) => {
                setExpiryDate(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              className="disabled:opacity-40 w-full text-white bg-gradient-to-br from-pink-500 disabled:cursor-not-allowed to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              disabled={categorySelected || locationSelected}
            >
              Add Item!
            </button>
          </div>
        </div>
      </form>

      {/* <pre>{JSON.stringify(allUserItems, null, "\t")}</pre> */}
      {/* <div className="first-letter:mt-2 text-center items-center justify-center lg:justify-start lg:text-left"> */}
      <div className="flex flex-wrap gap-3 justify-center mx-10 md:mx-20">
        {allUserItems.map((item, idx) => (
          <CardItemDisplay item={item} />
        ))}
      </div>
    </div>
  );
};

export default AddItem;

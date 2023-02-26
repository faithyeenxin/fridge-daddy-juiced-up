import React, { useEffect, useRef, useState } from "react";
import { getUserId } from "../../app/slices/userSlice";
import { useAppSelector } from "../../app/store";
import { ICategory } from "../../interface";
import { capitalizeWords } from "../utility/functions/capitalizeWord";
import DropdownOption from "./DropdownOption";
import { format, min, max, add } from "date-fns";
interface IShelfLife {
  id: number;
  name: string;
  days: number;
}
interface IDropdownProps {
  name: string;
  items: IShelfLife[] | ICategory[];
  purchaseDate: any;
  setShelfLife: any;
  setExpiryDate: any;
  setDaysInFocus: any;
  newItem: any;
  setNewItem: any;
  resetState: any;
}

const DropdownSelect = ({
  name,
  items,
  setShelfLife,
  purchaseDate,
  setExpiryDate,
  setDaysInFocus,
  newItem,
  setNewItem,
  resetState,
}: IDropdownProps) => {
  const divRef: any = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState<IShelfLife | ICategory>();

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        // Clicked outside the div, so hide it
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedValue(undefined);
  }, [resetState]);

  const handleSelectedValue = (dropdownName: string, item: any) => {
    console.log(item);
    setSelectedValue(item);
    if (dropdownName === "Category") {
      setNewItem({ ...newItem, categoryId: item.id });
      if (item.name !== "-") {
        const newItem = [
          {
            id: 1,
            name: `Pantry - ${item.pantryDays} Days`,
            days: item.pantryDays,
          },
          {
            id: 2,
            name: `Fridge - ${item.fridgeDays} Days`,
            days: item.fridgeDays,
          },
          {
            id: 3,
            name: `Freezer - ${item.freezerDays} Days`,
            days: item.freezerDays,
          },
        ];
        setShelfLife(newItem);
      } else {
        setShelfLife([
          { id: 1, name: "Pantry", days: 0 },
          { id: 2, name: "Fridge", days: 0 },
          { id: 3, name: "Freezer", days: 0 },
        ]);
      }
    }
    if (dropdownName === "Compartment") {
      setNewItem({ ...newItem, storedIn: item.name.split(" ")[0] });
      setDaysInFocus(item.days);
      console.log(item.days);
      let newExpiryDate = new Date();
      newExpiryDate.setDate(new Date(purchaseDate).getDate() + item.days);
      console.log(newExpiryDate);
      setExpiryDate(format(newExpiryDate, "yyyy-MM-dd"));
    }
  };

  return (
    <div className="w-full" ref={divRef}>
      <button
        id="dropdownSearchButton"
        onClick={() => setOpenDropdown(!openDropdown)}
        className="relative items-center text-center justify-center inline-flex w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white disabled:text-gray-100 placeholder-white bg-mutedPink placeholder:font-bold font-lora focus:bg-opacity-80 focus:outline-none"
        data-value={selectedValue?.id}
      >
        {selectedValue ? capitalizeWords(selectedValue?.name) : name}
        <img src="/images/cards/dropdown.svg" className="absolute right-7" />
      </button>
      {/* <!-- Dropdown menu --> */}
      <div className="relative w-full">
        <div
          id={`dropdownSearch`}
          className={`z-10 ${
            openDropdown ? "" : "hidden"
          } rounded-lg shadow absolute bg-extraMutedPink mt-2 inset-0 ${
            name === "Compartment" ? "h-[100px]" : "h-[300px]"
          }`}
        >
          {name !== "Compartment" && (
            <div className="p-3">
              <label htmlFor="input-group-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-mutedPink"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="input-group-search"
                  className="block w-full p-1 pl-10 text-md text-mutedPink border border-gray-300 rounded-3xl bg-white placeholder:text-mutedPink placeholder:font-bold font-lora focus:outline-none"
                  placeholder={`Search ${name}`}
                />
              </div>
            </div>
          )}
          <ul
            className={`h-48 px-3 ${
              name === "Category" ? "pb-3" : "py-3"
            } overflow-y-auto text-md text-white`}
            aria-labelledby="dropdownSearchButton"
          >
            {items.map((item, idx) => {
              return (
                <DropdownOption
                  key={idx}
                  dropdownName={name}
                  item={item}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                  handleSelectedValue={handleSelectedValue}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropdownSelect;

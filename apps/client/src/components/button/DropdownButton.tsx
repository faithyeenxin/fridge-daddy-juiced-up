import React, { useEffect, useRef, useState } from "react";
import { ICategory } from "../../interface";

interface IDropdownProps {
    name: string;
    items: string[];
}
const DropdownButton = ({ name, items }: IDropdownProps) => {
    const divRef: any = useRef(null);
    const [openDropdown, setOpenDropdown] = useState(false);
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

    return (
        <div className="w-full" ref={divRef}>
            <button
                id="dropdownSearchButton"
                onClick={() => setOpenDropdown(!openDropdown)}
                className="relative items-center text-center justify-center inline-flex w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white placeholder-white bg-mutedPink placeholder:font-bold font-lora focus:bg-opacity-80 focus:outline-none"
                type="button"
            >
                {name}
                <img src="/images/cards/dropdown.svg" className="absolute right-7" />
            </button>
            {/* <!-- Dropdown menu --> */}
            <div className="relative w-full">
                <div
                    id={`dropdownSearch`}
                    className={`z-10 ${openDropdown ? "" : "hidden"
                        } rounded-lg shadow absolute bg-extraMutedPink mt-2 inset-0 ${name === "Compartment" ? 'h-[100px]' : 'h-[300px]'}`}
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
                        className={`h-48 px-3 ${name === "Category" ? "pb-3" : "py-3"
                            } overflow-y-auto text-md text-white`}
                        aria-labelledby="dropdownSearchButton"
                    >
                        {items.map((item, idx) => (
                            <li key={idx}>
                                <div className="flex items-center rounded-2xl pl-2 text-orange font-lora hover:bg-white hover:cursor-pointer">
                                    {item}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DropdownButton;

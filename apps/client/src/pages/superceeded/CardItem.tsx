import { format } from "date-fns";
import differenceInDays from "date-fns/differenceInDays";
import { trashItem, untrashItem } from "../../app/slices/itemsSlice";
import { useAppDispatch } from "../../app/store";
import { IItem } from "../../interface";

import trash from "../../assets/img/trash.png";
import untrash from "../../assets/img/untrash.png";
const CardItem = (item: any) => {
  let days = differenceInDays(new Date(item.item.expiryDate), new Date());
  const dispatch = useAppDispatch();
  let avatarColor = {
    green: { bg: "bg-green-200", text: "text-green-900" },
    red: { bg: "bg-red-200", text: "text-red-900" },
    gray: { bg: "bg-gray-700", text: "text-gray-300" },
    yellow: { bg: "bg-yellow-200", text: "text-yellow-900" },
  };

  return (
    <div className="w-80 h-12 md:w-60 md:h-40 flex flex-col items-center justify-center rounded-lg shadow-md md:flex-row md:max-w-md hover:bg-gray-100 bg-white">
      <div className="flex flex-col px-2 md:px-2 w-full items-center">
        <div className="flex justify-between w-full">
          {/* AVATAR */}
          <div className="flex items-center">
            <div
              className={`inline-flex overflow-hidden relative justify-center items-center w-8 h-8 md:w-11 md:h-11 ${days < 0
                ? avatarColor.red.bg
                : days < 7
                  ? "bg-avatarOrangeBg"
                  : avatarColor.green.bg
                } rounded-full mx-1`}
            >
              <span
                className={`text-sm md:text-xl ${days < 0
                  ? avatarColor.red.text
                  : days < 7
                    ? "text-avatarOrangeFont"
                    : avatarColor.green.text
                  } font-bold`}
              >
                {days}
              </span>
            </div>
          </div>

          {/* NAME */}
          <div className="flex w-full md:mx-0 md:w-auto gap-2">
            <h5 className="flex mb-1 text-sm md:text-md font-bold tracking-tight text-orange items-center">
              {item.item.name}{" "}
            </h5>

            {/* MOBILE VIEW */}
            <div className="flex md:hidden items-center pt-1">
              <h4 className="flex mb-1 text-xs italic tracking-tight text-gray-400 items-center">
                {item.item.quantity} • {item.item.storedIn}
              </h4>
            </div>
          </div>

          {/* TRASH ICON */}
          {item.item.trashed ? (
            <div
              className="flex items-center"
              onClick={() => {
                console.log(`untrash item: ${item.item.id} was clicked`);
                dispatch(untrashItem(item.item.id));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          ) : (
            <div
              className="flex items-center"
              onClick={() => {
                console.log(`trash item: ${item.item.id} was clicked`);
                dispatch(trashItem(item.item.id));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="w-full justify-center items-center">
          <p className="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400 hidden md:block">
            Purchased: {""}
            {format(new Date(item.item.purchaseDate), "d MMM yy")} <br />
            Expire on: {format(new Date(item.item.expiryDate), "d MMM yy")}
            <br />
            Qty: {item.item.quantity}
            <br />
            Stored In: {item.item.storedIn}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;

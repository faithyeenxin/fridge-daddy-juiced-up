import { Tab } from "@headlessui/react";
import CardItem from "./superceeded/CardItem";
import { useAppDispatch, useAppSelector } from "../app/store";
import isAfter from "date-fns/isAfter";

import {
  // getEvergreenItems,
  // getRottenItems,
  // getTrashedItems,
  showUserItems,
} from "../app/slices/itemsSlice";
import { useEffect, useState } from "react";
import { all } from "axios";
import { taskCancelled } from "@reduxjs/toolkit/dist/listenerMiddleware/exceptions";
import LandingHero from "../components/HomeHero";
import AddItemCard from "../components/cards/AddItemCard";
import AddCategoryCard from "../components/cards/AddCategoryCard";
import SearchBar from "../components/SearchBar";
import ItemsTable from "../components/ItemsTable";
import FilterCard from "../components/cards/FilterCard";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  let userItems = useAppSelector(showUserItems);
  // let evergreen = useAppSelector(getEvergreenItems);
  // let rotten = useAppSelector(getRottenItems);
  // let trashed = useAppSelector(getTrashedItems);

  return (
    <div>
      <LandingHero />
      <div className="flex gap-5">
        <div className="flex w-3/12 flex-col gap-6">
          <AddItemCard />
          <AddCategoryCard />
        </div>
        <div className="flex flex-col w-7/12 gap-5">
          <SearchBar />
          <ItemsTable />
        </div>
        <div className="w-2/12">
          <FilterCard />
        </div>
      </div>
    </div>
  );
}

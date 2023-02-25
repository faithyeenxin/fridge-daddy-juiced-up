import React, { MouseEvent, useEffect, useState } from "react";
import {
  createCategory,
  fetchAllCategories,
  showCategories,
} from "../../app/slices/categoriesSlice";
import { getUserId } from "../../app/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";
const AddCategory = () => {
  const token: any = useAppSelector(getUserId);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(showCategories);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    if (formData.get("name")?.length !== 0) {
      console.log("submission allowed");
      let newCategory = {
        userId: token.id,
        name: String(formData.get("name")),
        dateCreated: new Date(),
        pantryDays: Number(formData.get("pantryDays")),
        fridgeDays: Number(formData.get("fridgeDays")),
        freezerDays: Number(formData.get("freezerDays")),
      };
      console.log(newCategory);
      dispatch(createCategory(newCategory))
        .unwrap()
        .then((originalPromiseResult) => {
          // handle result here
          console.log("category has been added to database");
        })
        .catch((rejectedValueOrSerializedError) => {
          // handle error here
          console.log("category could not be added to database");
        });
    } else {
      console.log("please input name for category");
    }
  };

  return (
    <div>
      <form id="form" onSubmit={handleSubmit}>
        <div className="my-10 mx-3 md:mx-60 space-y-5">
          <div className="flex flex-wrap gap-x-0 space-x-1 md:space-x-5 justify-center">
            <input
              className="w-3/4 mb-2 md:w-1/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              placeholder="Category Name"
            />

            <input
              className="w-1/4 mb-2 md:w-1/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              type="number"
              id="pantryDays"
              name="pantryDays"
              autoComplete="off"
              placeholder="Pantry Days"
            />
            <input
              className="w-1/4 mb-2 md:w-1/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              type="number"
              id="fridgeDays"
              name="fridgeDays"
              autoComplete="off"
              placeholder="Fridge Days"
            />
            <input
              className="w-1/4  mb-2 md:w-1/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              type="number"
              id="freezerDays"
              name="freezerDays"
              autoComplete="off"
              placeholder="Freezer Days"
            />

            <button className="disabled:opacity-40 text-white bg-gradient-to-br from-pink-500 disabled:cursor-not-allowed to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-auto">
              Add Category
            </button>
          </div>
          {/* <div>All Categories:</div>
        <pre>{JSON.stringify(categories, null, "\t")}</pre> */}
        </div>
      </form>
    </div>
  );
};

export default AddCategory;

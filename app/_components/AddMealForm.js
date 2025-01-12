"use client";

import { uploadRestaurantData } from "../_lib/actions";
import SubmitFormButton from "./SubmitFormButton";

// Only for uploading to the DB

function AddMealForm() {
  return (
    <form
      action={uploadRestaurantData}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col max-w-2xl mx-auto"
    >
      <h2 className="text-2xl text-accent-500 font-semibold">Add New Meal</h2>

      <div className="space-y-2">
        <label htmlFor="mealName">Meal Name</label>
        <input
          type="text"
          id="mealName"
          name="mealName"
          required
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="price">Price ($)</label>
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          step="0.01"
          required
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          id="ingredients"
          name="ingredients"
          required
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          placeholder="Enter ingredients separated by commas"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="image">Meal Image</label>
        <input
          type="file"
          id="image"
          name="image"
          required
          accept="image/*"
          className="block w-full text-primary-200 
            file:mr-4 file:py-3 file:px-4
            file:rounded-sm file:border-0
            file:text-sm file:font-medium
            file:bg-accent-600 file:text-primary-100
            hover:file:bg-accent-700
            file:cursor-pointer
            bg-primary-800 rounded-sm"
        />
        <p className="mt-1 text-sm text-primary-300">
          Upload a photo of the meal (JPG, PNG up to 5MB)
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="mealType">Meal Type</label>
        <select
          id="mealType"
          name="mealType"
          required
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        >
          <option value="">Select a meal type</option>
          <option value="appetizer">Appetizer</option>
          <option value="main_course">Main Course</option>
          <option value="dessert">Dessert</option>
          <option value="beverage">Beverage</option>
        </select>
      </div>

      <div className="flex justify-end">
        <SubmitFormButton updatingLabel="Adding meal...">
          Add Meal
        </SubmitFormButton>
      </div>
    </form>
  );
}

export default AddMealForm;

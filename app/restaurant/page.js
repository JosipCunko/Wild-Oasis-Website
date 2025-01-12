import Meal from "@/app/_components/Meal";
import { getMeals, getSettings } from "@/app/_lib/data-service";
import { format } from "date-fns";
import AddMealForm from "../_components/AddMealForm";

export const metadata = {
  title: "Restaurant",
};

export default async function Page() {
  // Fetch both meals and settings in parallel
  const [meals, settings] = await Promise.all([getMeals(), getSettings()]);

  // Format time strings from database (assuming they're in format like "18:00:00")
  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":");
    return format(new Date().setHours(hours, minutes), "h:mm a");
  };

  // Group meals by type
  const groupedMeals = meals.reduce((acc, meal) => {
    if (!acc[meal.type]) acc[meal.type] = [];
    acc[meal.type].push(meal);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        The Wild Oasis Restaurant
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Welcome to our mountain-view restaurant, where rustic charm meets
        culinary excellence. Nestled in the heart of the Dolomites, our
        restaurant offers a warm, intimate setting with panoramic views of the
        surrounding peaks. Our expert chefs craft dishes using locally-sourced
        ingredients, combining traditional Italian flavors with modern
        techniques.
      </p>

      <div className="space-y-16 mb-16">
        {Object.entries(groupedMeals).map(([type, meals]) => (
          <section key={type}>
            <h2 className="text-2xl text-accent-500 font-semibold mb-6">
              {type
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h2>
            <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-8">
              {meals.map((meal) => (
                <Meal
                  key={meal.id}
                  name={meal.mealName}
                  type={meal.type}
                  ingredients={meal.ingredients}
                  image={meal.image}
                  price={meal.price}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="lg:col-span-2 bg-primary-900 p-8 mt-4 flex gap-4 items-center">
        <h2 className="text-xl text-accent-400 font-medium">Opening Hours</h2>

        <p>
          {formatTime(settings.restaurant_open)} -{" "}
          {formatTime(settings.restaurant_close)}
        </p>
      </div>
    </div>
  );
}

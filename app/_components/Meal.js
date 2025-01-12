import Image from "next/image";

function Meal({ name, type, ingredients, image, price }) {
  const formatMealType = (type) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getMealTypeColor = (type) => {
    switch (type) {
      case "appetizer":
        return "bg-emerald-800 text-emerald-100";
      case "main_course":
        return "bg-orange-900 text-orange-100";
      case "dessert":
        return "bg-amber-700 text-amber-100";
      case "beverage":
        return "bg-sky-800 text-sky-100";
      default:
        return "bg-primary-800 text-primary-200";
    }
  };

  return (
    <div className="flex border-primary-800 border">
      <div className="flex-1 relative h-[200px]">
        <Image
          src={image}
          alt={name}
          className="object-cover border-r border-primary-800"
          fill
        />
      </div>

      <div className="flex-[1.5]">
        <div className="pt-5 pb-4 px-7 bg-primary-950 h-full flex flex-col">
          <div className="mb-auto">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-accent-500 font-semibold text-2xl">{name}</h3>
              <span className="text-2xl font-[350]">${price}</span>
            </div>

            <span
              className={`inline-block px-3 py-1 rounded-sm mb-4 text-sm ${getMealTypeColor(
                type
              )}`}
            >
              {formatMealType(type)}
            </span>

            {ingredients !== "/" && (
              <p className="text-primary-300">
                <span className="text-primary-400 font-medium">
                  Ingredients:{" "}
                </span>
                {ingredients}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meal;

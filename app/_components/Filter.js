"use client";

//Needs to be from "/navigation" in the app router
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const activeFilter = searchParams.get("capacity") ?? "all";

  return (
    <div className="border border-primary-800 flex">
      <FilterButton
        activeFilter={activeFilter}
        handler={handleFilter}
        filter="all"
      >
        All cabins
      </FilterButton>
      <FilterButton
        activeFilter={activeFilter}
        handler={handleFilter}
        filter="small"
      >
        1&mdash;3 guests
      </FilterButton>
      <FilterButton
        activeFilter={activeFilter}
        handler={handleFilter}
        filter="medium"
      >
        4&mdash;7 guests
      </FilterButton>
      <FilterButton
        activeFilter={activeFilter}
        handler={handleFilter}
        filter="large"
      >
        8&mdash;12 guests
      </FilterButton>
    </div>
  );
}

function FilterButton({ filter, handler, activeFilter, children }) {
  return (
    <button
      onClick={() => handler(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Filter;

"use client";

import {
  usePathname,
  useSearchParams,
  useRouter,
} from "next/navigation";

function Filter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the current filter value from the search parameters
  const currentFilter =
    searchParams?.get("capacity") || "all";

  const handleFilter = (filterTerm) => {
    if (searchParams) {
      const params = new URLSearchParams(
        searchParams.toString()
      );
      params.set("capacity", filterTerm);
      router.replace(
        `${pathname}?${params.toString()}`,
        { scroll: false }
      );
    }
  };

  return (
    <div className="flex justify-end space-x-4 mt-6 mb-6">
      <button
        className={`${
          currentFilter === "all"
            ? "bg-primary-600"
            : "bg-primary-800"
        } text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-primary-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-300`}
        onClick={() => handleFilter("all")}
      >
        All cabins
      </button>
      <button
        className={`${
          currentFilter === "small"
            ? "bg-primary-600"
            : "bg-primary-800"
        } text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-primary-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-300`}
        onClick={() => handleFilter("small")}
      >
        Small
      </button>
      <button
        className={`${
          currentFilter === "medium"
            ? "bg-primary-600"
            : "bg-primary-800"
        } text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-primary-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-300`}
        onClick={() => handleFilter("medium")}
      >
        Medium
      </button>
      <button
        className={`${
          currentFilter === "large"
            ? "bg-primary-600"
            : "bg-primary-800"
        } text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-primary-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-300`}
        onClick={() => handleFilter("large")}
      >
        Large
      </button>
    </div>
  );
}

export default Filter;

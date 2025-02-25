import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ categories, listings, t }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredListings = listings.filter((list) =>
    list.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-col w-80 mt-20 pt-10 border-r-2 hidden lg:flex">
      <p className="text-xl font-bold mb-2 text-slate-700">{t("categories")}</p>

      <input
        type="text"
        placeholder="Search by category..."
        className="p-2  w-full mb-3 border rounded-md outline-none focus:ring-2 focus:ring-[#F15C26]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <p className="text-sm font-bold mb-2 text-slate-700">In Stock</p>

      <div className="max-h-[300px] overflow-y-auto">
        {filteredCategories.slice(0, 5).map((category) => (
          <div key={category.id}>
            <Link className="mb-4 hover:text-[#F15C26]" to="/">
              {category.name}
            </Link>
          </div>
        ))}
      </div>

      <p className="text-sm font-bold mt-4 font-bold mb-2 text-slate-700">
        Real Estate
      </p>

      {/* Scrollable Listings */}
      <div className="max-h-[300px] overflow-y-auto">
        {filteredListings.slice(0, 5).map((list) => (
          <div key={list.category_id}>
            <Link className="mb-4 hover:text-[#F15C26]" to="/">
              {list.category_name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

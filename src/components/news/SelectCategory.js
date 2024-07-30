"use client";
import { useState } from "react";

const categories = ["전체", "비즈니스", "연예", "위생", "과학", "스포츠", "기술"];

const SelectCategory = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (onSelect) {
      onSelect(category);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4">
      <div className="flex justify-around items-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`py-2 ${
              selectedCategory === category
                ? "text-xl font-bold underline"
                : "text-lg text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
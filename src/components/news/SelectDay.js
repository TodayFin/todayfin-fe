"use client";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const SelectDay = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
    if (onSelect) {
      onSelect(dayjs(date).format("YYYY.MM.DD"));
    }
  };

  const handleArrowClick = (days) => {
    const newDate = dayjs(selectedDate).add(days, "day").toDate();
    handleDateChange(newDate);
  };

  return (
    <div className="mb-8 relative">
      <div className="flex justify-center items-center">
        <button
          onClick={() => handleArrowClick(-1)}
          className="text-blue-600 mx-2"
        >
          <FaArrowLeft />
        </button>
        <span className="text-xl font-bold mx-2 flex items-center">
          {dayjs(selectedDate).format("YYYY.MM.DD")}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-600 ml-2"
          >
            <FaCalendarAlt />
          </button>
        </span>
        <button
          onClick={() => handleArrowClick(1)}
          className="text-blue-600 mx-2"
        >
          <FaArrowRight />
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy.MM.dd"
            inline
          />
        </div>
      )}
    </div>
  );
};

export default SelectDay;
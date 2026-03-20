import React, { useState } from "react";

const Select = ({ options, setter, defaultOption }) => {
  const [selected, setSelected] = useState({ name: "Select" });
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setter(option.name == "Select" ? "" : option.name);
    setSelected(option);
  };

  return (
    <div
      className={`border border-gray-500 rounded-lg py-2 px-4 relative cursor-pointer`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="name">{selected.name}</div>

      <div
        className={`absolute z-10 inset-x-0 top-[calc(100%_+_1px)] ${
          isOpen ? "block" : "hidden"
        } border border-gray-200 flex flex-col gap-1 bg-white shadow-lg p-2 rounded-lg w-full max-h-75 overflow-auto outline-none`}
      >
        <div
          className="py-2 px-3 rounded-sm hover:bg-gray-100"
          onClick={() => handleSelect({ name: "Select"})}
        >
          <div className="detail">
            <div className="name">{defaultOption}</div>
          </div>
        </div>
        {options?.map((option, i) => {
          return (
            <div
              key={i}
              className="py-2 px-3 rounded-sm hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option.icon && (
                <div className="icon">
                  <img src={option.icon} alt={option.name} />
                </div>
              )}
              <div className="detail">
                <div className="name">{option.name}</div>
                {option.tech && <div className="tech">{option.tech}</div>}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3`}
      >
        <svg
          className={`w-5 h-5 text-gray-500 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;

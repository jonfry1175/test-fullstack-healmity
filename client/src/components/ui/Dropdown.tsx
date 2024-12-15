"use client";

import { ChevronDown } from "lucide-react";

import React, { useState } from "react";

export interface DropdownItemProps {
  items: string[];
  text: string;
  handleOpen: () => void;
  onSelect: (value: string) => void; // Tambahkan prop baru
}

const Dropdown: React.FC<DropdownItemProps> = ({
  items,
  text,
  handleOpen,
  onSelect,
}) => {
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsActiveDropdown(!isActiveDropdown);
    handleOpen();
    console.log("click");
  };

  return (
    <div
      data-state={isActiveDropdown ? "open" : "closed"}
      className="relative group text-text"
    >
      <button
        aria-haspopup="listbox"
        aria-expanded={isActiveDropdown}
        onBlur={() => {
          setIsActiveDropdown(false);
          console.log("onBlur");
          onSelect(text);
        }}
        onClick={handleClick}
        className="flex w-[160px] cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main px-7 py-3 font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
      >
        <div className="mx-auto flex items-center">
          {text}
          <ChevronDown
            className={
              "ml-2 h-5 w-5 transition-transform group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0 ease-in-out"
            }
          />
        </div>
      </button>
      <div
        role="listbox"
        className="absolute left-0 w-[160px] overflow-x-hidden group-data-[state=open]:top-20 group-data-[state=open]:opacity-100 group-data-[state=closed]:invisible group-data-[state=closed]:top-[50px] group-data-[state=closed]:opacity-0 group-data-[state=open]:visible rounded-base border-2 border-border dark:border-darkBorder text-center font-base shadow-light dark:shadow-dark transition-all"
      >
        {items.map((item, index) => {
          return (
            <span
              key={index}
              onClick={() => {
                onSelect(item);
                setIsActiveDropdown(false);
              }}
              className="block w-full border-b-2 border-border dark:border-darkBorder bg-main px-7 py-3 no-underline hover:bg-mainAccent"
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;

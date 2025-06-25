import { JSX } from "react"
import { useState, useRef, useEffect } from "react";
import { DropdownOption } from "@/app/types/dropdown";

interface DropDownSelectorProps {
    options: string[];
    value?: string
    onSelect: (value: string) => void;
    placeholder?: string;
    label?: string;
    className?: string;
} // DropDownSelectorProps

const DropDownSelector =({
    options,
    value,
    onSelect,
    placeholder,
    label,
    className,
}: DropDownSelectorProps) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            } // if
        } // handleClickOutside

        document.addEventListener("mousedown", handleClickOutside);
        return() => document.removeEventListener("mousedown", handleClickOutside);

    }, []) // useEffect

    const handleSelect = (option: string) => {
        onSelect(option);
        setIsOpen(false);
    } // handleSelect

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    } // toggleDropdown

    return (
        <div className={`relative w-full ${className}`} ref={dropdownRef}>
            {/* Label */}
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            {/* Dropdown Button */}
            <button
                type="button"
                onClick={toggleDropdown}
                className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
            >
                <span className={value ? "text-gray-900" : "text-gray-500"}>
                    {value || placeholder}
                </span>

                {/* Arrow Icon */}
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                        className={`h-5 w-5 text-gray-400 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>

            {/* Dropdown Options */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleSelect(option)}
                            className={`w-full px-3 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
                                value === option ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}; // DropDownSelector

export default DropDownSelector;
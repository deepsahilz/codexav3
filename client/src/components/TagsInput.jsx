import React, { useState } from "react";
import { Controller } from "react-hook-form";
import axios from "axios";

const TagsInput = ({ tags, setTags, control,label,subLabel,placeholder }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isSuggestionLoading, setIsSuggestionLoading] = useState(false)

    // tag handlers
    const fetchTags = async (value) => {
        if (!value) return setSuggestions([]);
        setIsSuggestionLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:5000/api/tags?query=${value}`, { withCredentials: true });
            setSuggestions(data);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }finally{
            setIsSuggestionLoading(false);
        }
    };
    const addTag = (tag) => {
        if (!tags.includes(tag)) setTags([...tags, tag]);
        setQuery("");
        setSuggestions([]);
    };
    const highlightText = (text, query) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} className="text-blue-500 font-semibold">{part}</span>
            ) : (
                part
            )
        );
    };
    const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

    return (
        <div className="relative col-span-2">
            <label className="block text-zinc-700 font-semibold ">{label}</label>
            {subLabel&&<p className="mb-2  text-sm text-zinc-600">{subLabel}</p>}

            <div className="border rounded-lg p-2 bg-zinc-100 shadow-inner flex flex-wrap gap-2 items-center">
                
                {tags?.map((tag, i) => (
                    <span key={i} className="bg-white text-zinc-800 border text-sm font-medium shadow-md px-2 py-2 rounded-lg flex items-center">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-red-500 text-zinc-500 focus:outline-none">✕</button>
                    </span>
                ))}

                <Controller name="tags"
                    control={control}
                    render={() => (
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                fetchTags(e.target.value);
                                setSelectedIndex(0);
                            }}
                            onKeyDown={(e) => {
                                if (["Enter", "ArrowDown", "ArrowUp"].includes(e.key)) e.preventDefault();
                                if (e.key === "Enter" && suggestions[selectedIndex]) addTag(suggestions[selectedIndex].name);
                                if (e.key === "ArrowDown") setSelectedIndex((prev) => (prev + 1) % suggestions.length);
                                if (e.key === "ArrowUp") setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
                                if (e.key === "Backspace" && !query && tags.length) removeTag(tags[tags.length - 1]);
                            }}
                            className="outline-none p-1 bg-inherit flex-1"
                            placeholder={placeholder}
                        />
                    )}/>
            </div>

            {isSuggestionLoading ? (
                <div className="absolute top-full h-[50px] flex items-center justify-center w-full left-0 z-10 bg-white border mt-1 rounded-lg shadow-md text-center text-gray-500">
                    <span className="animate-spin h-6 w-6 py-2 border-2 border-blue-500 border-t-transparent rounded-full inline-block"></span>
                </div>
                ) : suggestions.length > 0 ? (
                <ul className="absolute z-10 w-full bg-white border mt-1 rounded-lg shadow-md">
                    {suggestions.map((suggestion, index) => (
                    <li
                        key={index}
                        className={`px-3 py-2 cursor-pointer ${index === selectedIndex ? "bg-blue-100" : "hover:bg-gray-100"}`}
                        onClick={() => addTag(suggestion.name)}
                    >
                        {highlightText(suggestion.name, query)}
                    </li>
                    ))}
                </ul>) : query && (
                <div className="absolute top-full w-full left-0 z-10 bg-white border mt-1 rounded-lg shadow-md p-3 text-center text-gray-500">
                    No results found for "{query}"
                </div>) }

        </div>
    );
};

export default TagsInput;

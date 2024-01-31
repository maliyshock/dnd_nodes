import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { AutocompleteResult, KnimeNode } from "../types";
import "./autocomplete.css";
import { useOutsideClick } from "../hooks/useOutsideClick.ts";

interface InputProps {
  placeholder: string;
  autocompleteFn(term: string): AutocompleteResult<KnimeNode>[];
  onSelect(item: AutocompleteResult<KnimeNode>): void;
}

export default function Autocomplete({ placeholder = "", autocompleteFn, onSelect }: InputProps) {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<AutocompleteResult<KnimeNode>[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));

  // we should use useCallback here
  const handleGetSuggestions = useCallback(
    debounce((term: string) => {
      const result = autocompleteFn(term);
      setSuggestions(result);
    }, 200),
    [autocompleteFn],
  );

  //TODO: initial search value and results limitation
  useEffect(() => {
    handleGetSuggestions("");
  }, [handleGetSuggestions]);

  return (
    <div className="autocomplete" ref={ref}>
      <input
        type="text"
        className="input autocomplete__input"
        placeholder={placeholder}
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          handleGetSuggestions(e.target.value);
        }}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className="autocomplete__result">
          {suggestions.length > 0 ? (
            <ul className="autocomplete__list">
              {suggestions.map(item => (
                <li
                  onClick={() => {
                    // i would rather to use useCallback here or even wrap the whole li thing to component
                    onSelect(item);
                    setSearch(item.name);
                    handleGetSuggestions(item.name);
                    setIsOpen(false);
                  }}
                  className="autocomplete__item"
                  key={item.id}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          ) : (
            "No suggestions were found"
          )}
        </div>
      )}
    </div>
  );
}

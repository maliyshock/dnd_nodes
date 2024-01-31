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

  const handleSuggestions = useCallback(
    debounce((term: string) => {
      const result = autocompleteFn(term);
      setSuggestions(result);
    }, 200),
    [autocompleteFn],
  );

  useEffect(() => {
    handleSuggestions("");
  }, [handleSuggestions]);

  return (
    <div className="autocomplete" ref={ref}>
      <input
        type="text"
        className="input autocomplete__input"
        placeholder={placeholder}
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          handleSuggestions(e.target.value);
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
                    onSelect(item);
                    setSearch(item.name);
                    handleSuggestions(item.name);
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

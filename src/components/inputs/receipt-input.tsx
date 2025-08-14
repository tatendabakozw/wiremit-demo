import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/solid';

export type QuickRecipient = { id: string; name: string; handle: string };

// Helper function to get initials for the avatar
function initials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

interface RecipientInputProps {
  recipient: string;
  setRecipient: (value: string) => void;
  quickRecipients: QuickRecipient[];
  label?: string;
  editable?: boolean;
}

const RecipientInput: React.FC<RecipientInputProps> = ({
  recipient,
  setRecipient,
  quickRecipients,
  label = 'Recipient',
  editable = true,
}) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter recipients based on the query, or show all if query is empty
  const filteredRecipients = useMemo(() => {
    if (query === '') return quickRecipients;
    return quickRecipients.filter((person) =>
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.handle.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, quickRecipients]);

  const handleSelectRecipient = (person: QuickRecipient) => {
    setRecipient(person.handle); // Set the main input value to the handle
    setQuery(''); // Clear the search query
    setShowDropdown(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRecipient(e.target.value);
      setQuery(e.target.value);
      if (!showDropdown) {
          setShowDropdown(true);
      }
  }

  return (
    <div className="w-full">
      <label htmlFor="recipient-input" className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div ref={dropdownRef} className="relative">
        <div className="relative">
            <input
            id="recipient-input"
            type="text"
            className={`w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors ${
                !editable ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
            }`}
            placeholder="name@example.com or +263..."
            value={recipient}
            onChange={handleInputChange}
            onClick={() => setShowDropdown(true)}
            disabled={!editable}
            autoComplete="off"
            />
            <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowDropdown(prev => !prev)}
            >
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
        </div>

        {showDropdown && editable && (
          <div className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
            {filteredRecipients.length > 0 ? (
                filteredRecipients.map((person) => (
                    <button
                        key={person.id}
                        type="button"
                        onClick={() => handleSelectRecipient(person)}
                        className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-primary-50 transition-colors"
                    >
                        <span className="h-8 w-8 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center text-xs font-bold text-primary-700">
                            {initials(person.name)}
                        </span>
                        <div className="flex-grow">
                            <p className="text-sm font-medium text-gray-900">{person.name}</p>
                            <p className="text-xs text-gray-500">{person.handle}</p>
                        </div>
                        {recipient === person.handle && (
                           <CheckIcon className="h-5 w-5 text-primary-600" />
                        )}
                    </button>
                ))
            ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                    No recipients found.
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipientInput;

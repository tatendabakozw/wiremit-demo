import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/solid';

export type QuickRecipient = { id: string; name: string; handle: string };

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredRecipients = useMemo(() => {
    if (query === '') return quickRecipients;
    return quickRecipients.filter((person) =>
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.handle.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, quickRecipients]);

  const handleSelectRecipient = (person: QuickRecipient) => {
    setRecipient(person.handle);
    setQuery('');
    setShowDropdown(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value);
    setQuery(e.target.value);
    if (!showDropdown) {
      setShowDropdown(true);
    }
  }

  // Animation variants
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.15 }
    }
  };

  const recipientItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.2
      }
    })
  };

  return (
    <div className="w-full">
      <motion.label 
        htmlFor="recipient-input" 
        className="block text-sm font-medium text-gray-700 mb-1"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      
      <div ref={dropdownRef} className="relative">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.005 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <motion.input
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowDropdown(prev => !prev)}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUpDownIcon 
              className="h-5 w-5 text-gray-400" 
              aria-hidden="true"
            />
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showDropdown && editable && (
            <motion.div
              className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg"
              // variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {filteredRecipients.length > 0 ? (
                <ul className="py-1">
                  {filteredRecipients.map((person, index) => (
                    <motion.li
                      key={person.id}
                      variants={recipientItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectRecipient(person)}
                        className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-primary-50 transition-colors"
                      >
                        <motion.span 
                          className="h-8 w-8 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center text-xs font-bold text-primary-700"
                          whileHover={{ scale: 1.1 }}
                        >
                          {initials(person.name)}
                        </motion.span>
                        <div className="flex-grow">
                          <p className="text-sm font-medium text-gray-900">{person.name}</p>
                          <p className="text-xs text-gray-500">{person.handle}</p>
                        </div>
                        {recipient === person.handle && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          >
                            <CheckIcon className="h-5 w-5 text-primary-600" />
                          </motion.div>
                        )}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <motion.div
                  className="px-4 py-3 text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No recipients found.
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecipientInput;
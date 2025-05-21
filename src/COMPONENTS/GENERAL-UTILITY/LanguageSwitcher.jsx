import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Icon } from "@iconify/react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "ha", label: "Hausa" },
  ];

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className='flex items-center border border-gray-400 text-black px-3 py-1 rounded-md focus:outline-none'
        >
          <span className='mr-1'>Language</span>
          <Icon icon='mdi:chevron-down' />
        </button>
      </div>

      {isOpen && (
        <div className='absolute z-10 mt-2 w-36 bg-white border border-gray-300 rounded-md shadow-sm'>
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className='w-full text-left px-4 py-2 text-black hover:bg-gray-100 rounded-md'
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

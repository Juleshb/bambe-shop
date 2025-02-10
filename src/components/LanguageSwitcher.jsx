import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className=" ">
      <select
        className="border p-2 rounded-md bg-white text-black"
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        <option value="en">🇬🇧 English</option>
        <option value="fr">🇫🇷 Français</option>
        <option value="sw">🇹🇿 Kiswahili</option>
        <option value="rw">🇷🇼 Kinyarwanda</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;

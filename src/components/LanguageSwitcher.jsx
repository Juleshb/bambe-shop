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
        <option value="en">🇬🇧</option>
        <option value="fr">🇫🇷</option>
        <option value="sw">🇹🇿</option>
        <option value="rw">🇷🇼</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ko');
  const [translatedText, setTranslatedText] = useState({});

  const translateText = async (text, targetLang) => {
    const url = `https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLang
        })
      });
      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Error translating text:', error);
      return text; // 에러 시 원본 텍스트 반환
    }
  };

  useEffect(() => {
    // 예제: 'Welcome' 문자열을 번역
    translateText('Welcome', language).then(translated => {
      setTranslatedText({ welcome: translated });
    });
  }, [language]);

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translatedText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;

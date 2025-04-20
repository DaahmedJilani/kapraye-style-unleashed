import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the available currencies
export type Currency = {
  code: string;
  symbol: string;
  name: string;
  exchangeRate: number; // Rate relative to USD
};

export const currencies: Record<string, Currency> = {
  PKR: { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', exchangeRate: 278.50 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', exchangeRate: 1 },
  SAR: { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', exchangeRate: 3.75 },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', exchangeRate: 3.67 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', exchangeRate: 0.78 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', exchangeRate: 0.91 },
};

// Define the available languages
export type Language = {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
};

export const languages: Record<string, Language> = {
  en: { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
  ur: { code: 'ur', name: 'Urdu', nativeName: 'اردو', direction: 'rtl' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl' },
};

// Translations
export type Translation = Record<string, Record<string, string>>;

export const translations: Translation = {
  en: {
    'app.title': 'Kapraye',
    'app.slogan': 'Elegance Defined',
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.continue': 'Continue Shopping',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'product.addToCart': 'Add to Bag',
    'product.addToWishlist': 'Wishlist',
    'product.size': 'Size',
    'product.quantity': 'Quantity',
  },
  ur: {
    'app.title': 'کپرے',
    'app.slogan': 'شرافت کی تعریف',
    'cart.title': 'شاپنگ کارٹ',
    'cart.empty': 'آپ کی ٹوکری خالی ہے',
    'cart.continue': 'شاپنگ جاری رکھیں',
    'cart.subtotal': 'ذیلی کل',
    'cart.shipping': 'شپنگ',
    'cart.total': 'کل',
    'cart.checkout': 'چیک آؤٹ کے لیے آگے بڑھیں',
    'product.addToCart': 'بیگ میں شامل کریں',
    'product.addToWishlist': 'پسندیدہ',
    'product.size': 'سائز',
    'product.quantity': 'مقدار',
  },
  ar: {
    'app.title': 'كبراي',
    'app.slogan': 'الأناقة معرفة',
    'cart.title': 'عربة التسوق',
    'cart.empty': 'عربة التسوق فارغة',
    'cart.continue': 'مواصلة التسوق',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.shipping': 'الشحن',
    'cart.total': 'المجموع',
    'cart.checkout': 'المتابعة إلى الدفع',
    'product.addToCart': 'أضف إلى الحقيبة',
    'product.addToWishlist': 'المفضلة',
    'product.size': 'الحجم',
    'product.quantity': 'الكمية',
  }
};

// Create context types
type AppSettingsContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  formatPrice: (price: number) => string;
  t: (key: string) => string;
};

// Create context with default values
const AppSettingsContext = createContext<AppSettingsContextType>({
  currency: currencies.PKR,
  setCurrency: () => {},
  language: languages.en,
  setLanguage: () => {},
  formatPrice: () => '',
  t: () => '',
});

export const useAppSettings = () => useContext(AppSettingsContext);

export const AppSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = React.useState<Currency>(currencies.PKR);
  const [language, setLanguage] = React.useState<Language>(languages.en);

  // Effect to handle setting the direction on the html tag
  React.useEffect(() => {
    document.documentElement.dir = language.direction;
    document.documentElement.lang = language.code;
  }, [language]);

  // Load saved preferences from localStorage on component mount
  React.useEffect(() => {
    const savedCurrency = localStorage.getItem('kapraye-currency');
    const savedLanguage = localStorage.getItem('kapraye-language');

    // If saved currency exists and valid, use it, otherwise default will stay PKR
    if (savedCurrency && currencies[savedCurrency]) {
      setCurrency(currencies[savedCurrency]);
    }

    if (savedLanguage && languages[savedLanguage]) {
      setLanguage(languages[savedLanguage]);
    }
  }, []);

  // Save preferences to localStorage when they change
  React.useEffect(() => {
    localStorage.setItem('kapraye-currency', currency.code);
  }, [currency]);

  React.useEffect(() => {
    localStorage.setItem('kapraye-language', language.code);
  }, [language]);

  // Format price according to the current currency with refined PKR formatting
  const formatPrice = (price: number): string => {
    const convertedPrice = price * currency.exchangeRate;

    if (currency.code === 'PKR') {
      // Format PKR with thousands separator, no decimal if zero cents, else two decimals
      const priceRounded = Math.round(convertedPrice);
      if (convertedPrice === priceRounded) {
        // No decimal part
        return `${currency.symbol}${priceRounded.toLocaleString('en-US')}`;
      } else {
        // With decimals (usually rare)
        return `${currency.symbol}${convertedPrice.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`;
      }
    } else {
      // Default formatting for other currencies
      return `${currency.symbol}${convertedPrice.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    }
  };

  // Translate function
  const t = (key: string): string => {
    return translations[language.code]?.[key] || translations.en[key] || key;
  };

  return (
    <AppSettingsContext.Provider value={{
      currency,
      setCurrency,
      language,
      setLanguage,
      formatPrice,
      t
    }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

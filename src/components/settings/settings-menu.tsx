
import { BadgeIndianRupee, Languages } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  useAppSettings, 
  currencies, 
  languages,
  Currency,
  Language
} from "@/contexts/AppSettingsContext";

export function SettingsMenu() {
  const { currency, setCurrency, language, setLanguage } = useAppSettings();

  const handleCurrencyChange = (currencyCode: string) => {
    setCurrency(currencies[currencyCode]);
  };

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languages[languageCode]);
  };

  return (
    <Popover>
      <div className="flex gap-2">
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <BadgeIndianRupee className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Languages className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-80" align="end">
        <Tabs defaultValue="currency">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="currency">Currency</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
          </TabsList>
          
          <TabsContent value="currency" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              {Object.values(currencies).map((curr: Currency) => (
                <Button
                  key={curr.code}
                  variant={curr.code === currency.code ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => handleCurrencyChange(curr.code)}
                >
                  <span className="mr-2">{curr.symbol}</span>
                  {curr.code}
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="language" className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              {Object.values(languages).map((lang: Language) => (
                <Button
                  key={lang.code}
                  variant={lang.code === language.code ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <span className="mr-2">{lang.code.toUpperCase()}</span>
                  {lang.nativeName}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}

import { useEffect, useState, createContext } from "react";
import { axiosPrivate } from "../service/api";

type AppContextType = {
  portifolios: any[];
  setPortifolios: React.Dispatch<React.SetStateAction<any[]>>;
  isLoading: boolean;
};

export const AppContext = createContext<AppContextType>({
  portifolios: [],
  setPortifolios: () => {},
  isLoading: true,
});

export const ContextProvider = ({ children }: { children: JSX.Element }) => {
  const [portifolios, setPortifolios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      try {
        const {
          data: { portifolios },
        } = await axiosPrivate.get("/portifolios");
        setPortifolios(portifolios);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    getProducts();
  }, []);

  return (
    <AppContext.Provider value={{ portifolios, setPortifolios, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

import { useState, useEffect, createContext } from "react";
import { getStats, getRealEstate, getRealEstateForRen, getRealEstateForSales } from "services";

const {
  location: { origin },
} = window;

const signInRoute = `${origin}/authentication/sign-in`;

export const StatContext = createContext();

// eslint-disable-next-line react/prop-types
export function StatProvider({ children }) {
  const [stat, setStat] = useState({ statSale: 0, statHouse: 0, statRen: 0, statUser: 0 });

  const getStatData = () => {
    getStats()
      .then((res) => {
        if (res.status === 200) {
          setStat({ ...res.data });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.assign(signInRoute);
        }
      });
  };

  useEffect(() => {
    getStatData();
  }, []);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StatContext.Provider value={[stat, setStat]}>{children}</StatContext.Provider>
  );
}

export const HouseContext = createContext();

// eslint-disable-next-line react/prop-types
export function HouseProvider({ children }) {
  const [houses, setHouse] = useState([]);
  const getHouses = () => {
    getRealEstate()
      .then((res) => {
        if (res.status === 200) {
          setHouse(res.data);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.assign(signInRoute);
        }
      });
  };
  useEffect(() => {
    getHouses();
  }, []);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <HouseContext.Provider value={[houses, setHouse]}>{children}</HouseContext.Provider>
  );
}

export const HousesForRenContext = createContext();

// eslint-disable-next-line react/prop-types
export function HousesForRenProvider({ children }) {
  const [housesForRen, setHousesForRen] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const getHousesForRen = () => {
    setIsLoading(true);
    getRealEstateForRen()
      .then((res) => {
        if (res.status === 200) {
          setHousesForRen(res.data);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.assign(signInRoute);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getHousesForRen();
  }, []);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <HousesForRenContext.Provider value={[housesForRen, isLoading, setHousesForRen]}>
      {children}
    </HousesForRenContext.Provider>
  );
}

export const HousesForSalesContext = createContext();

// eslint-disable-next-line react/prop-types
export function HousesForSalesProvider({ children }) {
  const [housesForSales, setHousesForSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getHousesForSales = () => {
    setIsLoading(true);
    getRealEstateForSales()
      .then((res) => {
        if (res.status === 200) {
          setHousesForSales(res.data);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.assign(signInRoute);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getHousesForSales();
  }, []);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <HousesForSalesContext.Provider value={[housesForSales, isLoading, setHousesForSales]}>
      {children}
    </HousesForSalesContext.Provider>
  );
}

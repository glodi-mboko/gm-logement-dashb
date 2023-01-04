import { useState, useEffect, createContext } from "react";
import { getStats, getRealEstate } from "services";

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
      .catch((err) => console.log(err));
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
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getHouses();
  }, []);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <HouseContext.Provider value={[houses, setHouse]}>{children}</HouseContext.Provider>
  );
}

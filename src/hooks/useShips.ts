import { useCallback, useEffect, useState } from "react";

interface Ship {
  id: string;
  x: number;
  y: number;
  z: number;
}

export const useShips = () => {
  const [ships, setShips] = useState<Ship[]>(
    Array.from({ length: 5 }).map((_, idx) => ({
      id: `ship-${idx}`,
      x: idx * 5,
      z: 0,
      y: -20,
    }))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setShips((ships) => ships.map((ship) => ({ ...ship, y: ship.y + 0.1 })));
    }, 1000 / 60);

    return () => {
      clearInterval(id);
    };
  }, []);

  const removeShip = useCallback((ship: Ship) => {
    setShips((ships) => ships.filter((s) => s.id !== ship.id));
  }, []);

  return { ships, removeShip };
};

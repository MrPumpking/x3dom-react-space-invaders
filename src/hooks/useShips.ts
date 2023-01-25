import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { ExplosionProps } from "../entities/Explosion";
import { ShipProps } from "../entities/Ship";

const createShip = ({ x, y, z }: Omit<ShipProps, "id">): ShipProps => ({
  id: `ship-${uuid()}`,
  x,
  y,
  z,
});

interface UseShipsProps {
  onShipLineCross(): void;
}

const SHIP_CROSS_LINE = 60;
const SHIP_MOVE_SPEED = 0.1;

export const useShips = ({ onShipLineCross }: UseShipsProps) => {
  const [explosions, setExplosions] = useState<ExplosionProps[]>([]);
  const [ships, setShips] = useState<ShipProps[]>(
    Array.from({ length: 5 }).map((_, idx) =>
      createShip({ x: idx * 5, z: 0, y: -20 })
    )
  );

  useEffect(() => {
    const id = setInterval(() => {
      const newShips = ships.map((ship) => {
        const newY = ship.y + SHIP_MOVE_SPEED;

        if (newY > SHIP_CROSS_LINE) {
          onShipLineCross();
          return null;
        }

        return { ...ship, y: newY };
      });

      setShips(newShips.filter((ship) => ship !== null) as ShipProps[]);

      // TODO: remove ships that have crossed the line?
    }, 1000 / 60);

    return () => {
      clearInterval(id);
    };
  }, [onShipLineCross, ships]);

  const removeShip = useCallback((ship: ShipProps) => {
    const expId = `exp-${uuid()}`;

    // console.log({ id: expId, x: ship.x, y: ship.z, z: ship.y });

    setExplosions((explosions) => [
      ...explosions,
      // TODO: tutaj coś mocno namieszane jest przez Adziczkowe rotacje wszystkiego
      // i zeby zespawnowac na miejscu statku trzeba zamienic y i z XD
      { id: expId, x: ship.x, y: -4 + ship.z, z: -32 + ship.y },
    ]);
    setShips((ships) => ships.filter((s) => s.id !== ship.id));

    setTimeout(() => {
      setExplosions((explosions) =>
        explosions.filter((exp) => exp.id !== expId)
      );
    }, 2000);
  }, []);

  return { ships, explosions, removeShip };
};

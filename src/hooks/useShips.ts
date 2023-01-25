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

export const useShips = () => {
  const [explosions, setExplosions] = useState<ExplosionProps[]>([]);
  const [ships, setShips] = useState<ShipProps[]>(
    Array.from({ length: 5 }).map((_, idx) =>
      createShip({ x: idx * 5, z: 0, y: -20 })
    )
  );

  useEffect(() => {
    const id = setInterval(() => {
      setShips((ships) => ships.map((ship) => ({ ...ship, y: ship.y + 0.1 })));
    }, 1000 / 60);

    return () => {
      clearInterval(id);
    };
  }, []);

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

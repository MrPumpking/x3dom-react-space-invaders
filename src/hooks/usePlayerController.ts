import { useCallback, useEffect, useState } from "react";
import { MissileProps } from "../entities/Missile";
import { v4 as uuid } from "uuid";

const CAMERA_STEP = 1;
const MISSILE_STEP = 1;
const MISSILE_Z_CUTOFF = -60;

export const usePlayerController = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [missiles, setMissiles] = useState<MissileProps[]>([]);

  const spawnMissile = useCallback(() => {
    setMissiles((missiles) => [
      ...missiles,
      {
        id: uuid(),
        x: 0 + position.x,
        y: -0.5 + position.y,
        z: -2.8 + position.z,
      },
    ]);
  }, [position.x, position.y, position.z]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          return setPosition((pos) => ({ ...pos, x: pos.x - CAMERA_STEP }));
        case "ArrowRight":
          return setPosition((pos) => ({ ...pos, x: pos.x + CAMERA_STEP }));
        case "ArrowUp":
          return setPosition((pos) => ({ ...pos, y: pos.y + CAMERA_STEP }));
        case "ArrowDown":
          return setPosition((pos) => ({ ...pos, y: pos.y - CAMERA_STEP }));
        case "Shift":
          return spawnMissile();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [spawnMissile]);

  useEffect(() => {
    const moveMissiles = () => {
      for (const missile of missiles) {
        missile.z -= MISSILE_STEP;

        if (missile.z <= MISSILE_Z_CUTOFF) {
          setMissiles((missiles) =>
            missiles.filter((m) => m.id !== missile.id)
          );
        }
      }
    };

    moveMissiles();
    const id = setInterval(moveMissiles, 1000 / 60);
    return () => clearInterval(id);
  }, [missiles]);

  return { position, missiles };
};

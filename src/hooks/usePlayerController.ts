import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { MissileProps } from "../entities/Missile";
import { ShipProps } from "../entities/Ship";
import { areIntersecting, getMissileBB, getShipBB } from "./utils";

const CAMERA_STEP = 1;
const MISSILE_STEP = 1;
const MISSILE_Z_CUTOFF = -60;

const createMissile = ({
  x,
  y,
  z,
}: Omit<MissileProps, "id">): MissileProps => ({
  id: `missile-${uuid()}`,
  x,
  y,
  z,
});

interface UsePlayerControllerProps {
  ships: ShipProps[];
  onShipHit(ship: ShipProps): void;
}

export const usePlayerController = ({
  ships,
  onShipHit,
}: UsePlayerControllerProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [missiles, setMissiles] = useState<MissileProps[]>([]);

  const spawnMissile = useCallback(() => {
    setMissiles((missiles) => [
      ...missiles,
      createMissile({
        x: 0 + position.x,
        y: -0.5 + position.y,
        z: -2.8 + position.z,
      }),
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

  const moveMissiles = useCallback(() => {
    for (const missile of missiles) {
      // Move missiles
      missile.z -= MISSILE_STEP;

      // Check if the missiles are too far
      if (missile.z <= MISSILE_Z_CUTOFF) {
        setMissiles((missiles) => missiles.filter((m) => m.id !== missile.id));
        continue;
      }

      // Check for collisions
      for (const ship of ships) {
        // TODO: fix collision detection
        if (areIntersecting(getShipBB(ship), getMissileBB(missile))) {
          setMissiles((missiles) =>
            missiles.filter((m) => m.id !== missile.id)
          );
          onShipHit(ship);
        }
      }
    }
  }, [missiles, onShipHit, ships]);

  useEffect(() => {
    const id = setInterval(() => {
      moveMissiles();
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [moveMissiles]);

  return { position, missiles };
};

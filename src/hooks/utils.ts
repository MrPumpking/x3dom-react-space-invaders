import { MissileProps } from "../entities/Missile";
import { ShipProps } from "../entities/Ship";
import { BoundingBox } from "../types/BoundingBox";

export const getShipBB = ({ x, y, z }: ShipProps): BoundingBox => ({
  minX: x - 3,
  minY: y - 3,
  minZ: z - 3,
  maxX: x + 3,
  maxY: y + 3,
  maxZ: z + 3,
});

export const getMissileBB = ({ x, y, z }: MissileProps): BoundingBox => ({
  minX: x - 2,
  minY: y - 2,
  minZ: z - 2,
  maxX: x + 2,
  maxY: y + 2,
  maxZ: z + 2,
});

export const areIntersecting = (a: BoundingBox, b: BoundingBox) => {
  return (
    a.minX <= b.maxX &&
    a.maxX >= b.minX &&
    a.minY <= b.maxY &&
    a.maxY >= b.minY &&
    a.minZ <= b.maxZ &&
    a.maxZ >= b.minZ
  );
};

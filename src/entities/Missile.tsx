import { FC } from "react";

export interface MissileProps {
  id: string;
  x: number;
  y: number;
  z: number;
}

export const Missile: FC<MissileProps> = ({ id, x, y, z }) => {
  return (
    <transform id={id} scale="0.1 0.1 0.1" translation={`${x} ${y} ${z}`}>
      <shape>
        <appearance>
          <material diffuseColor="red"></material>
        </appearance>
        <sphere></sphere>
      </shape>
    </transform>
  );
};

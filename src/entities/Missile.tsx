import { FC } from "react";
import { Vector3D } from "../types/Vector3D";

export interface MissileProps extends Vector3D {
  id: string;
}

export const Missile: FC<MissileProps> = ({ id, x, y, z }) => {
  return (
    <transform id={id} scale="0.1 0.1 0.1" translation={`${x} ${y} ${z}`}>
      <shape>
        <appearance>
          <material diffusecolor="red"></material>
        </appearance>
        <sphere></sphere>
      </shape>
    </transform>
  );
};

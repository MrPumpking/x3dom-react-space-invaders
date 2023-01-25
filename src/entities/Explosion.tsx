import { FC } from "react";
import { Vector3D } from "../types/Vector3D";

export interface ExplosionProps extends Vector3D {
  id: string;
}

export const Explosion: FC<ExplosionProps> = ({ id, x, y, z }) => {
  return (
    <transform id={id} translation={`${x} ${y} ${z}`}>
      <shape>
        <appearance>
          <imagetexture url="/bg/explosion.png" />
        </appearance>
        <box />
      </shape>
    </transform>
  );
};

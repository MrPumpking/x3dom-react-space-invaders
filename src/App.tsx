import { FC } from "react";
import { Explosion } from "./entities/Explosion";
import { Missile } from "./entities/Missile";
import { Ship } from "./entities/Ship";
import { usePlayerController } from "./hooks/usePlayerController";
import { useShips } from "./hooks/useShips";

export const App: FC = () => {
  const { ships, explosions, removeShip } = useShips();
  const { position, missiles } = usePlayerController({
    ships,
    onShipHit: removeShip,
  });

  return (
    <x3d profile="Immersive">
      <scene>
        <background
          def="Summer"
          fronturl='"/bg/stars.jpg"'
          backurl='"/bg/stars.jpg"'
          lefturl='"/bg/stars.jpg"'
          righturl='"/bg/stars.jpg"'
          topurl='"/bg/stars.jpg"'
          bottomurl='"/bg/stars.jpg"'
          skyangle="0.8,
                      1.3,
                      1.4,
                      1.5708"
          skycolor="0.21 0.31 0.59,
                      0.33 0.45 0.7,
                      0.57 0.66 0.85,
                      0.6 0.73 0.89,
                      0.7 0.83 0.98"
          groundangle="0.659972,
                         1.2,
                         1.39912,
                         1.5708"
          groundcolor="0.105712 0.156051 0.297,
                         0.187629 0.255857 0.398,
                         0.33604 0.405546 0.542,
                         0.3612 0.469145 0.602,
                         0.39471 0.522059 0.669"
        />

        <transform translation="-250 -1.5 -400">
          <shape>
            <sphere radius="2.4" />
            <appearance>
              <imagetexture url='"/bg/mars.jpg" ' />
            </appearance>
          </shape>
        </transform>
        <transform scale="1 0.03 0.3" translation="-160 1 -500">
          <shape>
            <circle2d radius="162" />
            <appearance use="MagentaAppearance" />
          </shape>
        </transform>
        <transform translation="-150 10 -500">
          <shape>
            <sphere radius="20" />
            <appearance>
              <imagetexture url=' "/bg/sun.jpg" "/bg/sun.jpg" ' />
            </appearance>
          </shape>
        </transform>
        <transform translation="100 -7 -400">
          <shape>
            <sphere radius="40" />
            <appearance>
              <imagetexture url='"/bg/neptune.jpg" "/bg/neptune.jpg"' />
            </appearance>
          </shape>
        </transform>
        <transform scale="1 0.03 0.3" translation="-150 0 -500">
          <shape>
            <circle2d radius="400" />
            <appearance use="MagentaAppearance" />
          </shape>
        </transform>
        <viewpoint
          id="camera"
          position={`${position.x} ${position.y} ${position.z}`}
        />
        <navigationinfo type="explore" />
        <transform def="fleet" rotation="1 0 0 1.5">
          {ships.map((ship) => (
            <Ship {...ship} key={ship.id} onClick={() => removeShip(ship)} />
          ))}
        </transform>
        <transform rotation="1.1 0 0 1.5">
          <Ship id="player" x={0 + position.x} y={57} z={1 - position.y} />
        </transform>
        {missiles.map((missile) => (
          <Missile key={missile.id} {...missile} />
        ))}
        {explosions.map((explosion) => (
          <Explosion key={explosion.id} {...explosion} />
        ))}
        {/* <Explosion id="asd" x={0} y={-4} z={-20} /> */}
      </scene>
    </x3d>
  );
};

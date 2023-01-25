import { FC, useEffect, useState } from "react";
import { Ship } from "./entities/Ship";

export const App: FC = () => {
  const [ships, setShips] = useState(
    Array.from({ length: 5 }).map((_, idx) => ({
      id: `ship-${idx}`,
      x: 10 + idx * 5,
      z: idx > 2 ? 10 : 0,
      y: 0,
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
            <appearance USE="MagentaAppearance" />
          </shape>
        </transform>
        <viewpoint
          id="camera"
          def="camera1"
          description="camera 1"
          fieldofview=".9599"
          orientation="1 0 1 -.2618"
          position=".5 -5 12"
        />
        <viewpoint def="VP" fieldofview="1" position="0 5 0" />
        <navigationinfo type="FLY" />

        <timesensor def="Timer" loop="true" />
        <proximitysensor def="Proxi" size="1.0E30 1.0E30 1.0E30" />

        <transform def="fleet" rotation="1 0 0 1.57">
          {ships.map((ship) => (
            <Ship
              {...ship}
              key={ship.id}
              onClick={() =>
                setShips((ships) => ships.filter((s) => s.id !== ship.id))
              }
            />
          ))}
        </transform>

        <timesensor def="Clock" cycleInterval="10.0" loop="true" />

        <script def="moveScript">
          <field
            name="set_fraction"
            type="SFFloat"
            accessType="inputOnly"
            appinfo="receive fraction from clock"
          />
          <field
            name="value_changed"
            type="SFVec3f"
            accessType="outputOnly"
            appinfo="produce output position to move the ball"
          />
          {`
        <![CDATA[
            ecmascript:
            // Move a shape in a straight path
            function set_fraction( fraction, eventTime ) {
            	value_changed[0] = 0.0;    // X component
            	value_changed[1] = 0.0;         // Y component
            	value_changed[2] = value_changed[2] + 0.1;         // Z component
            }
            ]]>
            `}
        </script>
        <route
          fromNode="Clock"
          fromField="fraction_changed"
          toNode="moveScript"
          toField="set_fraction"
        />
        <route
          fromNode="moveScript"
          fromField="value_changed"
          toNode="fleet"
          toField="set_translation"
        />
      </scene>
    </x3d>
  );
};

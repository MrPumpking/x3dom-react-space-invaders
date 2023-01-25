import { FC, useEffect } from "react";

interface ShipProps {
  id: string;
  x: number;
  y: number;
  z: number;
  onClick?(): void;
}

const HANDLERS_KEY = "shipHandlers";

export const Ship: FC<ShipProps> = ({ id, x, y, z, onClick, ...restProps }) => {
  useEffect(() => {
    const win = window as Record<string, any>;
    const handlers = win[HANDLERS_KEY] || (win[HANDLERS_KEY] = {});
    handlers[id] = onClick;

    const transform = document.querySelector(`#${id}`);
    transform?.setAttribute(
      "onClick",
      `window['${HANDLERS_KEY}']['${id}'](arguments[0])`
    );
  }, [id, onClick]);

  return (
    <transform id={id} translation={`${x} ${y} ${z}`} {...restProps}>
      <group def="Fighter1">
        <transform scale="1 3 1" translation="0.0 -60.5 -0.3">
          <shape>
            <sphere radius="0.14" />
            <appearance def="Cockpit">
              <material emissiveColor="0 0 1" transparency="0.55" />
            </appearance>
          </shape>
        </transform>
        <transform scale="0.8 0.8 0.8" translation="0.0 -60.51 -0.3">
          <shape>
            <sphere def="Pilot" radius="0.16" />
            <appearance>
              <material diffuseColor="1.0 0.0 0.0" />
            </appearance>
          </shape>
        </transform>
        <transform scale="1 3.8 1" translation="0.0 -60 0.0">
          <shape>
            <sphere radius="0.4" />
            <appearance>
              <material diffuseColor="0.8 0.7 0.3" />
            </appearance>
          </shape>
        </transform>
        <transform rotation="1 0 0 3.14" translation="0.5 -62.0 0.0">
          <shape def="Afterburner">
            <cone bottomRadius="0.25" height="0.9" />
            <appearance>
              <material diffuseColor="1.0 0.2 0.2" transparency="0.5" />
            </appearance>
          </shape>
        </transform>
        <transform rotation="1 0 0 3.14" translation="-0.5 -62.0 0.0">
          <shape USE="Afterburner" />
        </transform>
        <transform translation=".5 -61 0">
          <shape def="Engine">
            <cylinder bottom="false" radius=".25" />
            <appearance>
              <material diffuseColor="0.8 0.7 0.3" />
            </appearance>
          </shape>
        </transform>
        <transform translation="-0.5 -61 0">
          <shape USE="Engine" />
        </transform>
        <transform scale="9 1 1" translation="0.0 -60 0.0">
          <shape def="Wing">
            <appearance>
              <material diffuseColor="0.8 0.7 0.3" />
            </appearance>
            <cone bottomRadius="0.2" height="2.8" />
          </shape>
        </transform>
        <transform scale="1 3 1" translation="1.0 -60.6 0.2">
          <shape def="Bomb">
            <sphere radius=".1" />
            <appearance>
              <material diffuseColor="0 0.8 0" />
            </appearance>
          </shape>
        </transform>
        <transform scale="1 3 1" translation="-1.0 -60.6 0.2">
          <shape USE="Bomb" />
        </transform>
      </group>
    </transform>
  );
};

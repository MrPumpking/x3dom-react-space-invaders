/// <reference types="react-scripts" />

declare global {
  interface Window {
    myProperty: any;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    x3d: any;
    scene: any;
    shape: any;
    appearance: any;
    material: any;
    box: any;
    background: any;
    transform: any;
    sphere: any;
    imagetexture: any;
    circle2d: any;
    viewpoint: any;
    navigationinfo: any;
    timesensor: any;
    proximitysensor: any;
    group: any;
    cone: any;
    cylinder: any;
    field: any;
    route: any;
    script: {
      def: string;
      children: any;
    };
  }
}

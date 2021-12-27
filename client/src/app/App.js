import "regenerator-runtime/runtime";
import { World } from "./Library/Ecsy";
import { BootManager } from "./Util";

////////////////////////////////////////////
//
//              ECSY GAME
//
////////////////////////////////////////////

// Initialize the world
let world = new World({ entityPoolSize: 10000 });

// Get canvas from DOM
let canvas = document.querySelector("#main");

// Screen Resolutions
/*
Common Desktop Resolutions:
1366x768 (22.98%)
1920x1080 (20.7%)
1536x864 (7.92%)
1440x900 (7.23%)
1280x720 (4.46%)
*/
canvas.width = 1366;
canvas.height = 768;

let bootManager = new BootManager(world, canvas, 15);
bootManager.boot();

export { world };

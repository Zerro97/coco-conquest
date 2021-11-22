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
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bootManager = new BootManager(world, canvas, 15);
bootManager.boot();

export { world };

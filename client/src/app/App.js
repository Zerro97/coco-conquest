import "regenerator-runtime/runtime";
import { World } from "./Library/Ecsy";
import { BootManager } from "./Util";

import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
console.log(socket);

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

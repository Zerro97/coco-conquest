import "regenerator-runtime/runtime";
import { World } from "@/Ecsy";
import { BootManager } from "@/Util/Other";

////////////////////////////////////////////
//
//              COCO CONQUEST
//
////////////////////////////////////////////

// Initialize the world
let world = new World({ entityPoolSize: 10000 });

let bootManager = new BootManager(world);
bootManager.boot();

export { world };
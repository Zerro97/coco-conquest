import { Component, World } from "../../Ecsy";

export class BootManager {
    world: World;
    
    constructor(world: World) {
        this.world = world;
    }

    boot(): void {
        this.registerComponents();
        this.registerSystems();
        this.initializeWorld();
    }

    registerComponents(): void {
        Object.keys(Component).forEach((comp) => {
            this.world.registerComponent(Component[comp]);
        });
    }

    registerSystems(): void {

    }

    initializeWorld(): void {

    }
}
export default class TileGenerator {
    constructor(world) {
        this.world = world;

        this.maps = [];
        this.currentMap = -1;
        this.mapSize = {
            x: -1,
            y: -1
        }
        this.currentPos = {
            x: -1,
            y: -1
        };
    }

    registerMap(map) {
        if(map.isArray && map[0].isArray) {
            this.maps.push({map: map, mapId: this.maps.length});
        } else {
            console.error("Map has to be 2d array");
        }
    }

    useMap(map) {
        if(this.maps.length === 0) {
            console.error("You need to register map first");
            return;
        }

        this.maps.forEach(mapEntry => {
            if(mapEntry.map == map) {
                this.currentMap = key;
                break;
            } else {
                this.currentMap = -1;
            }
        });

        if(this.currentMap === -1) {
            console.error('The map you provided is not registered yet');
            return;
        }

        this.mapSize.x = map[0].length;
        this.mapSize.y = map.length;
        this.currentPos.x = -1; // -1 since updateTilePosition has to be called first..
        this.currentPos.y = 0;
    }

    /**
     * Increment the pointer to the position of tile
     * 
     * @returns true if incremented position, false otherwise
     */
    updateTilePosition() {
        if(this.currentMap === -1) {
            console.error("You need to call useMap function first");
            return false;
        }

        if(this.currentPos.x === this.maps[this.currentMap][0].length) {
            if(this.currentPos.y === this.maps[this.currentMap].length) {
                return false;
            } else {
                this.currentPos.x = 0;
                this.currentPos.y += 1;
            }
        } else {
            this.currentPos.x += 1;
        }

        return true;
    }

    addPlainTile() {
        let incremented = updateTilePosition();

        if(incremented) {
            this.world
                .createEntity()
                .addComponent(Component.Tile, {
                    type: 'plain',
                    variation: 0,
                    status: 'seen',
                    x: this.currentPos.x,
                    y: this.currentPos.y,
                    size: 50
                });
        }
    }
}
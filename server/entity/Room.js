module.exports = class Room {
    constructor(roomId, roomName, roomPass, creatorName, curPlayerCount, maxPlayerCount) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.roomPass = roomPass;
        this.creatorName = creatorName;
        this.curPlayerCount = curPlayerCount;
        this.maxPlayerCount = maxPlayerCount;
    }
}
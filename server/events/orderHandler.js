module.exports = (io, socket) => {
    const createOrder = (payload) => {
      console.log(payload);
    }
  
    const readOrder = (orderId, callback) => {
      console.log(orderId);
    }
  
    socket.on("order:create", createOrder);
    socket.on("order:read", readOrder);
}
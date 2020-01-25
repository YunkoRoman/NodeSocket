const dataBase = require('../dataBase').getInstance();
const ControllerError = require('../errors/ControllerError');

class SocketServise {

    Socket(socket, io) {
        const OrdersModel = dataBase.getModel('orders');
        const OrderLineModel = dataBase.getModel('orderLine');
        const ProductModel = dataBase.getModel('products');
        try {
            socket.on('restaurant_id', async restaurant_id => {
                socket.join(restaurant_id, () => {
                    console.log(`Socket ${socket.id} has connected to room ${restaurant_id}`)
                });
                const result = await OrdersModel.findAll({
                    include:[{
                       model: OrderLineModel,
                        include:[{
                           model:ProductModel
                        }]
                    }],

                });
                io.sockets.in(restaurant_id).emit('getOrders', result )
            });
            console.log(`Socket ${socket.id} has connected`);

        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'socketService')
        }

    }

}

module.exports = new SocketServise();
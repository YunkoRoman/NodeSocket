const dataBase = require('../dataBase').getInstance();
const ControllerError = require('../errors/ControllerError');

class SocketServise {

    Socket(socket, io) {
        const OrdersModel = dataBase.getModel('orders');
        const OrderLineModel = dataBase.getModel('orderLine');
        const OrderStatusModel = dataBase.getModel('order_status');
        const ProductModel = dataBase.getModel('products');
        const MenuModel = dataBase.getModel('menus');
        try {
            socket.on('restaurant_id', async restaurant_id => {
                socket.join(restaurant_id, () => {
                    console.log(`Socket ${socket.id} has connected to room ${restaurant_id}`)
                });
                const result = await OrdersModel.findAll({

                    include: [{
                        model: OrderLineModel,
                        include: [{
                            model: ProductModel,
                            include:[{
                                model: MenuModel
                            }]
                        }]}, {
                        model: OrderStatusModel
                    }],
                    where:{
                        restaurant_id
                    }});
                io.sockets.in(restaurant_id).emit('getOrders', result)
            });

            socket.on('changeStatus', async restaurant_id => {
                socket.join(restaurant_id, () => {
                    console.log(`Socket ${socket.id} has connected to room ${restaurant_id}`)
                });
                const status = await OrderStatusModel.findOne({
                    where:{
                        restaurant_id,
                        status: 'Done'
                    }
                });
                const {status_id} = status;
                if (status_id) {
                    const result = await OrdersModel.findAll({
                        include: [{
                            model: OrderLineModel,
                            include: [{
                                model: ProductModel,
                                include:[{
                                    model: MenuModel
                                }]
                            }]}, {
                            model: OrderStatusModel
                        }],
                        where: {
                            restaurant_id,
                            status_id
                        }
                    });
                    io.sockets.in(restaurant_id).emit('getCompletedOrders', result)
                }

            });
            console.log(`Socket ${socket.id} has connected`);

        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'socketService')
        }

    }

}

module.exports = new SocketServise();
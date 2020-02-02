module.exports = (sequelize, DataTypes) => {
    const orders = sequelize.define('orders', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            restaurant_id: {
                type: DataTypes.INTEGER,
                foreignKey: true
            },
            status_id: {
                type: DataTypes.INTEGER,
                foreignKey: true
            },
            date: {
                type: DataTypes.STRING
            },
            total_price:{
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'orders',
            timestamps: false
        });
    const orderLine = sequelize.import('./orderLine');
    orders.hasMany(orderLine, {foreignKey:'order_id'});

    const orderStatus = sequelize.import('./order_status');
    orders.belongsTo(orderStatus,{foreignKey: 'status_id'});

    return orders
};
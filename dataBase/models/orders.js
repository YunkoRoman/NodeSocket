module.exports = (sequelize, DataTypes) => {
    const orders = sequelize.define('orders', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            orders: {
                type: DataTypes.STRING
            },
            restaurant_id: {
                type: DataTypes.INTEGER,
                foreignKey: true
            },
            status: {
                type: DataTypes.STRING,
            },
            date: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'orders',
            timestamps: false
        });

    return orders
};
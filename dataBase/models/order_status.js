module.exports = (sequelize, DataTypes) => {
    const order_status = sequelize.define('order_status', {
        status_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        restaurant_id: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING,
        },
        default: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        tableName: 'order_status',
        timestamps: false
    });

    return order_status
};
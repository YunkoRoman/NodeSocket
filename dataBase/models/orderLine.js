module.exports = (sequelize, DataTypes) => {
    const orderLine = sequelize.define('order_line', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            order_id: {
                type: DataTypes.INTEGER,
                foreignKey: true
            },
            product_id: {
                type: DataTypes.INTEGER,
                foreignKey: true
            },
            price: {
                type: DataTypes.INTEGER
            },
            qtt: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'order_line',
            timestamps: false
        });

    const product = sequelize.import('./products.js');
    orderLine.belongsTo(product, {foreignKey:'product_id'});

    return orderLine
};
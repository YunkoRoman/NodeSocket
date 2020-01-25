module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define('products', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            },
            restaurant_id: {
                type: DataTypes.INTEGER,
                foreignKey: true
            },
            menu_id: {
                type: DataTypes.INTEGER,
                foreignKey: true
            },
            price:{
                type: DataTypes.INTEGER,
            }
        },
        {
            tableName: 'products',
            timestamps: false
        });
    // const menu = sequelize.import('./menus.js');
    // products.belongsTo(menu, {foreignKey: 'menu_id'});


    return products
};
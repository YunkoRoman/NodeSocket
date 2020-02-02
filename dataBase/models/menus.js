module.exports = (sequelize, DataTypes) => {
    const menus = sequelize.define('menus', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        restaurant_id:{
            type:DataTypes.INTEGER
        }
        // description: {
        //     type: DataTypes.STRING,
        //
        // },

    }, {
        tableName: 'menus',
        timestamps: false
    });
    // const products = sequelize.import('./products.js');
    // menus.hasMany(products, {foreignKey: 'menu_id'});

    return menus
};
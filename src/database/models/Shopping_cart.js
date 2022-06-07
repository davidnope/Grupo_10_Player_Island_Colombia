const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoincrement: true,
            primarykey: true
        },
        user_id: {
            type: dataTypes.INTEGER.UNSIGNED,
        },
        deleted: {
            type: dataTypes.INTEGER,
        }
    }
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }

    let ShoppingCart = sequelize.define('ShoppingCart', cols, config);


    ShoppingCart.associate = function (models) {
        // UNO A MUCHOS
        // asociacion usuario
        ShoppingCart.belongsTo(models.User, {
            as: 'user',
            foreignkey: 'user_id'
        });
        // asociacion facturacion
        ShoppingCart.hasOne(models.SaleBill, {
            as: 'saleBill',
            foreignkey: 'shopping_cart_id'
        });
        // MUCHOS A MUCHOS
        // asociacion producto
        ShoppingCart.belongstoMany(models.Product, {
            as: 'products',
            throught: 'shopping_cart_product',
            foreignkey: 'shopping_cart_id',
            otherkey: 'product_id',
            timestamps: false,
        });
    }
    return ShoppingCart;
}
module.exports = (sequelize, dataTypes) => {
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
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
            foreignKey: 'user_id'
        });
        // asociacion facturacion
        ShoppingCart.hasOne(models.SaleBill, {
            as: 'saleBill',
            foreignKey: 'shopping_cart_id'
        });
        // MUCHOS A MUCHOS
        // asociacion producto
        ShoppingCart.belongsToMany(models.Product, {
            as: 'products',
            through: 'shopping_cart_product',
            foreignKey: 'shopping_cart_id',
            otherKey: 'product_id',
            timestamps: false,
        });
    }
    return ShoppingCart;
}
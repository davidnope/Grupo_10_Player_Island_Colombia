module.exports = (sequelize, dataTypes) => {
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        shopping_cart_id: {
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

    let saleBill = sequelize.define('SaleBill', cols, config);
    saleBill.associate = function (models) {
        // asociacion carrito de compras
        saleBill.belongsTo(models.ShoppingCart, {
            as: 'shoppingCart',
            foreignKey: 'shopping_cart_id'
        });
    }
    return saleBill;
}
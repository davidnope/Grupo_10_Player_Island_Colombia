const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) =>{
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoincrement: true,
            primarykey: true
        },
        name:{
            type: dataTypes.STRING,
        },
        description:{
            type: dataTypes.STRING,
        },
        features:{
            type: dataTypes.STRING,
        },
        company:{
            type: dataTypes.STRING,
        },
        category:{
            type: dataTypes.INTEGER,
        },
        price:{
            type: dataTypes.INTEGER,
        },
        discount:{
            type: dataTypes.STRING,
        },
        rating:{
            type: dataTypes.STRING(500),
        },
        stock:{
            type: dataTypes.STRING(500),
        },
        user_id:{
            type: dataTypes.INTEGER.UNSIGNED,
        },
        deleted:{
            type: dataTypes.INTEGER,
        }
    }
    let config = {
        timestamps : true,
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }

    let Product = sequelize.define('Product', cols, config);

    Product.associate = function(models){
        // UNO A MUCHOS
        // asociacion usuarios
        Product.belongsTo(models.User , {
            as: 'user',
            foreignkey: 'user_id'
        });
        // asociacion comentarios
        Product.hasMany(models.Comment , {
            as: 'comments',
            foreignkey: 'product_id'
        });
        // asociacion imagenesProductos
        Product.hasMany(models.ImgProduct , {
            as: 'imgProducts',
            foreignkey: 'product_id'
        });
        // MUCHOS A MUCHOS
        // asociacion color
        Product.belongstoMany(models.Color , {
            as: 'colors',
            throught: 'color_product',
            foreignkey: 'product_id',
            otherkey: 'color_id',
            timestamps: false,
        });
        // asociacion metodos de pago
        Product.belongstoMany(models.PaymentMethod , {
            as: 'paymentMethods',
            throught: 'payment_method_product',
            foreignkey: 'product_id',
            otherkey: 'payment_method_id',
            timestamps: false,
        });
        // asociacion carrito de compras
        Product.belongstoMany(models.ShoppingCart , {
            as: 'shoppingCarts',
            throught: 'shopping_cart_product',
            foreignkey: 'product_id',
            otherkey: 'shopping_cart_id',
            timestamps: false,
        });

    }
    return Product
}
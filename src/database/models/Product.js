module.exports = (sequelize, dataTypes) =>{
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
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
            foreignKey: 'user_id'
        });
        // asociacion comentarios
        Product.hasMany(models.Comment , {
            as: 'comments',
            foreignKey: 'product_id'
        });
        // asociacion imagenesProductos
        Product.hasMany(models.ImgProduct , {
            as: 'imgProducts',
            foreignKey: 'product_id'
        });
        // MUCHOS A MUCHOS
        // asociacion color
        Product.belongsToMany(models.Color , {
            as: 'colors',
            through: 'color_product',
            foreignKey: 'product_id',
            otherKey: 'color_id',
            timestamps: false,
        });
        // asociacion metodos de pago
        Product.belongsToMany(models.PaymentMethod , {
            as: 'paymentMethods',
            through: 'payment_method_product',
            foreignKey: 'product_id',
            otherKey: 'payment_method_id',
            timestamps: false,
        });
        // asociacion carrito de compras
        Product.belongsToMany(models.ShoppingCart , {
            as: 'shoppingCarts',
            through: 'shopping_cart_product',
            foreignKey: 'product_id',
            otherKey: 'shopping_cart_id',
            timestamps: false,
        });

    }
    return Product
}
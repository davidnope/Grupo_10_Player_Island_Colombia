const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) =>{
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoincrement: true,
            primarykey: true
        },
        first_name:{
            type: dataTypes.STRING,
        },
        last_name:{
            type: dataTypes.STRING,
        },
        type_user:{
            type: dataTypes.STRING,
        },
        email:{
            type: dataTypes.STRING,
        },
        user_dni:{
            type: dataTypes.INTEGER,
        },
        phone_number:{
            type: dataTypes.INTEGER,
        },
        adress:{
            type: dataTypes.STRING,
        },
        img_user:{
            type: dataTypes.STRING(500),
        },
        password:{
            type: dataTypes.STRING(500),
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

    let User = sequelize.define('User', cols, config);

    User.associate = function(models){
        // UNO A MUCHOS
        // asociacion comentarios
        User.hasMany(models.Comment , {
            as: 'comments',
            foreignkey: 'user_id'
        });
        // asociacion productos
        User.hasMany(models.Product , {
            as: 'products',
            foreignkey: 'user_id'
        });
        // asociacion carrito de compras
        User.hasMany(models.ShoppingCart , {
            as: 'shoppingCarts',
            foreignkey: 'user_id'
        })
    }

    return user
}
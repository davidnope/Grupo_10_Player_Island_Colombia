module.exports = (sequelize, dataTypes) =>{
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
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
            type: dataTypes.STRING,
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
        updatedAt : 'updated_at',
        deletedAt : false
    }

    let User = sequelize.define('User', cols, config);

    User.associate = function(models){
        // UNO A MUCHOS
        // asociacion comentarios
        User.hasMany(models.Comment , {
            as: 'comments',
            foreignKey: 'user_id'
        });
        // asociacion productos
        User.hasMany(models.Product , {
            as: 'products',
            foreignKey: 'user_id'
        });
        // asociacion carrito de compras
        User.hasMany(models.ShoppingCart , {
            as: 'shoppingCarts',
            foreignKey: 'user_id'
        })
    }

    return User
}
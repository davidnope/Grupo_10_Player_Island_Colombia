module.exports = (sequelize, dataTypes) =>{
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        comment:{
            type: dataTypes.TEXT,
        },
        product_id:{
            type: dataTypes.INTEGER.UNSIGNED,
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

    let Comment = sequelize.define('Comment', cols, config);

    Comment.associate = function(models){
        // asociacion usuarios
        Comment.belongsTo(models.User , {
            as: 'user',
            foreignKey: 'user_id'
        });
        // asociacion productos
        Comment.belongsTo(models.Product , {
            as: 'Product',
            foreignKey: 'Product_id'
        })
    }
    return Comment
}
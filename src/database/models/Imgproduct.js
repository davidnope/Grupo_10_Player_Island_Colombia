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
        product_id: {
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

    let ImgProduct = sequelize.define('ImgProduct', cols, config);

    ImgProduct.associate = function(models){
        // asociacion productos
        ImgProduct.belongsTo(models.Product , {
            as: 'product',
            foreignKey: 'product_id'
        });
    }
    return ImgProduct;
}
const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) =>{
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoincrement: true,
            primarykey: true
        },
        color:{
            type: dataTypes.STRING,
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

    let Color = sequelize.define('Color', cols, config);

    Color.associate = function(models){
        // MUCHOS A MUCHOS
        // asociacion productos
        Color.belongstoMany(models.Product , {
            as: 'products',
            throught: 'color_product',
            foreignkey: 'color_id',
            otherkey: 'product_id',
            timestamps: false,
        });
    }

    return Color;
}
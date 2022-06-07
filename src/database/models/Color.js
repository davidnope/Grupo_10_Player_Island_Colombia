module.exports = (sequelize, dataTypes) =>{
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
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
        Color.belongsToMany(models.Product , {
            as: 'products',
            through: 'color_product',
            foreignKey: 'color_id',
            otherKey: 'product_id',
            timestamps: false,
        });
    }

    return Color;
}
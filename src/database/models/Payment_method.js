const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) =>{
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoincrement: true,
            primarykey: true
        },
        methods:{
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

    let PaymentMethod = sequelize.define('PaymentMethod', cols, config);

    PaymentMethod.associate = function(models){
        // MUCHOS A MUCHOS
        // asociacion productos
        PaymentMethod.belongstoMany(models.Product , {
            as: 'products',
            throught: 'payment_method_product',
            foreignkey: 'payment_method_id',
            otherkey: 'product_id',
            timestamps: false,
        });
    }
    return PaymentMethod;
}

module.exports = (sequelize, dataTypes) =>{
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
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
        PaymentMethod.belongsToMany(models.Product , {
            as: 'products',
            through: 'payment_method_product',
            foreignKey: 'payment_method_id',
            otherKey: 'product_id',
            timestamps: false,
        });
    }
    return PaymentMethod;
}
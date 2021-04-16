const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'User'
    },

    portraitStyle:{
        type: String,
        required: true
    },

    artWorkStatus:{
        type: String,
        required: true,
        default: 'In Iroccess'
    },

    fullBody:{
        type: Boolean,
        required: true,
        default: false
    },

    videoIncluded:{
        type: Boolean,
        required: true,
        default: false
    },


    price:{
        type: Number,
        required: true
    },

    imageToPaint:{
        type: String,
        required: true,
    },

    imageToDeliver:{
        type: String,
        required: true,
        default: null
    },

    commentsToArtist:{
        type: String,
        required: false,
        default: 'no comments'
    },

    paymentMethod:{
        type: String,
        required: true,
    },

    paymentResult:{
        id:{type: String},
        status:{type: String}
    },
},{
    timestamps: true
})


const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
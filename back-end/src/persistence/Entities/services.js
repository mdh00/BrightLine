import mongoose from 'mongoose';
const {Schema} = mongoose;

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
});

const service = mongoose.model('Service', serviceSchema);

export default service;
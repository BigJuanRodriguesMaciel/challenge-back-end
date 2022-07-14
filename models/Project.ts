import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: String,
    ownerId: String,
    tasks: [
        {
            title: String,
            check: Boolean,
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Projects', projectSchema)
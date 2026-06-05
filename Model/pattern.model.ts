import mongoose, { Schema } from "mongoose";

interface IData {
    question: string;
    answer: string;
    series: string;
    _id: number;
}

const dataSchema = new Schema<IData>(
    {
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        series: {
            type: String,
            required: true
        },
        _id: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Data = mongoose.model<IData>('Data', dataSchema);

export default Data;
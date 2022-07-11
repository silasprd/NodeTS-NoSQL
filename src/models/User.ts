import { Schema, Model, model, connection } from 'mongoose';

type UserType = {
    name: {
        firstName: string,
        lastName: string
    },
    age: number,
    email: string,
    interests: [string, string, string]   
};
    
const schema = new Schema<UserType>({
    name: {
        firstName: { type: String, required: true },
        lastName: String
    },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    interests: [String]  
});
    
// Criando o Model
const modelName: string = 'User';
    
export default (connection && connection.models[modelName]) ?
    connection.models[modelName] as Model<UserType>
: 
    model<UserType>(modelName, schema)
;
    

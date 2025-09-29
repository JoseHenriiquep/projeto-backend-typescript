import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
class MoongoseConfig {
    static async connect(): Promise<void> {
        try {
            const key = `${process.env.MONGODB_KEY}${process.env.DATABASE}?${process.env.DB_OPTIONS}`;
            if (!key) throw new Error('Chave do DB não encontrada');
            const connectOptions: ConnectOptions = { connectTimeoutMS: 5000, };
            await mongoose.connect(key, connectOptions);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
    }
}
export default MoongoseConfig;
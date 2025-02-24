import mongoose from "mongoose";

const connection = {isConnected: null}

export const connectToDB = async () => {
    try {
        if (connection.isConnected) {
            return
        }
        const db = await mongoose.connect(process.env.MONGO_URL)
        connection.isConnected= db.connections[0].readyState
    } catch (error) {
        console.log("Couldn't connect wit the database: ", error)
    }
}

// 0: Bağlantı yok.
// 1: Bağlantı açık.
// 2: Bağlantı kuruluyor.
// 3: Bağlantı kapanıyor.
// 4: Bağlantı kapalı.
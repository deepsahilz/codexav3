import { MongoClient } from "mongodb";
import Tag from "./src/models/TagModel.js";

const uri = "mongodb+srv://deepsahilz:Atlas%40ghost0x1@dummycluster.dykac.mongodb.net/"; // Replace with your actual connection string
const client = new MongoClient(uri);

const insertDocuments = async () => {
    try {
        await client.connect();
        const database = client.db("codexa_v3");
        const collection = database.collection("tags");

        const technologies = [
            // add new technologies here
        ];
        
        const documents = technologies.map(tech => new Tag({ name: tech }));
        const result = await collection.insertMany(documents);
        console.log(`${result.insertedCount} documents inserted.`);
    } catch (error) {
        console.error("Error inserting documents:", error);
    } finally {
        await client.close();
    }
};

insertDocuments();

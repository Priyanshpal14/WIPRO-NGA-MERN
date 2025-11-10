// Here we will be connecting to MongoDB Atlas using TypeScript following the official MongoDB Node.js driver documentation via following steps 
// Step 1: Install the MongoDB Node.js driver
// Run the following command to install the MongoDB Node.js driver using npm
// Step 2: Import the MongoDB client in your TypeScript file
// Importing MongoClient from mongodb package
// Step 3: Create a MongoDB client and connect to the database
// Replace <username>, <password>, and <cluster-url> with your MongoDB Atlas credentials and cluster information
//Perform CRUD operations as needed
// Step 4: Close the connection when done
import { MongoClient } from "mongodb";

// ✅ Use correct connection string:
// - For local MongoDB → "mongodb://localhost:27017"
// - For MongoDB Atlas → "mongodb+srv://<username>:<password>@cluster0.mongodb.net/"
const uri: string = "mongodb://localhost:27017";

async function run() {
  const client: MongoClient = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected successfully to MongoDB");

    const database = client.db("demoDB");
    const collection = database.collection("demoCollection");

    // Example CRUD operation
    const doc = { name: "John Doe", age: 30, occupation: "Developer" };
    const result = await collection.insertOne(doc);

    console.log(`🟢 Document inserted with _id: ${result.insertedId}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  } finally {
    await client.close();
    console.log("🔒 Connection closed");
  }
}

run().catch(console.dir);

// This TypeScript code connects to a MongoDB Atlas database, inserts a document into a specified collection, and then closes the connection.   
// Make sure to replace the placeholder values in the connection string with your actual MongoDB Atlas credentials before running the code.

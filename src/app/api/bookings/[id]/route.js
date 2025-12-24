import { bookingsCollection } from "@/lib/dbCollections";
import { ObjectId } from "mongodb";

export async function GET(_, { params }) {
  const { id } = await params;
  const result = await bookingsCollection.findOne({ _id: new ObjectId(id) });
  return Response.json(result);
}

export async function DELETE(_, { params }) {
  const { id } = await params;
  const result = await bookingsCollection.deleteOne({ _id: new ObjectId(id) });
  return Response.json(result);
}

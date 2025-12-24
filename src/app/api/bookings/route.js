import { bookingsCollection } from "@/lib/dbCollections";
import { ObjectId } from "mongodb";

export async function GET(req) {
  const { searchParams: params } = new URL(req.url);
  const email = params.get("email");
  const query = {};
  if (email) {
    query.buyerEmail = email;
  }
  const result = await bookingsCollection.find(query).toArray();
  return Response.json(result);
}

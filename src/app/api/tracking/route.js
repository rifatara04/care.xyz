import { trackingsCollection } from "@/lib/dbCollections";

export async function GET(req) {
  const { searchParams: params } = new URL(req.url);
  const email = params.get("email");
  const service = params.get("service");
  const query = {};
  if (email && service) {
    query.buyerEmail = email;
    query.serviceName = service;
  }
  const result = await trackingsCollection.find(query).toArray();
  return Response.json(result);
}

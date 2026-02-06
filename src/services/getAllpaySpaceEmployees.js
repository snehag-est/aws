import payspaceClient from "../clients/payspaceClient.js";

export async function getAllPaySpaceEmployees() {
  const res = await payspaceClient.get("/Employees");
  return res.data.value;
}

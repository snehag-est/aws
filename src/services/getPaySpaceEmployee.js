import payspaceClient from "../clients/payspaceClient.js";

export async function getPaySpaceEmployee(employeeNumber) {
  const res = await payspaceClient.get(
    `/Employees?$filter=EmployeeNumber eq '${employeeNumber}'`
  );

  if (!res.data.value.length) {
    throw new Error("Employee not found in PaySpace");
  }

  return res.data.value[0];
}

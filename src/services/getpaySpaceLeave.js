import payspaceClient from "../clients/payspaceClient.js";

export async function getAllLeaves(employeeNumber) {
  const res = await payspaceClient.get(
    `/EmployeeLeaveApplications?$filter=EmployeeNumber eq '${employeeNumber}'`
  );

  return res.data.value;
}

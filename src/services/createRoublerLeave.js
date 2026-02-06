import roublerClient from "../clients/roublerClient.js";
import { leaveTypeMap } from "../utils/leaveTypeMap.js";

export async function createRoublerLeave(personId, psLeave) {
  const mutation = `
    mutation ($input: AddLeaveInput!) {
      addLeave(input: $input) {
        id
      }
    }
  `;

  const input = {
    personId,
    leaveType: leaveTypeMap[psLeave.LeaveType] || "UNPAID",
    startDate: psLeave.LeaveStartDate,
    endDate: psLeave.LeaveEndDate,
    days: psLeave.NoOfDays,
    comment: `Synced from PaySpace | LeaveId: ${psLeave.Id}`
  };

  await roublerClient.post("/graphql", {
    query: mutation,
    variables: { input }
  });
}

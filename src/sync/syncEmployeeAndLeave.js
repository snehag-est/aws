import { getPaySpaceEmployee } from "../services/getPaySpaceEmployee.js";
import { getAllLeaves } from "../services/getpaySpaceLeave.js";
import { getRoublerEmployee } from "../services/getRoublerEmployee.js";
import { createRoublerEmployee } from "../services/createRoublerEmployee.js";
import { createRoublerLeave } from "../services/createRoublerLeave.js";
import { syncedLeaves } from "../utils/syncedLeave.js";

export async function syncEmployeeAndLeave(employeeNumber) {

  console.log(`Sync started for ${employeeNumber}`);

  // 1. Get PaySpace employee
  const psEmployee = await getPaySpaceEmployee(employeeNumber);

  // 2. Get/Create Roubler employee
  let roublerEmployee = await getRoublerEmployee(employeeNumber);

  if (!roublerEmployee) {
    console.log("Creating employee in Roubler...");
    roublerEmployee = await createRoublerEmployee(psEmployee);
  }

  const personId = roublerEmployee.person.id;

  // 3. Fetch leaves
  const leaves = await getAllLeaves(employeeNumber);

  // 4. Only approved leaves
  const approvedLeaves = leaves.filter(l => l.Status === "Approved");

  for (const leave of approvedLeaves) {

    const uniqueKey = `${employeeNumber}_${leave.Id}`;

    // prevent duplicates
    if (syncedLeaves.has(uniqueKey)) {
      console.log("Already synced leave:", leave.Id);
      continue;
    }

    try {
      await createRoublerLeave(personId, leave);
      syncedLeaves.add(uniqueKey);

      console.log("Leave synced:", leave.Id);
    } catch (err) {
      console.error("Leave sync failed:", err.message);
    }
  }

  console.log(`Sync complete for ${employeeNumber}`);
}

import cron from "node-cron";
import { syncEmployeeAndLeave } from "../sync/syncEmployeeAndLeave.js";
import { getAllPaySpaceEmployees } from "../services/getAllPaySpaceEmployees.js";

const CRON_TIME = "*/15 * * * *";

cron.schedule(CRON_TIME, async () => {

  console.log("Running full sync", new Date().toISOString());

  const employees = await getAllPaySpaceEmployees();

  for (const emp of employees) {
    await syncEmployeeAndLeave(emp.EmployeeNumber);
  }

});

const { createLeaveInRoubler } = require("./roubler");

(async () => {
  try {
    const result = await createLeaveInRoubler({
      employeeId: "ROUBLER_EMPLOYEE_ID",
      leaveTypeId: "ROUBLER_LEAVE_TYPE_ID",
      startDate: "2026-01-20",
      endDate: "2026-01-22",
    });

    console.log("✅ Leave synced to Roubler:", result);
  } catch (error) {
    console.error(
      "❌ Sync failed:",
      error.response?.data || error.message
    );
  }
})();

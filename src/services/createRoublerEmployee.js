import roublerClient from "../clients/roublerClient.js";

export async function createRoublerEmployee(psEmployee) {
  const mutation = `
    mutation ($input: AddEmployeeInput!) {
      addEmployee(input: $input) {
        person { id }
      }
    }
  `;

  const input = {
    employeeNumber: psEmployee.EmployeeNumber,
    firstName: psEmployee.FirstName || "NA",
    lastName: psEmployee.LastName || "NA",
    email: psEmployee.Email
  };

  const res = await roublerClient.post("/graphql", {
    query: mutation,
    variables: { input }
  });

  const personId = res.data.data.addEmployee.person.id;

  return { person: { id: personId } };
}

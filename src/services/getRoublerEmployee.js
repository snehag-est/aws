import roublerClient from "../clients/roublerClient.js";

export async function getRoublerEmployee(employeeNumber) {
  const query = `
    query ($employeeNumber: String!) {
      employees(filter: { employeeNumber: { eq: $employeeNumber } }) {
        nodes {
          person { id }
        }
      }
    }
  `;

  const res = await roublerClient.post("/graphql", {
    query,
    variables: { employeeNumber }
  });

  return res.data.data.employees.nodes[0] || null;
}

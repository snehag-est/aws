import axios from "axios";


const payspaceClient = axios.create({
  baseURL: `${process.env.PAYSPACE_BASE_URL}/${process.env.PAYSPACE_COMPANY_ID}`,
  headers: {
    Authorization: `Bearer ${process.env.PAYSPACE_TOKEN}`,
    Accept: "application/json"
  }
});

export default payspaceClient;

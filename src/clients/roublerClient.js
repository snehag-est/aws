import axios from "axios";


const roublerClient = axios.create({
  baseURL: "https://api.roubler.com",
  headers: {
    Authorization: `Bearer ${process.env.ROUBLER_TOKEN}`,
    "Content-Type": "application/json"
  }
});

export default roublerClient;

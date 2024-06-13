const datasetId = "d_bda4baa634dd1cc7a6c7cad5f19e2d68";
const url =
  "https://data.gov.sg/api/action/datastore_search?resource_id=" + datasetId;


export const API = {
  getHawker: async function () {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}


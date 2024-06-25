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
      const data = await response.json();
      const pages = Math.ceil(data.result.total/100)
      const records = data.result.records
      let totalRecords = []

      let counter = 1
      while (counter < pages) {
        const response = await fetch(url + `&offset=${100 * counter}`)
        const data = await response.json();
        totalRecords = records.concat(data.result.records)
        counter++
      }

      return totalRecords
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}


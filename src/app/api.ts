import { GeolocationPosition } from "@/model/interfaces";

export const API = {
  getHawker: async function () {
    try {
      const hawkerDatasetId = "d_bda4baa634dd1cc7a6c7cad5f19e2d68";
      const url = "https://data.gov.sg/api/action/datastore_search?resource_id=" + hawkerDatasetId;

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
  },
  getCurrentLocation: async function () {
    try {
      const position: GeolocationPosition = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => resolve(position), error => reject(error))
      })

      if (position) {
        return [position.coords.latitude, position.coords.longitude]
      }
      return null
    } catch (error: any) {
      console.error(`ERROR(${error.code}): ${error.message}`);
    }
  },
  google: async function (name: any) {
    try {
      const url = `${process.env.API_URL}/google?query=${name}`
      const response = await fetch(url)
      return response
    } catch (error: any) {
      console.error("Error fetching google search results:", error);
    }
  },
}


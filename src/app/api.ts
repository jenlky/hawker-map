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
    const successfulCallback = (position: any) => {
      console.log(position)
      return [position.coords.latitude, position.coords.longitude]
    }

    const errorCallback = (err: any) => {
      console.error(`ERROR(${err.code}): ${err.message}`);
    }

    return navigator.geolocation.getCurrentPosition(successfulCallback, errorCallback, { timeout: 10000 })
  },
  scrape: async function (name: any) {
    try {
      const url = `http://localhost:4000/scrape?name=${name}`
      const response: any = await fetch(url)
      console.log('response', response)

      return response
    } catch (error) {
      console.error("Error scraping data:", error);
    }
  }
}


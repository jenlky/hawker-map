export interface HawkerData {
  address_myenv: string,
  description_myenv: string, 
  google_3d_view: string,
  google_for_stall: string,
  latitude_hc: string, 
  longitude_hc: string, 
  name: string, 
  no_of_food_stalls: string,
  no_of_market_stalls: string,
  other_works_enddate: string,
  other_works_startdate: string, 
  photourl: string, 
  q1_cleaningenddate: string,
  q1_cleaningstartdate: string,
  q2_cleaningenddate: string,
  q2_cleaningstartdate: string,
  q3_cleaningenddate: string,
  q3_cleaningstartdate: string,
  q4_cleaningenddate: string,
  q4_cleaningstartdate: string,
  remarks_other_works: string,
  remarks_q1: string,
  remarks_q2: string,
  remarks_q3: string,
  remarks_q4: string,
  serial_no: string,
  status: string,
  _id: number
}

export interface GeolocationPosition {
  coords: {
    latitude: number,
    longitude: number
  },
  timestamp: number
}
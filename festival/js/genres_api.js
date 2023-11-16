const BASE_URL = "http://54.180.73.89:8080/event";
const SEARCH_URL = "http://54.180.73.89:8080/event/search";

async function getEventData(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching event data:", error);
    return null;
  }
}

async function getRegionData() {
  try {
    const response = await fetch(SEARCH_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching event data:", error);
    return null;
  }
}

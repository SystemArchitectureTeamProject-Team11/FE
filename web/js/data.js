const BASE_URL = "http://15.164.104.206:8080/event/";

async function getEventData(id) {
  try {
    const response = await fetch(`${BASE_URL}${id}`);
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

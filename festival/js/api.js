const id = 480;
const BASE_URL = `http://54.180.73.89:8080/event`;

async function getEventData(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`); // Make a GET request to the BASE_URL
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
    }
    const data = await response.json(); // Parse the JSON data
    return data; // Return the data
  } catch (error) {
    console.error("Error fetching event data:", error); // Log any errors
    return null; // Return null or handle the error as needed
  }
}

// async function getEventData() {
//   // 임시 데이터 반환
//   return Promise.resolve({
//     id: 4768,
//     title: "춤과 인문학 part.2, 해설과 시연이 있는 춤 콘서트 [청주]",
//     startDate: "2023-10-04",
//     endDate: "2023-12-27",
//     category: "무용",
//     region: "충청북도",
//     place: "공간춤 (공간춤)",
//     introduction: "",
//     performer: "",
//     poster:
//       "http://www.kopis.or.kr/upload/pfmPoster/PF_PF229505_231107_131048.jpg",
//     isStart: "개최중",
//   });
// }

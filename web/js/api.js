const id = 4768;
const BASE_URL = `http://3.34.134.89:8080/event/${id}`;

// /event 엔드포인트에서 이벤트 데이터를 가져오는 함수
async function getEventData() {
  try {
    const response = await fetch(BASE_URL); // Make a GET request to the BASE_URL
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
//     id: 1,
//     title: "ACC 공연 레지던시 결과발표회, 극장1",
//     startDate: "2023-11-18",
//     endDate: "2023-11-18",
//     category: "연극",
//     region: "광주광역시",
//     place: "국립아시아문화전당 (극장1)",
//     introduction: "이번 공연은 ACC 공연 레지던시의 결과로 마련된 발표회입니다.",
//     performer: "김영숙, 김재훈, 김정아, 김정희, 나경민, 정명옥, 조금숙 등",
//     poster:
//       "https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=d5e5494491b1481081180ac991c410db&thumb=Y",
//   });
// }

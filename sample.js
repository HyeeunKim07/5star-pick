var map = L.map("map").setView([36.0, 127.5], 7);

L.tileLayer("https://tiles.osm.kr/hot/{z}/{x}/{y}.png", {
  maxZoom: 30,
  attribution:
    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// 적는 법 {latling: [위도, 경도], popupContent: '이름'}
var markers = [
  {
    latlng: [35.8032306, 127.0999292],
    popupContent: "꾸지뽕시대 (김치찌개)",
  },
  {
    latlng: [35.8036239, 127.1003873],
    popupContent: "장어마을 (장어덮밥)",
  },
  {
    latlng: [35.8034782, 127.1004966],
    popupContent: "삼광 (백반)",
  },
  {
    latlng: [35.806917, 127.1181982],
    popupContent: "조선옥 (순댓국)",
  },
  {
    latlng: [35.8171713, 127.1233623],
    popupContent: "유성식당 (순댓국)",
  },
  {
    latlng: [35.7984224, 127.1100286],
    popupContent: "호순이감자탕 (감자탕)",
  },
  {
    latlng: [35.815569, 127.1205029],
    popupContent: "꼴통갈매기 (고기)",
  },
  {
    latlng: [35.8212193, 127.0967014],
    popupContent: "효자동그집 (중식당)",
  },
];

markers.forEach(function (markerInfo) {
  var marker = L.marker(markerInfo.latlng).addTo(map);
  marker.bindPopup(markerInfo.popupContent);
});

map.on("click", function (e) {
  updateInfoPanel(e.latlng);
});

function updateInfoPanel(latlng) {
  // 클릭한 위치의 위도와 경도 업데이트
  document.getElementById("latitude").textContent = latlng.lat.toFixed(6);
  document.getElementById("longitude").textContent = latlng.lng.toFixed(6);

  // 클릭한 위치의 주소를 지오코딩을 통해 가져오기 (OpenCage Geocoder 사용)
  fetch(
    "https://api.opencagedata.com/geocode/v1/json?q=" +
      latlng.lat +
      "+" +
      latlng.lng +
      "&key=YOUR_OPENCAGE_API_KEY"
  )
    .then((response) => response.json())
    .then((data) => {
      const address = data.results[0].formatted;
      document.getElementById("address").textContent = address;
    })
    .catch((error) => {
      console.error("Error fetching address:", error);
    });
}

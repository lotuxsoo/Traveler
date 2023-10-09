// import React from "react";
// import { View, StyleSheet, Dimensions } from "react-native";
// import { WebView } from "react-native-webview";

// const MapPage = () => {
//   const htmlContent = `
//   <!DOCTYPE html>
//   <html>
//   <head>
//       <meta charset="utf-8">
//       <title>키워드로 장소검색하고 목록으로 표출하기</title>
//       <style>
//           html,
//           body,
//           #map {
//               width: 100%;
//               height: 100%;
//               margin: 0;
//               padding: 0;
//           }
//       </style>
//   </head>
//   <body>
//   <div id="map"></div>

//   <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=82cd9d44b8b5c5e632ced2ff75fee1e2&libraries=services"></script>
//   <script>
//       // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
//       var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

//       var mapContainer = document.getElementById('map'); // 지도를 표시할 div

//       // 지도를 생성합니다
//       var map = new kakao.maps.Map(mapContainer, {
//           center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
//           level: 3 // 지도의 확대 레벨
//       });

//       // 장소 검색 객체를 생성합니다
//       var ps = new kakao.maps.services.Places();

//       // 키워드로 장소를 검색합니다
//       ps.keywordSearch('이태원 맛집', placesSearchCB);

//       // 키워드 검색 완료 시 호출되는 콜백함수 입니다
//       function placesSearchCB(data, status, pagination) {
//           if (status === kakao.maps.services.Status.OK) {

//               // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//               // LatLngBounds 객체에 좌표를 추가합니다
//               var bounds = new kakao.maps.LatLngBounds();

//               for (var i = 0; i < data.length; i++) {
//                   displayMarker(data[i]);
//                   bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
//               }

//               // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//               map.setBounds(bounds);
//           }
//       }

//       // 지도에 마커를 표시하는 함수입니다
//       function displayMarker(place) {

//           // 마커를 생성하고 지도에 표시합니다
//           var marker = new kakao.maps.Marker({
//               map: map,
//               position: new kakao.maps.LatLng(place.y, place.x)
//           });

//           // 마커에 클릭이벤트를 등록합니다
//           kakao.maps.event.addListener(marker, 'click', function () {
//               // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
//               infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
//               infowindow.open(map, marker);
//           });
//       }
//   </script>
//   </body>
//   </html>
//   `;

//   return (
//     <View style={styles.container}>
//       <WebView
//         originWhitelist={["*"]}
//         source={{ html: htmlContent }}
//         javaScriptEnabled={true}
//         style={styles.webView}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   webView: {
//     flex: 1,
//   },
// });

// export default MapPage;

// import React from "react";
// import { View, StyleSheet, Dimensions } from "react-native";
// import { WebView } from "react-native-webview";

// const MapPage = () => {
//   const htmlContent = `
//   <!DOCTYPE html>
//   <html>
//   <head>
//       <meta charset="utf-8">
//       <title>키워드로 장소검색하고 목록으로 표출하기</title>
//       <style>
//           .map_wrap, .map_wrap * {margin:0;padding:0;font-family:'Malgun Gothic',dotum,'돋움',sans-serif;font-size:12px;}
//           .map_wrap a, .map_wrap a:hover, .map_wrap a:active{color:#000;text-decoration: none;}
//           .map_wrap {position:relative;width:100%;height:500px;}
//           #menu_wrap {position:absolute;top:0;left:0;bottom:0;width:250px;margin:10px 0 30px 10px;padding:5px;overflow-y:auto;background:rgba(255, 255, 255, 0.7);z-index: 1;font-size:12px;border-radius: 10px;}
//           .bg_white {background:#fff;}
//           #menu_wrap hr {display: block; height: 1px;border: 0; border-top: 2px solid #5F5F5F;margin:3px 0;}
//           #menu_wrap .option{text-align: center;}
//           #menu_wrap .option p {margin:10px 0;}
//           #menu_wrap .option button {margin-left:5px;}
//           #placesList li {list-style: none;}
//           #placesList .item {position:relative;border-bottom:1px solid #888;overflow: hidden;cursor: pointer;min-height: 65px;}
//           #placesList .item span {display: block;margin-top:4px;}
//           #placesList .item h5, #placesList .item .info {text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
//           #placesList .item .info{padding:10px 0 10px 55px;}
//           #placesList .info .gray {color:#8a8a8a;}
//           #placesList .info .jibun {padding-left:26px;background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;}
//           #placesList .info .tel {color:#009900;}
//           #placesList .item .markerbg {float:left;position:absolute;width:36px; height:37px;margin:10px 0 0 10px;background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;}
//           #placesList .item .marker_1 {background-position: 0 -10px;}
//           #placesList .item .marker_2 {background-position: 0 -56px;}
//           #placesList .item .marker_3 {background-position: 0 -102px}
//           #placesList .item .marker_4 {background-position: 0 -148px;}
//           #placesList .item .marker_5 {background-position: 0 -194px;}
//           #placesList .item .marker_6 {background-position: 0 -240px;}
//           #placesList .item .marker_7 {background-position: 0 -286px;}
//           #placesList .item .marker_8 {background-position: 0 -332px;}
//           #placesList .item .marker_9 {background-position: 0 -378px;}
//           #placesList .item .marker_10 {background-position: 0 -423px;}
//           #placesList .item .marker_11 {background-position: 0 -470px;}
//           #placesList .item .marker_12 {background-position: 0 -516px;}
//           #placesList .item .marker_13 {background-position: 0 -562px;}
//           #placesList .item .marker_14 {background-position: 0 -608px;}
//           #placesList .item .marker_15 {background-position: 0 -654px;}
//           #pagination {margin:10px auto;text-align: center;}
//           #pagination a {display:inline-block;margin-right:10px;}
//           #pagination .on {font-weight: bold; cursor: default;color:#777;}
//       </style>
//   </head>
//   <body>
//   <div class="map_wrap">
//       <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>

//       <div id="menu_wrap" class="bg_white">
//           <div class="option">
//               <div>
//                   <form onsubmit="searchPlaces(); return false;">
//                       키워드 : <input type="text" value="이태원 맛집" id="keyword" size="15">
//                       <button type="submit">검색하기</button>
//                   </form>
//               </div>
//           </div>
//           <hr>
//           <ul id="placesList"></ul>
//           <div id="pagination"></div>
//       </div>
//   </div>

//   <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=82cd9d44b8b5c5e632ced2ff75fee1e2&libraries=services"></script>
//   <script>
//   // 마커를 담을 배열입니다
//   var markers = [];

//   var mapContainer = document.getElementById('map'), // 지도를 표시할 div
//       mapOption = {
//           center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
//           level: 3 // 지도의 확대 레벨
//       };

//   // 지도를 생성합니다
//   var map = new kakao.maps.Map(mapContainer, mapOption);

//   // 장소 검색 객체를 생성합니다
//   var ps = new kakao.maps.services.Places();

//   // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
//   var infowindow = new kakao.maps.InfoWindow({zIndex:1});

//   // 키워드로 장소를 검색합니다
//   searchPlaces();

//   // 키워드 검색을 요청하는 함수입니다
//   function searchPlaces() {

//       var keyword = document.getElementById('keyword').value;

//       if (!keyword.replace(/^\s+|\s+$/g, '')) {
//           alert('키워드를 입력해주세요!');
//           return false;
//       }

//       // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
//       ps.keywordSearch( keyword, placesSearchCB);
//   }

//   // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
//   function placesSearchCB(data, status, pagination) {
//       if (status === kakao.maps.services.Status.OK) {

//           // 정상적으로 검색이 완료됐으면
//           // 검색 목록과 마커를 표출합니다
//           displayPlaces(data);

//           // 페이지 번호를 표출합니다
//           displayPagination(pagination);

//       } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

//           alert('검색 결과가 존재하지 않습니다.');
//           return;

//       } else if (status === kakao.maps.services.Status.ERROR) {

//           alert('검색 결과 중 오류가 발생했습니다.');
//           return;

//       }
//   }

//   // 검색 결과 목록과 마커를 표출하는 함수입니다
//   function displayPlaces(places) {

//       var listEl = document.getElementById('placesList'),
//       menuEl = document.getElementById('menu_wrap'),
//       fragment = document.createDocumentFragment(),
//       bounds = new kakao.maps.LatLngBounds(),
//       listStr = '';

//       // 검색 결과 목록에 추가된 항목들을 제거합니다
//       removeAllChildNods(listEl);

//       // 지도에 표시되고 있는 마커를 제거합니다
//       removeMarker();

//       for ( var i=0; i<places.length; i++ ) {

//           // 마커를 생성하고 지도에 표시합니다
//           var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
//               marker = addMarker(placePosition, i),
//               itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

//           // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//           // LatLngBounds 객체에 좌표를 추가합니다
//           bounds.extend(placePosition);

//           // 마커와 검색결과 항목에 mouseover 했을때
//           // 해당 장소에 인포윈도우에 장소명을 표시합니다
//           // mouseout 했을 때는 인포윈도우를 닫습니다
//           (function(marker, title) {
//               kakao.maps.event.addListener(marker, 'mouseover', function() {
//                   displayInfowindow(marker, title);
//               });

//               kakao.maps.event.addListener(marker, 'mouseout', function() {
//                   infowindow.close();
//               });

//               itemEl.onmouseover =  function () {
//                   displayInfowindow(marker, title);
//               };

//               itemEl.onmouseout =  function () {
//                   infowindow.close();
//               };
//           })(marker, places[i].place_name);

//           fragment.appendChild(itemEl);
//       }

//       // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
//       listEl.appendChild(fragment);
//       menuEl.scrollTop = 0;

//       // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//       map.setBounds(bounds);
//   }

//   // 검색결과 항목을 Element로 반환하는 함수입니다
//   function getListItem(index, places) {

//       var el = document.createElement('li'),
//       itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
//                   '<div class="info">' +
//                   '   <h5>' + places.place_name + '</h5>';

//       if (places.road_address_name) {
//           itemStr += '    <span>' + places.road_address_name + '</span>' +
//                       '   <span class="jibun gray">' +  places.address_name  + '</span>';
//       } else {
//           itemStr += '    <span>' +  places.address_name  + '</span>';
//       }

//         itemStr += '  <span class="tel">' + places.phone  + '</span>' +
//                   '</div>';

//       el.innerHTML = itemStr;
//       el.className = 'item';

//       return el;
//   }

//   // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
//   function addMarker(position, idx, title) {
//       var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
//           imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
//           imgOptions =  {
//               spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
//               spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
//               offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
//           },
//           markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
//               marker = new kakao.maps.Marker({
//               position: position, // 마커의 위치
//               image: markerImage
//           });

//       marker.setMap(map); // 지도 위에 마커를 표출합니다
//       markers.push(marker);  // 배열에 생성된 마커를 추가합니다

//       return marker;
//   }

//   // 지도 위에 표시되고 있는 마커를 모두 제거합니다
//   function removeMarker() {
//       for ( var i = 0; i < markers.length; i++ ) {
//           markers[i].setMap(null);
//       }
//       markers = [];
//   }

//   // 검색결과 목록과 마커를 클릭했을 때 호출되는 함수입니다
//   // 인포윈도우에 장소명을 표시합니다
//   function displayInfowindow(marker, title) {
//       var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

//       infowindow.setContent(content);
//       infowindow.open(map, marker);
//   }

//   // 검색결과 목록의 자식 Element를 제거하는 함수입니다
//   function removeAllChildNods(el) {
//       while (el.hasChildNodes()) {
//           el.removeChild (el.lastChild);
//       }
//   }
//   </script>
//   </body>
//   </html>
//   `;

//   return (
//     <View style={styles.container}>
//       <WebView source={{ html: htmlContent }} style={styles.map} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });

// export default MapPage;

// import React from "react";
// import { View, StyleSheet, Dimensions } from "react-native";
// import { WebView } from "react-native-webview";

// const MapPage = () => {
//   const htmlContent = `
//   <!DOCTYPE html>
//   <html>
//   <head>
//       <meta charset="utf-8">
//       <title>키워드로 장소검색하고 목록으로 표출하기</title>
//       <style>
//           /* 스타일을 추가하여 지도가 화면에 가득 차게 설정 */
//           html, body {
//             margin: 0;
//             padding: 0;
//             height: 100%;
//             overflow: hidden;
//           }
//           .map_wrap {
//             width: 100%;
//             height: 100%;
//           }
//       </style>
//   </head>
//   <body>
//   <div class="map_wrap">
//       <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>

//       <div id="menu_wrap" class="bg_white">
//           <div class="option">
//               <div>
//                   <form onsubmit="searchPlaces(); return false;">
//                       키워드 : <input type="text" value="이태원 맛집" id="keyword" size="15">
//                       <button type="submit">검색하기</button>
//                   </form>
//               </div>
//           </div>
//           <hr>
//           <ul id="placesList"></ul>
//           <div id="pagination"></div>
//       </div>
//   </div>

//   <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=82cd9d44b8b5c5e632ced2ff75fee1e2&libraries=services"></script>
//   <script>
//     document.addEventListener("DOMContentLoaded", function() {
//       // 마커를 담을 배열입니다
//       var markers = [];

//       var mapContainer = document.getElementById('map'), // 지도를 표시할 div
//           mapOption = {
//               center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
//               level: 3 // 지도의 확대 레벨
//           };

//       // 지도를 생성합니다
//       var map = new kakao.maps.Map(mapContainer, mapOption);

//       // 장소 검색 객체를 생성합니다
//       var ps = new kakao.maps.services.Places();

//       // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
//       var infowindow = new kakao.maps.InfoWindow({zIndex:1});

//       // 키워드로 장소를 검색합니다
//       searchPlaces();

//       // 키워드 검색을 요청하는 함수입니다
//       function searchPlaces() {
//           var keyword = document.getElementById('keyword').value;

//           if (!keyword.replace(/^\s+|\s+$/g, '')) {
//               alert('키워드를 입력해주세요!');
//               return false;
//           }

//           // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
//           ps.keywordSearch(keyword, placesSearchCB);
//       }

//       // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
//       function placesSearchCB(data, status, pagination) {
//           if (status === kakao.maps.services.Status.OK) {
//               // 정상적으로 검색이 완료됐으면
//               // 검색 목록과 마커를 표출합니다
//               displayPlaces(data);

//               // 페이지 번호를 표출합니다
//               displayPagination(pagination);

//           } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//               alert('검색 결과가 존재하지 않습니다.');
//               return;

//           } else if (status === kakao.maps.services.Status.ERROR) {
//               alert('검색 결과 중 오류가 발생했습니다.');
//               return;
//           }
//       }

//       // 검색 결과 목록과 마커를 표출하는 함수입니다
//       function displayPlaces(places) {
//           var listEl = document.getElementById('placesList'),
//               menuEl = document.getElementById('menu_wrap'),
//               fragment = document.createDocumentFragment(),
//               bounds = new kakao.maps.LatLngBounds(),
//               listStr = '';

//           // 검색 결과 목록에 추가된 항목들을 제거합니다
//           removeAllChildNods(listEl);

//           // 지도에 표시되고 있는 마커를 제거합니다
//           removeMarker();

//           for (var i=0; i<places.length; i++) {
//               // 마커를 생성하고 지도에 표시합니다
//               var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
//                   marker = addMarker(placePosition, i),
//                   itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

//               // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//               // LatLngBounds 객체에 좌표를 추가합니다
//               bounds.extend(placePosition);

//               // 마커와 검색결과 항목에 mouseover 했을 때
//               // 해당 장소에 인포윈도우에 장소명을 표시합니다
//               // mouseout 했을 때는 인포윈도우를 닫습니다
//               (function(marker, title) {
//                   kakao.maps.event.addListener(marker, 'mouseover', function() {
//                       displayInfowindow(marker, title);
//                   });

//                   kakao.maps.event.addListener(marker, 'mouseout', function() {
//                       infowindow.close();
//                   });

//                   itemEl.onmouseover =  function () {
//                       displayInfowindow(marker, title);
//                   };

//                   itemEl.onmouseout =  function () {
//                       infowindow.close();
//                   };
//               })(marker, places[i].place_name);

//               fragment.appendChild(itemEl);
//           }

//           // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
//           listEl.appendChild(fragment);
//           menuEl.scrollTop = 0;

//           // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//           map.setBounds(bounds);
//       }

//       // 검색결과 항목을 Element로 반환하는 함수입니다
//       function getListItem(index, places) {
//           var el = document.createElement('li'),
//               itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
//                           '<div class="info">' +
//                           '   <h5>' + places.place_name + '</h5>';

//           if (places.road_address_name) {
//               itemStr += '    <span>' + places.road_address_name + '</span>' +
//                           '   <span class="jibun gray">' +  places.address_name  + '</span>';
//           } else {
//               itemStr += '    <span>' +  places.address_name  + '</span>';
//           }

//           itemStr += '  <span class="tel">' + places.phone  + '</span>' +
//                       '</div>';

//           el.innerHTML = itemStr;
//           el.className = 'item';

//           return el;
//       }

//       // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
//       function addMarker(position, idx, title) {
//           var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
//               imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
//               imgOptions =  {
//                   spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
//                   spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
//                   offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
//               },
//               markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
//               marker = new kakao.maps.Marker({
//                   position: position, // 마커의 위치
//                   image: markerImage
//               });

//           marker.setMap(map); // 지도 위에 마커를 표출합니다
//           markers.push(marker);  // 배열에 생성된 마커를 추가합니다

//           return marker;
//       }

//       // 지도 위에 표시되고 있는 마커를 모두 제거합니다
//       function removeMarker() {
//           for (var i = 0; i < markers.length; i++) {
//               markers[i].setMap(null);
//           }
//           markers = [];
//       }

//       // 검색결과 목록과 마커를 클릭했을 때 호출되는 함수입니다
//       // 인포윈도우에 장소명을 표시합니다
//       function displayInfowindow(marker, title) {
//           var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

//           infowindow.setContent(content);
//           infowindow.open(map, marker);
//       }

//       // 검색결과 목록의 자식 Element를 제거하는 함수입니다
//       function removeAllChildNods(el) {
//           while (el.hasChildNodes()) {
//               el.removeChild(el.lastChild);
//           }
//       }
//     });
//   </script>
//   </body>
//   </html>
//   `;

//   return (
//     <View style={styles.container}>
//       <WebView
//         source={{ html: htmlContent }}
//         style={styles.map}
//         scrollEnabled={false} // 스크롤 기능 비활성화
//         allowsBackForwardNavigationGestures={false} // 뒤로가기/앞으로 가기 제스처 비활성화
//         scalesPageToFit={true} // 페이지 확대/축소 비활성화
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });

// export default MapPage;

// import React, { useState } from "react";
// import { View, StyleSheet, Dimensions, TextInput, Button } from "react-native";
// import MapView, { Marker } from "react-native-maps";

// const MapPage = () => {
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [mapRegion, setMapRegion] = useState(null);

//   const handleSearch = () => {
//     if (searchKeyword.trim() === "") {
//       return;
//     }

//     const query = encodeURIComponent(searchKeyword);
//     fetch(
//       `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`,
//       {
//         headers: {
//           Authorization: "01178e18fbe098e01308aa8ff1c9c273",
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.documents && data.documents.length > 0) {
//           setSearchResults(data.documents);

//           const firstPlace = data.documents[0];
//           const region = {
//             latitude: parseFloat(firstPlace.y),
//             longitude: parseFloat(firstPlace.x),
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           };
//           setMapRegion(region);
//         } else {
//           setSearchResults([]);
//           setMapRegion(null);
//         }
//       })
//       .catch((error) => console.error(error));
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.input}
//           value={searchKeyword}
//           onChangeText={(text) => setSearchKeyword(text)}
//           placeholder="검색어를 입력하세요"
//         />
//         <Button title="검색" onPress={handleSearch} />
//       </View>
//       <View style={styles.mapContainer}>
//         {mapRegion ? (
//           <MapView style={styles.map} region={mapRegion}>
//             {searchResults.map((place) => (
//               <Marker
//                 key={place.id}
//                 coordinate={{
//                   latitude: parseFloat(place.y),
//                   longitude: parseFloat(place.x),
//                 }}
//                 title={place.place_name}
//               />
//             ))}
//           </MapView>
//         ) : null}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 10,
//     marginTop: 10,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginRight: 10,
//     paddingHorizontal: 10,
//   },
//   mapContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });

// export default MapPage;

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
  SafeAreaView,
  StatusBar,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.566826,
    longitude: 126.9786567,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleSearch = () => {
    if (searchKeyword.trim() === "") {
      return;
    }

    const query = encodeURIComponent(searchKeyword);
    console.log(query);

    fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`,
      {
        headers: {
          Authorization: "KakaoAK 01178e18fbe098e01308aa8ff1c9c273",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.documents);
        //console.log(data);
        console.log(data.documents[0]);

        if (data.documents.length > 0) {
          const firstPlace = data.documents[0];
          const region = {
            latitude: parseFloat(firstPlace.y),
            longitude: parseFloat(firstPlace.x),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          setMapRegion(region);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={searchKeyword}
          onChangeText={(text) => setSearchKeyword(text)}
          placeholder="검색어를 입력하세요"
        />
        <Button title="검색" onPress={handleSearch} />
      </View>
      <View style={styles.mapContainer}>
        {mapRegion && searchResults ? (
          <MapView style={styles.map} region={mapRegion}>
            {searchResults.map((place) => (
              <Marker
                key={place.id}
                coordinate={{
                  latitude: parseFloat(place.y),
                  longitude: parseFloat(place.x),
                }}
                title={place.place_name}
              />
            ))}
          </MapView>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapPage;
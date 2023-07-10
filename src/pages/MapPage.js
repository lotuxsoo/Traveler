import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { WebView } from "react-native-webview";

const MapPage = () => {
  const [webViewContent, setWebViewContent] = useState(null);
  const [keyword, setKeyword] = useState("");
  const webViewRef = useRef(null);

  useEffect(() => {
    const htmlContent = `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>키워드로 장소검색하고 목록으로 표출하기</title>
    <style>
        .map_wrap {
            position: relative;
            width: 100%;
            height: 500px;
            overflow: hidden;
        }

        #map {
            width: 100%;
            height: 100%;
        }

        .menu_wrap {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 250px;
            margin: 10px 0 30px 10px;
            padding: 5px;
            overflow-y: auto;
            background: rgba(255, 255, 255, 0.7);
            z-index: 1;
            font-size: 12px;
            border-radius: 10px;
        }

        .bg_white {
            background: #fff;
        }

        .menu_wrap hr {
            display: block;
            height: 1px;
            border: 0;
            border-top: 2px solid #5F5F5F;
            margin: 3px 0;
        }

        .menu_wrap .option {
            text-align: center;
        }

        .menu_wrap .option p {
            margin: 10px 0;
        }

        .menu_wrap .option button {
            margin-left: 5px;
        }

        #placesList li {
            list-style: none;
        }

        #placesList .item {
            position: relative;
            border-bottom: 1px solid #888;
            overflow: hidden;
            cursor: pointer;
            min-height: 65px;
        }

        #placesList .item span {
            display: block;
            margin-top: 4px;
        }

        #placesList .item h5,
        #placesList .item .info {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        #placesList .item .info {
            padding: 10px 0 10px 55px;
        }

        #placesList .info .gray {
            color: #8a8a8a;
        }

        #placesList .info .jibun {
            padding-left: 26px;
            background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;
        }

        #placesList .info .tel {
            color: #009900;
        }

        #placesList .item .markerbg {
            float: left;
            position: absolute;
            width: 36px;
            height: 37px;
            margin: 10px 0 0 10px;
            background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;
        }

        #placesList .item .marker_1 {
            background-position: 0 -10px;
        }

        #placesList .item .marker_2 {
            background-position: 0 -56px;
        }

        #placesList .item .marker_3 {
            background-position: 0 -102px
        }

        #placesList .item .marker_4 {
            background-position: 0 -148px;
        }

        #placesList .item .marker_5 {
            background-position: 0 -194px;
        }

        #placesList .item .marker_6 {
            background-position: 0 -240px;
        }

        #placesList .item .marker_7 {
            background-position: 0 -286px;
        }

        #placesList .item .marker_8 {
            background-position: 0 -332px;
        }

        #placesList .item .marker_9 {
            background-position: 0 -378px;
        }

        #placesList .item .marker_10 {
            background-position: 0 -423px;
        }

        #placesList .item .marker_11 {
            background-position: 0 -470px;
        }

        #placesList .item .marker_12 {
            background-position: 0 -516px;
        }

        #placesList .item .marker_13 {
            background-position: 0 -562px;
        }

        #placesList .item .marker_14 {
            background-position: 0 -608px;
        }

        #placesList .item .marker_15 {
            background-position: 0 -654px;
        }

        #pagination {
            margin: 10px auto;
            text-align: center;
        }

        #pagination a {
            display: inline-block;
            margin-right: 10px;
        }

        #pagination .on {
            font-weight: bold;
            cursor: default;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="map_wrap">
        <div id="map"></div>

        <div class="menu_wrap bg_white">
            <div class="option">
                <div>
                    <form onsubmit="searchPlaces(); return false;">
                        키워드 : <input type="text" value="이태원 맛집" id="keyword" size="15">
                        <button type="submit">검색하기</button>
                    </form>
                </div>
            </div>
            <hr>
            <ul id="placesList"></ul>
            <div id="pagination"></div>
        </div>
    </div>

    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&libraries=services"></script>
    <script>
        // 마커를 담을 배열입니다
        var markers = [];

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };

        // 지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places();

        function searchPlaces() {
            var keyword = document.getElementById('keyword').value;
            if (!keyword.replace(/^\s+|\s+$/g, '')) {
                alert('검색어를 입력해주세요!');
                return false;
            }

            ps.keywordSearch(keyword, placesSearchCB);
        }

        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.StatusOK) {
                var bounds = new kakao.maps.LatLngBounds();
                var listEl = document.getElementById('placesList');
                listEl.innerHTML = '';

                for (var i = 0; i < data.length; i++) {
                    displayMarker(data[i]);
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));

                    var itemEl = document.createElement('li');
                    var itemStr = '<span class="markerbg marker_' + (i + 1) + '"></span>' +
                        '<div class="info">' +
                        '   <h5>' + data[i].place_name + '</h5>';

                    if (data[i].road_address_name) {
                        itemStr += '    <span>' + data[i].road_address_name + '</span>' +
                            '   <span class="jibun gray">' + data[i].address_name + '</span>';
                    } else {
                        itemStr += '    <span>' + data[i].address_name + '</span>';
                    }

                    itemStr += '  <span class="tel">' + data[i].phone + '</span>' +
                        '</div>';

                    itemEl.innerHTML = itemStr;
                    itemEl.className = 'item';
                    listEl.appendChild(itemEl);
                }

                map.setBounds(bounds);
                displayPagination(pagination);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                alert('검색 결과가 존재하지 않습니다.');
            } else if (status === kakao.maps.services.Status.ERROR) {
                alert('검색 결과 중 오류가 발생했습니다.');
            }
        }

        function displayMarker(place) {
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            });

            kakao.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });

            markers.push(marker);
        }

        function displayPagination(pagination) {
            var paginationEl = document.getElementById('pagination');
            var fragment = document.createDocumentFragment();
            paginationEl.innerHTML = '';

            for (var i = 1; i <= pagination.last; i++) {
                var el = document.createElement('a');
                el.href = '#';
                el.innerHTML = i;

                if (i === pagination.current) {
                    el.className = 'on';
                } else {
                    el.onclick = (function (i) {
                        return function () {
                            pagination.gotoPage(i);
                        }
                    })(i);
                }

                fragment.appendChild(el);
            }

            paginationEl.appendChild(fragment);
        }
    </script>
</body>
</html>

    `;

    setWebViewContent(htmlContent);
  }, [keyword]);

  const handleWebViewMessage = (event) => {
    const keyword = event.nativeEvent.data;
    setKeyword(keyword);
  };

  const injectJavaScript = `
    document.getElementById('keyword').value = "${keyword}";
    searchPlaces();
  `;

  useEffect(() => {
    if (webViewRef.current && keyword) {
      webViewRef.current.injectJavaScript(injectJavaScript);
    }
  }, [keyword]);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: webViewContent }}
        javaScriptEnabled={true}
        style={styles.webView}
        onMessage={handleWebViewMessage}
      />
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="장소를 입력하세요"
          value={keyword}
          onChangeText={setKeyword}
        />
        <Button
          title="검색"
          onPress={() => webViewRef.current.injectJavaScript(`searchPlaces()`)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    zIndex: 1,
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
  webView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default MapPage;

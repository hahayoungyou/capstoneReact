import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import styled from "styled-components";


/*global kakao*/
class MapComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: props.match.params.category,
            //keyword:props.match.params.category
        }
        this.SearchKeywordhandler = this.SearchKeywordhandler.bind(this);

    }
    listBoard(category) {
        this.props.history.push(`/category-board/${category}`);
    }

    componentDidMount() {
        BoardService.getBoards(this.state.category, this.state.p_num).then((res) => {
            this.setState({
                category: this.state.category,
                //keyword:this.state.category
            });
        })
        const script = document.createElement("script");

        script.async = true;
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=ce0d9fa1eadff889de8694feaee21b52&&autoload=false&libraries=services";
        document.head.appendChild(script);
        var markers = [];

        script.onload = () => {
            kakao.maps.load(() => {
                var container = document.getElementById("MyMap");
                let options = {
                    center: new kakao.maps.LatLng(37.506502, 127.053617),
                    level: 7
                };
                const map = new window.kakao.maps.Map(container, options);

                const ps = new window.kakao.maps.services.Places();
                var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

                searchPlaces(this.state.category);
                function searchPlaces(keyword) {
                    ps.keywordSearch(keyword, placesSearchCB);

                }

                // 키워드 검색 완료 시 호출되는 콜백함수 입니다
                function placesSearchCB(data, status, pagination) {
                    if (status === kakao.maps.services.Status.OK) {
                        displayPlaces(data);
                    }
                }

                function displayPlaces(places) {

                    var listEl = document.getElementById('placesList'),
                        menuEl = document.getElementById('menu_wrap'),
                        fragment = document.createDocumentFragment(),
                        bounds = new kakao.maps.LatLngBounds(),
                        listStr = '';
                    removeAllChildNods(listEl);
                    removeMarker();

                    for (var i = 0; i < places.length; i++) {
                        // 마커를 생성하고 지도에 표시합니다
                        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                            marker = addMarker(placePosition, i),
                            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                        // LatLngBounds 객체에 좌표를 추가합니다
                        bounds.extend(placePosition);

                        // 마커와 검색결과 항목에 mouseover 했을때
                        // 해당 장소에 인포윈도우에 장소명을 표시합니다
                        // mouseout 했을 때는 인포윈도우를 닫습니다
                        (function (marker, title) {
                            kakao.maps.event.addListener(marker, 'mouseover', function () {
                                displayInfowindow(marker, title);
                            });

                            kakao.maps.event.addListener(marker, 'mouseout', function () {
                                infowindow.close();
                            });

                            itemEl.onmouseover = function () {
                                displayInfowindow(marker, title);
                            };

                            itemEl.onmouseout = function () {
                                infowindow.close();
                            };
                        })(marker, places[i].place_name);

                        fragment.appendChild(itemEl);

                    }
                    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다


                    listEl.appendChild(fragment);
                    menuEl.scrollTop = 0;

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                    //map.setBounds(bounds);

                }
                // 검색결과 항목을 Element로 반환하는 함수입니다
                function getListItem(index, places) {

                    var el = document.createElement('li'),
                        itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
                            '<div class="info">' +
                            '   <h5>' + (index + 1) + '. ' + places.place_name + '</h5>';

                    if (places.road_address_name) {
                        itemStr += '    <span>' + places.road_address_name + '</span>' +
                            '   <span class="jibun gray">' + places.address_name + '</span>';
                    } else {
                        itemStr += '    <span>' + places.address_name + '</span>';
                    }

                    itemStr += '  <span class="tel">' + places.phone + '</span>' +
                        '</div>';

                    el.innerHTML = itemStr;
                    el.className = 'item';

                    return el;
                }
                // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
                function addMarker(position, idx, title) {
                    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                        imgOptions = {
                            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                            spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                        },
                        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                        marker = new kakao.maps.Marker({
                            position: position, // 마커의 위치
                            image: markerImage
                        });


                    marker.setMap(map); // 지도 위에 마커를 표출합니다
                    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

                    return marker;
                }
                // 지도 위에 표시되고 있는 마커를 모두 제거합니다
                function removeMarker() {
                    for (var i = 0; i < markers.length; i++) {
                        markers[i].setMap(null);
                    }
                    markers = [];
                }
                // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
                function displayPagination(pagination) {
                    var paginationEl = document.getElementById('pagination'),
                        fragment = document.createDocumentFragment(),
                        i;

                    // 기존에 추가된 페이지번호를 삭제합니다
                    while (paginationEl.hasChildNodes()) {
                        paginationEl.removeChild(paginationEl.lastChild);
                    }

                    for (i = 1; i <= pagination.last; i++) {
                        var el = document.createElement('a');
                        el.href = "#";
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
                // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
                // 인포윈도우에 장소명을 표시합니다
                function displayInfowindow(marker, title) {
                    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                }

                // 검색결과 목록의 자식 Element를 제거하는 함수입니다
                function removeAllChildNods(el) {

                    while (el.hasChildNodes()) {
                        el.removeChild(el.lastChild);
                    }
                }

                //키워드 마커 표시 함수
                function displayMarkerKeyWord(place) {
                    let marker = new kakao.maps.Marker({
                        map: map,
                        position: new kakao.maps.LatLng(place.y, place.x)
                    });
                    var infowindow = new kakao.maps.InfoWindow({
                        content: place.place_name
                    });
                    kakao.maps.event.addListener(
                        marker,
                        "mouseover",
                        makeOverListener(map, marker, infowindow)
                    );
                    kakao.maps.event.addListener(
                        marker,
                        "mouseout",
                        makeOutListener(infowindow)
                    );
                }
                // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
                function makeOverListener(map, marker, infowindow) {
                    return function () {
                        infowindow.open(map, marker);
                    };
                }

                // 인포윈도우를 닫는 클로저를 만드는 함수입니다
                function makeOutListener(infowindow) {
                    return function () {
                        infowindow.close();
                    };
                }




                if (navigator.geolocation) {
                    // GeoLocation을 이용해서 접속 위치를 얻어옵니다.
                    navigator.geolocation.getCurrentPosition(function (position) {

                        var lat = position.coords.latitude, // 위도
                            lon = position.coords.longitude; // 경도

                        var locPostion = new kakao.maps.LatLng(lat, lon), //마커가 표시될 위치를 geolocation 좌표로 생성합니다.
                            message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다.

                        // 마커와 인포윈도우를 표시합니다.
                        displayMarker(locPostion, message);
                    });
                } else {

                }

                // 지도에 마커와 인포윈도우를 표시하는 함수입니다.
                function displayMarker(locPostion, message) {

                    // 마커를 생성합니다.
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: locPostion
                    });

                    var iwContent = message, // 인포윈도우에 표시할 내용
                        iwRemoveable = true;

                    // 인포윈도우를 생성합니다.
                    var infowindow = new kakao.maps.InfoWindow({
                        content: iwContent,
                        removable: iwRemoveable
                    });

                    // 인포윈도우를 마커위에 표시합니다.
                    infowindow.open(map, marker);

                    // 지도 중심좌표를 접속위치로 변경합니다.
                    map.setCenter(locPostion);
                }

            });
        };
    }
    SearchKeywordhandler = (event) => {
        this.setState({ keyword: event.target.value });
    }
    render() {
        return (
            <div >


                <h2 className="text-center"  >{this.state.category}
                    <br></br>
                    <h2 style={{ fontWeight: 'bold', display: "inline" }}><a onClick={() => this.listBoard(this.state.category, 1)}>
                        📃 게시판</a></h2> &nbsp;&nbsp;

                    <h2 style={{ color: '#FBB9AB', display: "inline", fontWeight: 'bold', textDecorationColor: '#FBB9AB', textDecoration: "underline" }}>🗺 지도 </h2>
                </h2>
                <div class="container-fluid">
                    <div class="col-lg-6" id="menu_wrap" style={{ backgroundColor: 'white', margin: '0px', float: "left", width: '400px', height: '600px', overflow: 'scroll' }}>
                        <div >
                            <div className="form-group">
                                <form onsubmit="searchPlaces(); return false;">
                                </form>
                            </div>
                        </div>
                        <ul id="placesList" style={{ listStyleType: "none" }}></ul>
                        <div id="pagination"></div>
                    </div>
                    <div class="col-lg-6" id="MyMap" style={{ width: "800px", height: "600px", float: "right" }}>
                    </div>
                </div>
            </div>


        );
    }
}


export default MapComponent;
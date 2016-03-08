$(document).ready(function() {
    /* Google Map
     ==================================================================================== */
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
        if (typeof markers == 'undefined' || $.type(markers) != 'array') {
            return;
        }

        var markerImages = {
            airport: {
                url: 'images/map/MapPins-small-red1.png',
                size: new google.maps.Size(35, 58),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17.5, 40),
                scaledSize: new google.maps.Size(35, 344)
            },
            hotel: {
                url: 'images/map/MapPins-small-red1.png',
                size: new google.maps.Size(35, 58),
                origin: new google.maps.Point(0, 58),
                anchor: new google.maps.Point(17.5, 40),
                scaledSize: new google.maps.Size(35, 344)
            },
            restaurant: {
                url: 'images/map/MapPins-small-red1.png',
                size: new google.maps.Size(35, 58),
                origin: new google.maps.Point(0, 116),
                anchor: new google.maps.Point(17.5, 40),
                scaledSize: new google.maps.Size(35, 344)
            },
            shopping: {
                url: 'images/map/MapPins-small-red1.png',
                size: new google.maps.Size(35, 58),
                origin: new google.maps.Point(0, 174),
                anchor: new google.maps.Point(17.5, 40),
                scaledSize: new google.maps.Size(35, 344)
            },
            attraction: {
                url: 'images/map/MapPins-small-red1.png',
                size: new google.maps.Size(35, 58),
                origin: new google.maps.Point(0, 232),
                anchor: new google.maps.Point(17.5, 40),
                scaledSize: new google.maps.Size(35, 344)
            },
            special: {
                url: 'images/map/MapPins-small-red1.png',
                size: new google.maps.Size(35, 54),
                origin: new google.maps.Point(0, 290),
                anchor: new google.maps.Point(17.5, 40),
                scaledSize: new google.maps.Size(35, 344)
            },

            bachelor: {
                url: 'images/map/MapPins-big-red1.png',
                size: new google.maps.Size(53, 93),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(26.5, 68),
                scaledSize: new google.maps.Size(53, 372)
            },
            bachelorette: {
                url: 'images/map/MapPins-big-red1.png',
                size: new google.maps.Size(53, 93),
                origin: new google.maps.Point(0, 93),
                anchor: new google.maps.Point(26.5, 68),
                scaledSize: new google.maps.Size(53, 372)
            },
            wedding: {
                url: 'images/map/MapPins-big-red1.png',
                size: new google.maps.Size(53, 93),
                origin: new google.maps.Point(0, 186),
                anchor: new google.maps.Point(26.5, 68),
                scaledSize: new google.maps.Size(53, 372)
            },
            weddingParty: {
                url: 'images/map/MapPins-big-red1.png',
                size: new google.maps.Size(30, 83),
                origin: new google.maps.Point(0, 279),
                anchor: new google.maps.Point(26.5, 68),
                scaledSize: new google.maps.Size(53, 372)
            }
        };

        var mapOptions = {
            scrollwheel: false,
            zoom: 14,
            //center: new google.map.LatLng(44.7679455, 17.1909169), // New York
            styles: [{
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "simplified"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "administrative.land_parcel",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                    "hue": "#a1cdfc"
                }, {
                    "saturation": 30
                }, {
                    "lightness": 49
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#f49935"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#fad959"
                }]
            }]
        };

        var mapElement = document.getElementById('map');
        var map = new google.maps.Map(mapElement, mapOptions);
        var infoWindow = new google.maps.InfoWindow();
        var bound = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(markers[i][1], markers[i][2]),
                map: map,
                icon: markerImages[markers[i][3]],
                title: markers[i][0],
                infoContent: markers[i][4]
            });

            bound.extend(marker.position);
            google.maps.event.addListener(marker, 'click', function () {

                infoWindow.setContent('<div class="info_content"><h3>' + this.title + '</h3><p>' + this.infoContent + '</p></div>');
                infoWindow.open(map, this);
            });

        };
        map.fitBounds(bound);
    }
});

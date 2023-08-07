var nSel, nTxt, imageData, urlData
var btnlist = {
    "type": "fueaturelist",
    "name": "btnName",
    "fueatures": [
        {
            "typeName": "分层分户",
            "txtList": ["商业楼宇", "小区住宅", "大型商业综合体"],
            "txtId": ["sy", "xq", "zht"],
            "image": ["../images/csbj/shanye.png", "../images/csbj/zhuzhai.png", "../images/csbj/zonghe.png"],
            "url": "../config/fcfh2.geojson"
        },
        {
            "typeName": "城市部件",
            "txtList": ["点部件", "线部件", "面部件", "总览"],
            "txtId": ["zt", "dBJ", "xBJ", "mBJ"],
            "url": ["../config/Point.json", "../config/Line.json", "../config/Polygon.json"]
        }
    ]
}
$(document).ready(function () {
    $('button').click(function () {
        if ($(this).attr('id') == "fenChen") {
            $("#chenshibujian").css("display", "none")
            $("#fenchenfenhu").toggle();
            urlData = btnlist.fueatures[0].url
        }
        if ($(this).attr('id') == "BuJian") {
            $("#fenchenfenhu").css("display", "none")
            $("#chenshibujian").toggle();
        }
    })
    $('#fenchenfenhu button').click(function () {
        viewer.entities.removeAll();
        nSel = $(this).attr('id');
        nTxt = $(this).html();
        getheight(urlData);
    })
    $('#chenshibujian button').click(function () {
        if ($(this).attr('id') == "dBJ") {
            urlData = btnlist.fueatures[1].url[0];
        }
        if ($(this).attr('id') == "xBJ") {
            urlData = btnlist.fueatures[1].url[1];
        }
        if ($(this).attr('id') == "mBJ") {
            urlData = btnlist.fueatures[1].url[2];
        }
        getbjheight(urlData);
        function getbjheight(_x) {
            $.getJSON(_x, function (BJdata) {
                toDobj(BJdata)
            })
            function toDobj(_BJdata) {
                for (var l = 0; l < _BJdata.features.length; l++) {
                    var dataPoint_longitude = _BJdata.features[l].geometry.x;
                    var dataPoint_latitude = _BJdata.features[l].geometry.y;
                    var car = Cesium.Cartographic.fromDegrees(dataPoint_longitude, dataPoint_latitude);
                    var height = viewer.scene.sampleHeight(car);
                    if (height != undefined) {
                        var point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, height + 0.5);
                    }
                    else {
                        var point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, 115);
                    }
                    var pointName = _BJdata.features[l].attributes.OBJNAME
                    console.log(pointName)
                    console.log(point_position)
                    fenCHENGbj(point_position, pointName);
                    function fenCHENGbj(a, b) {
                        viewer.entities.add({
                            position: a,
                            billboard: {
                                image: "../images/csbj/shanye.png",
                                width: 25,
                                height: 25,
                            },
                            label: {
                                text: b,
                                font: '12px Arial',
                                fillColor: Cesium.Color.WHITE,
                                outlineColor: Cesium.Color.BLUE,
                                outlineWidth: 2,
                                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                pixelOffset: new Cesium.Cartesian2(0, -30),
                                eyeOffset: new Cesium.Cartesian3(0, 0, -50),
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.5, 1.5e7, 0.5),
                                translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.0),
                                labelStyle: {
                                    font: 'bold 12px Arial',
                                    pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.5, 1.5e7, 0.5)
                                }
                            }
                        })

                    }
                }
            }
        }
    })
    function getheight(x) {
        var request = new XMLHttpRequest();
        request.open("get", x);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
            geoData = JSON.parse(request.responseText);
            if (nSel == "zl") {
                for (var m = 0; m < btnlist.fueatures[0].txtList.length; m++) {
                    nTxt = btnlist.fueatures[0].txtList[m];
                    imageData = btnlist.fueatures[0].image[m];
                    toDo();
                }
            } else {
                for (var _cont = 0; _cont < btnlist.fueatures[0].txtId.length; _cont++) {
                    if (nSel == btnlist.fueatures[0].txtId[_cont]) {
                        imageData = btnlist.fueatures[0].image[_cont];
                        toDo();
                    }
                }
            }
        }
    }
    function toDo() {
        for (var i = 0; i < geoData.features.length; i++) {
            var dataPoint_longitude = geoData.features[i].geometry.coordinates[0];
            var dataPoint_latitude = geoData.features[i].geometry.coordinates[1];
            var car = Cesium.Cartographic.fromDegrees(dataPoint_longitude, dataPoint_latitude);
            var height = viewer.scene.sampleHeight(car);
            if (height != undefined) {
                var point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, height + 2);
            }
            else {
                var point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, 115);
            }
            var pointType = geoData.features[i].properties.类型
            var pointName = geoData.features[i].properties.建筑名称
            fenCHENG(point_position, pointType, pointName);
        }
    }
    function fenCHENG(z, q, l) {
        if (q == nTxt) {
            viewer.entities.add({
                position: z,
                billboard: {
                    image: imageData,
                    width: 25,
                    height: 25,
                },
                label: {
                    text: l,
                    font: '12px Arial',
                    fillColor: Cesium.Color.WHITE,
                    outlineColor: Cesium.Color.BLUE,
                    outlineWidth: 2,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    pixelOffset: new Cesium.Cartesian2(0, -30),
                    eyeOffset: new Cesium.Cartesian3(0, 0, -50),
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.5, 1.5e7, 0.5),
                    translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.0),
                    labelStyle: {
                        font: 'bold 12px Arial',
                        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.5, 1.5e7, 0.5)
                    }
                }
            })
        }
    }
})
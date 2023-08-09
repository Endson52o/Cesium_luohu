var idName, urlData, imageName, idHtml, jsonData, dataPoint_longitude, dataPoint_latitude, objType, objName
var basearr = []
var fenchenList = []
var bujianList = []
var dataobject = {
    "fencfenhu": {
        "txtList": ["商业楼宇", "小区住宅", "大型商业综合体"],
        "txtId": ["sy", "xq", "zht"],
        "image": ["../images/csbj/shanye.png", "../images/csbj/zhuzhai.png", "../images/csbj/zonghe.png"],
        "url": "../config/fcfh.geojson"
    },
    "chengshibujian": {
        "txtList": ["点部件", "线部件", "面部件"],
        "txtId": ["dBJ", "xBJ", "mBJ"],
        "image": "../images/zonghe.png",
        "url": ["../config/Point.json", "../config/Line.json", "../config/Polygon.json"]
    }
}
$(document).ready(function () {
    $('.btn').click(function () {
        viewer.entities.removeAll();
        if ($(this).attr('id') == "fenChen") {
            $("#chenshibujian").css("display", "none")
            $("#fenchenfenhu").toggle();
            jsonUrldata = dataobject.fencfenhu.url
        }
        if ($(this).attr('id') == "BuJian") {
            $("#fenchenfenhu").css("display", "none")
            $("#chenshibujian").toggle();
        }
    })
    $('.btn1').click(function () {
        viewer.entities.removeAll();
        bujianList.splice(0, bujianList.length)
        idName = $(this).attr('id')
        idHtml = $(this).html();
        if (dataobject.fencfenhu.txtId.indexOf(idName) > -1) {
            urlData = dataobject.fencfenhu.url;
            if (idName == "sy") {
                imageName = "../images/csbj/shanye.png"
            }
            if (idName == "xq") {
                imageName = "../images/csbj/zhuzhai.png"
            }
            if (idName == "zht") {
                imageName = "../images/csbj/zonghe.png"
            }
        }
        if (dataobject.chengshibujian.txtId.indexOf(idName) > -1 & idName == "dBJ") {
            urlData = dataobject.chengshibujian.url[0];
        }
        if (dataobject.chengshibujian.txtId.indexOf(idName) > -1 & idName == "xBJ") {
            urlData = dataobject.chengshibujian.url[1];
        }
        if (dataobject.chengshibujian.txtId.indexOf(idName) > -1 & idName == "mBJ") {
            urlData = dataobject.chengshibujian.url[2];
        }
        findIndex(urlData,idHtml)
    })
})
function findIndex(urlsource,idHtmlname) {
    $.getJSON(urlsource, function (jsonData) {
        for (var list = 0; list < jsonData.features.length; list++) {
            if (urlsource == "../config/fcfh.geojson") {
                dataPoint_longitude = jsonData.features[list].geometry.coordinates[0];
                dataPoint_latitude = jsonData.features[list].geometry.coordinates[1];
                objType = jsonData.features[list].properties.类型;
                if(objType==idHtmlname){
                    objName = jsonData.features[list].properties.建筑名;
                }
                else{
                    objName=null;
                }
            }
            else {
                dataPoint_longitude = jsonData.features[list].geometry.x;
                dataPoint_latitude = jsonData.features[list].geometry.y;
                objType = null;
                objName = jsonData.features[list].attributes.OBJNAME;
                bujianList.push(objName)
                imageName = "../images/zonghe.png"
            }
            var car = Cesium.Cartographic.fromDegrees(dataPoint_longitude, dataPoint_latitude);
            var height = viewer.scene.sampleHeight(car);
            if (height != undefined) {
                var point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, height + 0.5);
            }
            else {
                var point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, 115);
            }
            fenCHENG(point_position, objName)
        }
    })
    bujianList = $.unique(bujianList);
}
function fenCHENG(p, n) {
    if(objName!=null){
        viewer.entities.add({
            position: p,
            billboard: {
                image: imageName,
                width: 25,
                height: 25,
            },
            label: {
                text: n,
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

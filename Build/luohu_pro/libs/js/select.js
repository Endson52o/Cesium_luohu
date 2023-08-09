var nSel, nTxt, imageData, jsonUrldata, jsonData, pointType, pointName
var bjNamearr = []
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
            "txtList": ["点部件", "线部件", "面部件"],
            "txtId": ["dBJ", "xBJ", "mBJ"],
            "url": ["../config/Point.json", "../config/Line.json", "../config/Polygon.json"]
        }
    ]
}
$(document).ready(function () {
    $('.btn').click(function () {
        viewer.entities.removeAll();
        if ($(this).attr('id') == "fenChen") {
            $("#chenshibujian").css("display", "none")
            $("#fenchenfenhu").toggle();
            jsonUrldata = btnlist.fueatures[0].url
        }
        if ($(this).attr('id') == "BuJian") {
            $("#fenchenfenhu").css("display", "none")
            $("#chenshibujian").toggle();
        }
    })
    $('.btn1').click(function () {
        viewer.entities.removeAll();
        nSel = $(this).attr('id');
        nTxt = $(this).html();
        $.getJSON(jsonUrldata, function (jsonData) {
            if (nSel == "sy" || "xq" || "zht") {
                for (var _cont = 0; _cont < btnlist.fueatures[0].txtId.length; _cont++) {
                    if (nSel == btnlist.fueatures[0].txtId[_cont]) {
                        imageData = btnlist.fueatures[0].image[_cont];
                    }
                    toAddfencfenhu(jsonData);
                }
            }
            if (nSel == "zl") {
                for (var m = 0; m < btnlist.fueatures[0].txtList.length; m++) {
                    nTxt = btnlist.fueatures[0].txtList[m];
                    imageData = btnlist.fueatures[0].image[m];
                    toAddfencfenhu(jsonData);
                }
            }
        })
        if (nSel == "dBJ") {
            imageData = "../images/zonghe.png";
            jsonUrldata = "../config/Point.json";
            $.getJSON(jsonUrldata, function (jsonData) {
                toAddbj(jsonData);
            })
        }
    })
})
//遍历Json文件
function toAddfencfenhu(x) {
    for (var i = 0; i < x.features.length; i++) {
        var dataPoint_longitude = x.features[i].geometry.coordinates[0];
        var dataPoint_latitude = x.features[i].geometry.coordinates[1];
        var car = Cesium.Cartographic.fromDegrees(dataPoint_longitude, dataPoint_latitude);
        var height = viewer.scene.sampleHeight(car);
        if (height != undefined) {
            var point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, height + 2);
        }
        else {
            var point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, 115);
        }
        pointType = x.features[i].properties.类型
        pointName = x.features[i].properties.建筑名称
        fenCHENG(point_position, pointName);
    }
}
function toAddbj(y) {
    for (var l = 0; l < y.features.length; l++) {
        var dataPoint_longitude = y.features[l].geometry.x;
        var dataPoint_latitude = y.features[l].geometry.y;
            var car = Cesium.Cartographic.fromDegrees(dataPoint_longitude, dataPoint_latitude);
            var height = viewer.scene.sampleHeight(car);
            if (height != undefined) {
                var point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, height + 0.5);
            }
            else {
                var point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, 115);
            }
        pointType = nTxt;
        pointName = y.features[l].attributes.OBJNAME
        // bjNamearr.push(pointName)
        // var uniqueArr = $.unique(bjNamearr);
        // 对数组做关键字查询
        // var keyWord = ""
        // if (pointName.findIndex(item => item.includes(keyWord.toString())) != -1) {
        // }
        //对字符串做关键字查询判断
        // var keyWord = "井盖"
        // if (pointName.indexOf(keyWord) > -1) {
        //     var images = "../images/csbj/04.png"
        // }
        // else {
        //     var images = "../images/zonghe.png"
        // }
        fenCHENG(point_position, pointType, pointName);
    }
}
function fenCHENG(z, l) {
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

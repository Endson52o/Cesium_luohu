var xiaoquarr = []
var shanyearr = []
var zonghetarr = []
var pointarr = []
var dataobject = {
    "fencfenhu": {
        "txtList": ["商业楼宇", "小区住宅", "大型商业综合体"],
        "txtId": ["sy", "xq", "zht"],
        "image": ["../images/csbj/shanye.png", "../images/csbj/zhuzhai.png", "../images/csbj/zonghe.png"],
        "url": "../config/fcfh2.geojson"
    },
    "chengshibujian": {
        "txtList": ["点部件", "线部件", "面部件"],
        "txtId": ["dBJ", "xBJ", "mBJ"],
        "image": "../images/zonghe.png",
        "url": ["../config/Point.json", "../config/Line.json", "../config/Polygon.json"]
    }
}
$(document).ready(function () {
    // 获取数据的函数
    function fetchData(urlsource) {
        return new Promise((resolve, reject) => {
            $.getJSON(urlsource, (data) => {
                resolve(data);
            });
        });
    }
    // 使用数据的函数
    async function useData(urlname) {
        const getjsonData = await fetchData(urlname);
        for (var i = 0; i < getjsonData.features.length; i++) {
            var jsondataobject = getjsonData.features[i]
            var fenchenName = getjsonData.features[i].properties.类型
            if (urlname == "../config/fcfh2.geojson") {
                pointarr.push(jsondataobject)
            }
            if (urlname == "../config/fcfh2.geojson") {
                if (fenchenName == "小区住宅") {
                    xiaoquarr.push(jsondataobject)
                }
                if (fenchenName == "商业楼宇") {
                    shanyearr.push(jsondataobject)
                }
                if (fenchenName == "大型商业综合体") {
                    zonghetarr.push(jsondataobject)
                }
            }
        }
        console.log(jsondataobject)
        console.log(xiaoquarr)
        console.log(shanyearr)
        console.log(zonghetarr)
    }
    $('.btn').click(function () {
        if ($(this).attr('id') == "fenChen") {
            $("#chenshibujian").css("display", "none")
            $("#fenchenfenhu").toggle();
            urlsource = "../config/fcfh2.geojson"
            useData(urlsource);
        }
        if ($(this).attr('id') == "BuJian") {
            $("#fenchenfenhu").css("display", "none")
            $("#chenshibujian").toggle();
            urlsource = "../config/Point.json"
            useData(urlsource);
        }
    })
    $(".btn1").click(function () {
        idName = $(this).attr('id')
        idHtml = $(this).html();
        if (idName == "sy") {
            imageName = "../images/csbj/shanye.png"
        }
        if (idName == "xq") {
            imageName = "../images/csbj/zhuzhai.png"
        }
        if (idName == "zht") {
            imageName = "../images/csbj/zonghe.png"
        }
    })
    if (idName == "zl") {
            urlData = dataobject.fencfenhu.url;
        for (var _i = 0; _i < dataobject.fencfenhu.txtId.length; _i++) {
            idHtml = dataobject.fencfenhu.txtList[_i];
            imageName = dataobject.fencfenhu.image[_i];
            findIndex(json, idHtml, imageName)
            }
        }
        if (dataobject.chengshibujian.txtId.indexOf(idName) > -1) {
            imageNames = "../images/zonghe.png"
            if (idName == "dBJ") {
                urlData = dataobject.chengshibujian.url[0];
            }
            if (idName == "xBJ") {
                urlData = dataobject.chengshibujian.url[1];
            }
            if (idName == "mBJ") {
                urlData = dataobject.chengshibujian.url[2];
            }
            $.getJSON(urlsource, function (jsonData) {
            })
        findIndex(json, idHtml, imageName)
    }

})
function findIndex(urlsource, idHtmlname, imageNames) {
    for (var list = 0; list < jsonData.features.length; list++) {
        if (urlsource == "../config/fcfh2.geojson") {
            dataPoint_longitude = jsonData.features[list].geometry.coordinates[0];
            dataPoint_latitude = jsonData.features[list].geometry.coordinates[1];
            objType = jsonData.features[list].properties.类型;
            if (objType == idHtmlname) {
                objName = jsonData.features[list].properties.建筑名;
                bujianList.push(objName)
            }
            if (objType != idHtmlname) {
                objName = null;
            }
        }
        if (urlsource == "../config/Point.json") {
            dataPoint_longitude = jsonData.features[list].geometry.x;
            dataPoint_latitude = jsonData.features[list].geometry.y;
            objName = jsonData.features[list].attributes.OBJNAME;
            bujianList.push(objName)
        }
        var car = Cesium.Cartographic.fromDegrees(dataPoint_longitude, dataPoint_latitude);
        var height = viewer.scene.sampleHeight(car);
        if (height != undefined) {
            var point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, height + 0.5);
        }
        else {
            var point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, 115);
        }

        fenCHENG(point_position, objName, imageNames)
    }
    console.log(bujianList)
    console.log(objName)
}
function fenCHENG(p, n, images) {
    if (objName != null) {
        viewer.entities.add({
            position: p,
            billboard: {
                image: images,
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

var dataPoint_longitude, dataPoint_latitude, objName, point_position, fenchenurlsource, bjurlsource
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
        window.xiaoquarr = []
        window.shanyearr = []
        window.zonghetarr = []
        window.Piontobjarr = []
        window.Pointnamearr = []
        window.Polygonobjarr=[]
        window.Lineobjarr=[]
        window.Linetnamearr=[]
        window.Polygonobjarr=[]
        window.Polygonnamearr=[]
        if (urlname == "../config/fcfh2.geojson") {
            const getjsonData = await fetchData(urlname);
            for (var i = 0; i < getjsonData.features.length; i++) {
                var jsondataobject = getjsonData.features[i]
                if (urlname == "../config/fcfh2.geojson") {
                    var fenchenName = getjsonData.features[i].properties.类型
                    if (fenchenName == "小区住宅") {
                        window.xiaoquarr.push(jsondataobject)
                    }
                    if (fenchenName == "商业楼宇") {
                        window.shanyearr.push(jsondataobject)
                    }
                    if (fenchenName == "大型商业综合体") {
                        window.zonghetarr.push(jsondataobject)
                    }
                }
            }
        }
        if (urlname == dataobject.chengshibujian.url) {
            for (var _bjurl = 0; _bjurl < dataobject.chengshibujian.url.length; _bjurl++) {
                const getjsonData = await fetchData(dataobject.chengshibujian.url[_bjurl]);
                for (var i = 0; i < getjsonData.features.length; i++) {
                    var jsondataobject = getjsonData.features[i]
                    var bjNames = jsondataobject.attributes.OBJNAME
                    if (dataobject.chengshibujian.url[_bjurl] == "../config/Point.json") {
                        window.Piontobjarr.push(jsondataobject)
                        window.Pointnamearr.push(bjNames)
                        window.Pointnamearr=$.unique(window.Pointnamearr)
                    }
                    if (dataobject.chengshibujian.url[_bjurl] == "../config/Line.json") {
                        Lineobjarr.push(jsondataobject)
                        Linetnamearr.push(bjNames)
                        window.Linetnamearr=$.unique(window.Linetnamearr)
                    }
                    if (dataobject.chengshibujian.url[_bjurl] == "../config/Polygon.json") {
                        Polygonobjarr.push(jsondataobject)
                        Polygonnamearr.push(bjNames)
                        window.Polygonnamearr=$.unique(window.Polygonnamearr)
                    }
                }
            }
            console.log(Pointnamearr)
            console.log(Linetnamearr)
            console.log(Polygonnamearr)
        }
    }
    $('.btn').click(function () {
        viewer.entities.removeAll();
        if ($(this).attr('id') == "fenChen") {
            $("#chenshibujian").css("display", "none")
            $("#fenchenfenhu").toggle();
            fenchenurlsource = "../config/fcfh2.geojson"
            useData(fenchenurlsource);
        }
        if ($(this).attr('id') == "BuJian") {
            $("#fenchenfenhu").css("display", "none")
            $("#chenshibujian").toggle();
            useData(dataobject.chengshibujian.url);
        }
    })
    $(".btn1").click(function () {
        viewer.entities.removeAll();
        var idName = $(this).attr('id')

        if (dataobject.fencfenhu.txtId.indexOf(idName) > -1) {
            var idHtml = fenchenurlsource
            if (idName == "sy") {
                var json = window.shanyearr
                imageName = "../images/csbj/shanye.png"
            }
            if (idName == "xq") {
                imageName = "../images/csbj/zhuzhai.png"
                var json = window.xiaoquarr
            }
            if (idName == "zht") {
                imageName = "../images/csbj/zonghe.png"
                var json = window.zonghetarr
            }
            findIndex(json, idHtml, imageName)
        }
        if (idName == "zl") {
            var idHtml = fenchenurlsource
            for (var _i = 0; _i < dataobject.fencfenhu.txtId.length; _i++) {
                imageName = dataobject.fencfenhu.image[_i];
                json = [window.shanyearr, window.xiaoquarr, window.zonghetarr]
                findIndex(json[_i], idHtml, imageName)
            }
        }
        if (dataobject.chengshibujian.txtId.indexOf(idName) > -1) {
            var idHtml = bjurlsource
            imageName = "../images/zonghe.png"
            if (idName == "dBJ") {
                bjurlsource = dataobject.chengshibujian.url[0];
            }
            if (idName == "xBJ") {
                bjurlsource = dataobject.chengshibujian.url[1];
            }
            if (idName == "mBJ") {
                bjurlsource = dataobject.chengshibujian.url[2];
            }
            // findIndex(bjurlsource, idHtml, imageName)
        }
    })

})
function findIndex(jsonData, idHtmlname, imageNames) {
    for (var list = 0; list < jsonData.length; list++) {
        if (idHtmlname == "../config/fcfh2.geojson") {
            dataPoint_longitude = jsonData[list].geometry.coordinates[0];
            dataPoint_latitude = jsonData[list].geometry.coordinates[1];
            objName = jsonData[list].properties.建筑名称
        }
        if (idHtmlname == "../config/Point.json") {
            dataPoint_longitude = jsonData.features[list].geometry.x;
            dataPoint_latitude = jsonData.features[list].geometry.y;
            objName = jsonData.features[list].properties.建筑名称
        }
        var car = Cesium.Cartographic.fromDegrees(dataPoint_longitude, dataPoint_latitude);
        var height = viewer.scene.sampleHeight(car);
        if (height != undefined) {
            point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, height + 0.5);
        }
        else {
            point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, 115);
        }

        fenCHENG(point_position, objName, imageNames)
    }
}
function fenCHENG(p, n, images) {
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

var btnObject = {
    fnechenbtnName: ["sy", "xq", "zht"],
    bujianbtnName: ["dBJ", "xBJ", "mBJ"],
    dataImages: ["../images/csbj/shanye.png", "../images/csbj/zhuzhai.png", "../images/csbj/zonghe.png"],
    url: ["../config/fcfh.geojson", "../config/line.geojson", "../config/point.geojson", "../config/polugon.geojson"],
    btnAddData: function () {
        Cesium.Resource.fetchJson(this.url[0]).then(function (result) {
            for (var i = 0; i < result.features.length; i++) {
                var names = result.features[i].properties.建筑名称
                console.log(names)
            }
            // console.log(result)
        })
    },
    fenchenAddData: function () {
        var fenchendatas = new Cesium.GeoJsonDataSource();
        var dataarr = fenchendatas.load("../config/fcfh2.geojson");
        dataarr.then(function (pointsource) {
            entities = pointsource.entities.values
            for (let entity of entities) {
                position = entity.position._value
                console.log(position)
                var _x = position.x
                var _y = position.y
                var _z = position.z
                var _position = new Cesium.Cartesian3(_x, _y, _z)
                var _position_hic = Cesium.Cartographic.fromCartesian(_position)
                var longitude =Cesium.Math.toDegrees(_position_hic.longitude)
                var latitude  =Cesium.Math.toDegrees(_position_hic.latitude )
                var height =150;
                position1 = Cesium.Cartesian3.fromDegrees(longitude,latitude,height)
                position.z=150
                console.log(position)
                console.log(position1)
            }
            viewer.dataSources.add(pointsource)
        })
    },
}
$(document).ready(function () {
    $('.btn1').click(function () {
        // viewer.entities.removeAll();
        idName = $(this).attr('id')
        idHtml = $(this).html();
        if (btnObject.fnechenbtnName.indexOf(idName) > -1) {
            // btnObject.btnAddData()
            btnObject.fenchenAddData()
            if (idName == "sy") {
                imageName = "../images/csbj/shanye.png"
            }
            if (idName == "xq") {
                imageName = "../images/csbj/zhuzhai.png"
            }
            if (idName == "zht") {
                imageName = "../images/csbj/zonghe.png"
            }
            console.log(imageName)
        }
        if (idName == "zl") {
            urlData = dataobject.fencfenhu.url;
            for (var _i = 0; _i < dataobject.fencfenhu.txtId.length; _i++) {
                idHtml = dataobject.fencfenhu.txtList[_i];
                imageName = dataobject.fencfenhu.image[_i];
            }
        }
    })
})



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
        var promise = fenchendatas.load("../config/fcfh2.geojson");
        promise.then(function (result) {
            entities = result.entities.values;
            for (let entity of entities) {
                position = entity.position._value;
                var car = Cesium.Cartographic.fromCartesian(position);
                var heights = viewer.scene.sampleHeight(car);
                console.log(heights)
                entity.billboard = {
                    image: "../images/csbj/shanye.png",
                    width: 25,
                    height: 25,
                    heightReference: heights
                };
                entity.label = {
                    text: entity.properties.建筑名称,
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
                };
                // entity.label.style = Cesium.LabelStyle.FILL_AND_OUTLINE;
                // entity.label.outlineColor = Cesium.Color.BLACK;

            }
            viewer.dataSources.add(result)
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



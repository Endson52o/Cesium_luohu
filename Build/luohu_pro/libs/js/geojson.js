
var positions, dataarr, entity
var btnObject = {
  dataarr: null,
  pointsource: null,
  fnechenbtnName: ["sy", "xq", "zht"],
  bujianbtnName: ["dBJ", "xBJ", "mBJ"],
  dataImages: ["../images/csbj/shanye.png", "../images/csbj/zhuzhai.png", "../images/csbj/zonghe.png"],
  url: ["../config/fcfh2.geojson", "../config/line.geojson", "../config/point.geojson", "../config/polugon.geojson"],
  btnAddData: function (imageData, urls) {
    var fenchendatas = new Cesium.GeoJsonDataSource();
    var dataarr = fenchendatas.load(urls);
    var imgaesource = imageData;
    dataarr.then(function (resulte) {
      btnObject.fenchenAddData(imgaesource, resulte, urls)
    })
  },
  fenchenAddData: function (images, pointsource, urlsource) {
    const entities = pointsource.entities.values
    positions = []
    const filterEntities = [];
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const originPosition = entity.position._value;
      if (urlsource == btnObject.url[0]) {
        var pointnames = entity.properties.建筑名称._value;
        var pointtypes = entity.properties.类型._value;
        if (idHtml == pointtypes) {
          const cartographic = Cesium.Cartographic.fromCartesian(originPosition);
          const longitude = Cesium.Math.toDegrees(cartographic.longitude);
          const latitude = Cesium.Math.toDegrees(cartographic.latitude);
          const height = viewer.scene.sampleHeight(cartographic);
          const newPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
          entities[i].position = newPosition
          filterEntities.push(entity);
        }
      }
      else {
        var pointnames = entity.properties.OBJNAME._value
      }
      entity.billboard = {
        image: images,
        width: 25,
        height: 25,
      };
      entity.label = {
        text: pointnames,
        font: '12px Arial',
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.RED,
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
    }

    // 添加数据源到 viewer
    viewer.dataSources.add(pointsource);
  }
}



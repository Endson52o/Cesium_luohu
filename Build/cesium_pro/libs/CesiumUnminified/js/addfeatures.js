
function getheight() {
    var url = "../config/point.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    var request = new XMLHttpRequest();
    request.open("get", url);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        test3 = JSON.parse(request.responseText);

        for (var i = 0; i < test3.features.length; i++) {
            var dataPoint_longitude = test3.features[i].geometry.coordinates[0];
            var dataPoint_latitude = test3.features[i].geometry.coordinates[1];
            var car = Cesium.Cartographic.fromDegrees(dataPoint_longitude, dataPoint_latitude);
            var height = viewer.scene.sampleHeight(car);
            var j = i;

                console.log('第'+j+'个：' + test3.features[i].properties.NAME + ';' + height);



            var point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, height);
            viewer.entities.add({
                position: point_position,
                billboard: {
                    image: "../images/csbj/04.png",
                    width: 25,
                    height: 25,
                },
                label: {
                    text: test3.features[i].properties.NAME,
                    font: "14pt monospace",
                    fillColor: Cesium.Color.BLUE,
                    style: Cesium.LabelStyle.FILL,
                    outlineWidth: 2,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset: new Cesium.Cartesian2(0, -20),
                    scale: 0.7,
                    showBackground: true,
                    backgroundColor: Cesium.Color.AQUA,
                    outlineColor: Cesium.Color.YELLOW,
                    outlineWidth: 50
                },
            });
        }
    }
}
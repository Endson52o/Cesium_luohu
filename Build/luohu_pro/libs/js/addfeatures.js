


function DispayPrice() {
    viewer.entities.removeAll()
    var nSel = document.getElementById("EffectiveDateSel");
    var index = nSel.selectedIndex; // 选中索引
    var text = nSel.options[index].value;
    console.log(text);
    var txt = ["商业楼宇","小区住宅","大型商业综合体","总览"]
    for(var _txt=0;_txt<txt.length;_txt++){
        if(txt[_txt]==text){
            getheight(text);
        }
    }
}
function getheight(x) {
    var url = "../config/fcfh2.geojson"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    var request = new XMLHttpRequest();
    request.open("get", url);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        geoData = JSON.parse(request.responseText);
        var txt =["大型商业综合体","小区住宅","商业楼宇"];
        var image1=["../images/csbj/01.png","../images/csbj/02.png","../images/csbj/03.png"]
        for (var _cont=0;_cont<txt.length;_cont++){
            if(x==txt[_cont]){
                imgagetest=image1[_cont];
                toDo();
            }
            if(x=="总览"){
                for(var k=0;k<=txt.length-1;k++){
                    x=txt[k];
                    imgagetest=image1[k];
                    toDo()
                }
            }
        }
        function toDo(){
            for (var i = 0; i < geoData.features.length; i++) {
                var dataPoint_longitude = geoData.features[i].geometry.coordinates[0];
                var dataPoint_latitude = geoData.features[i].geometry.coordinates[1];
                var car = Cesium.Cartographic.fromDegrees(dataPoint_longitude, dataPoint_latitude);
                var height = viewer.scene.sampleHeight(car);
                var point_position = Cesium.Cartesian3.fromDegrees(dataPoint_longitude, dataPoint_latitude, height+15);
                fenCHENG();
            }

            function fenCHENG(){
                
                if (geoData.features[i].properties.类型==x){
                    viewer.entities.add({
                        position: point_position,
                        billboard: {
                            image: imgagetest,
                            width: 25,
                            height: 25,
                        },
                        label:{
                            text: geoData.features[i].properties.建筑名称,
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
}

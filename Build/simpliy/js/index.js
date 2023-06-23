
$(document).ready(function () {
    if (!das3d.util.webglreport()) {
        alert('系统检测到您使用的浏览器不支持WebGL功能');
        layer.open({
            type: 1,
            title: "当前浏览器不支持WebGL功能",
            closeBtn: 0,
            shadeClose: false,
            resize: false,
            area: ['600px', '200px'], //宽高
            content: '<div style="margin: 20px;"><h3>系统检测到您使用的浏览器不支持WebGL功能！</h3>  <p>1、请您检查浏览器版本，安装使用最新版chrome、火狐或IE11以上浏览器！</p> <p>2、WebGL支持取决于GPU支持，请保证客户端电脑已安装显卡驱动程序！</p></div>'
        });
    }
    initMap();

});

var viewer0, viewer1
function initMap() {
    var viewer0 = dasutil.system.getRequestByName("config", "config/config.json");
    das3d.createMap({
        id: 'cesiumContainer',
        url: viewer0,
        success: function (_viewer, jsondata) {//地图成功加载完成后执行
            viewer0 = _viewer; 
            var palaceTileset = new Cesium.Cesium3DTileset({
                url:'http://localhost:8005/Data/SG_3dtiles/tileset.json'
                //url:'http://10.169.3.15:8088/jxmx/jx3dtiles/tileset.json'
                // url:'http://10.169.3.15:8088/jxmx/gy_3dtiles/tileset.json'
                //http://10.169.3.15:8088/wapian/tileset.json
                //url: 'http://10.167.210.26:8005/Data/jz-3dtiles/tileset.json'
                //http://10.169.3.15:8088/wapian/tileset.json
                })
                viewer0.scene.primitives.add(palaceTileset); 
            var viewer1 = dasutil.system.getRequestByName("config", "config/config.json");
            das3d.createMap({
                id: 'cesiumContainer2',
                url: viewer1,
                success: function (_viewer, jsondata) {//地图成功加载完成后执行
                    viewer1 = _viewer;
                    var palaceTileset1 = new Cesium.Cesium3DTileset({
                        url: 'http://10.169.3.17:9999/stdms/service/mesh/luohu2020/tileset.json'
                        // http://10.169.3.15:8088/jxmx/jx3dtiles/tileset.json
                        })
                        viewer1.scene.primitives.add(palaceTileset1); 
                    linkedHander(viewer0, viewer1);
                }
            });
        }
    });

}




//两个球体的事件联动
function linkedHander(viewer0, viewer1) {
    var originMapHandler=undefined;
    var linkMapHandler = undefined
    //viewer0---左   viewer1---右
    if (originMapHandler && originMapHandler.getInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)) {
        return;
    }
    if (linkMapHandler && linkMapHandler.getInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)) {
        return;
    }
    let _camerca = viewer0.camera;
    viewer1.camera.flyTo({
        destination: _camerca.position,
        orientation: {
            direction: _camerca._direction,
            up: _camerca.up,
            heading: _camerca.heading,
            pitch: _camerca.pitch,
            roll: _camerca.roll
        },
        duration: 3,
        complete: function () {
            //左
            originMapHandler = new Cesium.ScreenSpaceEventHandler(viewer0.scene.canvas);
            originMapHandler.setInputAction(function (movement) {
                let _camerca = viewer0.camera;
                viewer1.camera.setView({
                    destination: _camerca.position,
                    orientation: {
                        direction: _camerca._direction,
                        up: _camerca.up,
                        heading: _camerca.heading,
                        pitch: _camerca.pitch,
                        roll: _camerca.roll
                    }
                });
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            originMapHandler.setInputAction(function (movement) {
                let _camerca = viewer0.camera;
                viewer1.camera.setView({
                    destination: _camerca.position,
                    orientation: {
                        direction: _camerca._direction,
                        up: _camerca.up,
                        heading: _camerca.heading,
                        pitch: _camerca.pitch,
                        roll: _camerca.roll
                    }
                });
            }, Cesium.ScreenSpaceEventType.WHEEL);
            //右
            linkMapHandler = new Cesium.ScreenSpaceEventHandler(viewer1.scene.canvas);
            linkMapHandler.setInputAction(function (movement) {
                let _camerca = viewer1.camera;
                viewer0.camera.setView({
                    destination: _camerca.position,
                    orientation: {
                        direction: _camerca._direction,
                        up: _camerca.up,
                        heading: _camerca.heading,
                        pitch: _camerca.pitch,
                        roll: _camerca.roll
                    }
                });
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            linkMapHandler.setInputAction(function (movement) {
                let _camerca = viewer1.camera;
                viewer0.camera.setView({
                    destination: _camerca.position,
                    orientation: {
                        direction: _camerca._direction,
                        up: _camerca.up,
                        heading: _camerca.heading,
                        pitch: _camerca.pitch,
                        roll: _camerca.roll
                    }
                });
            }, Cesium.ScreenSpaceEventType.WHEEL);
            fly_action_done = true;
        }
    })
}
//获取自定义底图切换
function getImageryProviderArr() {
    var providerViewModels = [];
    var imgModel;
    //EPSG3857 web墨卡托
    imgModel = new das3d.ProviderViewModel({
        name: '天地图影像(EPSG:3857)',
        tooltip: '天地图全球影像地图服务（国家测绘局）',
        iconUrl: "img/basemaps/tdt_img.png",
        creationFunction: function () {
            return [
                das3d.layer.createImageryProvider({ type: "www_tdt", layer: "img_d", key: das3d.token.tiandituArr }),
                das3d.layer.createImageryProvider({ type: "www_tdt", layer: "img_z", key: das3d.token.tiandituArr }),
            ];
        }
    });
    providerViewModels.push(imgModel);
    return providerViewModels;
}


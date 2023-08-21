var viewer = new Cesium.Viewer("cesiumContainer1", {
   animation: false,//动画小部件
   baseLayerPicker: true,//地图图层组件
   fullscreenButton: false,//全屏组件
   geocoder: true,//地理编码搜索组件
   homeButton: false,//首页组件
   infoBox: false,//信息框
   sceneModePicker: false,//场景模式
   selectionIndicator: false,//选取指示器组件
   timeline: false,//时间轴
   navigationHelpButton: false,//帮助按钮
   navigationInstructionsInitiallyVisible: false,
   scene3DOnly: true,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源

});
// 隐藏版权信息
viewer._cesiumWidget._creditContainer.style.display = "none";
//隐藏默认地图
viewer.imageryLayers.get(0).show = true;
// 深度检测开关
viewer.scene.globe.depthTestAgainstTerrain = true;
//光照效果
viewer.scene.globe.enableLighting = true;
//加载3dtiels数据
var tileset1 = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
   maximumScreenSpaceError: 64,// 数值加大，能让最终成像变模糊
   dynamicScreenSpaceError: true, // 根据测试，有了这个后，会在真正的全屏加载完之后才清晰化房屋
   maximumMemoryUsage: 512, // 内存分配变小有利于倾斜摄影数据回收，提升性能体验

   // url: 'http://10.169.3.17:9999/stdms/service/mesh/luohu2021/tileset.json',
   url: 'http://10.169.3.15:8088/gw/Production_2_osgb-3dtiles/tileset.json'
   // url: 'http://localhost:8005/Data/SG_3dtiles/tileset.json'
}));
viewer.scene.primitives.add(tileset1);
start_test()
// 系统默认视角，根据点来设定
//进入系统后多次飞行:
function start_test() {
   optionsA = {
      destination: Cesium.Cartesian3.fromDegrees(
         114.1137459,
         22.548875,
         25071373
      ),
   };
   optionsB = {
      destination: Cesium.Cartesian3.fromDegrees(
         114.1137459,
         22.548875,
         450
      ),
   };
   optionsC = {
      destination: { x: -2407713.0067084413, y: 5379289.807831032, z: 2430628.2872445565 },
      orientation: {
         heading: 0.81,
         pitch: -0.41,
      },
      easingFunction: Cesium.EasingFunction.LINEAR_NONE,
   };
   const camera = viewer.scene.camera;
   camera.flyTo(optionsA);
   optionsA.complete = () => {
      setTimeout(() => {
         camera.flyTo(optionsB);
         optionsB.complete = () => {
            setTimeout(() => {
               camera.flyTo(optionsC)
            }, 400)
         }
      }, 400)
   }
}
// document.write("<script language=javascript src='../libs/CesiumUnminified/js/button.js'></script>");
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
  // url:'http://10.169.3.15:8088/gw/Production_2_osgb-3dtiles/tileset.json'
  url:'http://localhost:8005/Data/SG_3dtiles/tileset.json',
  // url:'http://10.169.3.15:8088/gw/Production_2_osgb-3dtiles/tileset.json',
}));
viewer.scene.primitives.add(tileset1);
start_test();
postion_get();
function mm(){
  var terrainProvider = new Cesium.ArcGISTiledElevationTerrainProvider({
    url:
      "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
  });
  viewer.terrainProvider = terrainProvider;
}
// 系统默认视角，根据点来设定
function cesium_home() {
  viewer.camera.flyTo(optionsC)
}
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

//Cesium获取鼠标点击的经纬度（lon、lat）、高度（height）、相机的视角（heading、pitch、roll）
function postion_get() {
  var canvas = viewer.scene.canvas;
  var handler = new Cesium.ScreenSpaceEventHandler(canvas);
  handler.setInputAction(function (lclickment) {
    var scene = viewer.scene;
    var ellipsoid = scene.globe.ellipsoid;
    var cartesian = viewer.scene.pickPosition(lclickment.position);
    positionPick = cartesian;
    if (cartesian) {
      var cartographic = ellipsoid.cartesianToCartographic(cartesian);
      lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(7);
      lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(7);
      haiba = cartographic.height.toFixed(2);
      //地理高度
      //height = (cartographic.height+1).toFixed(2);
      //方向   围绕Z轴旋转
      heading = Cesium.Math.toDegrees(viewer.camera.heading).toFixed(2);
      // console.log(heading);
      //倾斜角度   围绕Y轴旋转
      pitch = Cesium.Math.toDegrees(viewer.camera.pitch).toFixed(2);
      //围绕X轴旋转
      roll = Cesium.Math.toDegrees(viewer.camera.roll).toFixed(2);

      longitude_show.innerHTML = lon;
      latitude_show.innerHTML = lat;
      height_show.innerHTML = haiba;
      // 获取镜头的经纬度坐标信息
      lon_carmer = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(viewer.camera.position).longitude);
      lat_carmer = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(viewer.camera.position).latitude);
      height = viewer.camera.positionCartographic.height.toFixed(2)
      mess_carmer.innerHTML = viewer.camera.position;
      height_carmer.innerHTML = viewer.camera.positionCartographic.height.toFixed(2);
      heading_carmer.innerHTML = viewer.camera.heading.toFixed(2);
      pitch_carmer.innerHTML = viewer.camera.pitch.toFixed(2);
      console.log('lon:' + lon + ";" + 'lat:' + lat + ";" + 'height:' + haiba);
      console.log('heading:' + heading + ';' + 'pitch:' + pitch + ';' + 'roll:' + roll)
      console.log('相机位置：' + viewer.camera.position + ';' + '相机heading:' + viewer.camera.heading.toFixed(2) + ';' + '相机pitch:' + viewer.camera.pitch.toFixed(2) + ';' + '相机高：' + viewer.camera.positionCartographic.height.toFixed(2));
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
//点击后绕点飞行
function roll_test() {
  if ("undefined" == typeof lat || "undefined" == typeof lon){
    alert('请先选择要绕飞的位置!')
    return;
  }else{
//var position = viewer.camera.position;
  // 给定飞行一周所需时间，比如10s, 那么每秒转动度数
  var angle = 360 / 20;
  // 给定相机距离点多少距离飞行，这里取值为5000m
  var distance = 0;
  var startTime = Cesium.JulianDate.fromDate(new Date());
  var stopTime = Cesium.JulianDate.addSeconds(startTime, 10, new Cesium.JulianDate());
  viewer.clock.startTime = startTime.clone();  // 开始时间
  viewer.clock.stopTime = stopTime.clone();     // 结速时间
  viewer.clock.currentTime = startTime.clone(); // 当前时间
  viewer.clock.clockRange = Cesium.ClockRange.CLAMPED; // 行为方式
  viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK; // 时钟设置为当前系统时间; 忽略所有其他设置。
  // 相机的当前heading
  var initialHeading = viewer.camera.heading;
  var Exection = function TimeExecution() {
    // 当前已经过去的时间，单位s
    var delTime = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, viewer.clock.startTime);
    var center = new Cesium.Cartesian3.fromDegrees(Number(lon), Number(lat));
    var heading = Cesium.Math.toRadians(delTime * angle) + initialHeading;
    var pitch = viewer.camera.pitch;
    var range = 500;
    console.log(range);
    viewer.camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, range));
    // console.log(center);
    // console.log(new Cesium.HeadingPitchRange(heading,pitch,range));
    viewer.scene.camera.moveBackward(distance);
    if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {
      viewer.clock.onTick.removeEventListener(Exection);
    }
    //旋转完成后取消Lookat锁定
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  };
  viewer.clock.onTick.addEventListener(Exection);
  }
  
}

//双屏联动方法
function cesium_shuangpping() {
  const rightViewer = new Cesium.Viewer('right-viewer', {
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
    // terrainProvider: Cesium.createWorldTerrain(),//加载地形
  })
  var tileset2 = rightViewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    maximumScreenSpaceError: 64,// 数值加大，能让最终成像变模糊
    dynamicScreenSpaceError: true, // 根据测试，有了这个后，会在真正的全屏加载完之后才清晰化房屋
    maximumMemoryUsage: 512, // 内存分配变小有利于倾斜摄影数据回收，提升性能体验
    url: 'http://10.169.3.17:9999/stdms/service/mesh/luohu2021/tileset.json',
  }));
  const MOUSE_TYPE = {
    LEFT: 0,
    RIGHT: 1
  }
  window.mouseType = MOUSE_TYPE.LEFT
  const leftHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
  leftHandler.setInputAction(() => {
    window.mouseType = MOUSE_TYPE.LEFT
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
  viewer.scene.postRender.addEventListener(() => {
    if (window.mouseType === MOUSE_TYPE.RIGHT) return
    const destination = Cesium.Cartographic.toCartesian(viewer.camera.positionCartographic)
    rightViewer.camera.setView({
      destination: new Cesium.Cartesian3(destination.x, destination.y, destination.z),
      orientation: {
        heading: viewer.camera.heading,
        pitch: viewer.camera.pitch,
        roll: viewer.camera.roll
      }
    })
  })
  const rightHandler = new Cesium.ScreenSpaceEventHandler(rightViewer.canvas)
  rightHandler.setInputAction(() => {
    window.mouseType = MOUSE_TYPE.RIGHT
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
  rightViewer.scene.postRender.addEventListener(() => {
    if (window.mouseType === MOUSE_TYPE.LEFT) return
    const destination = Cesium.Cartographic.toCartesian(rightViewer.camera.positionCartographic)
    viewer.camera.setView({
      destination: new Cesium.Cartesian3(destination.x, destination.y, destination.z),
      orientation: {
        heading: viewer.camera.heading,
        pitch: viewer.camera.pitch,
        roll: viewer.camera.roll
      }
    })
  })
}
// 按setviewer方式绕点飞行
function roll_test1() {
  // 给定飞行一周所需时间，比如10s, 那么每秒转动度数
  var angle = 360 / 10;
  // 给定相机距离点多少距离飞行，这里取值为5000m
  var distance = viewer.camera.positionCartographic.height.toFixed(2);
  var startTime = Cesium.JulianDate.fromDate(new Date());
  var stopTime = Cesium.JulianDate.addSeconds(startTime, 10, new Cesium.JulianDate());
  viewer.clock.startTime = startTime.clone();  // 开始时间
  viewer.clock.stopTime = stopTime.clone();     // 结速时间
  viewer.clock.currentTime = startTime.clone(); // 当前时间
  viewer.clock.clockRange = Cesium.ClockRange.CLAMPED; // 行为方式
  viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK; // 时钟设置为当前系统时间; 忽略所有其他设置。
  // 相机的当前heading
  var initialHeading = viewer.camera.heading;
  var center = new Cesium.Cartesian3.fromDegrees(Number(lon), Number(lat));
  var pitch = viewer.camera.pitch;
  var Exection = function TimeExecution() {
    // 当前已经过去的时间，单位s
    var delTime = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, viewer.clock.startTime);
    var heading = Cesium.Math.toRadians(delTime * angle) + initialHeading;
    viewer.scene.camera.setView({
      destination: center, // 点的坐标
      orientation: {
        heading: heading,
        pitch: pitch,
      }
    });
    viewer.scene.camera.moveBackward(distance);
    if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {
      viewer.clock.onTick.removeEventListener(Exection);
    }
  };
  viewer.clock.onTick.addEventListener(Exection);
}

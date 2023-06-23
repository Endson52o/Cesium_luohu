  var viewer = new Cesium.Viewer("cesiumContainer", {
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
    //infoBox: true,//是否显示信息框 
    scene3DOnly: true,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    //terrainProvider: Cesium.createWorldTerrain(),//加载地形
  });

  // 隐藏版权信息
  viewer._cesiumWidget._creditContainer.style.display = "none";
  // 深度检测开关
  viewer.scene.globe.depthTestAgainstTerrain = true,
  start_test();
  postion_get();

  
  //多次飞行:
  function start_test(){
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
    destination:{
      x: -2408761.655968321, 
      y: 5378979.042432257, 
      z: 2430951.659619999
    },
    orientation: {
      heading: 2.94,
      pitch: -0.50,
    },
    easingFunction: Cesium.EasingFunction.LINEAR_NONE,
  };
    const camera = viewer.scene.camera;
    camera.flyTo(this.optionsA);
    this.optionsA.complete = () => {
      setTimeout(() => {  
        camera.flyTo(this.optionsB);
        this.optionsB.complete = () => {
          setTimeout(() => {  
            camera.flyTo(this.optionsC)
          },400)
        }
      },400)
    }

  }

  var lon,lat;
   //Cesium获取鼠标点击的经纬度（lon、lat）、高度（height）、相机的视角（heading、pitch、roll）
   function postion_get(){
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
        haiba =  cartographic.height.toFixed(2)
        //地理高度
        //height = (cartographic.height+1).toFixed(2);
        //相机高度

        //方向   围绕Z轴旋转
        heading = Cesium.Math.toDegrees(viewer.camera.heading).toFixed(2);
        console.log(heading);
        //倾斜角度   围绕Y轴旋转
        pitch = Cesium.Math.toDegrees(viewer.camera.pitch).toFixed(2);
        //围绕X轴旋转
        roll = Cesium.Math.toDegrees(viewer.camera.roll).toFixed(2);
        console.log('lon:' + lon + ";" + 'lat:' + lat + ";" + 'height:' + haiba);
        console.log('heading:' + heading + ';' + 'pitch:' + pitch + ';' + 'roll:' + roll)
        longitude_show.innerHTML = lon;
        latitude_show.innerHTML = lat;
        height_show.innerHTML = haiba;
        // 获取镜头的经纬度坐标信息
        var lon_carmer = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(viewer.camera.position).longitude);
        var lat_carmer = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(viewer.camera.position).latitude);
        mess_carmer.innerHTML = viewer.camera.position;
        height_carmer.innerHTML = viewer.camera.positionCartographic.height.toFixed(2);
        heading_carmer.innerHTML = viewer.camera.heading.toFixed(2);
        pitch_carmer.innerHTML = viewer.camera.pitch.toFixed(2);
        //carmer_mess.innerHTML ='x: '+ lon_carmer + "; "+ 'y: '+ lat_carmer + "; " + 'z: ' + height_carmer + "; " + 'heading' + heading_carmer + ";" + 'pitch' + pitch_carmer + ";";
      }
      //roll_test(); 
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


   }


    function roll_test() {
      //var position = viewer.camera.position;
      var position = viewer.camera.positionCartographics;
      var pitch = viewer.camera.pitch;
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
              var heading = Cesium.Math.toRadians(delTime * angle) + initialHeading;
              
              var lon_carmer = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(viewer.camera.position).longitude);
              var lat_carmer = Cesium.Math.toDegrees(Cesium.Cartographic.fromCartesian(viewer.camera.position).latitude);
              var height_carmer = viewer.camera.positionCartographic.height.toFixed(2);
              const center = Cesium.Cartesian3.fromDegrees(Number(lon_carmer),Number(lat_carmer),Number(height_carmer));
              const pitch = Cesium.Math.toRadians(-50.0);
              const range = 500;
              viewer.camera.lookAt(center,new Cesium.HeadingPitchRange(heading, pitch, range));
  


              viewer.scene.camera.moveBackward(distance);
              if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {
                  viewer.clock.onTick.removeEventListener(Exection);
              }
   
      };
   
      viewer.clock.onTick.addEventListener(Exection);
    }

    load3DTileFile();
    function load3DTileFile() {
      viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: 'http://10.169.3.17:9999/stdms/service/mesh/luohu2020/tileset.json',
        shadows: Cesium.ShadowMode.DISABLED,
        luminanceAtZenith: 1,
      }))
    }


    // 最小缩放高度（米）
//viewer.scene.screenSpaceCameraController.minimumZoomDistance = 200;
// 最大缩放高度（米）
//viewer.scene.screenSpaceCameraController.maximumZoomDistance = 100000;

// 设置鼠标位置经纬度\视角高度实时显示


// 获取相机位置，姿态等
function getcameraPosInfo(){
  // 获取 相机姿态信息
  var head = viewer.scene.camera.heading 
  var pitch = viewer.scene.camera.pitch
  var roll  = viewer.scene.camera.roll
  var info ={'head': head ,'pitch': pitch ,'roll': roll};
  // 获取位置 wgs84的地心坐标系，x,y坐标值以弧度来表示
  var position = viewer.scene.camera.positionCartographic //with longitude and latitude expressed in radians and height in meters.
          //以下方式也可以获取相机位置只是返回的坐标系不一样
  // var position = viewer.scene.camera.position //cartesian3 空间直角坐标系
  // var ellipsoid = scene.globe.ellipsoid;
  // var position =ellipsoid.cartesianToCartographic(viewer.scene.camera.position)//
  // 弧度转经纬度
  var longitude = Cesium.Math.toDegrees(position.longitude).toFixed(6)
  var latitude =  Cesium.Math.toDegrees(position.latitude).toFixed(6)
  var height = position.height
  return {lng:longitude,lat:latitude,h:height,mat:info}
}

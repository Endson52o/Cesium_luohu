function cesium_shuangpping(){
    const rightViewer = new Cesium.Viewer('right-viewer', {
        terrainProvider: Cesium.createWorldTerrain(),
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
        terrainProvider: Cesium.createWorldTerrain(),//加载地形
    })
    var palaceTileset = new Cesium.Cesium3DTileset({
      url:'http://10.169.3.15:8088/gw/Production_2_osgb-3dtiles/tileset.json'
    // url:'http://localhost:8005/Data/SG_NEW_3dtiles1/tileset.json'
      })
      rightViewer.scene.primitives.add(palaceTileset); 
      
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
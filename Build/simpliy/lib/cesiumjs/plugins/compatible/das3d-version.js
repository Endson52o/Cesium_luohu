//兼容老版本das3d用户的，升级用户可以按需修改本js，非升级用户可以不引入本js 

das3d.latlng = das3d.point;  //1.6
function createModel(cfg, viewer) {
  cfg = viewer.das.point2map(cfg); //转换坐标系

  var position = Cesium.Cartesian3.fromDegrees(cfg.x, cfg.y, cfg.z || 0);

  var heading = Cesium.Math.toRadians(cfg.heading || 0);
  var pitch = Cesium.Math.toRadians(cfg.pitch || 0);
  var roll = Cesium.Math.toRadians(cfg.roll || 0);
  var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);

  var converter = cfg.converter || Cesium.Transforms.eastNorthUpToFixedFrame;
  var orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    hpr,
    viewer.scene.globe.ellipsoid,
    converter
  );

  var model = viewer.entities.add({
    name: cfg.name || "",
    position: position,
    orientation: orientation,
    model: cfg,
    tooltip: cfg.tooltip,
    popup: cfg.popup
  });
  return model;
}
das3d.util.createModel = createModel;   //1.8.3
das3d.model.createModel = createModel //2.2.0删除

das3d.AnimationLineMaterialProperty = das3d.material.LineFlowMaterialProperty  //1.8.5
das3d.ElliposidFadeMaterialProperty = das3d.material.CircleWaveMaterialProperty //1.8.5


das3d.analysi.TerrainExcavate = das3d.analysi.TerrainClip; //1.9.0
das3d.analysi.TerrainFlood = das3d.analysi.FloodByTerrain; //1.9.0
das3d.analysi.VideoShed3D = das3d.video.Video3D; //1.9.0
das3d.VideoShed3D = das3d.video.Video3D; //1.9.0

das3d.util.terrainPolyline = das3d.polyline.computeSurfaceLine; //1.9.1
das3d.point.formatPositon = das3d.point.formatPosition; //1.9.1  单词错误改正

das3d.util.hasTerrain = das3d.layer.hasTerrain; //1.9.3
das3d.util.getEllipsoidTerrain = das3d.layer.getEllipsoidTerrain; //1.9.3
das3d.util.getTerrainProvider = das3d.layer.getTerrainProvider; //1.9.3

//移动了方法
das3d.point.computePolygonHeightRange = das3d.polygon.getHeightRange; //2.0.2
das3d.point.updateHeightForClampToGround = das3d.point.setPositionSurfaceHeight; //2.0.2
das3d.point.terrainPolyline = das3d.polyline.computeSurfaceLine; //2.0.2
das3d.util.getLinkedPointList = das3d.polyline.getLinkedPointList; //2.0.2

das3d.util.getLength = das3d.measure.getLength; //2.1.0
das3d.util.getArea = das3d.measure.getArea; //2.1.0
das3d.util.getAreaOfTriangle = das3d.measure.getAreaOfTriangle; //2.1.0
das3d.util.getAngle = das3d.measure.getAngle; //2.1.0

das3d.scene.RainFS = das3d.shader.rain; //2.2.0
das3d.scene.SnowFS = das3d.shader.snow; //2.2.0
das3d.draw.util = das3d.draw.attr; //2.2.0
das3d.draw.event = {
  DrawStart: das3d.event.drawStart,
  DrawAddPoint: das3d.event.drawAddPoint,
  DrawRemovePoint: das3d.event.drawRemovePoint,
  DrawMouseMove: das3d.event.drawMouseMove,
  DrawCreated: das3d.event.drawCreated,
  EditStart: das3d.event.editStart,
  EditMouseMoveStart: das3d.event.editMouseDown,
  EditMouseMove: das3d.event.editMouseMove,
  EditMovePoint: das3d.event.editMovePoint,
  EditRemovePoint: das3d.event.editRemovePoint,
  EditStop: das3d.event.editStop,
  Delete: das3d.event.delete,
  LoadEnd: das3d.event.load
}; //2.2.0
das3d.analysi.HeightCounterByTerrain = das3d.analysi.ContourLine; //2.2.0
das3d.CircleFadeMaterial = das3d.material.CircleWaveMaterialProperty; //2.2.0
das3d.CircleWaveMaterial = das3d.material.CircleWaveMaterialProperty; //2.2.0
das3d.CircleScanMaterial = das3d.material.CircleScanMaterialProperty; //2.2.0
das3d.LineFlowMaterial = das3d.material.LineFlowMaterialProperty; //2.2.0
das3d.TextMaterial = das3d.material.TextMaterialProperty; //2.2.0
das3d.GroundLineFlowMaterial = function (options) {
  return Cesium.Material.fromType(das3d.material.LineFlowMaterial, options);
}; //2.2.0

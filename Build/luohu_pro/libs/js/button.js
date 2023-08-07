// 双屏按钮功能
let rightWindows = $("#right-viewer").css("display");
$(document).ready(function () {
  $("#cesium_shuanping_button").click(function () {
    if (rightWindows == "none") {
      $("#right-viewer").css("display", "block");
      $("#cesiumContainer1").css("width", "50%");
      cesium_shuangpping();
      rightWindows = "block"
    }
    else {
      $("#right-viewer").css("display", "none");
      $("#cesiumContainer1").css("width", "100%");
      rightWindows = "none"
    }
  })
})

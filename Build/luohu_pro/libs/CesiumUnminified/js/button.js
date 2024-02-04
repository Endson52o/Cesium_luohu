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
  $('.btn').click(function () {
    viewer.dataSources.removeAll();
    if ($(this).attr('id') == "fenChen") {
      $("#chenshibujian").css("display", "none")
      $("#fenchenfenhu").toggle();
    }
    if ($(this).attr('id') == "BuJian") {
      $("#fenchenfenhu").css("display", "none")
      $("#chenshibujian").toggle();
    }
  })
  $('.btn1').click(function () {
    viewer.dataSources.removeAll();
    idName = $(this).attr('id')
    idHtml = $(this).html();
    if (btnObject.fnechenbtnName.indexOf(idName) > -1) {
      urldatas = btnObject.url[0]
      if (idName == "sy") {
        imageName = "../images/csbj/shanye.png"
      }
      if (idName == "xq") {
        imageName = "../images/csbj/zhuzhai.png"
      }
      if (idName == "zht") {
        imageName = "../images/csbj/zonghe.png"
      }
      btnObject.btnAddData(imageName, urldatas);
    }
    if (idName == "zl") {
      urlData = dataobject.fencfenhu.url;
      for (var _i = 0; _i < dataobject.fencfenhu.txtId.length; _i++) {
        idHtml = dataobject.fencfenhu.txtList[_i];
        imageName = dataobject.fencfenhu.image[_i];
      }
    }
  })
  $("#chaxun").click(function () {
    var value = $("#myinput").val();
    // 保存值到变量
    var inputValue = value;
    var url="../config/Point.json"
    findIndex(url)
      if(bujianList.indexOf(inputValue) > -1){
        console.log("yes")
      }
      else{
        alert("输入的部件名称不存在");
        $("#myinput").val('');
      }
  })
})

//双屏功能
var i = 2;
var button = document.getElementById("cesium_shuanping_button");
button.addEventListener("click",
  function () {
    if (i % 2 == 0) {
      my_test()
    }
    else {
      my_test1()
    }
    i++;
  })
function $(id) { return document.getElementById(id) }
function my_test() {
  $("cesiumContainer1").style.width = "50%";
  $("right-viewer").style.display = "block";
  cesium_shuangpping();
}
function my_test1() {
  $("cesiumContainer1").style.width = "100%";
  $("right-viewer").style.display = "none";
}
//切换电子地图
var j = 2;
var button = document.getElementById("2dmaps");
button.addEventListener("click",
  function () {
    if (j % 2 == 0) {
      addtdtmaps();
    }
    else {
      addmaps();
    }
    j++;
  })
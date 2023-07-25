//双屏功能
var i = 2;
var button = document.getElementById("cesium_shuanping_button");
button.addEventListener("click",
  function () {
    if (i % 2 == 0) {
      document.getElementById('cesiumContainer1').style.width = "50%";
      document.getElementById('right-viewer').style.display = "block";
      cesium_shuangpping();
    }
    else {
      document.getElementById('cesiumContainer1').style.width = "100%";
      document.getElementById('right-viewer').style.display = "none";
    }
    i++;
  })


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
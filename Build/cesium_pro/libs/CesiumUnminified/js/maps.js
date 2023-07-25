

//添加卫星影像
function addtdtmaps(){
    viewer.imageryLayers.get(0).show = false;
    viewer.imageryLayers.remove(this.esri);
    viewer.imageryLayers.remove(this.addmaps1);
    viewer.imageryLayers.remove(this.addmaps2);
    viewer.imageryLayers.remove(this.addmaps3);
    satellite_image = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t0.tianditu.gov.cn/img_w/wmts?tk=df7870fea240788b487f759ee949a08e",
        layer: "img",
        style: "default",
        tileMatrixSetID: "w",
        format: "tiles",
        maximumLevel: 18,
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }))
    //添加国界线
    satellite_image1 = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t{s}.tianditu.gov.cn/ibo_w/wmts?tk=df7870fea240788b487f759ee949a08e",
        layer: "ibo",
        style: "default",
        tileMatrixSetID: "w",
        format: "tiles",
        maximumLevel: 18,
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }))
    // 添加注记
    satellite_image_labals = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t0.tianditu.gov.cn/cia_w/wmts?tk=df7870fea240788b487f759ee949a08e",
        layer: "cia",
        style: "default",
        tileMatrixSetID: "w",
        format: "tiles",
        maximumLevel: 18,
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }))
}
//添加电子地图
function addmaps(){
    viewer.imageryLayers.get(0).show = false;
    viewer.imageryLayers.remove(this.satellite_image);
    viewer.imageryLayers.remove(this.satellite_image1);
    viewer.imageryLayers.remove(this.satellite_image_labals);
    viewer.imageryLayers.remove(this.esri);
    addmaps1 = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t0.tianditu.gov.cn/vec_w/wmts?tk=df7870fea240788b487f759ee949a08e",
        layer: "vec",
        style: "default",
        tileMatrixSetID: "w",
        format: "tiles",
        maximumLevel: 18,
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }))
    addmaps2 = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t{s}.tianditu.gov.cn/ibo_w/wmts?tk=df7870fea240788b487f759ee949a08e",
        layer: "ibo",
        style: "default",
        tileMatrixSetID: "w",
        format: "tiles",
        maximumLevel: 18,
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }))
    addmaps3 = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t0.tianditu.gov.cn/cva_w/wmts?tk=df7870fea240788b487f759ee949a08e",
        layer: "cva",
        style: "default",
        tileMatrixSetID: "w",
        format: "tiles",
        maximumLevel: 18,
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    }))
}
//添加arcgis蓝色夜景图
function arcgismaps(){
    viewer.imageryLayers.get(0).show = false;
    viewer.imageryLayers.remove(this.satellite_image);
    viewer.imageryLayers.remove(this.satellite_image1);
    viewer.imageryLayers.remove(this.satellite_image_labals);
    viewer.imageryLayers.remove(this.addmaps1);
    viewer.imageryLayers.remove(this.addmaps2);
    viewer.imageryLayers.remove(this.addmaps3);
    esri = viewer.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
        url:'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
    })

  )
}

// var basemapOptions11 =[
//     {
//         id:'TDTSL',
//         img:'',//缩略图
//         type:'WebMapTileServiceImageryProvider',
//         label:'天地图矢量',
//         params:[
//             {
//                 url: 'http://t0.tianditu.gov.cn/cva_w/wmts?tk=df7870fea240788b487f759ee949a08e',
//                 layer: 'cva',
//                 style: 'default',
//                 format: 'tiles',
//                 tileMatrixSetID: 'w',
//                 subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
//                 credit: new Cesium.Credit('天地图矢量注记'),
//                 maximumLevel: 18
//             },
//             {
//                 url: 'http://t0.tianditu.gov.cn/vec_w/wmts?tk=df7870fea240788b487f759ee949a08e',
//                 layer: 'vec',
//                 style: 'default',
//                 format: 'tiles',
//                 tileMatrixSetID: 'w',
//                 subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
//                 credit: new Cesium.Credit('天地图矢量'),
//                 maximumLevel: 18
//             },
//             {
//                 url: "http://t{s}.tianditu.gov.cn/ibo_w/wmts?tk=df7870fea240788b487f759ee949a08e",
//                 layer: "ibo",
//                 style: "default",
//                 format: "tiles",
//                 tileMatrixSetID: "w",
//                 subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
//                 credit: new Cesium.Credit('天地图矢量国界线'),
//                 maximumLevel: 18,
//             },
//         ]
//     },
//     {
//         id:'TDTYX',
//         img:'',//缩略图
//         type:'WebMapTileServiceImageryProvider',
//         label:'天地图影像',
//         params:[
//             {
//                 url: "http://t0.tianditu.gov.cn/img_w/wmts?tk=df7870fea240788b487f759ee949a08e",
//                 layer: 'img',
//                 style: 'default',
//                 format: 'tiles',
//                 tileMatrixSetID: 'w',
//                 subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
//                 credit: new Cesium.Credit('天地图影像'),
//                 maximumLevel: 18
//             },
//             {
//                 url: "http://t0.tianditu.gov.cn/cia_w/wmts?tk=df7870fea240788b487f759ee949a08e",
//                 layer: 'cia',
//                 style: 'default',
//                 format: 'tiles',
//                 tileMatrixSetID: 'w',
//                 subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
//                 credit: new Cesium.Credit('天地图影像注记'),
//                 maximumLevel: 18
//             },
//             {
//             //添加国界线
//                 url: "http://t{s}.tianditu.gov.cn/ibo_w/wmts?tk=df7870fea240788b487f759ee949a08e",
//                 layer: "ibo",
//                 style: "default",
//                 format: "tiles",
//                 tileMatrixSetID: "w",
//                 subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
//                 credit: new Cesium.Credit('天地图国界线'),
//                 maximumLevel: 18,
//             },
//         ]
//     }
// ]

/**
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/master/LICENSE.md for full licensing details.
 */

define(['./when-ca071c93', './Check-802a3f11', './Math-439e03ae', './Cartesian2-be0369bc', './Transforms-01f84fc8', './RuntimeError-d605d773', './WebGLConstants-95ceb4e9', './ComponentDatatype-2a7010d1', './GeometryAttribute-76dbac20', './GeometryAttributes-3b5bdbdf', './AttributeCompression-38a99216', './GeometryPipeline-85192c0e', './EncodedCartesian3-16367c2c', './IndexDatatype-f1ac8920', './IntersectionTests-5bf376cb', './Plane-0ff2e313', './PrimitivePipeline-e231efd7', './WebMercatorProjection-3325b928', './createTaskProcessorWorker'], function (when, Check, _Math, Cartesian2, Transforms, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, GeometryAttributes, AttributeCompression, GeometryPipeline, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, PrimitivePipeline, WebMercatorProjection, createTaskProcessorWorker) { 'use strict';

  /* global require */

  var moduleCache = {};

  function getModule(moduleName) {
    var module = moduleCache[moduleName];
    if (!when.defined(module)) {
      if (typeof exports === "object") {
        // Use CommonJS-style require.
        moduleCache[module] = module = require("Workers/" + moduleName);
      } else {
        // Use AMD-style require.
        // in web workers, require is synchronous
        require(["Workers/" + moduleName], function (f) {
          module = f;
          moduleCache[module] = f;
        });
      }
    }
    return module;
  }

  function createGeometry(parameters, transferableObjects) {
    var subTasks = parameters.subTasks;
    var length = subTasks.length;
    var resultsOrPromises = new Array(length);

    for (var i = 0; i < length; i++) {
      var task = subTasks[i];
      var geometry = task.geometry;
      var moduleName = task.moduleName;

      if (when.defined(moduleName)) {
        var createFunction = getModule(moduleName);
        resultsOrPromises[i] = createFunction(geometry, task.offset);
      } else {
        //Already created geometry
        resultsOrPromises[i] = geometry;
      }
    }

    return when.when.all(resultsOrPromises, function (results) {
      return PrimitivePipeline.PrimitivePipeline.packCreateGeometryResults(
        results,
        transferableObjects
      );
    });
  }
  var createGeometry$1 = createTaskProcessorWorker(createGeometry);

  return createGeometry$1;

});
//# sourceMappingURL=createGeometry.js.map

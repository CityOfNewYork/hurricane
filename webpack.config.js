console.warn(`process.env.NODE_ENV=${process.env.NODE_ENV}`)

const isProd = ['production', 'prod', 'prd'].indexOf(process.env.NODE_ENV) > -1
const webpack = require('webpack');
const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')

const plugins = [
  new webpack.optimize.ModuleConcatenationPlugin()
]

if (isProd) {
  plugins.push(new MinifyPlugin())
}

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
     path: path.resolve(__dirname, 'dist'),
     filename: 'js/hurricane.js'
  },
  devtool: isProd ? false : "cheap-module-eval-source-map",
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  externals: {
    jquery: 'jQuery',
    
    'ol/extent': 'ol.extent',
    'ol/coordinate': 'ol.coordinate',
    'ol/tilegrid': 'ol.tilegrid',
    'ol/feature': 'ol.Feature',
    'ol/map': 'ol.Map',
    'ol/view': 'ol.View',
    'ol/overlay': 'ol.Overlay',
    'ol/geolocation': 'ol.Geolocation',
    'ol/format/feature': 'ol.format.Feature',
    'ol/format/geojson': 'ol.format.GeoJSON',
    'ol/format/formattype': 'ol.format.FormatType',
    'ol/source/vector': 'ol.source.Vector',
    'ol/source/xyz': 'ol.source.XYZ',
    'ol/layer/vector': 'ol.layer.Vector',
    'ol/layer/tile': 'ol.layer.Tile',
    'ol/style/style': 'ol.style.Style',
    'ol/style/icon': 'ol.style.Icon',
    'ol/geom/point': 'ol.geom.Point',
    'ol/geom/linestring': 'ol.geom.LineString',
    'ol/geom/polygon': 'ol.geom.Polygon',
    'ol/proj/projection': 'ol.proj.Projection',

    'text-encoding': 'window',
    leaflet: 'L',
    shapefile: '(window.shapefile || {})',
    papaparse: '(window.Papa || {})',
    proj4: '(window.proj4 || {defs: function(){}})'
  },
  plugins: plugins
}

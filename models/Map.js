var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.SchemaTypes.ObjectId

//lat, long, and date
var MapSchema = new Schema({
  created:          { type: Date, required: true, default: Date.now }
  , latitude:       { type: Number, required: true }
  , longitude:      { type: Number, required: true }
  , dateTime:       { type: String, required: true, unique: true }
});

var Map = mongoose.model('Map', MapSchema);

module.exports = {
  Map: Map
};
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _model = _interopRequireDefault(require("../utils/model"));

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var required = _model["default"].required();

var orderSchema = new Schema({
  shopifyOrderId: {
    type: String,
    required: required,
    unique: true,
    trim: true
  },
  sellerShopifyOrderId: {
    type: String,
    required: required,
    trim: true
  },
  shop: {
    type: String,
    required: required,
    trim: true
  },
  vendorId: {
    type: String,
    required: required,
    trim: true
  },
  sellerId: {
    type: String,
    required: required,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  note: {
    type: String,
    trim: true
  },
  orderNumber: {
    type: String,
    required: required,
    trim: true
  },
  status: {
    type: String,
    trim: true
  },
  subtotal: {
    type: String,
    trim: true
  },
  taxesIncluded: {
    type: Boolean,
    "default": false
  },
  totalTax: {
    type: String,
    trim: true
  },
  totalDiscount: {
    type: String,
    trim: true
  },
  totalLineItemsPrice: {
    type: String,
    trim: true
  },
  totalPrice: {
    type: String,
    trim: true
  },
  currency: {
    type: String,
    trim: true
  },
  financialStatus: {
    type: String,
    trim: true
  },
  confirmed: {
    type: Boolean,
    "default": false,
    trim: true
  },
  processingMethod: {
    type: String,
    trim: true
  },
  paymentGateway: {
    type: Array,
    trim: true
  },
  fulfillmentStatus: {
    type: String,
    trim: true
  },
  tags: {
    type: String,
    trim: true
  },
  contactEmail: {
    type: String,
    trim: true
  },
  orderStatusUrl: {
    type: String,
    trim: true
  },
  fulfillments: {
    type: Array,
    trim: true
  },
  refunds: {
    type: Array,
    trim: true
  },
  shippingLines: Schema.Types.Mixed,
  billingAddress: Schema.Types.Mixed,
  shippingAddress: Schema.Types.Mixed,
  customer: Schema.Types.Mixed,
  cancelReason: {
    type: String,
    trim: true
  },
  cancelledAt: {
    type: Date,
    trim: true
  },
  shopifyOrderDate: {
    type: Date,
    trim: true
  },
  shopifyOrderUpdateDate: {
    type: Date,
    trim: true
  },
  closedAt: {
    type: Date,
    trim: true
  },
  isDeleted: {
    type: Boolean,
    Default: false
  },
  image: {
    type: String,
    trim: true
  },
  moneyFormat: {
    type: String,
    trim: true
  }
}, {
  collection: 'vendorOrders',
  timestamps: true
});
/**
 * Statics
 */

orderSchema.statics = {
  /**
   * Find order by id
   *
   * @param {ObjectId} id
   * @api private
   */
  load: function load(_id) {
    return this.findOne({
      _id: _id
    }) // .populate('order', 'title vendorId')
    .exec();
  },

  /**
   * Find order row by data
   *
   * @param {Object} data
   * @api private
   */
  loadOne: function loadOne(data) {
    return this.findOne(data) // .populate('order', 'title vendorId')
    .exec();
  }
  /**
   * Function to update multiple docs
   *
   * @param {object} query
   * @param {object} data
   * @param {function} callback
   * @api private
   */
  // findAndModify(query, data, callback) {
  //   return this.collection.updateMany(query, { $set: data }, callback);
  // },

};
var VendorOrders = mongoose.model('VendorOrders', orderSchema);
module.exports = VendorOrders;
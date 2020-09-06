'use strict';
const {Service} = require('./Service');
const { User } = require('../models/User');
const autoBind = require('auto-bind');
const { HttpResponse } = require('../helpers/HttpResponse');

class UserService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
    autoBind(this);
  }


  async updatePassword(id,data) {
    try {
      let item = await this.model.findByIdAndUpdate(id, data, { new: true });
      return {passwordChanged:true};
    } catch (errors) {
      throw errors;
    }
  }

  /**
   *
   * @param email : string
   * @param includePassword : boolean
   * @returns {Promise<*>}
   */
  async findByEmail(email, includePassword = false) {
    return includePassword? this.model.findByEmail(email).select('+password') : this.model.findByEmail(email);
  }
};

module.exports = { UserService };

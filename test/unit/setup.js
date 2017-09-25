/* eslint-disable no-undef */

global.chai = require('chai')
global.should = require('chai').should()
global.expect = require('chai').expect
global.AssertionError = require('chai').AssertionError

const sinonChai = require('sinon-chai/lib/sinon-chai')

chai.use(sinonChai)

const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

chai.config.includeStack = true

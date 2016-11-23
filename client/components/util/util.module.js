'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('ngFullstackEs2015App.util', [])
  .factory('Util', UtilService)
  .name;

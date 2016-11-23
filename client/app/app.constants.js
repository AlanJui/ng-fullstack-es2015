'use strict';

import angular from 'angular';

export default angular.module('ngFullstackEs2015App.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;

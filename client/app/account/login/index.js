'use strict';

import angular from 'angular';
import LoginController from './login.controller';

export default angular.module('ngFullstackEs2015App.login', [])
  .controller('LoginController', LoginController)
  .name;

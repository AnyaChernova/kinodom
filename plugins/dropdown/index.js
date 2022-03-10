import Vue from 'vue';
import {dropdownDirective} from './src/dropdown-directive';
import DropdownComponent from './src/DropdownComponent.vue';
import './src/dropdown.scss';

Vue.component('Dropdown', DropdownComponent);
Vue.directive('dropdown', dropdownDirective);

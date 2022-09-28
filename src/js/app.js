import Manager from './Manager';
import Builder from './Builder';

const manager = new Manager();
const build = new Builder(manager);

build.init();
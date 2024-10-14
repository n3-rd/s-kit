#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const addComponent = require('./commands/addComponent');
const addRoute = require('./commands/addRoute');
const addLayout = require('./commands/addLayout');
const addError = require('./commands/addError');
const addServer = require('./commands/addServer');
const addStore = require('./commands/addStore');

const program = new Command();

program
  .name('s-kit')
  .description('CLI to add SvelteKit routes, components, and other file types')
  .version('1.0.0');

program.command('add')
  .argument('<component>', 'component name')
  .description('Add a new component')
  .action(addComponent);

program.command('route')
  .command('add')
  .argument('<route>', 'route name')
  .option('--no-server', 'Skip creating server file')
  .description('Add a new route')
  .action(addRoute);

program.command('layout')
  .argument('<name>', 'layout name')
  .description('Add a new layout')
  .action(addLayout);

program.command('error')
  .argument('<name>', 'error page name')
  .description('Add a new error page')
  .action(addError);

program.command('server')
  .argument('<name>', 'server route name')
  .description('Add a new server route')
  .action(addServer);

program.command('store')
  .argument('<name>', 'store name')
  .description('Add a new store')
  .action(addStore);

program.parse(process.argv);

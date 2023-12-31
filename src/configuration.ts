import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as _ from 'lodash';

const YAML_COMMON_CONFIG_FILE = 'config.yml';
const filePath = join(__dirname, '..', 'config', YAML_COMMON_CONFIG_FILE);

const envPath = join(
  __dirname,
  '..',
  'config',
  `config.${process.env.NODE_ENV || 'development'}.yml`,
);

const fileConfig = yaml.load(readFileSync(filePath, 'utf8'));
const envConfig = yaml.load(readFileSync(envPath, 'utf8'));

export default () => {
  return _.merge(fileConfig, envConfig);
};

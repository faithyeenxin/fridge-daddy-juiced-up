import { readFileSync } from 'fs';
import type { Config } from '@jest/types';

export default {
  process(
    src: string,
    filename: string,
    config: Config.ProjectConfig,
    options: any
  ) {
    return `export default = ${JSON.stringify(
      readFileSync(filename).toString('utf8')
    )};`;
  },
};

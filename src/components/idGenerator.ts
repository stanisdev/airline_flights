import config from '../config';
import { File } from './file';

export class IdGenerator {
  private file: File;

  constructor(
    private entity: string,
  ) {
    this.file = new File(config.files.id);
  }

  async id(): Promise<number> {
    let id: number = 0;
    let index: number = 0;

    const iter = this.file.read();
    for await (const line of iter) {
      const [entity, counter] = line.split(':');

      if (entity === this.entity) {
        id = +counter + 1;
        const replace = {
          value: `${entity}:${id}`,
          line: index,
        }
        await this.file.replace(replace);
        break;
      }
      index++;
    }
    return id;
  }
}
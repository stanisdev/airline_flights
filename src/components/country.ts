import config from '../config';
import { File } from './file';

export class Country {
  private file: File;

  constructor(private name: string) {
    this.file = new File(config.files.countries);
  }

  async find(): Promise<string | null> {
    const iter = this.file.read();

    for await (const line of iter) {
      if (line.includes('last')) {
        console.log(line);
        break;
      }
    }
    return '';
  }

  async add() {
    await this.file.write(this.name);
  }
}
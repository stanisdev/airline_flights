import config from '../config';
import { File } from './file';
import { IdGenerator } from './idGenerator';

export class Entity {
  private file: File;
  private idGenerator: IdGenerator;

  /**
   * Builder
   * @param name string
   */
  constructor(private name: string) {
    const filePath = config.files[name];
    this.file = new File(filePath);

    this.idGenerator = new IdGenerator(name);
  }

  /**
   * Find by an entity name
   * @param name string
   */
  async find(value: string): Promise<string | null> {
    const iter = this.file.read();
    let result: string | null = null;

    for await (const line of iter) {
      if (line.indexOf(value) > -1) {
        result = line;
        break;
      }
    }
    return result;
  }

  /**
   * Add a new entity
   * @param value string
   */
  async add(value: string) {
    if (await this.find(value) !== null) {
      throw new Error('Already exists');
    }
    const id = await this.idGenerator.id();
    await this.file.write(`${value}|${id}`);
  }
}
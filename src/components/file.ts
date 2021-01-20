import { promises as fsPromises, createReadStream } from 'fs';
const readline = require('readline');


export class File {
  constructor(private path: string) {}

  /**
   * Get readable stream and return
   * as an async generator
   */
  read(): IterableIterator<string> {
    const fileStream = createReadStream(this.path);

    return readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
  }

  /**
   * Add a string to the end of the file
   * @param data string
   */
  async write(data: string) {
    const filehandle = await fsPromises.open(this.path, 'r+');
    const { size: fileSize } = await filehandle.stat();
    
    await filehandle.write(`${data}\n`, fileSize);
    await filehandle.close();
  }
}
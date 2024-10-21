import { Injectable } from '@nestjs/common';
import { extname, join } from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import { imageSizes } from '@libs/models/src/lib/constants';
import sharp from 'sharp';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  private publicDirName = this.configService.get<string>('PUBLIC_STORAGE_PATH');

  constructor(private readonly configService: ConfigService) {}

  async uploadPublicFile(file: any): Promise<any> {
    const generatedUUID = uuidv4();
    const targetDir = join(this.publicDirName, generatedUUID);
    const fileExtension = extname(file.originalname);
    const newFileName = `original${fileExtension}`;
    const filePath = join(targetDir, newFileName);
    const sizesResp = new Map();

    mkdirSync(targetDir, { recursive: true });
    writeFileSync(filePath, file.buffer);
    sizesResp.set('original', filePath);

    for (const size of imageSizes) {
      const [key, value] = size;

      await sharp(file.buffer)
        .resize(value, value)
        .toFile(join(targetDir, `${key}${fileExtension}`))
        .then(() =>
          sizesResp.set(`${key}`, `${targetDir}/${key}${fileExtension}`)
        );
    }
    console.log('------------', sizesResp);

    return {
      message: 'Images uploaded and resized',
      sizes: Object.fromEntries(sizesResp),
    };
  }
}
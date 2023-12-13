import fs from 'fs';
import { dirname, join } from 'path';

export class ServerPageCacheHandler {

    constructor(private readonly storageFolderPath) {
    }

    save(path: string, page: string) {
        const computedPath = join(this.storageFolderPath, path);
        const parentFolder = dirname(computedPath);

        if (!fs.existsSync(parentFolder)) {
            fs.mkdirSync(parentFolder, { recursive: true });
        }

        try {
            fs.writeFileSync(computedPath, page);
        } catch (err) {
            console.error("Erreur lors de la création ou de l'écriture dans le fichier : ", err);
        }
    }
}
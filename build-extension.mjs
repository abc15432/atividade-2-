import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';

const dist = 'dist';

async function runBuild() {
    // 1. Limpa a pasta 'dist' se existir e a recria
    fs.rmSync(dist, { recursive: true, force: true });
    fs.mkdirSync(dist);

    // 2. Copia os arquivos essenciais (manifest.json, src/) para dist/
    for (const f of ['manifest.json']) fs.copyFileSync(f, path.join(dist, f));
    fs.cpSync('src', path.join(dist, 'src'), { recursive: true });

    // 3. Inicia o processo de criação do arquivo ZIP (extension.zip)
    const output = fs.createWriteStream(path.join(dist, 'extension.zip'));
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.directory(dist, false);
    archive.pipe(output);

    // Aguarda o processo terminar
    await new Promise((resolve, reject) => {
        output.on('close', resolve);
        archive.on('error', reject);
        archive.finalize(); 
    });

    console.log('Build gerado em dist/ e dist/extension.zip');
}

runBuild();
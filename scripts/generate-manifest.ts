// USO: npx tsx scripts/generate-manifest.ts

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

async function generateIcons() {
    let sharp;
    try {
        sharp = (await import('sharp')).default;
    } catch (e) {
        console.error('❌ Error: El paquete "sharp" no está instalado. Ejecuta: npm install sharp');
        process.exit(1);
    }

    const possibleExtensions = ['.svg', '.png', '.webp', '.jpg', '.jpeg'];
    let sourcePath = '';
    let foundExtension = '';

    const publicDir = join(process.cwd(), 'public');

    for (const ext of possibleExtensions) {
        const path = join(publicDir, `favicon${ext}`);
        if (existsSync(path)) {
            sourcePath = path;
            foundExtension = ext;
            break;
        }
    }

    // Si no encuentra favicon, buscamos al menos el logo
    if (!sourcePath) {
        const fallback = join(publicDir, 'pauloconde.webp');
        if (existsSync(fallback)) {
            sourcePath = fallback;
            foundExtension = '.webp';
        } else {
            console.error('❌ Error: No se encontró ningún archivo de origen (favicon.svg/png/webp o pauloconde.webp) en /public');
            process.exit(1);
        }
    }

    try {
        console.log(`🖼️  Generando iconos PWA desde ${sourcePath}...`);
        
        const imageBuffer = readFileSync(sourcePath);

        const iconsToGenerate = [
            { name: 'icon-192x192.png', size: 192 },
            { name: 'icon-512x512.png', size: 512 }
        ];

        for (const { name, size } of iconsToGenerate) {
            await sharp(imageBuffer)
                .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
                .png()
                .toFile(join(publicDir, name));
            console.log(`   ✅ Generado: public/${name} (${size}x${size})`);
        }

        console.log('🎉 Generación de iconos completada exitosamente.');
    } catch (error) {
        console.error('❌ Error procesando la imagen:', error);
    }
}

generateIcons();
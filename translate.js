import { translate } from 'bing-translate-api';
import fs from 'fs/promises';
import readline from 'readline';
import path from 'path';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// Progress bar oluşturma fonksiyonu
function createProgressBar(total) {
    const barLength = 30;
    let current = 0;

    return {
        update(value) {
            current = value;
            const percentage = (current / total) * 100;
            const filled = Math.round((barLength * current) / total);
            const bar = '█'.repeat(filled) + '-'.repeat(barLength - filled);
            process.stdout.write(`\rİlerleme: [${bar}] %${percentage.toFixed(1)} (${current}/${total})`);
        },
        finish() {
            process.stdout.write('\n');
        }
    };
}

// Paralel çeviri için yardımcı fonksiyon
async function translateBatch(texts) {
    const results = await Promise.all(
        texts.map(async (text) => {
            try {
                const result = await translate(text, 'en', 'tr');
                return result.translation;
            } catch (error) {
                console.error('\nÇeviri hatası:', error.message);
                return text;
            }
        })
    );
    return results;
}

async function processStringsFile(inputFile) {
    try {
        console.log(`\nDosya işleniyor: ${inputFile}`);

        // Dosyayı UTF-16LE olarak oku
        const content = await fs.readFile(inputFile, 'utf16le');
        const lines = content.split('\n');
        const translatedLines = [];
        const pattern = /"([^"]+)"\s*=\s*"([^"]+)";/;

        // Çevrilecek metinleri topla
        const textsToTranslate = [];
        const lineIndices = [];
        
        lines.forEach((line, index) => {
            if (line.includes('=') && line.includes('"')) {
                const match = line.match(pattern);
                if (match) {
                    textsToTranslate.push(match[2]);
                    lineIndices.push(index);
                }
            }
        });

        // Progress bar oluştur
        console.log(`\nToplam ${textsToTranslate.length} metin çevrilecek...`);
        const progressBar = createProgressBar(textsToTranslate.length);
        let processedCount = 0;

        // Metinleri 20'şerli gruplar halinde çevir
        const batchSize = 20;
        for (let i = 0; i < textsToTranslate.length; i += batchSize) {
            const batch = textsToTranslate.slice(i, i + batchSize);
            const translations = await translateBatch(batch);
            
            // Çevirileri yerleştir
            translations.forEach((translation, batchIndex) => {
                const lineIndex = lineIndices[i + batchIndex];
                const match = lines[lineIndex].match(pattern);
                if (match) {
                    const [_, key] = match;
                    lines[lineIndex] = `"${key}" = "${translation}";`;
                    processedCount += 1;
                    progressBar.update(processedCount);
                }
            });

            // Rate limiting için kısa bekleme
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        progressBar.finish();
        
        // Sonuçları UTF-16LE olarak kaydet
        await fs.writeFile(inputFile, lines.join('\n'), 'utf16le');
        console.log(`\nÇeviri tamamlandı! Sonuçlar ${inputFile} dosyasına kaydedildi.`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Hata: Dosya bulunamadı!');
        } else {
            console.error('Hata:', error.message);
        }
    }
}

async function findStringsFiles(directory) {
    const files = await fs.readdir(directory);
    return files.filter(file => file.endsWith('.strings'));
}

async function main() {
    try {
        const currentDir = process.cwd();
        const stringsFiles = await findStringsFiles(currentDir);
        
        console.log('Bulunan .strings dosyaları:');
        stringsFiles.forEach((file, index) => {
            console.log(`${index + 1}. ${file}`);
        });
        
        console.log('\nÇeviri işlemi başlıyor...');
        console.log(`Toplam ${stringsFiles.length} dosya işlenecek.\n`);
        
        for (const file of stringsFiles) {
            await processStringsFile(file);
        }
        
        console.log('\nTüm dosyaların çevirisi tamamlandı!');
        
    } catch (error) {
        console.error('Hata:', error.message);
    } finally {
        rl.close();
    }
}

main(); 
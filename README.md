# Affinity Designer Localizator - MACOS Strings Dosyası Çeviri Aracı
# Affinity Designer Localizator - MACOS Strings File Translation Tool

Bu araç, Affinity Designer ve diğer Affinity uygulamalarının MacOS sürümlerindeki `.strings` dosyalarındaki İngilizce metinleri otomatik olarak başka dillere çeviren bir Node.js uygulamasıdır.

This tool is a Node.js application that automatically translates English texts in `.strings` files of Affinity Designer and other Affinity applications' MacOS versions to other languages.

## Özellikler
## Features

- MacOS Affinity uygulamalarının `.strings` dosyalarını otomatik olarak tespit eder
- Bing Translate API kullanarak İngilizce'den başka dillere çeviri yapar
- Toplu çeviri işlemi için paralel işleme desteği
- Görsel ilerleme çubuğu ile işlem durumunu gösterir
- UTF-16LE kodlaması ile dosya okuma ve yazma desteği
- Rate limiting koruması
- Hata yönetimi ve raporlama

- Automatically detects `.strings` files of MacOS Affinity applications
- Translates from English to Turkish using Bing Translate API
- Parallel processing support for batch translation
- Visual progress bar to show process status
- UTF-16LE encoding support for file reading and writing
- Rate limiting protection
- Error handling and reporting

## Türkçeleştirilmiş dosyaları kullanma
## Using the Translated Files

- Affinity programlarını Türkçe kullanmak için Macos cihazınızda aşağıdaki adımları takip edin
- Macos üzerinde finderdan uygulamalar sekmesinde affinity programına sağ tıklayın.
- Paket içeriğini göstere tıklayın.
- Contents içinden resources olan klasöre girip resoruces içindeki tr.lproj dosyasını o klasöre yapıştırın.
- Geri gelin frameworks içinden `libcocoaui.framework` klasörüne girerek aynı şekilde `resources` içine libcocoaui.framework içindki tr.lproj klasörünü yapıştırın.
- Başka dillere çevirmek için translate.js programını bu iki ana klasördeki en.lproj dosyalarını kopyalayıp başka dilde yeniden isimlendirip translate.js i de içine atıp programı çalıştırarak çeviriyi tamamlayın. çevrilecek dili translate.js içinden düzenleyin.

- To use Affinity programs in Turkish on your MacOS device, follow the steps below
- Right-click on the Affinity program in the Applications section of Finder on MacOS.
- Click on 'Show Package Contents'.
- Enter the folder named 'resources' inside 'Contents' and paste the 'tr.lproj' file from resources into that folder.
- Go back and enter the 'libcocoaui.framework' folder inside 'frameworks', and similarly, paste the 'tr.lproj' folder from inside 'libcocoaui.framework' into 'resources'.
- To translate into other languages, copy the 'en.lproj' files from these two main folders, rename them to another language, place the 'translate.js' file inside, and run the program to complete the translation. Edit the language to be translated within 'translate.js'.

## Gereksinimler
## Requirements

- Node.js (v12 veya üzeri)
- npm (Node Package Manager)

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Kurulum
## Installation

1. Projeyi klonlayın:
1. Clone the project:
```bash
git clone https://github.com/faltuan/Affinity-Designer-localizator.git
cd Affinity-Designer-localizator
```

2. Gerekli paketleri yükleyin:
2. Install required packages:
```bash
npm install
```

## Kullanım
## Usage

1. Çevirmek istediğiniz `.strings` dosyalarını programın bulunduğu dizine kopyalayın.
1. Copy the `.strings` files you want to translate to the program directory.

2. Programı çalıştırın:
2. Run the program:
```bash
node translate.js
```

3. Program otomatik olarak:
3. The program automatically:
   - Paket içindeki resources içindeki en.lprj içindeki tüm `.strings` dosyalarını tespit eder
   - Her dosyadaki İngilizce metinleri otomatik olarak sıradan Türkçe'ye çevirir
   - Çevirileri orijinal dosyalara kaydeder

   - Detects all `.strings` files in the en.lprj folder inside the resources package
   - Automatically translates English texts to Turkish
   - Saves translations to original files

## Teknik Detaylar
## Technical Details

- Program, dosyaları 20'şer metinlik gruplar halinde işler
- Her çeviri grubu arasında 100ms bekleme süresi vardır (rate limiting)
- Dosyalar UTF-16LE formatında okunur ve yazılır
- Çeviri işlemi sırasında orijinal anahtar değerleri korunur

- Program processes files in groups of 20 texts
- There is a 100ms delay between translation groups (rate limiting)
- Files are read and written in UTF-16LE format
- Original key values are preserved during translation

## Hata Durumları
## Error Cases

Program şu hata durumlarını yönetir:
The program handles the following error cases:
- Dosya bulunamama durumu / File not found
- Çeviri API hataları / Translation API errors
- Dosya okuma/yazma hataları / File read/write errors

## Lisans
## License

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.
This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

## İletişim ve Destek
## Contact and Support

t.me/tasarimatolyesi grubuna katılarak sorularınızı sorabilir ve ücretsiz diğer kaynaklardan yararlanabilirsiniz.
You can join t.me/tasarimatolyesi group to ask your questions and benefit from other free resources.

Tüm hakları t.me/falquan kişisine aittir. Para ile satılamaz ve kaynak gösterilmeden yayınlanamaz.
All rights belong to t.me/falquan. It cannot be sold for money and cannot be published without proper attribution.

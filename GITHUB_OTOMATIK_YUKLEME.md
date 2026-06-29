# Otomatik GitHub Yükleme

Bu pakette manuel `git` komutu yazman gerekmez.

## İlk yayın

1. ZIP dosyasını normal bir klasöre çıkart.
2. **`BASLAT_GITHUB_YUKLE.bat`** dosyasına çift tıkla.
3. Git veya GitHub CLI eksikse script bunları `winget` ile kurar.
4. Tarayıcı açıldığında GitHub hesabına giriş yap.
5. Depo adını sorunca Enter'a basarsan `pink-fashion-studio` kullanılır.
6. Script depoyu oluşturur, tüm dosyaları yollar, GitHub Pages'i ayarlar ve Actions sayfasını açar.

## Sonraki güncellemeler

Projede değişiklik yaptıktan sonra **`GITHUBA_GUNCELLE.bat`** dosyasına çift tıkla. Script değişiklikleri commitler ve `main` dalına gönderir. Pages yayını otomatik başlar.

## Oluşturulan adresler

- Depo: `https://github.com/KULLANICI_ADI/pink-fashion-studio`
- Oyun: `https://KULLANICI_ADI.github.io/pink-fashion-studio/`

## Güvenlik

- GitHub şifresi script içine yazılmaz.
- Giriş, GitHub'ın resmi `gh auth login --web` akışıyla yapılır.
- Kimlik bilgileri GitHub CLI tarafından Windows kimlik deposunda tutulur.
- Script, geçmişi farklı olan mevcut bir deponun üzerine zorla yazmaz.

## Sorun olursa

Klasörde oluşan `github-upload.log` dosyasındaki son hata mesajını kontrol et. Bu dosya `.gitignore` içinde olduğu için GitHub'a yüklenmez.

## Sürüm 1.0.2 düzeltmesi

İlk çalıştırmada henüz `origin` uzak deposu yokken oluşan `No such remote 'origin'` hatası giderildi. Ayrıca repo/Pages sorgularındaki beklenen başarısızlıklar ile `git push` stderr çıktısının yanlışlıkla kritik hata sayılması önlendi.


## v1.0.3 Windows PowerShell uyumluluk duzeltmesi

- BAT dosyalarindaki UTF-8 BOM kaldirildi.
- PowerShell scripti ASCII-only olarak yeniden yazildi.
- Akilli tirnak ve kesme isaretlerinin parser hatasi olusturmasi engellendi.
- Origin remote yokken ilk yayin akisi duzeltildi.
- Onceki basarisiz denemeden kalan `.git` klasoru silinmeden devam edilebilir.

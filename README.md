# BEKA BANKIST APP

## Canlı versiyon : <a href="">BEKA BANKIST</a>

- React js vite ile oluşturduğum bu uygulama, Beka Bankist i tanıtmak için web sitesi, işlemleri gerçekleştirmek için uygulama kısmı olmak üzere 2 kısımdan oluşan, kullanıcıların tek bir uygulama üzerinden farklı banka hesapları açarak transfer, kredi çekme, para yükleme ve para çekme işlemlerini yapabileceği bir uygulamadır.

## 📝Proje Özellikleri:

- Proje dark ve light moda sahip olarak oluşturuldu.
- Dil desteği eklendi.
- Kullanıcı, uygulamaya tanıtım sayfasından erişebilir.
- Kullanıcı, uygulamayı kullanabilmek için hesap oluşturmalıdır.
- Hesap oluşturulduktan sonra kullanıcı uygulamaya giriş yapar.
- Banka işlemlerini gerçekleştirebilmek için banka hesabı oluşturulmalıdır.
- İsteğe bağlı olarak birden fazla banka hesabı oluşturulabilir.
- Banka hesabını oluşturmak isteyen müşteriden ad, soyad, tc kimlik numarası, doğum tarihi, adres, banka adı, banka şube adı ve cep telefonu numarası istenmektedir.
- Banka hesabını oluşturmak isteyen kullanıcı 18 yaşından kuçük olmamalıdır. Banka hesabı açılış bilgilendirme ve onay formu okunarak onaylanmalıdır aksi takdirde banka hesabı oluşturulamaz.
- Açılan banka hesabına ait banka adı, banka şube adı, iban ve hesap numarası oluşturulur ve müşteriye hesaplar sayfasında gösterilir.
- İşlemler sayfasında müşteri transfer, kredi çekme talebi, para yükleme ve para çekme işlemlerini gerçekleştirebilir.
- Müşterinin isteğine bağlı olarak, alıcı hesabını kaydedebilir ve bir sonraki transfer işleminde kullanabilir.
- Transfer işlemi alıcı hesabın iban ya da hesap numarası ile gerçekleştirilir. Eğer daha önceki işlemlerden kayıtlı bir alıcı var ise kayıtlı alcıyı seçerek de transfer işlemini gerçekleştirebilir.
- Transfer işleminde müşteri, hesaplarından bir tanesini seçerek işlemine devam edebilir. Seçtiği hesapta bakiyesi yoksa, göndereceği miktar bakiyesinden veya günlük transfer limitinden fazla ise işlem gerçekleştirilemez.
- Günlük transfer limiti 24 saat sonra (her gün saat 00.00 da) yenilenir.
<!-- - Seçilen ileri bir tarihte transfer işlemi otomatik olarak gerçekleştirilebilir.-->
- Kredi çekme talebi daha önce yapılmış ise aynı hesaptan tekrar talepte bulunulamaz. Ödeme yapıldığı takdirde yeni kredi çekme talebinde bulunulabilir.
- Kredi talebinde bulunan müşterinin kişisel, hesap, mesleki, toplam gelir ve gider, kredi çekme nedeni ve ne kadar çekmek istediği hakkındaki bilgileri alınır.
<!-- - Kredi talebinde bulunabilmek için müşterinin telefonundan onaylanmalıdır.-->
- Kredi ödeme planı 12-24-36-48-60 ay olarak seçilebilir. Seçilen plana göre maximum talep edilebilecek miktar müşteriye sunulur ve müşteri ona göre talepte bulunabilir.
- Para yükleme ve çekme kısmmında günlük limit göz önünde bulundurularak seçilen hesaba para yüklenebilir ve çekilebilir. Günlük para yükleme ve çekme limitleri 24 saat sonra (her gün saat 00.00 da) yenilenir.
- Hareketler kısmında transfer, para çekme ve para yükleme işlemlerinin geçmiş kayıtları müşteriye gösterilir.
- Müşteri hareket geçmişini detaylı olarak inceleyebilir ve makbuzunu oluşturarak pdf şeklinde indirebilir veya mailine gönderebilir.
- Ayarlar sayfasında kullanıcı profil fotoğrafı ekleyebilir, email ini, telefon numarasını, şifresini, adresini güncelleyebilir.

# 🛠 Kullanılan Teknolojiler:

- React JS
- Router
- Material UI
- Styled Components
- Sass
- React Hook Form
- Yup
- Supabase
- Reactstrap
- Tanstack Query
- Date-fns
- React Swipeable Views
- React to-pdf
- React toastify
- Prop types

# Kullanılan React Özellikleri :

- Yeni verilerin database işlenmesi ve var olan verilerin güncellenmesi veya silinmesi için tanstack query nin sağladığı useMutation hookunu kullandım. Böylece devam eden asenkron işlemler hakkında kullancıyı bilgilendirdim (loader gibi).
- Database de var olan verileri getirmek ve kullanıcıya göstermek için tanstack query nin sağladığı useQuery hookunu kullandım. Böylece veriler gösterilmeye hazırlanana kadar kullanıcıyı bilgilendirdim (loader gibi).
- Tanstack query nin sağladığı useQueryClient hookunu kullanarak mutasyon işlemlerinin başarılı olduğu durumlarda cache deki verilerin yeniden doğrulanmasını ve sayfanın yeniden renderlanmasını sağladım.
  (Arayüzü database ile senkronize hale getirdim).
- Hesaba giriş yapıldığında veya hesap oluşturulduğunda programlı navigasyon ( programmatic navigation) yöntemi ile useNavigation hooku kullanarak hesaplar sayfasına yönlendirme yaptım.
- Önbelleği (cache) temizlemek için removeQueries i kullandım. Böylece her girişte hesaplar tekrar getirilebilir oldu.
- Stepler arası sorun yaşamamak adına trigger

- feat: add new feature
- fix: fix bug
- docs: update README.md
- style: fix formatting
- refactor: refactor code
- perf: improve performance
- chore: update dependencies
- revert: revert to commit 123456

npm i --legacy-peer-deps: ignore error

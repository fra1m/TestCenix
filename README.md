# Для запуска проекта, необходимо выполнить следующие шаги:

1. Склонировать репозиторий с api

   ```bash
   git clone git@github.com:fra1m/TestCenix.git

2. Установить зависимости

   ```bash
   yarn

# Ссылки и регионы для тестирования

## Ссылки

Вы можете использовать следующие ссылки для тестирования:

1. ```https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-3-2-950g--309202```
2. ```https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-2-5-950g--310778```
3. ```https://www.vprok.ru/product/makfa-makfa-izd-mak-spirali-450g--306739```
4. ```https://www.vprok.ru/product/greenfield-greenf-chay-gold-ceyl-bl-pak-100h2g--307403```
5. ```https://www.vprok.ru/product/chaykofskiy-chaykofskiy-sahar-pesok-krist-900g--308737```
6. ```https://www.vprok.ru/product/lavazza-kofe-lavazza-1kg-oro-zerno--450647```
7. ```https://www.vprok.ru/product/parmalat-parmal-moloko-pit-ulster-3-5-1l--306634```
8. ```https://www.vprok.ru/product/perekrestok-spmi-svinina-duhovaya-1kg--1131362```
9. ```https://www.vprok.ru/product/vinograd-kish-mish-1-kg--314623```
10. ```https://www.vprok.ru/product/eko-kultura-tomaty-cherri-konfetto-250g--946756```
11. ```https://www.vprok.ru/product/bio-perets-ramiro-1kg--476548```
12. ```https://www.vprok.ru/product/korkunov-kollektsiya-shokoladnyh-konfet-korkunov-iz-molochnogo-shokolada-s-fundukom-karamelizirovannym-gretskim-orehom-vafley-svetloy-orehovoy--1295690```
13. ```https://www.vprok.ru/product/picnic-picnic-batonchik-big-76g--311996```
14. ```https://www.vprok.ru/product/ritter-sport-rit-sport-shokol-tsel-les-oreh-mol-100g--305088```
15. ```https://www.vprok.ru/product/lays-chipsy-kartofelnye-lays-smetana-luk-140g--1197579```

## Регионы

Для тестирования можно использовать следующие регионы:

- ```Москва и область```
- ```Санкт-Петербург и область```
- ```Владимирская обл.```
- ```Калужская обл.```
- ```Рязанская обл.```
- ```Тверская обл.```
- ```Тульская обл.```

## Пример использования

Для тестирования ссылок и регионов используйте следующую команду:

```bash
node index.js <url> "<region>"
node index.js https://www.vprok.ru/product/domik-v-derevne-dom-v-der-moloko-ster-3-2-950g--309202 "Санкт-Петербург и область"
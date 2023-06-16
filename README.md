# Parcel template

Цей проєкт був створений за допомогою Parcel. Для ознайомлення та налаштування
додаткових можливостей [звернись до документації](https://parceljs.org/).

## Підготовка нового проєкту

1. Переконайся, що на комп'ютері встановлена LTS-версія Node.js.
   [Завантаж та встанови](https://nodejs.org/en/) її, якщо необхідно.
2. Склонуй цей репозиторій.
3. Зміни назву папки з `parcel-project-template` на назву свого проєкту.
4. Створи новий порожній репозиторій на GitHub.
5. Відкрий проєкт у VSCode, запусти термінал та пов'яжи проєкт з
   GitHub-репозиторієм
   [за інструкцією](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories#changing-a-remote-repositorys-url).
6. Встанови залежності проєкту у терміналі за допомогою команди `npm install`.
7. Запусти режим розробки, виконавши команду `npm start`.
8. Відкрий браузер і перейди за адресою
   [http://localhost:1234](http://localhost:1234). Ця сторінка буде автоматично
   перезавантажуватися після збереження змін у файлах проєкту.

## Файли та папки

- Усі фрагменти(паршали/partials) файлів стилів повинні знаходитись у папці
  `src/sass` та бути імпортованими до файлів стилів сторінок. Наприклад, для
  `index.html` файл стилів називається `index.scss`.
- Зображення додавай у папку `src/images`. Збірник оптимізує їх, але тільки при
  розгортанні продакшн-версії проєкту. Це відбувається в облаці, щоб не
  навантажувати твій комп'ютер, оскільки на слабких машинах це може зайняти
  багато часу.

## Деплой

Для налаштування деплою проєкту потрібно виконати декілька додаткових кроків при
налаштуванні свого репозиторію. Перейди в розділ `Settings` твого репозиторію на
GitHub та у підрозділі `Actions` обери пункт `General`.

![GitHub actions settings](./assets/actions-config-step-1.png)

Прокрути сторінку до останньої секції та переконайся, що обрані опції, як на
наступному зображенні, а потім натисни `Save`. Без цих налаштувань у збірки буде
недостатньо прав для автоматизації процесу деплоя.

![GitHub actions settings](./assets/actions-config-step-2.png)

Продакшн-версія проєкту буде автоматично збиратися та деплоїтися на GitHub Pages
у гілку `gh-pages`, кожного разу, коли оновлюється гілка `main`. Наприклад,
після прямого пушу або прийнятого пул-реквесту. Для цього необхідно у файлі
`package.json` відредагувати поле `homepage` та скрипт `build`, замінивши
`your_username` і `your_repo_name` на свої значення, та відправити зміни на
GitHub.

```json
"homepage": "https://your_username.github.io/your_repo_name/",
"scripts": {
  "build": "parcel build src/*.html --public-url /your_repo_name/"
},
```

Далі потрібно перейти до налаштувань GitHub-репозиторія (`Settings` > `Pages`)
та встановити роздачу продакшн-версії файлів з папки `/root` у гілці `gh-pages`,
якщо цього не було зроблено автоматично.

![GitHub Pages settings](./assets/repo-settings.png)

### Статус деплоя

Статус деплоя крайнього(останнього) коміту відображається іконкою поруч з його
ідентифікатором.

- **Жовтий колір** - виконується збірка та деплой проєкту.
- **Зелений колір** - деплой завершився успішно.
- **Червоний колір** - під час лінтингу, збірки або деплою сталася помилка.

Більш детальну інформацію про статус можна переглянути, клацнувши на іконку
статусу та перейшовши за посиланням `Details` у спливаючому вікні.

![Deployment status](./assets/status.png)

### Жива сторінка

Через певний час, зазвичай декілька хвилин, живу сторінку можна переглянути за
адресою, зазначеною у відредагованому полі `homepage`. Наприклад, ось посилання
на живу версію для цього репозиторію
[https://goitacademy.github.io/parcel-project-template](https://goitacademy.github.io/parcel-project-template).

Якщо сторінка відкривається порожньою, переконайся, що у вкладці `Console` немає
помилок, пов'язаних із неправильними шляхами до CSS та JS файлів проєкту
(**404**). Ймовірно, у тебе неправильне значення властивості `homepage` або
скрипту `build` у файлі `package.json`.

## Як це працює

![How it works](./assets/how-it-works.png)

1. Після кожного пушу до гілки `main` GitHub-репозиторію, запускається
   спеціальний скрипт (GitHub Action) з файлу `.github/workflows/deploy.yml`.
2. Усі файли репозиторію копіюються на сервер, де проєкт ініціалізується та
   проходить збірку перед деплоєм.
3. Якщо всі кроки пройшли успішно, зібрана продакшн-версія файлів проєкту
   відправляється в гілку `gh-pages`. У іншому випадку в лозі виконання скрипта
   буде зазначено в чому проблема.

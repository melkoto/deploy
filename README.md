# Deploy

## Development

### Создание базы данных в PostgreSQL
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Запуск приложения Express
```bash
npm run dev
```

### Запуск приложения React
```bash
npm run dev
```

## Production

### Первое развертывание приложения Express, React и PostgreSQL на сервере

#### Установите Git
```bash
sudo apt update
sudo apt install git
```

#### Установите Docker
```bash
sudo apt-get update && \
sudo apt-get install -y ca-certificates curl && \
sudo install -m 0755 -d /etc/apt/keyrings && \
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc && \
sudo chmod a+r /etc/apt/keyrings/docker.asc && \
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && \
sudo apt-get update && \
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin && \
sudo systemctl start docker && \
sudo systemctl enable docker && \
docker --version && \
docker compose version

```

#### Установите Docker Compose
```bash
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

#### Установите make
```bash
sudo apt-get update
sudo apt-get install make
```

#### Склонируйте репозиторий
```bash
git clone https://github.com/${YOUR_USERNAME}/${PROJECT_NAME}.git
cd ${PROJECT_NAME}
```

#### Добавьте .env файл в /backend и /frontend
##### /backend/.env
```env
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST=postgres
POSTGRES_DB_PORT=
```
##### /frontend/.env
```env
VITE_REACT_APP_API_URL=
```

#### Запустите приложения
```bash
docker compose up --build -d
```

#### Накатите миграции
```bash
docker compose exec express-app npx sequelize db:migrate
```

### Обновление приложений
#### Поднятьну изменения из Git и перезапустить сборку
```bash
git pull
docker compose up --build -d
```

#### Удалите неиспользуемые данные (контейнеры, образы и сети)
```bash
docker system prune -f
```

## Makefile
1. **Обновление кода из репозитория:**
    ```bash
    make update-code
    ```

2. **Пересборка и перезапуск контейнеров для dev окружения:**
    ```bash
    make build
    ```

3. **Очистка неиспользуемых данных (без удаления томов):**
    ```bash
    make clean
    ```

4. **Запуск всех миграций:**
    ```bash
    make migrate
    ```

5. **Запуск одной конкретной миграции:**
    ```bash
    make migrate MIGRATION_NAMES="20230101120000-create-users.js"
    ```

6. **Запуск нескольких конкретных миграций:**
    ```bash
    make migrate MIGRATION_NAMES="20230101120000-create-users.js 20230102120000-add-posts.js"
    ```

7. **Отмена последней миграции:**
    ```bash
    make migrate-undo
    ```

8. **Отмена конкретной миграции:**
    ```bash
    make migrate-undo MIGRATION_NAME="20230101120000-create-users.js"
    ```

9. **Отмена всех миграций:**
    ```bash
    make migrate-undo-all
    ```

10. **Отмена всех миграций до конкретной:**
    ```bash
    make migrate-undo-all MIGRATION_NAME="20230101120000-create-users.js"
    ```

11. **Полный процесс: обновление кода, пересборка и безопасная очистка (CleanUpdateBuild):**
    ```bash
    make cub
    ```

## Команды Docker
### Показать список всех запущенных контейнеров
```bash
docker ps
```
### Следить за логами всех контейнеров в реальном времени
```bash
docker compose logs -f
```

### Просмотреть логи только одного сервиса
```bash
docker compose logs <service_name>
```

### Следить за логами сервиса frontend в режиме реального времени
```bash
docker compose logs -f frontend
```

### Посмотреть логи за последние n строк (например, 100 строк)
```bash
docker compose logs --tail 100
```

### Посмотреть последние 100 строк логов сервиса frontend
```bash
docker compose logs --tail 100 frontend
```
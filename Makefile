# Определение целей
.PHONY: update-code build clean migrate migrate-undo migrate-undo-all cub

# Обновление кода из репозитория
update-code:
	git pull

# Пересборка и перезапуск контейнеров для dev окружения
build:
	docker-compose up --build -d

# Очистка неиспользуемых данных (без удаления томов)
clean:
	docker system prune -f

# Миграция базы данных с условием
migrate:
	@if [ -z "$(MIGRATION_NAMES)" ]; then \
		# Если переменная MIGRATION_NAMES не установлена, выполняем все миграции
		echo "Запуск всех миграций"; \
		docker-compose exec express-app npx sequelize db:migrate; \
	else \
		# Если переменная MIGRATION_NAMES установлена, выполняем указанные миграции
		echo "Запуск указанных миграций"; \
		for migration in $(MIGRATION_NAMES); do \
			echo "Запуск миграции: $$migration"; \
			docker-compose exec express-app npx sequelize db:migrate --name $$migration; \
		done; \
	fi

# Отмена последней миграции
migrate-undo:
	@if [ -z "$(MIGRATION_NAME)" ]; then \
		# Если переменная MIGRATION_NAME не установлена, отменяем последнюю миграцию
		echo "Отмена последней миграции"; \
		docker-compose exec express-app npx sequelize-cli db:migrate:undo; \
	else \
		# Если переменная MIGRATION_NAME установлена, отменяем указанную миграцию
		echo "Отмена миграции: $(MIGRATION_NAME)"; \
		docker-compose exec express-app npx sequelize-cli db:migrate:undo --name $(MIGRATION_NAME); \
	fi

# Отмена всех миграций
migrate-undo-all:
	@if [ -z "$(MIGRATION_NAME)" ]; then \
		# Если переменная MIGRATION_NAME не установлена, отменяем все миграции
		echo "Отмена всех миграций"; \
		docker-compose exec express-app npx sequelize-cli db:migrate:undo:all; \
	else \
		# Если переменная MIGRATION_NAME установлена, отменяем все миграции до указанной
		echo "Отмена всех миграций до: $(MIGRATION_NAME)"; \
		docker-compose exec express-app npx sequelize-cli db:migrate:undo:all --name $(MIGRATION_NAME); \
	fi

# Полный процесс: обновление кода, пересборка и безопасная очистка (CleanUpdateBuild)
cub: update-code build clean

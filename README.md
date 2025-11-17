# PROGIII API (Express + MySQL, sin ORM)

> Cumple con: autenticación JWT, autorización por roles, soft delete, validaciones, Swagger, procedimientos almacenados para estadísticas y exportes CSV/PDF. **Sin Sequelize u otros ORMs**.

## Instalación

```bash
cp .env.example .env
npm install
# Crear base y datos:
mysql -u root -p < src/sql/schema.sql
mysql -u root -p reservas < src/sql/procedures.sql
npm run dev
```

## Estructura

- `src/config/db.js` pool MySQL.
- `src/middlewares` JWT, roles, manejo de errores, validación.
- `src/repositories` consultas SQL puras por entidad (patrón repository).
- `src/controllers` lógica HTTP (no SQL directo).
- `src/routes` rutas por recurso.
- `src/services` reportes (CSV/PDF), notificaciones.
- `src/docs/swagger.yaml` documentación.
- `src/sql/schema.sql` tablas, `procedures.sql` SPs.
- **No subir `node_modules/` al repositorio**.

---

## ✅ Checklist de evaluación (10/10)

- [x] **Sin ORMs** (SQL puro con mysql2/promise)
- [x] **Arquitectura por capas** (routes → controllers → repositories → DB)
- [x] **JWT + Roles** (1 cliente, 2 empleado, 3 admin)
- [x] **Validaciones** con express-validator
- [x] **Soft delete** (`activo=0`)
- [x] **SP de estadísticas** (`sp_reservas_por_mes`)
- [x] **Reportes** CSV/PDF
- [x] **Swagger** /api/docs
- [x] **Auditoría** con triggers
- [x] **Recordatorios 24h** via endpoint /cron (para CRON)
- [x] **Cálculo de precios server-side**
- [x] **Notificaciones email** a cliente y admin
- [x] **Seeds** de ejemplo
- [x] **Postman collection**
- [x] **Docker / docker-compose**

## CRON de recordatorios

Ejemplo crontab (cada día a las 00:05):

```
5 0 * * * curl -s -H "Authorization: Bearer <TOKEN_ADMIN>" http://localhost:3000/api/cron/send-reminders?hours=24
```

## Seeds

```
mysql -u root -p reservas < src/sql/seed.sql
mysql -u root -p reservas < src/sql/audit.sql
```

## Migración MD5 → bcrypt

```
node scripts/migrate_md5_to_bcrypt.js
```

## ROOT

Solo se usa root para los comandos manuales (creación inicial), y la app se conecta con reservas_app

# 📘 Employment API – Documentación

**Autor:** Jaime Duffy Panés  
**Base URL:** `/employment-data`

API REST para consultar y gestionar datos españoles de empleo por comunidad autónoma, año y nivel educativo.

---

## 🔁 Cargar datos iniciales

### `GET /employment-data/loadInitialData`

Restaura la base de datos con el conjunto de datos iniciales .

---

## 📄 Obtener datos

### `GET /employment-data`

Devuelve todos los registros, con posibilidad de filtros y paginación.

**Parámetros query admitidos**:
- `autonomous_community`
- `education_level`
- `year`
- `from`, `to`
- `activity_rateMin`, `activity_rateMax`
- `employment_rateMin`, `employment_rateMax`
- `unemployment_rateMin`, `unemployment_rateMax`
- `limit`, `offset`

**Ejemplos de uso**:
```
GET /employment-data?autonomous_community=Madrid
GET /employment-data?from=2020&to=2022&education_level=SUP
GET /employment-data?employment_rateMin=60&employment_rateMax=75
GET /employment-data?limit=5&offset=10
```

---

### `GET /employment-data/:autonomous_community`

Devuelve todos los registros de una comunidad autónoma.

**Parámetros query admitidos**:
- `year`, `from`, `to`
- `education_level`
- `activity_rateMin`, `activity_rateMax`
- `employment_rateMin`, `employment_rateMax`
- `unemployment_rateMin`, `unemployment_rateMax`
- `limit`, `offset`

**Ejemplos de uso**:
```
GET /employment-data/Andalucía
GET /employment-data/Andalucía?year=2022
GET /employment-data/Andalucía?education_level=SEC
GET /employment-data/Andalucía?employment_rateMin=55
```

---

### `GET /employment-data/:autonomous_community/:year`

Devuelve todos los datos de empleo de los niveles educativos para una comunidad en un año determinado. Admite filtros por tasas y nivel educativo.

**Parámetros query admitidos**:
- `education_level`
- `activity_rateMin`, `activity_rateMax`
- `employment_rateMin`, `employment_rateMax`
- `unemployment_rateMin`, `unemployment_rateMax`

**Ejemplos de uso**:
```
GET /employment-data/Cataluña/2021
GET /employment-data/Cataluña/2021?education_level=INF
GET /employment-data/Cataluña/2021?unemployment_rateMax=12
```

---

### `GET /employment-data/:autonomous_community/:year/:education_level`

Devuelve un recurso específico identificado por comunidad, año y nivel educativo.

---

## ➕ Crear datos

### `POST /employment-data`

Añade un nuevo registro a la base de datos. Requiere de todos los parámetros.

---

## ✏️ Actualizar datos

### `PUT /employment-data/:autonomous_community/:year/:education_level`

Actualiza las tasas de un recurso existente. **No permite modificar los identificadores**. Solo se deben enviar los tres valores numéricos.

---

## 🗑️ Eliminar datos

### `DELETE /employment-data`

Elimina todos los recursos o aquellos que coincidan con los filtros especificados.

**Parámetros query admitidos**:
- `autonomous_community`
- `education_level`
- `year`

**Ejemplos de uso**:
```
DELETE /employment-data
DELETE /employment-data?autonomous_community=Madrid
DELETE /employment-data?year=2021
DELETE /employment-data?autonomous_community=Andalucía&education_level=SEC
```

---

### `DELETE /employment-data/:autonomous_community/:year/:education_level`

Elimina un único recurso identificado por comunidad, año y nivel educativo. No admite parámetros query.

---

## 📎 Redirección a documentación visual (Postman)

### `GET /employment-data/docs`

Redirige a la documentación visual de la API en Postman:
```
https://documenter.getpostman.com/view/42370803/2sAYkLkbwf
```

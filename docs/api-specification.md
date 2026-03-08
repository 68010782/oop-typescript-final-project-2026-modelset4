# API Specification

เอกสารระบุรายละเอียดทางเทคนิตของ REST API ทั้งหมดของ Task-Project Trasking ที่พัฒนาด้วย NestJS

---

## 1. Project management endpoints

### 1.1 Get All Projects
- **Method:** `GET`
- **Endpoint:** `/projects`
- **Description:** ดึงข้อมูลโปรเจคทั้งหมด
- **example success response :(200 Projects retrieved successfully)**
```json
[
    {
        "success": true,
        "message": "Projects retrieved successfully",
        "data": [
            {
                "id": 1,
                "name": "Project Management System",
                "status": "active"
            }
        ]
    }
]
```

### 1.2 Create Project
- **Method:** `POST`
- **Endpoint:** `/projects`
- **Description:** สร้างโปรเจคใหม่
- **request body:**
```json
[
    {
        "name": "Project Management System",
        "description": "Backend system for managing    projects",
        "status": "active",
        "startDate": "2026-01-01",
        "deadline": "2026-12-31",
        "owner": "John Doe",
        "budget": 50000,
        "priority": "high",
        "category": "Software Development"
    }
]
```
- **example success response:(201 Project created successfully)**
```json
[
    {
        "name": "Project Management System",
        "description": "A backend system for managing projects and tasks",
        "status": "active",
        "startDate": "2026-01-01",
        "deadline": "2026-12-31",
        "owner": "John Doe",
        "budget": 50000,
        "priority": "high",
        "category": "Software Development",
        "createdAt": "2026-03-08"
    }
]
```

### 1.3 Get Project by ID
- **Method:** `GET`
- **Endpoint:** `/projects/{id}`
- **Description:** ดึงข้อมูลโปรเจคด้วย id
- **example success response :(200 Project retrieved successfully)**
```json
[
    {
        "success": true,
        "message": "Project retrieved successfully",
        "data": {
        "id": 1,
            "name": "Project Management System",
        "status": "active"
        }
    }
]
```

### 1.4 Put Project by id
- **Method:** `PUT`
- **Endpoint:** `/projects/{id}`
- **Description:** อัพเดตข้อมูลโปรเจค
- **request body:**
```json
[
    {
        "name": "Project Management System",
        "description": "A backend system for managing projects and tasks",
        "status": "active",
        "startDate": "2026-01-01",
        "deadline": "2026-12-31",
        "owner": "John Doe",
        "budget": 50000,
        "priority": "high",
        "category": "Software Development",
        "createdAt": "2026-03-08"
    }
]
```
- **example success response :(200 Project updated successfully)**
```json
[
    {
        "name": "Project Management System",
        "description": "A backend system for managing projects and tasks",
        "status": "active",
        "startDate": "2026-01-01",
        "deadline": "2026-12-31",
        "owner": "John Doe",
        "budget": 50000,
        "priority": "high",
        "category": "Software Development",
        "createdAt": "2026-03-08"
    }
]
```

### 1.5 Patch project by id
- **Method:** `PATCH`
- **Endpoint:** `/projects/{id}`
- **Description:** อัพเดตข้อมูลโปรเจคบางส่วน
- **request body:**
```json
[
    {
        "name": "New Project Name"
    }
]
```
- **example success response :(200 Project updated successfully)**
```json
[
    {
        "success": true,
        "message": "Project updated partially",
        "data": {
        "id": 1,
        "name": "New Project Name"
        }
    }
]
```

### 1.6 Deleted project by id
- **Method:** `DELETE`
- **Endpoint:** `/projects/{id}`
- **Description:** ลบโปรเจค
- **request body:**
```json
[
    {
        "name": "New Project Name"
    }
]
```
- **example success response :(200 Project deleted successfully)**
```json
[
    {
        "success": true,
        "message": "Project deleted successfully"
    }
]
```
- **example error response :(400 Bad Request)**
```json
[
    {
        "statusCode": 400,
        "message": "Cannot delete project with existing tasks",
        "error": "Bad Request"
    }
]
```

## 2. Task management endpoints

### 2.1 Get All Tasks
- **Method:** `GET`
- **Endpoint:** `/tasks`
- **Description:** ดึงรายการ tasks ทั้งหมด หรือ filter ตาม projectId
- **Query Parameter** projectId => number => กรอง tasks ตาม project
- **example success response :(200 Project deleted successfully)**
```json
[
    
    {
        "id": 1,
        "title": "Design Database",
        "description": "Create ER diagram",
        "status": "todo",
        "projectId": 1
    }

]
```
- **example error response :(400 Bad Request)**
```json
[
    {
        "statusCode": 400,
        "message": "Cannot delete project with existing tasks",
        "error": "Bad Request"
    }
]
```

### 2.2 Create new task
- **Method:** `POST`
- **Endpoint:** `/tasks`
- **Description:** สร้าง task ใหม่
- **request body:**
```json
[
    {
        "title": "Design homepage",
        "description": "Create UI layout for homepage",
        "status": "todo",
        "priority": "high",
        "deadline": "2026-05-01",
        "assignedTo": "Alice",
        "projectId": 1,
        "createdAt": "2026-03-08",
        "updatedAt": "2026-03-08"
    }
]
```
- **example success response :(201 Task created successfully)**
```json
[
    {
        "id": 1,
        "title": "Design homepage",
        "description": "Create UI layout for homepage",
        "status": "todo",
        "priority": "high",
        "deadline": "2026-05-01",
        "assignedTo": "Alice",
        "projectId": 1,
        "createdAt": "2026-03-08",
        "updatedAt": "2026-03-08"
    }
]
```

### 2.3 Get Task by ID
- **Method:** `GET`
- **Endpoint:** `/tasks/{id}`
- **Description:** ดึงข้อมูล task ตาม id
- **example success response :(200 Task retrieved successfully)**
```json
[
    {
        "id": 1,
        "title": "Design Database",
        "description": "Create ER diagram",
        "status": "todo",
        "projectId": 1
    }
]
```

### 2.4 Update Task
- **Method:** `PUT`
- **Endpoint:** `/tasks`
- **Description:** อัพเดต task 
- **request body:**
```json
[
    {
        "title": "Update homepage design",
        "description": "Update UI layout",
        "status": "OPEN",
        "priority": "high",
        "deadline": "2026-05-01",
        "assignedTo": "Alice",
        "projectId": 1,
        "createdAt": "2026-03-08",
        "updatedAt": "2026-03-08"
    }
]
```
- **example success response :(200 Task updated successfully)**
```json
[
    
]
```

### 2.5 Patch Task
- **Method:** `PATCH`
- **Endpoint:** `/tasks/{id}`
- **Description:** อัพเดตข้อมูลบางส่วนของ task
- **request body:**
```json
[
    {
        "title": "Update homepage design",
        "description": "Update UI layout",
        "status": "OPEN",
        "priority": "high",
        "deadline": "2026-05-01",
        "assignedTo": "Alice",
        "projectId": 1,
        "createdAt": "2026-03-08",
        "updatedAt": "2026-03-08"
    }
]
```
- **example success response :(200 Task updated successfully)**
```json
[
    {
        "id": 1,
        "title": "Update homepage design",
        "description": "Update UI layout",
        "status": "OPEN",
        "priority": "high",
        "deadline": "2026-05-01",
        "assignedTo": "Alice",
        "projectId": 1,
        "createdAt": "2026-03-08",
        "updatedAt": "2026-03-08"
    }
]
```

### 2.6 Delete task
- **Method:** `DELETE`
- **Endpoint:** `/tasks/{id}`
- **Description:** ลบ task ตาม id
- **example success response :(200 Task deleted successfully)**
```json
[
    {
        "success": true,
        "message": "Task deleted successfully"
    }
]
```
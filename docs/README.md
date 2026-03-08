# Project & Task Management API

## Project Overview

Project & Task Management API เป็นระบบ Backend ที่พัฒนาด้วย **NestJS** สำหรับจัดการข้อมูล **Project** และ **Task** ภายในระบบเดียวกัน โดย Task แต่ละรายการจะเชื่อมโยงกับ Project ที่เกี่ยวข้อง

ระบบถูกออกแบบในรูปแบบ **REST API** และใช้โครงสร้างแบบ **Modular Architecture ของ NestJS** เพื่อให้โค้ดมีความเป็นระเบียบและสามารถขยายระบบได้ง่ายในอนาคต

ฟีเจอร์หลักของระบบ

* สร้างและจัดการ Project
* สร้างและจัดการ Task ภายใน Project
* เชื่อมโยง Task กับ Project
* รองรับ REST API สำหรับการใช้งานกับ Frontend
* มี Unit Test และ End-to-End (E2E) Test สำหรับตรวจสอบการทำงานของระบบ

---

## 👥 Team Structure

1.Phichayaphon Namman : username : 68010782 รหัสนักศึกษา : 68010782
2.Wenus Sakaekhum : username : minivalley01 รหัสนักศึกษา : 68011036
3.Penpitcha Nuntago : username : penpitchanuntago รหัสนักศึกษา : 68010826

# Technology Stack

## 🛠 Technology Stack

* **Framework:** NestJS
* **Language:** TypeScript
* **API Style:** REST API
* **Database:** JSON-based (file-based หรือ in-memory)
* **API Documentation:** Swagger (OpenAPI)
* **Linting:** ESLint (TypeScript ESLint)

# วิธีการติดตั้งและรันโปรเจค

## 1. ติดตั้ง Node.js

ดาวน์โหลดและติดตั้งได้จาก

https://nodejs.org

ตรวจสอบการติดตั้ง

```
node -v
npm -v
```

---

## 2. Clone โปรเจค

```
git clone https://github.com/68010782/oop-typescript-final-project-2026-modelset4

```

---

## 3. ติดตั้ง Dependencies

```
npm install
```

---

## 4. รันโปรเจค

```
npm run start
```

หรือสำหรับ Development Mode

```
npm run start:dev
```

Server จะรันที่

```
http://localhost:3000
```

---

## 5. รัน Unit Test

```
npm run test
```

---

## 6. รัน End-to-End Test

```
npm run test:e2e
```

---

# โครงสร้างโปรเจคโดยสรุป

```
src
 ├── common 
 │   ├── interfaces
 │       ├── api-response.interface.ts
 ├── app.module.ts
 ├── main.ts
 ├── modules
 │   ├──project
 │      ├── project.controller.ts
 │      ├── project.controller.spec.ts
 │      ├── project.service.ts
 │      ├── project.service.ts.spec.ts
 │      ├── project.module.ts
 │      ├── project.interface.ts
 │      └── dto
 │          ├── create-project.dto.ts
 │          └── update-project.dto.ts
 │
 │    ├── tasks
 │       │── tasks.controller.ts
 │       ├── tasks.service.ts
 │       ├── tasks.module.ts
 │       ├── task.interface.ts
 │       └── dto
 │           ├── create-task.dto.ts
 │           └── update-task.dto.ts

test
 ├── project.e2e-spec.ts
 ├── api.e2e-spec.ts
 ├── app.e2e-spec.ts
 ├── jest-e2e.json
 └── tasks.e2e-spec.ts

docs
 ├── README.md
 ├── Data Model Documentation.md
 └── Uml.png
```

คำอธิบายโครงสร้าง

| Folder  | Description                 |
| ------- | --------------------------- |
| src     | โค้ดหลักของระบบ             |
| project | Module สำหรับจัดการ Project |
| tasks   | Module สำหรับจัดการ Task    |
| test    | ไฟล์ E2E Test               |
| docs    | เอกสารประกอบระบบ            |

---

# ลิงก์ไปยังเอกสารในโฟลเดอร์ docs

เอกสารเพิ่มเติมของโปรเจคสามารถดูได้ที่โฟลเดอร์ **docs/**

* Data Model Documentation
  `docs/Data Model Documentation.md`

* README.md
  `docs/README.md`

* Uml.png
  `docs/Uml.png`

---

# License

This project is created for educational purposes.

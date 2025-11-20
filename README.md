#  TinyLink – URL Shortener  
A full-stack URL shortener application built using **Node.js, Express, Prisma, MySQL, and plain HTML/CSS/JS**.  
TinyLink allows users to shorten URLs, track clicks, view stats, and manage links from a clean dashboard.

---

##  Features

### 🔹 Core Functionalities
- Create short links with optional custom codes  
- Redirect short URLs (e.g., `/abc123` → `https://google.com`)  
- Track click count  
- Track last clicked timestamp  
- Display all links in a dashboard  
- View detailed stats for each link  
- Delete links  
- Healthcheck endpoint with system details  

### 🔹 Frontend Features
- Built using **HTML + CSS + Vanilla JS**  
- Add new link form  
- Table view of all links   
- Stats button for each link  
- Health Check button (show/hide JSON system status)

### 🔹 Backend Features
- Express-based REST APIs  
- Prisma ORM for database operations  
- MySQL  

## 🏗️ Tech Stack

**Frontend**
- HTML  
- CSS  
- JavaScript  

**Backend** 
- Express.js  
- Prisma ORM  

**Database**
- MySQL 

**Deployment**
Sorry( I was getting error because of my system and my railway trial also expired) 

---

## 📁 Project Structure

tinylink/
├── index.js
├── prisma/
│ ├── schema.prisma
│ └── migrations/
├── src/
│ └── routes/
│ └── link.js
├── public/
│ ├── index.html
│ ├── stats.html
│ ├── styles.css
│ ├── main.js
│ └── stats.js
├── package.json
└── README.md

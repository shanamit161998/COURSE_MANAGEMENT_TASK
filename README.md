/* HOW TO RUN THE APPLICATION * /

STEP 1 : 

npm install 

STEP 2 : 

npm run dev


APP RUNNIN ON http://localhost:3000
--------------------------------------------------

DATABASE HOSTED ON AWS - RDS 

--------------------------------------------------

roleId = 1 = Admin  
roleId = 2 = SuperAdmin 
roleId = 3 = Employee

Email                  password      Role          Role Id
schbangq3@gmail.com    Laptop@123    Employee         3  
schbangq2@gmail.com    Laptop@123    Admin            1
schbangq1@gmail.com    Laptop@123    Super Admin      2


postman collection is inside artifacts folder  ./artifacts/postmancollection/.......

-------------------------------------------------

Task is to build course management system, where you will have to create three user roles, Super Admin, Admin and Employee, perform CRUD operation 

 Sign up - 
Create new Employee (name, email, password (encrypted), role )
By default, Employee

 Sign In - 
Sign in with email and password

 Admin - 
Create new course (title, description, video Url, topics array, duration, category, )
Update existing course (admin should able to add/delete part of the courses which potentially consists of pdfs, videos, and quizzes)
Delete Course

 Super Admin - 
Approve Created and updated course by admin (Note: Employee can only see course Approved by super Admin)

 Employee - 
View existing course (only if logged in and approved by super admin)
Use Token for login
Sort course category wise
Get rewards for progress/completion

 Testing - 
Make a frontend to test all the Api (optional)
Test all Api in Postman


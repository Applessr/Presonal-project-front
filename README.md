# Personal project Spanify
---
### env guide

PORT = 5000 

DATABASE = "mysql://u:pw@localhost:3306/cc18_fakebook"

JWT_SECRET

---
### Service

# API ENDPOINT GUIDELINE

<br>

# /user

| Name     | Endpoint  | Method | Request Body                                                                                                                                                         | Response Body                                                                                                                                    | Response Status Code | Remark           |
|----------|-----------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|------------------|
| Register | /register  | POST   | `{ email: "", password: "", confirmPassword: "", firstName: "", lastName: "", phone: "" }`                                                                           | `{ id: "", email: "", firstName: "", lastName: "", phone: "" }`                                                                                  | 201                  | สร้างบัญชีผู้ใช้งาน  |
| Login    | /login     | POST   | `{ email: "", password: "" }`                                                                                                                                       | `{ id: "", email: "", firstName: "", lastName: "", phone: "", accessToken: "" }`| 200                  | เข้าสู่ระบบได้       |

<hr>

<br>
<br>
<br>


# /account

| Name            | Endpoint        | Method | Request Body                                                                 | Response Body                                                                                                      | Response Status Code | Remark               |
|-----------------|-----------------|--------|------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|----------------------|----------------------|
| Create account  | /               | POST   | `{ accountTypeId: "", accountName: "", amount? }`                            | `{ id: "", userId: "", accountTypeId: "", accountName: "", amount: "", deletedAt: "" }`                            | 201                  | Authenticate token   |
| Get all accounts| /               | GET    | -                                                                            | `[ { id: "", userId: "", accountTypeId: "", accountName: "", amount: "", deletedAt: "" } ]`                        | 200                  | Authenticate token   |
| Update account  | /:accountId     | PATCH  | `{ accountTypeId?: "", accountName?: "", amount?: "" }`                      | `{ accountTypeId?: "", accountName?: "", amount?: "" }`                                                            | 200                  | Authenticate token   |
| Delete account  | /:accountId     | DELETE | -                                                                            | -                                                                                                                 | 204                  | ปิดการใช้งานบัญชีโดยไม่ได้ลบบัญชีจริง  |


<hr>

<br>
<br>
<br>

# /account/:accountId/transaction/

| Name                          | Endpoint        | Method | Request Body                                                                                                 | Response Body                                                                                                          | Response Status Code | Remark                          |
|-------------------------------|-----------------|--------|--------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|----------------------|---------------------------------|
| Create transaction             | /               | POST   | `{ senderId?, receiverId?, transactionType, amount, payeeName?, transactionDate?, description? }`             | `{ id, senderId?, receiverId?, transactionType, amount, payeeName?, transactionDate?, description? }`                  | 201                  | Authenticate token              |
| Get all transactions by account id | /               | GET    | -                                                                                                            | `[ {id, senderId?, receiverId?, transactionType, amount, payeeName?, transactionDate?, description? } ]`               | 200                  | ให้ดึงข้อมูล transaction ทั้งหมดตามแต่ละ account |
| Edit transaction               | /:transactionId | PUT    | `{ senderId, receiverId, amount, description, payerName, transactionType, transactionDate }`                 | `{ id, senderId?, receiverId?, transactionType, amount, payeeName? }`                                                  | 200                  | ให้อัปเดตตัวใดตัวหนึ่งหรือทั้งหมดก็ได้          |
| Delete transaction             | /:transactionId | DELETE | -                                                                                                            | -                                                                                                                     | 204                  |                                 |
<hr>

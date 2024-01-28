<img src="https://webassets.telerikacademy.com/images/default-source/logos/telerik-academy.svg" alt="logo" width="300px" style="margin-top: 20px;"/>

# QuizLab

- **Link to the hosted project**: [QuizLab](https://quizcraft-76a19.web.app/)

### 1. Project Description

QuizLab is a SPA serving as a platform for creating and managing educational resources, i.e. quizzes. 
It is implemented with JavaScript, React and Chakra UI.
Data layer is handled with Google Firebase Realtime Database and Google Cloud Storage.

<br>

### 2. Project information

- Language and version: **JavaScript ES2021**
- Platform and version: **Node 18.0+**
- Libraries: **React 18.2.0** and **Chakra UI 2.8.1**
- Database: **Firebase Realtime Database 10.5.2**

<br>

### 3. Instructions how to setup and run the project locally
- run _**npm install**_ from the console in the project path
- run _**npm run dev**_ on the same path

<br>

### 4. Goals

QuizLab allows users to:

- take a sample quiz as anonymous users
- register for the SPA or sign in to their account
- three-tier account system: Students, Educators, Admins with their separate dashboards
- Students can access public quizzes, get assigned / invited to a quiz, review their quizzes and results
- Educators can manage their quizzes, participate in educators' groups and see stats on their quizzes
- Admins can ban users (prevent them from logging into their accounts) and edit/delete any quiz

<br>

### 5. Full project view

The App is separated into three layers of access: Public, Private and Admin.
Their respective level of authorization is described below:

1. - [X] _**Public**_ <mark>**MUST do**</mark>:
   - access the Landing page and participate in a Sample Quiz
   - register and/or log in to their account
   - - see few of the most recent and popular public quizzes
2. - [X] _**Public**_ <mark>**SHOULD do**</mark>:
   - browse public quizzes
3. - [X] _**Public**_ <mark>**COULD do**</mark>:
   - see news and articles, i.e. any relevant information on the "feed"

---

4. - [X] _**Private**_ <mark>**MUST do**</mark>:
   - sign in and sign out to their account
   - have a different role: either Student (default) or Educator (upon verification)
   - update their profile (first name / last name / photo / address / phone number)
5. - [X] _**Private**_ <mark>**SHOULD do**</mark>:
   - username should **NOT** be editable
6. - [X] _**Private**_ <mark>**COULD do**</mark>:
   - upload photo on their profile

---

7. - [X] _**Admin**_ <mark>**MUST do**</mark>:
   - advanced search options (search by: name, email, username; list posts by author, date, etc. (sort and filter))
   - ban / lift ban
   - edit / delete any quiz
8. - [X] _**Admin**_ <mark>**SHOULD do**</mark>:
   - grant another user Admin privileges
9. - [X] _**Admin**_ <mark>**COULD do**</mark>:
   - anything: Admin is god

<br>
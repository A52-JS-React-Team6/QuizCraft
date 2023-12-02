<img src="https://webassets.telerikacademy.com/images/default-source/logos/telerik-academy.svg" alt="logo" width="300px" style="margin-top: 20px;"/>

# QuizLab

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
- **Link to the hosted project**: [QuizLab]()
- run _**npm install**_ from the console in the project path
- run _**npm run dev**_ on the same path

<br>

### 4. Scheme (structure) of the documents in the database

1. users

```ts
type User = {
  email: string;
  firstName: string;
  isAdmin: boolean;
  lastName: string;
  role: string;
  uid: string;
  username: string;
}
```

2. quizzes

```ts
type Quiz = {
  author: string;
  category: string;
  createdOn: number;
  questions: {
    0: {
        answers: {
            0: string;
            1: string:
        }
        text: string;
    }
  };
  timer: string;
  title: string;
}   
```

1. ????

```ts
type Reply = {
   author: string;
   content: string;
   createdOn: number;
   likedBy: {
    username: boolean
  };
  postId: string;
}
```

<br>

### 5. Goals

QuizLab allows users to:

- take a sample quiz as anonymous users
- register for the SPA or sign in to their account
- three-tier account system: Students, Educators, Admins with their separate dashboards
- Students can access public quizzes, get assigned / invited to a quiz, review their quizzes and results
- Educators can manage their quizzes, participate in educators' groups and see stats on their quizzes
- Admins can ban users (prevent them from logging into their accounts) and edit/delete any quiz

<br>

### 6. Full project view

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
   - block / unblock users (ban / lift ban)
   - delete any post
8. - [X] _**Admin**_ <mark>**SHOULD do**</mark>:
   - grant another user Admin privileges
9. - [X] _**Admin**_ <mark>**COULD do**</mark>:
   - anything: Admin is god

<br>

|         | MUST do | SHOULD do | COULD do |
|---------|---------|-----------|----------|
| Public  | access Home page     | see 10 most commented post | see news and articles |
|         | see number of registered users | see 10 most recent posts |
|         | see total number of posts | |
|         | be able to register | |
|         | be able to log in | |
| Private | be able to log in | |
|         | be able to log out | |
|         | sort and filter posts | most liked / newest / keywords |
|         | search posts | |
|         | be able to view a single post | post details and actions on the same page |
|         | be able to update their profile | should **NOT** edit username | upload photo |
|         | create a new post | |
|         | edit own posts and comments | |
|         | list posts by author (sort and filter) | |
|         | delete own posts | both from single post and from list |
|         | reply to posts | |
| Admin   | search by: name, email, username | + all that logged users can do |
|         | block / unblock users | make user Admin |
|         | blocked users cannot create / respond to posts | |
|         | delete any post | |
|         | list posts by author (sort and filter) | |
| Post Tags (Optional) | new DB object | lowercase only | |
|         | Users - add/remove tags from own posts | |
|         | Admins - add/remove tags from all posts | |
<br>

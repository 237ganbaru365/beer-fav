# 🍻 Cheers!

## About

This app is a CRUD app for user who wanna create beer reviews. After a user created own account, user can create, edit and delete own post and favorite any posts. In All Posts page, a user can also see another user's posts, and in Favorites page, they can see their own favorite posts.

## Goal

- User can register their own account, and validate if the user input is correct value.
- The data user registered is stored to database which is provided by firebase, and is used for authentication when they login.
- The user data has posts/favorites/personal info, and can add/edit/delete by user actions within this app.
- User can also register any image they want when creating their post, and the data will be stored in fire storage.
- When fetching data from the database, use loading to manage status to prevent operational errors and improve the user experience.
- Deploy this app by using vercel.

## Challenge

It was a challenge for me to become familiar with each of firebase's cloud services (Authentication, FireStore, FireStorage, etc.) and to learn how to use each of their functions.
I also used React Query and React Hook Form for the first time, and tried to implement loading and validation functions to improve user experience.
The most important thing to keep in mind was that the code should be easy to read, and I think the code is easy to hand over to other engineers by paying attention to the separation of components, naming conventions, and so on.

## Stack

- React
- Redux toolkit
- React Hook Form
- React Query
- Tailwind CSS
- Firebase Firestore
- Firebase Authentication
- Firebase Firestorage
- Vercel

---

# Preview

### 🔗 [Cheers!](https://cheers-eta.vercel.app/)

### Home

<img width="1439" alt="cheers-home" src="https://user-images.githubusercontent.com/63833511/182228938-785c162a-7ceb-46f1-904d-087944380a19.png">

### Authentication

<img width="1439" alt="cheers-auth" src="https://user-images.githubusercontent.com/63833511/182229044-2ab9e8c9-0c7e-4ed1-b82a-aff10f1853af.png">

### Posts

<img width="1439" alt="cheers-posts" src="https://user-images.githubusercontent.com/63833511/182228942-508932ce-0f1a-4d51-835b-872145dccebd.png">

### Create

<img width="1436" alt="cheers-create" src="https://user-images.githubusercontent.com/63833511/182228923-b8297b44-8491-473c-b638-562aa9c858f1.png">

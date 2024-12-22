# OMMC-Sample-Portal

[OMMC Sample Portal](https://ommc-sample-portal.vercel.app/) is a publicly available demo version of [OMMC Test Portal](https://ommc-test-portal.vercel.app/), the official test-taking portal I created for the Online Monmouth Math Competition (OMMC). OMMC provides high-quality, original math resources to a community of 6.4k users, and the Test Portal plays a vital role in fulfilling our mission of providing free, fair, and accessible online competitions.

Online Monmouth Math Competition is a 501c3 accredited nonprofit organization which aims to give talented high school and middle school students an exciting and engaging way to develop their skills in mathematics. We provide an annual original high-quality math competition, in addition to various educational materials and a community Discord server. Our competition is available to all students who are 18 or younger.

Visit us at [OMMCOfficial.org](https://www.ommcofficial.org/)!

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [What I Learned](#what-i-learned)
- [Goals](#goals)

## Overview

The OMMC-Sample-Portal is a full-stack web application built using the T3 stack. This stack focuses on simplicity, modularity, and type safety and is composed of:

- **Frontend**: Next.js, TypeScript, React, and Tailwind CSS.
- **Backend**: tRPC, Firebase, and NextAuth.js, all integrated into Next.js' API routes.

The portal contains several pages:

- **Home page**: An introductory page.
- **Test Portal**: A page where users can view questions and the competition PDF.
- **Login Screen**: A user login interface.
- **Admin UI**: A restricted interface for viewing user submissions.

User authentication is handled using NextAuth.js, supporting Google and Discord login. All user data (including test answers and team information such as member names, grades, and schools) is stored in Firestore via calls to the Next.js API.

## Tech Stack

- **Frontend**:
  - Next.js
  - TypeScript
  - React
  - Tailwind CSS
- **Backend**:
  - tRPC
  - Firebase
  - NextAuth.js (for authentication)
- **Features**:
  - Custom hooks (e.g., `useLocalStorage` for saving user inputs locally)
  - Pages and routing managed by Next.js
  - API calls to store user submissions in Firestore

## Features

- **Responsive Design**: The portal adapts seamlessly across devices using Tailwind CSS.
- **Authentication**: Google and Discord login via NextAuth.js.
- **User Data Storage**: All user submissions are stored in Firestore.
- **Pages**:
  - Home page
  - Test portal with math competition questions and PDFs
  - Login screen
  - Admin UI for viewing submissions
- **Type Safety**: Integrated tRPC for a type-safe API layer.
- **Custom Hooks**: The use of custom React hooks for local storage management.

## What I Learned

- **Modularity and Typing**: The T3 stack emphasizes modularity and type safety, allowing me to write cleaner and more maintainable code.
- **Backend API**: I learned about building APIs with Next.js, and using Firebase and Firestore to store and manage user data.
- **Next.js Features**: Gained experience with Next.js' built-in Pages Router and how to manage user sessions securely with NextAuth.
- **Local Storage Management**: Implemented custom hooks (like `useLocalStorage`) to manage user inputs on the frontend.
- **Scalability**: After facing issues with Firebase’s scalability during the first year of competition (due to a high volume of requests), I upgraded to Firebase Blaze to handle the load. This was a critical lesson in building scalable applications.

## Goals

The goal of this project was to create a fully functional web UI and backend while exploring new technologies. I wanted to experiment with the T3 stack, which enhances Next.js with features like type safety through tRPC, making backend interactions more efficient and secure. I was already familiar with React and TailwindCSS, so I focused on optimizing layouts and improving my understanding of both frontend and backend interactions. Ultimately, this project helped me learn how to integrate modern tools and frameworks into a scalable application.

# Thanks to Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

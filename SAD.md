# Software Architecture Document

# Table of Contents
- [Introduction](#1-introduction)
    - [Purpose](#11-purpose)
    - [Scope](#12-scope)
    - [Definitions, Acronyms and Abbreviations](#13-definitions-acronyms-and-abbreviations)
    - [References](#14-references)
    - [Overview](#15-overview)
- [Architectural Representation](#2-architectural-representation)
- [Architectural Goals and Constraints](#3-architectural-goals-and-constraints)
- [Use-Case View](#4-use-case-view)
    - [Use-Case Realizations](#41-use-case-realizations)
- [Logical View](#5-logical-view)
    - [Overview](#51-overview)
    - [Architecturally Significant Design Packages](#52-architecturally-significant-design-packages)
    - [Pattern](#53-Pattern)
    - [Before & After Class Diagrams](#54-Before-&-After-Class-Diagrams)
- [Process View](#6-process-view)
- [Deployment View](#7-deployment-view)
- [Implementation View](#8-implementation-view)
    - [Overview](#81-overview)
    - [Layers](#82-layers)
- [Data View](#9-data-view)
- [Size and Performance](#10-size-and-performance)
- [Quality](#11-quality)

## 1. Introduction
### 1.1 Purpose
This document provides a quick architectural overview of the system. It is intended to capture the significant architectural decisions which have been made on the system.

### 1.2 Scope
This document describes the architecture of the NeCo Project.

### 1.3 Definitions, Acronyms and Abbreviations
|			Abbreviation									|	Explanation		|
|---------------------------------------------------|---------------|
| MVVM | Model-View-ViewModel-Architecture |

### 1.4 References
n/a

### 1.5 Overview
The architectural details will be described in the following sections. This includes the class diagrams which gives an overview about the whole project.

## 2. Architectural Representation
![MVVM](https://github.com/leoboehm/hobbydevs/blob/401fcb65994cc0692142bf81fad2f8885814822e/MVVM.png)

## 3. Architectural Goals and Constraints
Our main architectural goal is to build a scalable and maintainable web application that follows the MVC (Model-View-Controller) pattern. Laravel, our chosen PHP framework, natively implements this pattern, helping us achieve separation of concerns and ensuring that each part of the application can be managed independently.

Another goal is to have a full-stack framework that facilitates integration between frontend and backend components. Laravel supports the use of Vue.js within its ecosystem, allowing us to build a cohesive application that maintains consistent communication between frontend and backend. By using the Blade templating engine, we ensure that our frontend views are rendered efficiently, while Eloquent ORM simplifies our database interactions.

**Constraints:**
1. Limited experience with PHP among team members, making Laravel both a learning opportunity and a challenge
2. Requirement to follow the MVC architecture for better organization and scalability
3. Need to support both frontend and backend within the same framework, favoring Laravel due to its compatibility with Vue.js

## 4. Use-Case View
![Use-Case]

### 4.1 Use-Case Realizations
Our application supports various interactions for two main actors: **Developer** and **Project Owner**.

- **Developer** can create an account, log in/out, manage their profile, give reviews, communicate via chat, apply for projects, and submit their CVs
- **Project Owner** can publish projects, manage project details, make payments, and create contracts with developers. Both actors can interact within the platform’s network, allowing for communication and notification setups

## 5. Logical View

### 5.1 Overview
Laravel’s logical view is divided according to the MVC pattern:
- **Model**: Eloquent ORM for database management and queries
- **View**: Blade templating engine to create dynamic HTML pages
- **Controller**: Handles the logic that connects Models and Views

### 5.2 Architecturally Significant Design Packages
Laravel packages used include:
- **Eloquent ORM** for database management
- **Blade** for templating views
- **Laravel Mix** for asset management

### 5.3 Pattern

Our project follows multiple design patterns to achieve clean architecture and maintainability:

- **MVC (Model-View-Controller)**: Core architectural pattern provided by Laravel, separating concerns across models (data), views (presentation), and controllers (logic).
- **MVVM (Model-View-ViewModel)**: Utilized within the Vue.js frontend to keep the UI reactive and modular.
- **Command Pattern**: Applied to encapsulate the logic for submitting a new project in the `PostProjectView.vue` component. This separates UI concerns from business logic and makes the action reusable and testable.

**Why the Command Pattern?**

The logic in `postProject()` included multiple steps: form validation, data formatting, API calls, and routing. Instead of tightly coupling all of this to the Vue component, we moved the logic into a dedicated `PostProjectCommand` class, allowing for:
- Decoupling UI from logic
- Easier unit testing
- Reusability (e.g., admin tools, batch submissions)
- Potential for future enhancements like retry logic or logging

This pattern appears in the command class `PostProjectCommand.js` located in `resources/js/commands/`.

### 5.4 Before & After Class Diagrams

Below are the visual class diagrams showing the `PostProjectView.vue` before and after refactoring with the Command Pattern:

#### Before:
- All logic is in `postProject()` inside the Vue component.
![Before Command Pattern](https://github.com/leoboehm/hobbydevs/blob/main/screenshots/before_clas_diagram.JPG)

#### After:
- The logic has been moved into a separate `PostProjectCommand` class.
- `PostProjectView.vue` now simply creates and executes the command.
![After Command Pattern](https://github.com/leoboehm/hobbydevs/blob/main/screenshots/after_class_diagram.JPG)

## 6. Process View
n/a

## 7. Deployment View
This section describes the deployment setup of our client-server architecture:

- **Client**: Vue.js frontend that interfaces with the Laravel backend
- **Server**: Laravel backend deployed on a PHP-compatible hosting environment

The diagram below shows the deployment architecture, with the client (frontend) and server (backend) interacting over HTTP:

```plaintext
+-------------+      +-------------+      +--------------------+
|  Client     | <--> |   Network   | <--> |       Server       |
| (Vue.js)    |      | (Internet)  |      |   (Laravel PHP)    |
+-------------+      +-------------+      +--------------------+
```

**Deployment Process**:
1. Install dependencies using `npm install` and `composer install`
2. Run the build commands to create optimized versions of both frontend and backend
3. Configure environment variables and ensure a compatible PHP hosting environment
   
## 8. Implementation View

### 8.1 Overview

To improve maintainability and readability, we moved submission logic from the Vue component `PostProjectView.vue` into a dedicated command class.

#### Affected File:
- `resources/js/views/PostProjectView.vue`: Now only handles user interactions and delegates the action to the command.
- `resources/js/commands/PostProjectCommand.js`: Encapsulates all logic related to project posting.

This pattern implementation is visually represented and highlighted in the class diagram above.

### 8.2 Layers
n/a

## 9. Data View
n/a

## 10. Size and Performance
n/a

## 11. Quality
n/a

[mvvm]: https://github.com/Haus4/NeCo/raw/develop/docs/img/mvvm.png "Model-View-Viewmodel"
[Use-Case]: https://github.com/leoboehm/hobbydevs/blob/main/use_cases/Use_Case_Diagram.png

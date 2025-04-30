# Gamified-Programming Test Plan

## Table of contents

- [1. Introduction](#1-introduction)
  * [1.1 Purpose](#11-purpose)
  * [1.2 Scope](#12-scope)
  * [1.3 Intended Audience](#13-intended-audience)
  * [1.4 Document Terminology and Acronyms](#14-document-terminology-and-acronyms)
  * [1.5 References](#15-references)
  * [1.6 Document Structure](#16-document-structure)
- [2. Evaluation Mission and Test Motivation](#2-evaluation-mission-and-test-motivation)
  * [2.1 Background](#21-background)
  * [2.2 Evaluation Mission](#22-evaluation-mission)
  * [2.3 Test Motivators](#23-test-motivators)
- [3. Target Test Items](#3-target-test-items)
- [4. Outline of Planned Tests](#4-outline-of-planned-tests)
  * [4.1 Outline of Test Inclusions](#41-outline-of-test-inclusions)
  * [4.2 Outline of Other Candidates for Potential Inclusion](#42-outline-of-other-candidates-for-potential-inclusion)
  * [4.3 Outline of Test Exclusions](#43-outline-of-test-exclusions)
- [5. Test Approach](#5-test-approach)
  * [5.1 Initial Test-Idea Catalogs and Other Reference Sources](#51-initial-test-idea-catalogs-and-other-reference-sources)
  * [5.2 Testing Techniques and Types](#52-testing-techniques-and-types)
    + [5.2.1 Data and Database Integrity Testing](#521-data-and-database-integrity-testing)
    + [5.2.2 Functional Testing](#522-functional-testing)
    + [5.2.3 Business Cycle Testing](#523-business-cycle-testing)
    + [5.2.4 User Interface Testing](#524-user-interface-testing)
    + [5.2.5 Performance Profiling](#525-performance-profiling)
    + [5.2.6 Load Testing](#526-load-testing)
    + [5.2.7 Stress Testing](#527-stress-testing)
    + [5.2.8 Volume Testing](#528-volume-testing)
    + [5.2.9 Security and Access Control Testing](#529-security-and-access-control-testing)
    + [5.2.10 Failover and Recovery Testing](#5210-failover-and-recovery-testing)
    + [5.2.11 Configuration Testing](#5211-configuration-testing)
    + [5.2.12 Installation Testing](#5212-installation-testing)
- [6. Entry and Exit Criteria](#6-entry-and-exit-criteria)
  * [6.1 Test Plan](#61-test-plan)
    + [6.1.1 Test Plan Entry Criteria](#611-test-plan-entry-criteria)
    + [6.1.2 Test Plan Exit Criteria](#612-test-plan-exit-criteria)
    + [6.1.3 Suspension and Resumption Criteria](#613-suspension-and-resumption-criteria)
  * [6.2 Test Cycles](#62-test-cycles)
    - [6.2.1 Test Cycle Entry Criteria](#621-test-cycle-entry-criteria)
    - [6.2.2 Test Cycle Exit Criteria](#622-test-cycle-exit-criteria)
    - [6.2.3 Test Cycle Abnormal Termination](#623-test-cycle-abnormal-termination)
- [7. Deliverables](#7-deliverables)
  * [7.1 Test Evaluation Summaries](#71-test-evaluation-summaries)
  * [7.2 Reporting on Test Coverage](#72-reporting-on-test-coverage)
  * [7.3 Perceived Quality Reports](#73-perceived-quality-reports)
  * [7.4 Incident Logs and Change Requests](#74-incident-logs-and-change-requests)
  * [7.5 Smoke Test Suite and Supporting Test Scripts](#75-smoke-test-suite-and-supporting-test-scripts)
  * [7.6 Additional Work Products](#76-additional-work-products)
    + [7.6.1 Detailed Test Results](#761-detailed-test-results)
    + [7.6.2 Additional Automated Functional Test Scripts](#762-additional-automated-functional-test-scripts)
    + [7.6.3 Test Guidelines](#763-test-guidelines)
    + [7.6.4 Traceability Matrices](#764-traceability-matrices)
- [8. Testing Workflow](#8-testing-workflow)
- [9. Environmental Needs](#9-environmental-needs)
  * [9.1 Base System Hardware](#91-base-system-hardware)
  * [9.2 Base Software Elements in the Test Environment](#92-base-software-elements-in-the-test-environment)
  * [9.3 Productivity and Support Tools](#93-productivity-and-support-tools)
  * [9.4 Test Environment Configurations](#94-test-environment-configurations)
- [10. Responsibilities, Staffing, and Training Needs](#10-responsibilities--staffing--and-training-needs)
  * [10.1 People and Roles](#101-people-and-roles)
  * [10.2 Staffing and Training Needs](#102-staffing-and-training-needs)
- [11. Iteration Milestones](#11-iteration-milestones)
- [12. Risks, Dependencies, Assumptions, and Constraints](#12-risks--dependencies--assumptions--and-constraints)
- [13. Management Process and Procedures](#13-management-process-and-procedures)

---

## 1. Introduction
### 1.1 Purpose
This test plan defines the testing strategy for the Gamified-Programming App, an educational platform that uses gamification elements to enhance coding skills. The objective is to ensure functionality, stability, security, and performance across the application.

### 1.2 Scope
Covers:
- Web frontend (UI, interaction, authentication flows)
- Backend API (Node.js/Express logic, database interactions)
- Database operations (SQLite + Firebase authentication)
- End-to-End (E2E) flow tests

Out of scope:
- Web frontend (UI, interaction, authentication flows)
- Backend API (Node.js/Express logic, database interactions)
- Database operations (SQLite + Firebase authentication)
- End-to-End (E2E) flow tests

Out of scope:

- Extensive security penetration testing
- Infrastructure-level deployment tests

### 1.3 Intended Audience
- Gamified-Programming development team
- Project supervisors and reviewers
- QA evaluators

### 1.4 Terminology and Acronyms
| Abbr | Meaning |
|------|---------|
| API | Application Programming Interface |
| E2E | End-to-End |
| UI  | User Interface |
| CI  | Continuous Integration |
| DB  | Database |

### 1.5 References
| Title | Date | Author |
|-------|------|--------|
| Project GitHub Repository | 2025 | Gamified-Programming Team |
| Requirements Specification | 2025 | Gamified-Programming Team |

### 1.6 Document Structure
Follows the Rational Unified Process (RUP) structure for organizing testing activities.

---

## 2. Evaluation Mission and Test Motivation
- Ensure all user flows (registration, login, level selection, coding challenges) work seamlessly.

- Validate that gamified mechanics (points, badges) function correctly.

- Guarantee the database operations are reliable and safe.

- Verify authentication security via Firebase.

---

## 3. Target Test Items
- React frontend components and routing

- Node.js/Express API endpoints

- SQLite database interactions

- Firebase authentication workflows

- E2E user journeys (e.g., login → challenge → earn points → leaderboard)

---

## 4. Outline of Planned Tests
- **Frontend:** 
    - Unit tests with Jest and React Testing Library (components, hooks)

    - Manual UI testing
- **Backend:** Unit and integration tests for API endpoints (Jest + Supertest)
- **Database:** SQLite data integrity tests
- **API:** Postman + Newman
- **Authentication**:Firebase sign-up/sign-in test cases
- **E2E:** Cypress or Playwright for full user journey tests



Optional:
- Accessibility testing (manual)
- Exploratory testing (manual)

---

## 5. Test Approach
- **Use unit tests:** Frontend components, backend services.
- **Integration tests:** Backend API + database communication.
- **E2E tests:** Full user workflows.
- **Mock external services:** where necessary (e.g., Firebase mocks).


**Testing techniques:**

    Boundary tests (form validation, input fields)

    Error handling tests (failed login, database failure)

    Load tests (simulated concurrent users)

---

## 6. Entry and Exit Criteria
### Entry Criteria
- ?

### Exit Criteria
- ?
### Suspension and Resumption Criteria
- ?
---

## 7. Deliverables
- Frontend: playwright Test
- Backend:
- Coverage summary

---

## 8. Testing Workflow  (?)
- Developer writes unit/component tests with feature
- PR triggers CI pipeline → runs Jest, Postman, Detox
- Instructor manually verifies E2E flows on staging build

---

## 9. Environmental Needs
### 9.1 Hardware
- Developer laptops (Windows/macOS/Linux)

- CI/CD build server (GitHub Actions or GitLab CI)
### 9.2 Software
| Item | Notes |
|------|-------|
| Node.js | Backend runtime |
| React | Frontend library |
| Express.js | Backend framework |
| Superbase | Cloud database |
| Firebase | Authentication service|
| Jest | 	Unit and integration testing |
| React Testing Library | Component testing|
| Cypress / Playwright | E2E testing | 
| Postman | API testing |
| GitHub Actions | CI/CD pipeline |


---

## 10. Responsibilities, Staffing, and Training Needs
| Role | Person(s) | Responsibility |
|------|-----------|----------------|
| Frontend QA | Ehsan | Component tests |
| Backend QA | Ehsan | API + DB tests |
| Test Leader | Ehsan | Test plan, CI/CD, coverage |

---

## 11. Iteration Milestones
- Iteration 1: Auth & navigation tests ready
- Iteration 2: Garden/Plant/Calendar logic tested
- Iteration 3: Sensor logic tested

---

## 12. Risks, Dependencies, Assumptions, and Constraints
| Risk | Mitigation |
|------|------------|
| Emulator failures | Use physical device fallback |
| Sensor data delay | Mock data for testing |
| CI flakiness | Retry with cache busting |

---

## 13. Management Process and Procedures
- Test coverage monitored via Jest
- Reports reviewed every sprint retro
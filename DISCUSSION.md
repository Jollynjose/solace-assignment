## Technical Test Summary

The technical test was supposed to take **2 hours**, but I ended up spending **6 hours** implementing my improvements. I genuinely enjoyed working on it.

### Initial 2 Hours

- Organized the project structure.
- Implemented the **repository pattern** to follow good software design practices.
- Separated business logic into the `services` folder.
- Improved the database:
  - Noticed that the `specialities` field contained **repetitive data**, causing a **massive array** that negatively impacted performance.
  - **Refactored and normalized** the tables—now, `advocates` have a **many-to-many relationship** with `specialities`.
  - Added **indexes** to optimize search times and improve performance.
- Removed **Tailwind CSS** and add **MaterialUI** to speed up frontend improvements.
- Set up **Next.js** and standardized some styles.
- Enhanced the `advocates` endpoint:
  - Implemented **query parameters** and **pagination** to limit request sizes.

### Additional Improvements

- **Added validations** on both frontend and backend, focusing more on frontend.
- Modularized components such as `Table`, `TableCell`, etc.
- Created a **SearchInput** component with **debounce** functionality:
  - A request is triggered **only after 500ms of inactivity** when typing.
  - Prevents unnecessary requests and **optimizes performance**.
- Developed a **custom hook** to handle requests more **scalably**.

### Improvements I Couldn't Implement Due to Time Constraints

- **Unit tests** to improve structure and development quality.
- **Better UI/UX**, as I focused mainly on performance optimization.
- **Local development environment using Docker**.
- **State management solution** (e.g., Redux RTK, TanStack Query) to handle requests and enable client-side caching.
- **Redis or another in-memory caching solution** to significantly improve backend performance.
- **Enhanced table UX**, including sorting functionality.
- **Accessibility (A11y) improvements** where needed.
- **Next.js caching mechanisms** to improve application load times.
- **Integrate a fake data generation technique** (e.g., Faker.js) to create mock data for unit testing.

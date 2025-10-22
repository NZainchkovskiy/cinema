---

description: "Task list for Cinema Schedule Viewer feature implementation"
---

# Tasks: Cinema Schedule Viewer

**Input**: Design documents from `/specs/001-cinema-schedule-viewer/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Per hackathon constitution, automated tests are NOT required unless explicitly requested. Focus on manual testing of user flows instead.

**UX Polish**: Each user story MUST include a visual polish task after implementation (spacing, alignment, feedback states).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Single project SPA**: `src/` at repository root
- TypeScript interfaces in `src/types/`
- Components in `src/components/`
- Routes in `src/routes/`
- Services in `src/services/`

<!--
  ============================================================================
  Cinema Schedule Viewer - Single Page Application
  Tech Stack: React 19.2, Vite 7.x, shadcn/ui, Tanstack Router v1, Tailwind CSS
  Data: Static JSON files served from public directory
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create Vite project with React and TypeScript template (npm create vite@latest . -- --template react-ts)
- [ ] T002 Install and configure core dependencies (Tanstack Router, shadcn/ui, Tailwind CSS)
- [ ] T003 [P] Configure Vite with Tanstack Router plugin in vite.config.ts
- [ ] T004 [P] Initialize shadcn/ui with Tailwind CSS configuration
- [ ] T005 [P] Install required shadcn components (tabs, card, badge, skeleton, alert, button, separator, scroll-area)
- [ ] T006 Create project directory structure per plan.md (src/components/, src/routes/, src/lib/, src/types/, src/services/, public/data/, public/images/)
- [ ] T007 [P] Create TypeScript interfaces for Movie, Hall, and Showtime entities in src/types/index.ts
- [ ] T008 [P] Add sample JSON data files in public/data/ (movies.json, halls.json, schedule.json)
- [ ] T009 Setup Tanstack Router root route in src/routes/__root.tsx with basic layout
- [ ] T010 Configure main.tsx with RouterProvider and router configuration

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T011 Create data service layer in src/services/cinemaService.ts for loading and parsing JSON data
- [ ] T012 Implement date utility functions in src/lib/utils.ts (date formatting, showtime filtering, date range generation)
- [ ] T013 Create base layout component with tab navigation in src/components/layout/Navigation.tsx
- [ ] T014 Setup root layout route in src/routes/_layout.tsx with tab-based navigation structure
- [ ] T015 [P] Implement data loading context in src/contexts/DataContext.tsx for sharing movie/hall/showtime data
- [ ] T016 [P] Create placeholder image component in src/components/ui/placeholder-image.tsx for failed image loads
- [ ] T017 Configure error boundaries for graceful error handling across the app

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse Current Movies (Priority: P1) 🎯 MVP

**Goal**: Display all currently showing movies with details in a grid/list format

**Independent Test**: Open application and verify movies are displayed with title, cover image, genre, duration, and rating. Click on any movie to see full details.

### Implementation for User Story 1

- [ ] T018 [P] [US1] Create MovieCard component in src/components/cinema/MovieCard.tsx using shadcn Card
- [ ] T019 [P] [US1] Create movie list route in src/routes/movies/index.tsx displaying all movies in responsive grid
- [ ] T020 [US1] Create movie detail route in src/routes/movies/$movieId.tsx for individual movie view
- [ ] T021 [P] [US1] Create MovieDetail component in src/components/cinema/MovieDetail.tsx with full movie information
- [ ] T022 [US1] Implement movie data fetching in the movies route using cinemaService
- [ ] T023 [US1] Add loading states using shadcn Skeleton component for movie list and detail views
- [ ] T024 [US1] Add empty state handling when no movies are available ("No movies currently showing")
- [ ] T025 [US1] Implement image error handling with placeholder images for failed cover loads
- [ ] T026 [US1] Visual polish pass: card hover effects, consistent spacing, typography hierarchy
- [ ] T027 [US1] Ensure responsive grid layout (1 column mobile, 2-3 tablet, 4+ desktop)
- [ ] T028 [US1] Add navigation from movie list to movie detail with proper routing

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Movie Schedule by Hall (Priority: P2)

**Goal**: Display complete schedule for any selected hall showing all movies chronologically

**Independent Test**: Click "Halls" tab, select any hall, verify schedule shows all movies for that hall chronologically for today and next 7 days

### Implementation for User Story 2

- [ ] T029 [P] [US2] Create HallCard component in src/components/cinema/HallCard.tsx displaying hall info with features
- [ ] T030 [P] [US2] Create halls list route in src/routes/halls/index.tsx showing all cinema halls
- [ ] T031 [US2] Create hall schedule route in src/routes/halls/$hallId.tsx for individual hall schedules
- [ ] T032 [P] [US2] Create HallSchedule component in src/components/cinema/HallSchedule.tsx with chronological showtime display
- [ ] T033 [P] [US2] Create ShowtimeList component in src/components/cinema/ShowtimeList.tsx for rendering showtime entries
- [ ] T034 [US2] Implement getHallSchedule function in cinemaService.ts to fetch and filter hall showtimes
- [ ] T035 [US2] Add date grouping for hall schedule (group showtimes by date)
- [ ] T036 [US2] Filter out past showtimes (already started) from hall schedules
- [ ] T037 [US2] Add loading states for hall list and schedule views using Skeleton components
- [ ] T038 [US2] Add empty state for halls with no scheduled showtimes ("No showtimes available for [Hall Name]")
- [ ] T039 [US2] Visual polish pass: hall capacity badges, feature tags, showtime cards with proper spacing
- [ ] T040 [US2] Ensure movie information is clearly displayed for each showtime in hall view

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - View Hall Schedule by Movie (Priority: P2)

**Goal**: Display all available showtimes for a selected movie across all halls

**Independent Test**: Select any movie, verify all showtimes are displayed across all halls, grouped by date, with hall information clearly shown

### Implementation for User Story 3

- [ ] T041 [US3] Extend MovieDetail component to include ShowtimesByMovie section
- [ ] T042 [P] [US3] Create MovieShowtimes component in src/components/cinema/MovieShowtimes.tsx for displaying all movie showtimes
- [ ] T043 [US3] Implement getMovieShowtimes function in cinemaService.ts to fetch showtimes across all halls
- [ ] T044 [US3] Group movie showtimes by date for easy scanning
- [ ] T045 [US3] Display hall information clearly for each showtime (hall name, features)
- [ ] T046 [US3] Filter out past showtimes from the movie schedule display
- [ ] T047 [US3] Add loading state for movie showtimes section
- [ ] T048 [US3] Add empty state when movie has no upcoming showtimes ("No showtimes available for [Movie Title]")
- [ ] T049 [US3] Visual polish pass: showtime badges, hall indicators, consistent date formatting
- [ ] T050 [US3] Integrate showtimes display into movie detail page seamlessly
- [ ] T051 [US3] Add quick navigation from showtime to hall schedule view

**Checkpoint**: User Stories 1, 2, and 3 should now be independently functional

---

## Phase 6: User Story 4 - Filter Schedule by Date (Priority: P3)

**Goal**: Allow users to filter all schedule views by selecting a specific date within the 7-day window

**Independent Test**: Select different dates (today through 7 days ahead) and verify schedules update in all views (movies, halls, combined)

### Implementation for User Story 4

- [ ] T052 [P] [US4] Create DateSelector component in src/components/cinema/DateSelector.tsx using shadcn Tabs or ScrollArea
- [ ] T053 [US4] Implement date filtering in URL search params using Tanstack Router
- [ ] T054 [US4] Update all routes to read and respect date filter from search params
- [ ] T055 [US4] Generate 7-day date range (today + 6 days) in DateSelector component
- [ ] T056 [US4] Update cinemaService.ts functions to accept optional date parameter for filtering
- [ ] T057 [US4] Persist selected date across navigation between different views
- [ ] T058 [US4] Default to "today" when no date is selected
- [ ] T059 [US4] Update empty states to include selected date context ("No showtimes on [Date]")
- [ ] T060 [US4] Visual polish pass: active date highlighting, date format consistency (day name + date)
- [ ] T061 [US4] Ensure date selector is responsive (horizontal scroll on mobile)
- [ ] T062 [US4] Add keyboard navigation support for date selection

**Checkpoint**: All user stories should now be independently functional with date filtering

---

## Phase 7: Combined Schedule View (Enhancement)

**Purpose**: Create a unified schedule view showing all movies and halls

- [ ] T063 [P] Create schedule route in src/routes/schedule/index.tsx for combined view
- [ ] T064 [P] Create CombinedSchedule component in src/components/cinema/CombinedSchedule.tsx
- [ ] T065 Implement getDailySchedule function in cinemaService.ts for fetching all showtimes
- [ ] T066 Add view toggle (by movie / by hall) in combined schedule
- [ ] T067 Visual polish pass: clear visual hierarchy, proper grouping, consistent styling

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T068 [P] Global visual consistency check (colors, fonts, spacing, shadows)
- [ ] T069 [P] Mobile responsiveness verification for all views (test on various screen sizes)
- [ ] T070 Comprehensive manual testing of all user flows (movie browse, hall schedule, movie schedule, date filtering)
- [ ] T071 Performance check: optimize image loading with lazy loading
- [ ] T072 [P] Add subtle animations and transitions (card hover, route transitions, tab switches)
- [ ] T073 Implement proper SEO meta tags in index.html
- [ ] T074 [P] Create README.md with setup instructions and feature overview
- [ ] T075 Verify all error states and edge cases are handled gracefully
- [ ] T076 [P] Add favicon and app manifest for better PWA support
- [ ] T077 Final build optimization check (bundle size, code splitting verification)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Combined Schedule (Phase 7)**: Benefits from but doesn't require other user stories
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Benefits from US1 components but independent
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - Enhances all other stories but independent

### Within Each User Story

- TypeScript interfaces before components
- Components before routes
- Core implementation before error handling and feedback states
- Visual polish pass after functional implementation
- Manual testing validation before marking story complete

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel
- Component creation tasks marked [P] within each story can run in parallel
- Visual polish tasks across stories marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all component creation for User Story 1 together:
Task: "Create MovieCard component in src/components/cinema/MovieCard.tsx"
Task: "Create movie list route in src/routes/movies/index.tsx"
Task: "Create MovieDetail component in src/components/cinema/MovieDetail.tsx"

# After implementation, launch polish tasks together:
Task: "Visual polish pass: card hover effects, consistent spacing"
Task: "Ensure responsive grid layout"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (~30 minutes)
2. Complete Phase 2: Foundational (~45 minutes) - CRITICAL blocks all stories
3. Complete Phase 3: User Story 1 (~1-2 hours)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready - users can browse movies!

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP - Browse Movies!)
3. Add User Story 2 → Test independently → Deploy/Demo (Hall Schedules added!)
4. Add User Story 3 → Test independently → Deploy/Demo (Movie Showtimes added!)
5. Add User Story 4 → Test independently → Deploy/Demo (Date Filtering added!)
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Browse Movies)
   - Developer B: User Story 2 (Hall Schedules)
   - Developer C: User Story 3 (Movie Showtimes)
3. Developer D can add User Story 4 (Date Filtering) to enhance all views
4. All developers collaborate on Polish phase

---

## Notes

- [P] tasks = different files, no dependencies within the phase
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and manually testable
- Visual polish is mandatory for each story - don't skip it
- Manual testing after each story is complete - walk through the user flow
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Remember: Speed + UX + Visual Polish > Tests + Performance (per hackathon constitution)
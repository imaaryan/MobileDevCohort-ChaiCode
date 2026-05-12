/**
 * Mock data for the Notes App
 */

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  pinned: boolean;
}

export const NOTES: Note[] = [
  {
    id: '1',
    title: 'Weekly Sprint Planning',
    content:
      'Review backlog items, assign tasks to team members, and set sprint goals for the upcoming two-week cycle. Need to prioritize the auth module and dashboard redesign.',
    date: '2026-05-12',
    category: 'Work',
    pinned: true,
  },
  {
    id: '2',
    title: 'React Native Best Practices',
    content:
      'Use FlatList for long lists, avoid inline styles, leverage StyleSheet.create for performance. Memoize callbacks with useCallback and components with React.memo.',
    date: '2026-05-11',
    category: 'Learning',
    pinned: true,
  },
  {
    id: '3',
    title: 'Grocery List',
    content:
      'Milk, eggs, whole wheat bread, avocados, spinach, chicken breast, olive oil, garlic, tomatoes, and dark chocolate.',
    date: '2026-05-10',
    category: 'Personal',
    pinned: false,
  },
  {
    id: '4',
    title: 'Book Recommendations',
    content:
      'Atomic Habits by James Clear, Deep Work by Cal Newport, The Pragmatic Programmer, and Clean Code by Robert C. Martin.',
    date: '2026-05-09',
    category: 'Reading',
    pinned: false,
  },
  {
    id: '5',
    title: 'Fitness Goals for May',
    content:
      'Run 5K three times a week, complete 30-day pushup challenge, stretch every morning for 10 minutes. Track progress in the fitness app.',
    date: '2026-05-08',
    category: 'Health',
    pinned: false,
  },
  {
    id: '6',
    title: 'API Design Notes',
    content:
      'RESTful endpoints should follow resource naming conventions. Use proper HTTP methods — GET for reads, POST for creates, PUT/PATCH for updates, DELETE for removals.',
    date: '2026-05-07',
    category: 'Work',
    pinned: false,
  },
  {
    id: '7',
    title: 'Travel Packing Checklist',
    content:
      'Passport, charger, headphones, toiletries, 3 changes of clothes, jacket, sunscreen, medications, and a good book for the flight.',
    date: '2026-05-06',
    category: 'Personal',
    pinned: false,
  },
  {
    id: '8',
    title: 'Meeting Notes — Client Sync',
    content:
      'Client wants the onboarding flow simplified. Remove step 3 (optional survey) and combine steps 1 & 2. Deadline is end of month.',
    date: '2026-05-05',
    category: 'Work',
    pinned: false,
  },
  {
    id: '9',
    title: 'Recipe: Pasta Aglio e Olio',
    content:
      'Boil spaghetti al dente. Sauté sliced garlic in olive oil, add red pepper flakes. Toss pasta in the pan, add pasta water, parsley, and parmesan.',
    date: '2026-05-04',
    category: 'Personal',
    pinned: false,
  },
  {
    id: '10',
    title: 'Expo Router Migration Plan',
    content:
      'Migrate from React Navigation to Expo Router. Update file-based routing, convert stack navigators, and test deep linking. Estimated effort: 2 days.',
    date: '2026-05-03',
    category: 'Learning',
    pinned: false,
  },
];

export const CATEGORIES = ['All', 'Work', 'Personal', 'Learning', 'Reading', 'Health'];

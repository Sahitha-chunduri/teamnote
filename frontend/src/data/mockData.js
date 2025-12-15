// Mock user data
export const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
};

// Mock notes (user's own documents)
export const mockUserNotes = [
  {
    id: 1,
    title: 'Project Proposal',
    description: 'Q4 2024 Project Proposal and Timeline',
    createdAt: '2024-12-01',
    updatedAt: '2024-12-10',
    content: 'This is the project proposal content...',
    sharedWith: [
      { id: 2, email: 'alice@example.com', name: 'Alice Smith', permission: 'view' },
      { id: 3, email: 'bob@example.com', name: 'Bob Johnson', permission: 'edit' }
    ]
  },
  {
    id: 2,
    title: 'Meeting Notes',
    description: 'Team meeting notes from last week',
    createdAt: '2024-12-05',
    updatedAt: '2024-12-12',
    content: 'Team meeting discussion points...',
    sharedWith: [
      { id: 2, email: 'alice@example.com', name: 'Alice Smith', permission: 'view' }
    ]
  },
  {
    id: 3,
    title: 'Budget Plan 2025',
    description: 'Annual budget planning document',
    createdAt: '2024-11-15',
    updatedAt: '2024-12-08',
    content: 'Budget allocation details...',
    sharedWith: []
  }
];

// Mock shared notes (documents shared with user)
export const mockSharedNotes = [
  {
    id: 101,
    title: 'Company Guidelines',
    description: 'Updated company guidelines and policies',
    createdAt: '2024-11-20',
    updatedAt: '2024-12-11',
    content: 'Company guidelines content...',
    ownedBy: {
      id: 2,
      email: 'alice@example.com',
      name: 'Alice Smith'
    },
    permission: 'view'
  },
  {
    id: 102,
    title: 'Marketing Strategy 2025',
    description: 'Strategic marketing plan for next year',
    createdAt: '2024-12-01',
    updatedAt: '2024-12-12',
    content: 'Marketing strategy content...',
    ownedBy: {
      id: 3,
      email: 'bob@example.com',
      name: 'Bob Johnson'
    },
    permission: 'edit'
  },
  {
    id: 103,
    title: 'Technical Specifications',
    description: 'Technical specs for the new system',
    createdAt: '2024-10-15',
    updatedAt: '2024-12-05',
    content: 'Technical specifications...',
    ownedBy: {
      id: 4,
      email: 'carol@example.com',
      name: 'Carol Davis'
    },
    permission: 'view'
  }
];

// Available users for sharing (besides the logged-in user)
export const mockAvailableUsers = [
  { id: 2, email: 'alice@example.com', name: 'Alice Smith' },
  { id: 3, email: 'bob@example.com', name: 'Bob Johnson' },
  { id: 4, email: 'carol@example.com', name: 'Carol Davis' },
  { id: 5, email: 'david@example.com', name: 'David Wilson' },
  { id: 6, email: 'emma@example.com', name: 'Emma Thompson' }
];

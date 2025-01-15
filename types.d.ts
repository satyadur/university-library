interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  color: string;
  cover: string;
  video: string;
  summary: string;
  isLoanedBook: boolean;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}

interface User {
  id: string;
  fullname: string;
  email: string;
  universityId: number;
  universityCard: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | null;
  role: "USER" | "ADMIN" | null;
  lastActivityDate: string | null;
  createdAt: Date | null;
}

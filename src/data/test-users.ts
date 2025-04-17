export type TestUser = {
  role: string;
  email: string;
  password: string;
};

export const testUsers = {
  admin: {
    role: "admin",
    email: process.env.E2E_ADMIN_EMAIL!,
    password: process.env.E2E_ADMIN_PASSWORD!,
  },
  student0: {
    role: "student",
    email: process.env.E2E_STUDENT0_EMAIL!,
    password: process.env.E2E_STUDENT0_PASSWORD!,
  },
  student1: {
    role: "student",
    email: process.env.E2E_STUDENT1_EMAIL!,
    password: process.env.E2E_STUDENT1_PASSWORD!,
  },
  tutor0: {
    role: "tutor",
    email: process.env.E2E_TUTOR0_EMAIL!,
    password: process.env.E2E_TUTOR0_PASSWORD!,
  },
  tutor1: {
    role: "tutor",
    email: process.env.E2E_TUTOR1_EMAIL!,
    password: process.env.E2E_TUTOR1_PASSWORD!,
  },
} as const;

export type TestUserMap = typeof testUsers;

 export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  year: number;
  branch: string;
  interests: string[];
  role: "student" | "admin";
}

export interface Opportunity {
  _id?: string;
  title: string;
  organization: string;
  category: string;
  description: string;
  branch: string[];
  year: number[];
  deadline: string;
  applyLink: string;
}
export type LocalStorageData = {
    courses: Course[];
    enrollments: Enrollment[];
    user: User;
};

export type User = {
    userId: string;
    name: string;
    email: string;
    preferences: {
        preferredCategories: string[]; // e.g., ["Programming", "Design"] 
        notifications: boolean; // Receive email notifications
    };
};

export type Course = {
    id: string;
    title: string;
    description: string;
    category: string; // e.g., "Programming", "Design" 
    isFree: boolean;
    prerequisites: string[]; // List of course IDs required 
    duration: number; // Duration in hours
};

export type Enrollment = {
    userId: string;
    courseId: string;
    status: "enrolled" | "completed";
    progress: number; // Percentage completed (0–100) 
    enrolledAt: string; // ISO date string
    completedAt?: string; // ISO date string, if completed
};
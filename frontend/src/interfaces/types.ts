export interface Todo {
    _id: number;
    title: string;
    description: string;
    done: boolean;
}

export type SignupRequest = {
    username: string;
    password: string;
  };

export type LoginRequest = {
    username: string;
    password: string;
  };

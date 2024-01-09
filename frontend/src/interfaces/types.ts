export interface Todo {
    _id: number;
    title: String;
    description: String;
    done: Boolean;
}

export type SignupRequest = {
    username: string;
    password: string;
  };

export type LoginRequest = {
    username: string;
    password: string;
  };

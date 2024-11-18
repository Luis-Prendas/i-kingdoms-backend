export type BaseTable = {
  id: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface API_RESPONSE<T> {
  status: number;
  message: string;
  response: T | null;
}
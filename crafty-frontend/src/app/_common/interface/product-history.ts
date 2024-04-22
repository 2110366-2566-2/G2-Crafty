export interface ProductHistory {
  id: string;
  title: string;
  desc: string;
  price: number;
  deadline?: string;
  status?: string;
  note?: string;
  imageUrl?: string;
  isPaid: boolean;
  date: string;
  crafterId: string;
  crafteeId: string;
}

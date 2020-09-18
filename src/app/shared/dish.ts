class Comment {
    rating: number;
    author: string;
    comment: string;
    date: string;
}

export class dish {
    _id: string;
    name : string;
    image: string;
    price: string;
    description: string;
    quantity: number;
    comments: Comment[];
}
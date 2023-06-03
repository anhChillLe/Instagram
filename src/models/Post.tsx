export interface Post {
    id: string;
    avatar: string;
    name: string;
    img: string;
    caption: string;
    comment: number;
    like: number;
    createAt: number;
    isLiked: boolean;
}

export const postsUrl = 'https://646b46ae7d3c1cae4ce38b57.mockapi.io/Post'

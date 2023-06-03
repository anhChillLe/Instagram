import { ImageSourcePropType } from "react-native";

export interface Comment {
    id: number;
    userName: string;
    userAvatar: ImageSourcePropType;
    comment: string;
    createdAt: Date;
    like: number;
    isLiked: boolean;
}
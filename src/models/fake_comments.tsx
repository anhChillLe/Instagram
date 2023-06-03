import { faker } from '@faker-js/faker'
import { Comment } from './Comment';

export function createFakeComment(): Comment {
    const like = faker.number.int({ min: 0, max: 10 })
    return {
        id: 0,
        userName: faker.person.fullName(),
        userAvatar: {uri: faker.image.avatar()},
        comment: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        like: like,
        isLiked: like > 0 ? faker.datatype.boolean() : false
    }
}

export function createFakeComments(number: number): Array<Comment> {
    const fakeComments: Array<Comment> = []
    for (let i = 0; i < number; i++) {
        fakeComments.push(createFakeComment())
    }
    return fakeComments
}

export const fakeComments = createFakeComments(10)
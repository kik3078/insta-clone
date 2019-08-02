import { prisma } from "../../../generated/prisma-client";

export default{
    User: {
        fullName: (parent) => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent; // parentId에 id 값을 넣어줌
            try {
                return prisma.$exists.user({
                    AND: [
                        { id: user.id }, 
                        { following_some: {id: parent.id } }
                    ]
                })
            } catch (error) {
                return false;
            }
        },
        isSelf: (parent, _, {request}) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id ===　parentId;
        }
    },
}
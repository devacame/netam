import {
    nonNull,
    list,
    objectType,
    queryType,
    stringArg,
    mutationType,
    booleanArg,
    intArg,
} from 'nexus'

export const Post = objectType({
    name: 'Post',
    definition(t) {
        t.string('id')
        t.string('title')
        t.string('description')
        t.string('coverImage')
        t.field('date', { type: 'Date' })
        t.list.string('category')
        t.string('series')
        t.int('readingTime')
        t.string('content')
        t.boolean('published')
    },
})

export const PostQuery = queryType({
    definition(t) {
        t.field('posts', {
            type: nonNull(list('Post')),
            resolve(_parent, _args, ctx) {
                return ctx.prisma.post.findMany()
            },
        })
        t.field('metadatas', {
            type: nonNull(list('Post')),
            resolve(_parent, _arg, ctx) {
                return ctx.prisma.post.findMany({
                    where: {
                        published: true,
                    },
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        coverImage: true,
                        date: true,
                    },
                })
            },
        })
        t.field('post', {
            type: nonNull('Post'),
            args: {
                id: nonNull(stringArg()),
            },
            resolve(_parent, args, ctx) {
                return ctx.prisma.post.findUnique({
                    where: {
                        id: args.id,
                    },
                })
            },
        })
    },
})

export const PostMutation = mutationType({
    definition(t) {
        t.field('createPost', {
            type: nonNull('Post'),
            args: {
                id: nonNull(stringArg()),
                title: nonNull(stringArg()),
                description: nonNull(stringArg()),
                coverImage: nonNull(stringArg()),
                category: nonNull(list(stringArg())),
                series: nonNull(stringArg()),
                date: nonNull(stringArg()),
                readingTime: nonNull(intArg()),
                content: nonNull(stringArg()),
                published: nonNull(booleanArg()),
            },
            resolve(_parent, args, ctx) {
                return ctx.prisma.post.create({
                    data: {
                        id: args.id,
                        title: args.title,
                        description: args.description,
                        coverImage: args.coverImage,
                        category: args.category,
                        series: args.series,
                        date: args.date,
                        readingTime: args.readingTime,
                        content: args.content,
                        published: args.published,
                    },
                })
            },
        })
        t.field('updatePost', {
            type: nonNull('Post'),
            args: {
                id: nonNull(stringArg()),
                title: nonNull(stringArg()),
                description: nonNull(stringArg()),
                coverImage: nonNull(stringArg()),
                category: nonNull(list(stringArg())),
                series: nonNull(stringArg()),
                date: nonNull(stringArg()),
                readingTime: nonNull(intArg()),
                content: nonNull(stringArg()),
                published: nonNull(booleanArg()),
            },
            resolve(_parent, args, ctx) {
                return ctx.prisma.post.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        title: args.title,
                        description: args.description,
                        coverImage: args.coverImage,
                        category: args.category,
                        series: args.series,
                        date: args.date,
                        readingTime: args.readingTime,
                        content: args.content,
                        published: args.published,
                    },
                })
            },
        })
        t.field('changePublishState', {
            type: 'Post',
            args: {
                id: nonNull(stringArg()),
                published: nonNull(booleanArg()),
            },
            resolve(_parent, args, ctx) {
                return ctx.prisma.post.update({
                    where: {
                        id: args.id,
                    },
                    data: {
                        published: args.published,
                    },
                })
            },
        })
    },
})

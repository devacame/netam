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

export const Edge = objectType({
    name: 'Edge',
    definition(t) {
        t.string('cursor')
        t.field('node', {
            type: Post,
        })
    },
})

export const PageInfo = objectType({
    name: 'PageInfo',
    definition(t) {
        t.string('endCursor')
        t.boolean('hasNextPage')
    },
})

export const Response = objectType({
    name: 'Response',
    definition(t) {
        t.field('pageInfo', { type: PageInfo })
        t.list.field('edges', {
            type: Edge,
        })
    },
})

export const PostQuery = queryType({
    definition(t) {
        t.field('posts', {
            type: 'Response',
            args: {
                first: nonNull(intArg()),
                after: stringArg(),
            },
            async resolve(_parent, args, ctx) {
                let queryResults = null

                if (args.after) {
                    queryResults = await ctx.prisma.post.findMany({
                        where: {
                            published: true,
                        },
                        skip: 1,
                        take: args.first,
                        cursor: {
                            id: args.after,
                        },
                    })
                } else {
                    queryResults = await ctx.prisma.post.findMany({
                        where: {
                            published: true,
                        },
                        take: args.first,
                    })
                }
                if (queryResults.length > 0) {
                    const lastPostInResults =
                        queryResults[queryResults.length - 1]
                    const myCursor = lastPostInResults.id

                    const secondQueryResults = await ctx.prisma.post.findMany({
                        where: {
                            published: true,
                        },
                        cursor: {
                            id: myCursor,
                        },
                        skip: 1,
                        take: args.first,
                    })

                    const result = {
                        pageInfo: {
                            endCursor: myCursor,
                            hasNextPage: secondQueryResults.length > 0,
                        },
                        edges: queryResults.map((post) => ({
                            cursor: post.id,
                            node: post,
                        })),
                    }

                    return result
                }
                return {
                    pageInfo: {
                        endCursor: null,
                        hasNextPage: false,
                    },
                    edges: [],
                }
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
                        date: true,
                        series: true,
                        category: true,
                    },
                })
            },
        })
        t.field('post', {
            type: 'Post',
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
            type: 'Post',
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
                let result = ctx.prisma.post
                    .create({
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
                    .catch((e) => {
                        console.log(e)
                        return null
                    })
                return result
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

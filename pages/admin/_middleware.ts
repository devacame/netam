// import { withAuth } from 'next-auth/middleware'

// export default withAuth({
//     callbacks: {
//         authorized: ({ token }) => {
//             console.log(token, token?.name === process.env.SITE_OWNER_NAME)
//             return token?.name === process.env.SITE_OWNER_NAME
//         },
//     },
// })
export { default } from 'next-auth/middleware'

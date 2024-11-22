import Markdown from "@/components/MarkDown";
import { getAllPostIds, getPostData } from "@/lib/posts";
import { Box, Typography } from "@mui/material";

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export default async function post({ params }) {
    const postData = await getPostData(params.id)
    return (
        <Box sx={{m:2, mx: {
            xs: 2, // 超小屏幕： 2 * 8px
            sm: 'calc(4% + 16px)', // 小屏幕
            md: 'calc(8% + 20px)', // 中屏幕
            lg: 'calc(12% + 24px)', // 大屏幕
            xl: 'calc(16% + 32px)', // 超大屏幕
        }, transform: {
            marginX: '0.1s ease-in-out',  
          },}}>
            <Typography variant="h4" sx={{mt:5}}>
                {postData.title}
            </Typography>
            <br />
            <Typography variant="subtitle1" color="textSecondary">
                {postData.date}
            </Typography>
            <br />
            <Markdown markdown={postData.content} />
        </Box>
    )
}
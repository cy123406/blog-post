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
        <Box>
            <Typography>
                {postData.id}
            </Typography>
            <br />
            <Typography>
                {postData.title}
            </Typography>
            <br />
            <Typography>
                {postData.date}
            </Typography>
            <br />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Box>
    )
}
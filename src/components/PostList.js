import { getAllPostIds, getPostDataById } from "@/lib/posts";
import BookmarksTwoToneIcon from '@mui/icons-material/BookmarksTwoTone';
import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import Link from "next/link";

const PostList = () => {
    const ids = getAllPostIds().map(r => r.params.id);
    const Posts = ids.map(r => {
        const postData = getPostDataById(r);
        return (
            <ListItem key={r}>
                <Box>
                    <Link href={`/posts/${postData.id}`}>
                        <Typography variant="h6" component={'span'} sx={{
                            transition: 'all 0.3s ease', // 为过渡添加动画效果
                            '&:hover': {
                                color: 'primary.main', // 鼠标悬停时文字颜色变为主题的主色
                                cursor: 'pointer', // 鼠标指针变为手形
                            },
                        }}>
                            {postData.title}
                        </Typography>
                    </Link>
                    <Typography sx={{ color: 'GrayText',my:0.6}}>
                        <Typography component={'span'} sx={{ mr: 1 }}>
                            发布于
                        </Typography>
                        {postData.date}
                    </Typography>
                    <Typography sx={{ color: 'GrayText' }}>
                        {postData.content.length > 150 ? postData.content.substring(0, 150).replaceAll('#', '').replaceAll('**', '') + "..." : postData.content.replaceAll('#', '').replaceAll('**', '')}
                    </Typography>
                    <Box sx={{ display: 'flex', mt: 1 }}>
                        <Link href={`/posts/${postData.id}`}>
                            <Typography sx={{
                                color: 'Highlight', fontSize: 14,
                                transition: 'all 0.3s ease', // 为过渡添加动画效果
                                '&:hover': {
                                    color: 'secondary.main', // 鼠标悬停时文字颜色变为主题的主色
                                    cursor: 'pointer', // 鼠标指针变为手形
                                },
                            }}>
                                阅读全文
                            </Typography>
                        </Link>
                        <Typography sx={{ marginLeft: 'auto', fontSize: 14 }}>
                            <BookmarksTwoToneIcon sx={{ mr: 1, fontSize: 16 }} />{postData.tag.join(', ')}
                        </Typography>
                    </Box>
                    <Divider sx={{ mt: 1.5 }} />
                </Box>
            </ListItem>
        )
    })
    return (
        <List sx={{
            mx: {
                xs: 0, // 超小屏幕： 2 * 8px
                sm: 'calc(5% + 16px)', // 小屏幕
                md: 'calc(15% + 20px)', // 中屏幕
                lg: 'calc(15% + 24px)', // 大屏幕
                xl: 'calc(25% + 32px)', // 超大屏幕
            }
        }}>
            {Posts}
        </List>
    )
}

export default PostList;
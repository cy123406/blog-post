"use client";
import BookmarksTwoToneIcon from '@mui/icons-material/BookmarksTwoTone';
import { Box, Divider, List, ListItem, TablePagination, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const PostListTemplate = ({ posts }) => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    // 每页默认大小
    const defaultSize = 5;
    const [rowsPerPage, setRowsPerPage] = useState(defaultSize);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
    // 按照时间排序
    posts.sort((a, b) => {
        let t1 = new Date(a.date)
        let t2 = new Date(b.date)
        return t2 - t1
    })
    const PostItem = posts.slice(rowsPerPage * page, Math.min(rowsPerPage * page + rowsPerPage, posts.length)).map(postData => {
        return (
            <ListItem key={postData.id}>
                <Box>
                    <Link href={`/posts/${postData.id}`}>
                        <Typography variant="h6" component={'span'} sx={{
                            transition: 'all 0.3s ease', // 为过渡添加动画效果
                            '&:hover': {
                                color: theme.palette.mode === 'dark' ? 'primary.main' : 'Highlight', // 鼠标悬停时文字颜色变为主题的主色
                                cursor: 'pointer', // 鼠标指针变为手形
                            },
                        }}>
                            {postData.title}
                        </Typography>
                    </Link>
                    <Typography sx={{ color: 'GrayText', my: 0.6 }}>
                        <Typography component={'span'} sx={{ mr: 1 }}>
                            发布于
                        </Typography>
                        {postData.date}
                    </Typography>
                    <Typography sx={{ color: 'GrayText' }}>
                        {postData.content}
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
            {PostItem}
            <TablePagination
                rowsPerPageOptions={[defaultSize, 10, 25]}
                component="div"
                count={posts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Size"
                sx={{ mb: 10 }}
            />
        </List>
    )
}

export default PostListTemplate;
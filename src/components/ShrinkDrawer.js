"use client";
import { ExpandCircleDownSharp } from "@mui/icons-material";
import { Box, Button, Drawer, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const openDraw = "openDraw";

const list = (data) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark' ? true : false;
    const appBarHeight = theme.mixins.toolbar.minHeight || 64; // 获取 AppBar 高度
    const offset = 16; // 偏移值
    const handleScroll = (targetId) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - (appBarHeight + offset),
                behavior: 'smooth'
            })
        }
        targetElement.classList.add('animate-pulse');
        if (isDark) {
            targetElement.style.background = '#282c34'
        } else {
            targetElement.style.background = '#fdf6e3'
        }
        setTimeout(() => {
            targetElement.style.background = '';
            targetElement.classList.remove('animate-pulse');
        }, 500);
    }
    return (
        data.map(r => (
            <ListItem key={r.id} onClick={() => handleScroll(`heading-${r.id}`)}>
                {space(r.level)}
                <ListItemText key={`text-${r.id}`} primary={r.text} />
            </ListItem>
        ))
    )
}

const space = (count) => (
    <Typography component='span'>
        {Array.from({ length: count }).map((_, index) => (
            <Typography key={index} component='span'
                sx={{ ml: 2 }}
            />
        ))}
    </Typography>
)

const ShrinkDrawer = ({ data }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    useEffect(() => {
        const prefersDrawer = window.localStorage.getItem(openDraw);
        if (prefersDrawer) {
            setOpen(prefersDrawer === 'true')
        }
    }, [])
    const toggleDrawer = () => {
        let newOpen = open ? false : true
        setOpen(newOpen);
        window.localStorage.setItem(openDraw, newOpen.toString())
    }
    return (
        <Box >
            <Button onClick={toggleDrawer} sx={{
                position: 'fixed',  // 固定在页面上
                bottom: 0,         // 距离底部 16px
                left: {
                    xs: open ? 240 : 0,
                    sm: open ? 240 : 0,
                    md: open ? 300 : 0,
                    lg: open ? 360 : 0
                },  // 如果抽屉打开，图标距离左侧360px，否则16px
                zIndex: 1,          // 确保图标在其他元素上方
            }}>
                <ExpandCircleDownSharp sx={{
                    transform: open ? 'rotate(90deg)' : 'rotate(-90deg)', // 根据状态控制旋转角度
                    transition: 'transform 0.3s ease', // 旋转动画
                }} />
            </Button>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                sx={{
                    width: {
                        xs: open ? 240 : 0,
                        sm: open ? 240 : 0,
                        md: open ? 300 : 0,
                        lg: open ? 360 : 0
                    },
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: {
                            xs: open ? 240 : 0,
                            sm: open ? 240 : 0,
                            md: open ? 300 : 0,
                            lg: open ? 360 : 0
                        },
                        boxSizing: 'border-box',
                        top: theme.mixins.toolbar.minHeight,  // AppBar高度
                        zIndex: 1,    // 确保抽屉在AppBar下方
                    },
                }}
            >
                <Box >
                    <List sx={{ pt: 6 }}>
                        {list(data)}
                    </List>
                </Box>
            </Drawer>
        </Box>
    )
}

export default ShrinkDrawer;
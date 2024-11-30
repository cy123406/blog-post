"use client";
import { useTheme } from "@emotion/react";
import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useState } from "react";

const Medias = ({ data }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const viewOpenHandle = (index) => {
        setCurrentIndex(index)
        setOpen(true);
    }
    const viewCloseHandle = () => {
        setOpen(false);
    }
    const showdiv = data.map((r, index) => {
        return (
            <Box key={index} sx={{ mt: [5, 8], ml: [0,3] }}>
                {
                    r.type === 'image' ? (
                        <Box
                            component="img"
                            src={r.src}
                            alt={r.alt}
                            sx={{
                                width: 240, // 小图片宽度
                                height: 140, // 小图片高度
                                objectFit: 'cover', // 保持图片比例并裁剪溢出部分
                                borderRadius: 1, // 可选：圆角效果
                                border: '1px solid #ccc', // 可选：边框样式
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    cursor: 'pointer', // 鼠标指针变为手形
                                    transform: 'scale(1.05)', // 放大 10%
                                    boxShadow: theme.palette.mode === 'dark' ? '0 4px 15px rgba(250, 250, 250, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.3)', // 添加阴影
                                },
                            }}
                            onClick={() => viewOpenHandle(index)}
                        />) : (
                        <Box
                            component="video"
                            src={r.src}
                            onMouseEnter={(e) => e.currentTarget.play()} // 鼠标移入时播放
                            onMouseLeave={(e) => {
                                e.currentTarget.pause(); // 鼠标移出时暂停
                                e.currentTarget.currentTime = 0; // 可选：返回到视频开头
                            }}
                            sx={{
                                width: 240,
                                height: 140,
                                objectFit: 'cover', // 保持图片比例并裁剪溢出部分
                                borderRadius: 1, // 可选：圆角效果
                                border: '1px solid #ccc', // 可选：边框样式
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    cursor: 'pointer', // 鼠标指针变为手形
                                    transform: 'scale(1.05)', // 放大 10%
                                    boxShadow: theme.palette.mode === 'dark' ? '0 4px 15px rgba(250, 250, 250, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.3)', // 添加阴影
                                },
                            }}
                            onClick={() => viewOpenHandle(index)}
                        />)
                }

                <Typography textAlign='center' sx={{ mt: 2 }}>
                    {r.alt}
                </Typography>
            </Box>
        )
    })
    return (
        <Box display='flex' sx={{
            flexDirection: {
                xs: "column",
                sm: "row",
                alignItems: 'center',
            }
        }}>
            {showdiv}
            <Modal open={open} onClose={viewCloseHandle}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: 2,
                        textAlign: 'center',
                        outline: 'none',
                    }}
                >
                    {
                        data[currentIndex].type === 'image' ? (
                            <Box
                                component="img"
                                src={data[currentIndex].src}
                                alt={data[currentIndex].alt}
                                sx={{
                                    maxWidth: '90vw', // 控制弹窗内图片大小
                                    maxHeight: '90vh',
                                    borderRadius: 1,
                                }}
                            />
                        ) : (
                            <Box
                                component="video"
                                src={data[currentIndex].src}
                                controls
                                sx={{
                                    maxWidth: '90vw',
                                    maxHeight: '90vh',
                                    borderRadius: 1,
                                }}
                            />
                        )
                    }

                    {/* 关闭按钮 */}
                    <IconButton
                        onClick={viewCloseHandle}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            color: "gray",
                        }}
                    >
                        <Close sx={{
                            transition: 'transform 0.1s ease',
                            '&:hover': {
                                cursor: 'pointer', // 鼠标指针变为手形
                                transform: 'rotate(90deg)', // 旋转90°
                            },
                        }} />
                    </IconButton>
                </Box>
            </Modal>
        </Box>
    )
}

export default Medias;
import Medias from "@/components/media/Medias";

export default function Drawing() {
    const data = [
        { type: 'image', src: '/img/draw/huihui.jpg', alt: '魔法师-慧慧' },
        { type: 'video', src: '/video/tnpMovie.mp4', alt: '糖尿病科普-MG动画' },
    ]
    return (
        <Medias data={data} />
    )
}
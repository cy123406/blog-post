import { getAllPostIds, getPostDataById } from "@/lib/posts";
import PostListTemplate from "./PostListTemplate";

const PostList = () => {
    const ids = getAllPostIds().map(r => r.params.id);
    const posts = ids.map(r => {
        const post = getPostDataById(r)
        // 设定简介长度
        const contentMaxSize = 150;
        post.content = post.content.length > contentMaxSize ? post.content.substring(0, contentMaxSize) + "..." : post.content
        // todo makdown语法清洗
        post.content = post.content.replaceAll('#','').replaceAll('**','')
        return {
            ...post
        }
    });
    return (
        <PostListTemplate posts={posts} />
    )
}

export default PostList;
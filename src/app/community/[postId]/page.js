"use client";
import { useState, useEffect } from "react";
import ReadContent from "@/components/community/ReadContent";

const PostPage = ({ params }) => {
  const { postId } = params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const mockPost = {
        title: "주식 초보자를 위한 투자 전략 팁",
        author: "주린이",
        views: 15,
        date: "2024-07-09T15:58:00Z",
        content:
          "안녕하세요, 주식 투자에 처음 입문한 초보자입니다.\n요즘 주식 시장의 변동성이 크다 보니 어떻게 투자해야 할지 막막하네요.\n경험 많은 선배 투자자분들께서 주식 투자 시 꼭 알아야 할 기본적인 전략이나 주의해야 할 점에 대해 조언 부탁드립니다. 감사합니다!",
      };

      setPost(mockPost);
    };

    fetchPost();
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <ReadContent
      title={post.title}
      author={post.author}
      views={post.views}
      date={post.date}
      content={post.content}
    />
  );
};

export default PostPage;

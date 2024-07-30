"use client";
import { useState, useEffect } from "react";
import CommunityCard from "@/components/community/CommunityCard";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const newPosts = [
        {
          userName: "Daniel",
          userId: "danielwiden",
          content:
            "I've built pretty handy sites powered by Craft or WordPress in the past, but seeing @framer tackle CMS stuff so effortlessly is mind-boggling I've built pretty handy sites powered by Craft or WordPress in the past, but seeing @framer tackle CMS stuff so effortlessly is mind-boggling I've built pretty handy sites powered by Craft or WordPress in the past, but seeing @framer tackle CMS stuff so effortlessly is mind-boggling",
        },
        {
          userName: "Dann",
          userId: "dannpetty",
          content: "I learned how to build a website in @Framer!",
        },
        {
          userName: "Manoj",
          userId: "manojyjack",
          content: "Websites built on @framer look so beautiful.",
        },
        {
          userName: "Fekry",
          userId: "fekryjack",
          content:
            "I have been in an @framer rabbit hole for the past 8 hours without even noticing as time goes by — its everything I love in Figma combined with everything I love",
        },
        {
          userName: "Davo",
          userId: "pixelboat",
          content:
            "A quick word about @framer. Framer is forever changing the experience of designing for the web. Forget about a design tool. Once you get the basics, you're",
        },
        {
          userName: "Miguel",
          userId: "mgvslv",
          content:
            "Learned some basics of @framer yesterday, and today I delivered a landing page for a client. It’s so unreal how small the learning curve is from Figma to @framer.",
        },
        {
          userName: "Mani",
          userId: "ogamyar37",
          content:
            "The scroll variant in @framer hits differently. Never imaged that making some complex things would be easy with that. Everyday i learn something new",
        },
        {
          userName: "Parker",
          userId: "pl_parker",
          content:
            "I was enjoying @framer a lot but I am BLOWN AWAY by their Figma plug-in. From Auto-layout to flex-box in the browser in seconds; this has completely changed how",
        },
        {
          userName: "Lauren",
          userId: "write_tacos",
          content:
            "Honestly the @framer publish time is insanely fast. Just published 2 weeks of changes in 5 seconds – like it’s almost too fast for such a big moment.",
        },
        {
          userName: "Daniel",
          userId: "danielwiden",
          content:
            "I've built pretty handy sites powered by Craft or WordPress in the past, but seeing @framer tackle CMS stuff so effortlessly is mind-boggling",
        },
      ];

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container mx-auto p-4 flex justify-between">
      {[0, 1, 2].map((col) => (
        <div key={col} className="flex-1 mx-2">
          {posts
            .filter((_, index) => index % 3 === col)
            .map((post, index) => (
              <CommunityCard
                key={index}
                userName={post.userName}
                userId={post.userId}
                content={post.content}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default CommunityPage;

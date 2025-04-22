import { useNavigate, useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
//import axios from "axios";

const blogPosts = [
  {
    id: 1,
    title: "I love the rain",
    subTitle: "Or what could happened if you decide to walk from Porto to Santiago de Compostela",
    content: "...",
    year: "2024",
    author: "Martin Baran",
    comments: [
      {
        id: 1,
        date: "10.2.2025",
        author: "Michal",
        replyTo: null,
        message: "Nice text"
      },
      {
        id: 2,
        date: "11.2.2025",
        author: "Adam",
        replyTo: 1,
        message: "Yes, I agree"
      }
    ]
  }
];

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogPosts.find((v) => v.id === Number(id));
  const [comments, setComments] = useState(blog ? blog.comments : []);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  // useEffect(() => {
  //   axios.get(`http://localhost:5000/api/comments/${id}`)
  //     .then(response => setComments(response.data))
  //     .catch(error => console.error(error));
  // }, [id]);
  
  // const handleAddComment = () => {
  //   if (!newComment.trim()) return;
  
  //   axios.post("http://localhost:5000/api/comments", {
  //     postId: Number(id),
  //     author: "Guest",
  //     message: newComment,
  //     replyTo
  //   })
  //   .then(response => setComments([...comments, response.data]))
  //   .catch(error => console.error(error));
  
  //   setNewComment("");
  //   setReplyTo(null);
  // };
  
  const renderComments = (parentId = null) =>
    comments
      .filter((comment) => comment.replyTo === parentId)
      .map((comment) => (
        <div key={comment.id} className="ml-4 mt-2">
          <p>
            <strong>{comment.author}</strong> ({comment.date}): {comment.message}
          </p>
          <button
            className="text-blue-500 text-sm"
            onClick={() => setReplyTo(comment.id)}
          >
            Reply
          </button>
          {renderComments(comment.id)}
        </div>
      ));

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="text-black hover:text-black/80 transition-colors flex items-center gap-2 pb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </Link>

        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <h3 className="text-2xl font-bold mb-4">{blog.subTitle}</h3>
        <div className="row">
          <p>Year: {blog.year}</p>
          <p>Author: {blog.author}</p>
        </div>

        <div className="grid mt-10">
          <p className="text-gray-700 mb-6">{blog.content}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold">Comments</h3>
          {renderComments()}
          <div className="mt-4">
            <textarea
              className="w-full border border-gray-300 rounded-md p-2"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            />
            {/* <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleAddComment}
            >
              Add Comment
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

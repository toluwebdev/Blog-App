import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { assets, blog_data, comments_data } from "../assets/assets";
import Footer from "../components/Footer";
import Moment from "moment";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
const Blog = () => {
  let { _id } = useParams();
  let { axios } = useAppContext();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("api/blog/comments", { blogId: _id });

      console.log(data);
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  };
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: _id,
        name,
        content,
      });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  };
  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${_id}`);
      console.log(data);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);
  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2
          className="my-5 max-w-lg truncate mx-auto"
          dangerouslySetInnerHTML={{ __html: data.subTitle }}
        ></h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          Tolu Oladoja
        </p>
      </div>
      <div className="mx-5 max-w-7xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />
        <div
          className="rich-text max-w-7xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
      </div>

      {/* Comments Section */}
      <div className="mt-14 mb-10 max-w-7xl lg:mx-auto mx-5">
        <p className="font-semibold mb-4">Comments ({comments.length})</p>
        <div className="flex flex-col gap-4">
          {comments.map((item, index) => (
            <div
              key={index}
              className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={assets.user_icon} className="w-6" alt="" />
                <p className="font-medium">{item.name}</p>
              </div>
              <p className="text-sm max-w-md ml-8">{item.content}</p>
              <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                {Moment(item.createdAt).fromNow()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Add Comment Section */}
      <div className="max-w-7xl  lg:mx-auto mx-5">
        <p className="font-semibold mb-4">Add you comment</p>
        <form
          onSubmit={addComment}
          className="flex flex-col items-start gap-4 max-w-lg"
        >
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
            required
            className="w-full p-2 border border-gray-300 rounded outline-none"
          />
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Comment"
            required
            className="w-full p-2 border border-gray-300 rounded outline-none h-48"
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Share Buttons */}
      <div className="my-24 max-w-7xl lg:mx-auto mx-5">
        <p className="font-semibold my-4">Share this article on social media</p>
        <div className="flex">
          <img src={assets.facebook_icon} width={50} alt="" />
          <img src={assets.twitter_icon} width={50} alt="" />
          <img src={assets.googleplus_icon} width={50} alt="" />
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;

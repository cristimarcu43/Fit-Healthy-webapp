import React from "react";

import PostItem from "./PostItem";

const PostList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="text-center">
        <h2 className=" text-3xl p-6">Nu exista postari. Poate creezi una?</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          to="/postari/creare"
        >
          CREAZA
        </button>
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-3 gap-4 ml-8 mt-8">
      {props.items.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          image={post.image}
          title={post.title}
          description={post.description}
          creatorId={post.creator}
          onDelete={props.onDeletePost}
        />
      ))}
    </ul>
  );
};

export default PostList;

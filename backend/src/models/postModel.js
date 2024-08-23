const db = require("../../database");

const createPostTable = async () => {
  await db.run(
    `USE DATABASE chinook.sqlite; 
    CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )`
  );
};

const addPost = async (title, content) => {
  const response =
    await db.sql`USE DATABASE chinook.sqlite; INSERT INTO 'posts' (title, content) VALUES (${title}, ${content})`;
  return response;
};

const updatePost = async (id, title, content) => {
  const response =
    await db.sql`USE DATABASE chinook.sqlite; UPDATE 'posts' SET title = ${title}, content = ${content} WHERE id = ${id};`;
  return response;
};

const getPost = async (id) => {
    const post = await db.sql`USE DATABASE chinook.sqlite; SELECT * FROM posts WHERE id = ${id};`;
    return post;
}

const getAllPosts = async () => {
    const posts = await db.sql`USE DATABASE chinook.sqlite; SELECT * FROM 'posts';`;
    return posts;
}

const deletePost = async (id) => {
    const response = await db.sql`USE DATABASE chinook.sqlite; DELETE FROM 'posts' WHERE id = ${id};`;
    return response;
}

module.exports = {createPostTable, addPost, updatePost, getPost, getAllPosts, deletePost}

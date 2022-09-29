# Node.js API

I created this app to showcase and build skill in developing Node.js APIs that utilizes Redis for query caching and MongoDB as a database.

## Table of Contents

1. Environment and App Setup
2. How to build/run
3. Endpoints
4. Assumptions made during development
5. Known Issues

## 1. Environment and App Setup

To use this app you must have a MongoDB database and a redis server. Create a file at the root of your directory named '.env'. Format it like the following and replace the values with your own:

    HOST='YOUR_VALUE_HERE'
    PORT=YOUR_VALUE_HERE
    REDIS_PASSWORD='YOUR_VALUE_HERE'
    MONGODB_PATH_PROD='YOUR_VALUE_HERE'
    MONGODB_PATH_TEST='YOUR_VALUE_HERE'


## 2. How to build/run the app

Navigate to apps root directory in your favorite terminal or IDE and run the following command 
to install all packages the app needs to run:
    
    npm install

The following command will start the app:

    npm run dev

This next command will run all tests.

    npm test

## 3. Endpoints

### Posts
1. /createPost - POST request to create a post. Returns newly created post.
2. /updatePost -  PUT request to update a post. Returns updated post.
3. /getPost - GET request to retrieve a post by `_id` passed in as a query parameter. Returns queried post.
4. /getPosts - GET request to retrieve all posts. Returns an array of posts.
5. /deletePost - DELETE request that deletes a post by `_id' passed in as a query parameter. Returns deleted post.

### Comments
1. /createComment - POST request to create a comment. Returns newly created comment.
2. /updateComment -  PUT request to update a comment. Returns updated comment.
3. /getComment - GET request to retrieve a comment by `_id` passed in as a query parameter. Returns queried comment.
4. /getComments - GET request to retrieve all comments on a post by `post_id` passed in as a query parameter. Returns an array of comments.
5. /deleteComment - DELETE request that deletes a comment by `_id' passed in the body. Returns deleted comment.

## 4. Assumptions made during development

In production, an api like this would need authentication provided by any external system trying to hit the endpoints. For the purpose of this worksample, I chose not to require authentication for requests. As a result, any request received by this app is authorized regardless of origin.

I modeled my comment model after the post model. I chose to relate the two models by adding the `post_id` field to the comment model.

## 5. Known Issues

Occasionally a test will fail to tear down, resulting in an incorrect database state and causing some tests to fail. I have taken efforts to ensure tests properly tear down once they are finished but have been unable to completely fix the issue.


    

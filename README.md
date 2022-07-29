# DanThompsonBackendWorkSample

I created this app to showcase and build skills in building Node.js APIs that utilizes Redis for query cacheing and MongoDB.

## Table of Contents

1. How to build/run
2. Assumptions made during development
3. Known Issues

## 1. How to build/run the app

Navigate to apps root directory in your favorite terminal or IDE and run the following command 
to install all packages the app needs to run:
    
    npm install

The following command will start the app:

    npm run dev

This next command will run all tests.

    npm test

## 2. Assumptions made during development

In production, an api like this would need authentication provided by any external system trying to hit the endpoints. For the purpose of this worksample, I chose not to require authentication for requests. As a result, any request received by this app is authorized regardless of origin.

I modeled my comment model after the post model. I chose to relate the two models by adding the `post_id` field to the comment model.

## 3. Known Issues

Occasionally a test will fail to tear down, resulting in an incorrect database state and causing some tests to fail. I have taken efforts to ensure tests properly tear down once they are finished but have been unable to completely fix the issue.


    

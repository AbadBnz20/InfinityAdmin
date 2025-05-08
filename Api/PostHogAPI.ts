'use server';

import axios from "axios";


 const baseURL = `https://app.posthog.com/api/projects/${process.env.PROYECT_POSTHOG}/`;

const PostHogApi = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
     
    },
  });

  PostHogApi.interceptors.request.use(async config => {
    config.headers['Authorization'] = `Bearer ${process.env.KEY_POSTHOG}`;
    return config;
  });


export {PostHogApi};

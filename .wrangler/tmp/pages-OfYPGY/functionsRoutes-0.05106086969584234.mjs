import { onRequestGet as __api_comments__slug__js_onRequestGet } from "/Users/king/Projects/new_blog/functions/api/comments/[slug].js"
import { onRequestPost as __api_comments__slug__js_onRequestPost } from "/Users/king/Projects/new_blog/functions/api/comments/[slug].js"
import { onRequestGet as __api_views__slug__js_onRequestGet } from "/Users/king/Projects/new_blog/functions/api/views/[slug].js"
import { onRequestPost as __api_views__slug__js_onRequestPost } from "/Users/king/Projects/new_blog/functions/api/views/[slug].js"

export const routes = [
    {
      routePath: "/api/comments/:slug",
      mountPath: "/api/comments",
      method: "GET",
      middlewares: [],
      modules: [__api_comments__slug__js_onRequestGet],
    },
  {
      routePath: "/api/comments/:slug",
      mountPath: "/api/comments",
      method: "POST",
      middlewares: [],
      modules: [__api_comments__slug__js_onRequestPost],
    },
  {
      routePath: "/api/views/:slug",
      mountPath: "/api/views",
      method: "GET",
      middlewares: [],
      modules: [__api_views__slug__js_onRequestGet],
    },
  {
      routePath: "/api/views/:slug",
      mountPath: "/api/views",
      method: "POST",
      middlewares: [],
      modules: [__api_views__slug__js_onRequestPost],
    },
  ]
declare module "routes-gen" {
  export type RouteParams = {
    "/action/posts/:slug/set-views": { "slug": string };
    "/maria-quieres-ser-mi-novia": {};
    "/action/update-content-sha": {};
    "/action/post-content": {};
    "/api/get-content-sha": {};
    "/api/get-posts-slugs": {};
    "/action/set-theme": {};
    "/posts/:slug": { "slug": string };
    "/about": {};
    "/": {};
    "/posts": {};
  };

  export function route<
    T extends
      | ["/action/posts/:slug/set-views", RouteParams["/action/posts/:slug/set-views"]]
      | ["/maria-quieres-ser-mi-novia"]
      | ["/action/update-content-sha"]
      | ["/action/post-content"]
      | ["/api/get-content-sha"]
      | ["/api/get-posts-slugs"]
      | ["/action/set-theme"]
      | ["/posts/:slug", RouteParams["/posts/:slug"]]
      | ["/about"]
      | ["/"]
      | ["/posts"]
  >(...args: T): typeof args[0];
}

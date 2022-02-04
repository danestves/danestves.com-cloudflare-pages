declare module "routes-gen" {
  export type RouteParams = {
    "/action/posts/:slug/set-views": { slug: string };
    "/action/update-content-sha": {};
    "/action/post-content": {};
    "/api/get-content-sha": {};
    "/action/set-theme": {};
    "/posts/:slug": { slug: string };
    "/": {};
    "/posts": {};
  };

  export function route<
    T extends
      | ["/action/posts/:slug/set-views", RouteParams["/action/posts/:slug/set-views"]]
      | ["/action/update-content-sha"]
      | ["/action/post-content"]
      | ["/api/get-content-sha"]
      | ["/action/set-theme"]
      | ["/posts/:slug", RouteParams["/posts/:slug"]]
      | ["/"]
      | ["/posts"]
  >(...args: T): typeof args[0];
}

declare module "routes-gen" {
  export type RouteParams = {
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
      | ["/action/update-content-sha"]
      | ["/action/post-content"]
      | ["/api/get-content-sha"]
      | ["/action/set-theme"]
      | ["/posts/:slug", RouteParams["/posts/:slug"]]
      | ["/"]
      | ["/posts"]
  >(...args: T): typeof args[0];
}

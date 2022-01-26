export var process = {
  env: new Proxy(
    {},
    {
      get: () => '',
    }
  ),
};

type RobotsPolicy = {
  type: 'allow' | 'disallow' | 'sitemap' | 'crawlDelay' | 'userAgent';
  value: string;
};

type RobotsConfig = {
  appendOnDefaultPolicies?: boolean;
  headers?: HeadersInit;
};

export { RobotsConfig, RobotsPolicy };

Middleware Demo
============================

```
curl https://<PROJECT-NAME>.glitch.me/

```

Organization routes by specificity

Generally speaking we want the following order

- middleware used for all routes (EG logging)
- (opt 1) static routes
- middleware for dynamic routes (EG parsers)
- dynamic routes
- (opt 2) static routes
- catch all routes
- error handlers
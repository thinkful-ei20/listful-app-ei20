Middleware Demo
============================

```
curl https://<PROJECT-NAME>.glitch.me/

```

Organization routes by specificity

Generally speaking we want the following order

- middleware used for all routes (EG logging)
- static routes
- middleware for dynmanic routes (EG parsers)
- dynamic routes
- catch all routes
- error handlers

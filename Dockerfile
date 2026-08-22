FROM node:20-alpine AS blog-build
WORKDIR /blog
COPY blog/package.json blog/package-lock.json ./
RUN npm ci
COPY blog/ .
RUN npx eleventy

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html cuerposonoro.html robots.txt sitemap.xml /usr/share/nginx/html/
COPY img/ /usr/share/nginx/html/img/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY --from=blog-build /blog/_site/blog/ /usr/share/nginx/html/blog/

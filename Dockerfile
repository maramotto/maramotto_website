FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/
COPY cuerposonoro.html /usr/share/nginx/html/
COPY img/ /usr/share/nginx/html/img/
COPY css/ /usr/share/nginx/html/css/

FROM nginx:1.14.0-alpine

COPY .o3/deploy/nginx.conf /etc/nginx/nginx.conf
COPY styleguide/ /usr/share/nginx/html/
COPY docs/ /usr/share/nginx/html/docs/

EXPOSE 80

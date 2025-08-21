FROM nginx:alpine

# Copy built files into nginx
COPY dist/assets /usr/share/nginx/html/assets
COPY dist/pages /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
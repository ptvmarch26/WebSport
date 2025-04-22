# Chọn base image cho Node.js
FROM node:20 AS build

# Cài đặt thư mục làm việc
WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package*.json ./

RUN npm install

# Copy toàn bộ mã nguồn frontend vào container
COPY . .

# Chạy build ứng dụng
RUN npm run build

# Chọn image để chạy ứng dụng, sử dụng Nginx để phục vụ các tệp build
FROM nginx:alpine

# Copy file cấu hình Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build từ image trước đó vào thư mục phục vụ của Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Mở cổng 80 để phục vụ ứng dụng
EXPOSE 80

# Khởi động Nginx để phục vụ ứng dụng frontend
CMD ["nginx", "-g", "daemon off;"]

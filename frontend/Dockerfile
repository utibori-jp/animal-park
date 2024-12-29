FROM node:23.5-slim

# Docker-composeでファイルが同期されるのは、ビルド後
# そのため、ビルド時にpackage.jsonをコピーする必要がある。
WORKDIR /react-frontend
COPY . /react-frontend
# ちゃんと動作を確認したい時はこっち。ただし、ビルドに時間がかかる
# RUN rm -rf node_modules && npm install
# node_modulesのキャッシュを再利用するため、ビルドが早い
RUN npm install

CMD ["npm", "run", "dev"]

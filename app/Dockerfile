ARG NODE_VERSION=20.17

FROM node:${NODE_VERSION}

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chrome that Puppeteer
# installs, work.
RUN apt-get update
RUN apt-get install -y wget
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb
RUN apt-get update

RUN apt-get install -y fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros fonts-kacst \
    fonts-freefont-ttf fonts-noto-color-emoji \
      --no-install-recommends \
    && service dbus start \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -r pptruser && useradd -rm -g pptruser -G audio,video pptruser

COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build


ENTRYPOINT ["npm", "start"]
# idk an image that send telegram bot message when mc login

```yml
mc-access-log:
  image: "toto04/mc-access-log:latest"
  container_name: "mc-access-log"
  restart: unless-stopped
  environment:
    - "BOT_TOKEN=<your bot token>"
    - "BOT_CHAT_ID=<your chat id>"
  volumes:
    - "/path/to/logs/latest.log:/app/file.log"
```

### build
```bash
docker build -t toto04/mc-access-log .
```
This is a Github Action to send message to discord webhooks.

## Usage

```yaml
- name: Send Discord Message
  uses: NicolasPECH/discord_notification@latest
  with:
    webhook_token: ${{ secrets.DISCORD_WEBHOOK_TOKEN }}
    webhook_id: ${{ secrets.DISCORD_WEBHOOK_ID }}
    message: "Hello World"
    embeds: |
      {"title": "Hello World", "description": "This is a test"},
      {"title": "Hello World", "description": "This is a second test"}
    username: "My Bot"
    avatar_url: "https://avatars.githubusercontent.com/u/12345678"
    suppress_embeds: "true"
    allowed_mentions: "true"
```

## Inputs

| Type    | Name             | Description                | Required | Default |
|---------|------------------|----------------------------|----------|---------|
| string  | webhook_token    | The token of the webhook   | true     | N/A     |
| string  | webhook_id       | The id of the webhook      | true     | N/A     |
| string  | message          | The message to send        | false    | N/A     |
| string  | embeds           | The embeds to send         | false    | N/A     |
| string  | username         | The username to use        | false    | N/A     |
| string  | avatar_url       | The avatar url to use      | false    | N/A     |
| boolean | suppress_embeds  | Whether to suppress embeds | false    | false   |
| boolean | allowed_mentions | Whether to allow mentions  | false    | false   |


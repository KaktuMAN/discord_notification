const core = require('@actions/core');
const discord = require('discord.js');

// Variables from the workflow call
const webhook_id = core.getInput('webhook_id');
const webhook_token = core.getInput('webhook_token');
const supress_embeds = core.getInput('supress_embeds');
const allow_mentions = core.getInput('allow_mentions');
const avatar_url = core.getInput('avatar_url');
const username = core.getInput('username');
const message = core.getInput('message');
let embeds = core.getInput('embeds');

if (!webhook_id) {
    core.setOutput("status", "failed");
    core.setFailed("Webhook ID is required");
}

if (!webhook_token) {
    core.setOutput("status", "failed");
    core.setFailed("Webhook Token is required");
}

if (!message && !embeds) {
    core.setOutput("status", "failed");
    core.setFailed("Message, Embeds, or Files are required");
}

if (message.length > 2000) {
    core.setOutput("status", "failed");
    core.setFailed("Message length is too long (Max 2000 characters)");
}

if (embeds) {
    try {
        embeds = JSON.parse(embeds);
    } catch (e) {
        core.setOutput("status", "failed");
        core.setFailed("Embed is not valid JSON");
    }
}

const client = new discord.WebhookClient({ id: webhook_id, token: webhook_token });

client.send({
    content: message ? message : undefined,
    embeds: embeds ? [embeds] : undefined,
    allowedMentions: allow_mentions === "false" ? undefined : { parse: ["users", "roles", "everyone"] },
    username: username ? username : undefined,
    avatarURL: avatar_url ? avatar_url : undefined,
    flags: supress_embeds === true ? 4 : undefined,
}).then(() => {
    core.setOutput("status", "success");
    core.info("Message sent successfully");
}).catch((e) => {
    core.setOutput("status", "failed");
    core.setFailed(e.message);
});
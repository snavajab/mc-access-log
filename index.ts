import { config } from "dotenv";
import { spawn } from "child_process";
import { createInterface } from "readline";
import { Telegraf } from "telegraf";
import { join, bold, code } from "telegraf/format";

config();
const botToken = process.env.BOT_TOKEN;
const botChatId = process.env.BOT_CHAT_ID;
if (!botToken) {
    throw new Error("BOT_TOKEN is not defined");
}
if (!botChatId) {
    throw new Error("BOT_CHAT_ID is not defined");
}

const bot = new Telegraf(botToken);
bot.launch();
console.log("all good, starting...");
const tail = spawn("tail", ["-F", "file.log"]);
createInterface({
    input: tail.stdout,
    terminal: false,
}).on("line", (line) => {
    if (line.includes("logged in")) {
        bot.telegram.sendMessage(
            botChatId,
            join([bold("New Login:"), "\n", code(line)])
        );
    }
    if (line.includes("white-listed")) {
        bot.telegram.sendMessage(
            botChatId,
            join([bold("FAILED ACCESS ATTEMPT:"), "\n", code(line)])
        );
    }
});

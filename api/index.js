export default async function handler(req, res) {
  return res.status(200).json({
    status: true,
    message: "🧃 Welcome to the Telegram Sticker Pack API by @EmojisxStickersBot",
    usage: "Use /api/create-sticker with bot_token, user_id, pack_name, title, image_url, emojis",
    example: "/api/create-sticker?bot_token=xxx&user_id=123&pack_name=abc&title=abc&image_url=https://example.com/img.png&emojis=😎"
  });
}

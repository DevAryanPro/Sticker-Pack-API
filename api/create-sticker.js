import fetch from 'node-fetch';
import FormData from 'form-data';

export default async function handler(req, res) {
  const { bot_token, user_id, pack_name, title, image_url, emojis = '😎' } = req.query;

  if (!bot_token || !user_id || !pack_name || !title || !image_url) {
    return res.status(400).json({
      error: '❌ Missing required parameters',
      required: ['bot_token', 'user_id', 'pack_name', 'title', 'image_url']
    });
  }

  try {
    const imageRes = await fetch(image_url);
    if (!imageRes.ok) {
      return res.status(400).json({ error: '❌ Failed to download image from image_url' });
    }

    const imageBuffer = await imageRes.buffer();

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('name', pack_name);
    formData.append('title', `${title} | @EmojisxStickersBot`);
    formData.append('emojis', emojis);
    formData.append('png_sticker', imageBuffer, {
      filename: 'sticker.png',
      contentType: 'image/png'
    });

    const tgRes = await fetch(`https://api.telegram.org/bot${bot_token}/createNewStickerSet`, {
      method: 'POST',
      body: formData
    });

    const result = await tgRes.json();

    if (!result.ok) {
      return res.status(400).json({
        error: '❌ Telegram API error',
        description: result.description || 'Unknown error'
      });
    }

    return res.status(200).json({
      success: true,
      message: '✅ Sticker pack created!',
      share_link: `https://t.me/addstickers/${pack_name}`
    });
  } catch (err) {
    return res.status(500).json({ error: '❌ Internal Server Error', detail: err.message });
  }
}

export default function handler(req, res) {
  res.status(404).json({
    error: "❌ Route not found",
    usage: "Go to / for usage instructions or use /api/create-sticker"
  });
}

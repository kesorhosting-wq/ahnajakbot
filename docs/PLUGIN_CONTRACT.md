# Future Minecraft Plugin Contract

This website/bot does NOT store offline rewards. It stores only payment/order status.

Correct final flow later:

1. Discord user buys a product.
2. KHQR callback marks order as `plugin_pending`.
3. Backend sends the paid order once to the Minecraft plugin.
4. Plugin handles delivery:
   - if player is online: instant give
   - if player is offline: save pending reward in `plugins/AhnajakMCStore/data.yml`
   - on player join: auto give
   - `/check`: manually claim/check pending rewards

Expected future plugin endpoint:

POST /reward
Authorization: Bearer <plugin_api_key>

```json
{
  "transaction_id": "ORD-ABC",
  "minecraft_username": "BlazerxXx",
  "product_id": "uuid",
  "product_name": "VIP Rank",
  "commands": ["lp user %player% parent add vip"]
}
```

Plugin must prevent duplicate `transaction_id` delivery.

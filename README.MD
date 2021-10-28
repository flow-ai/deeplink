# Flow Deeplink builder

Serves for two purposes:
1. Creates encoded deeplinks for Facebook Messenger, Telegram and any other integration. Data that will be encoded in the deeplink (**may differ based on length limitations of network**):
  - Type of postback (text or event)
  - Postback value (text or event name)
  - Language
  - Region
  - Set
2. Decodes given deeplink and gives back result.
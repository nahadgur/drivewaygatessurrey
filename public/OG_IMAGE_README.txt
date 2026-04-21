OG IMAGE TODO
=============

File to create:
  public/og-image.png

Specification:
  - Dimensions: exactly 1200 x 630 pixels
  - Format: PNG (or JPG if preferred, but rename references accordingly)
  - Maximum file size: 500 KB
  - Colour mode: RGB, sRGB
  - Aspect ratio must be exactly 1.91:1 to display correctly across
    Facebook, LinkedIn, WhatsApp, iMessage, Slack, Twitter.

What it should contain:
  - Site name: "Driveway Gates Surrey"
  - Tagline or short proof line: e.g. "Vetted Gate Installers Across Surrey"
  - Brand background (the warm stone / bronze palette already in use)
  - Optional: the DG logo mark
  - Leave ~80px padding all round so nothing gets cropped by
    platform-specific safe areas

What it should NOT contain:
  - Small text (<24px effective size) - will be illegible on mobile previews
  - Fake review counts, "4.9 stars", "127 reviews" etc (portfolio rule)
  - The word "Guaranteed" in reference to installer work
  - Claims about specific installer outcomes

Tools to use:
  - Figma: search "1200x630 OG image template"
  - Canva: social -> Facebook post template (1200x630)
  - Photopea (free, browser-based)

Once created:
  1. Save the file as public/og-image.png
  2. Deploy
  3. Test at https://www.opengraph.xyz/ by pasting
     https://www.drivewaygatessurrey.uk/
  4. Test at https://cards-dev.twitter.com/validator (for Twitter)

Until this file is created, social shares of the homepage will still
work but will fall back to showing no image (or the square favicon on
platforms that cache legacy OG data). It will not break anything.

Referenced from:
  app/layout.tsx (openGraph.images and twitter.images)

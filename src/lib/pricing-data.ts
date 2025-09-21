
export const pricingData = {
  "site": {
    "brand": "SellerSuite",
    "domain_primary": "sellersuite.ae",
    "personal_hub_path": "/me",
    "currency": "USD",
    "billing_cycle": "monthly",
    "notes": "No free tier. Low entry price. AI usage billed via credits & addons."
  },
  "pricing_plans": [
    {
      "plan_id": "any_app_monthly",
      "name": "Any App",
      "price_usd_monthly": 4.60,
      "price_display": "$4.60 / month",
      "short_tagline": "Pick one app. Start now.",
      "description": "Full access to any single SellerSuite app.",
      "features": [
        "1 selected app unlocked",
        "Standard support",
        "Single user"
      ],
      "limits": {
        "apps_allowed": 1,
        "copilots_allowed": 0,
        "credits_included": 0,
        "users_allowed": 1
      },
      "recommended": false,
      "cta_text": "Start Any App",
      "payment_provider_price_id": null
    },
    {
      "plan_id": "any_copilot_monthly",
      "name": "Any CoPilot",
      "price_usd_monthly": 9.30,
      "price_display": "$9.30 / month",
      "short_tagline": "One CoPilot with AI automation.",
      "description": "AI-powered CoPilot for a vertical (e.g., Listing, Meta).",
      "features": [
        "Up to 5 apps bundled",
        "AI automation & workflows",
        "Priority support"
      ],
      "limits": {
        "apps_allowed": 5,
        "copilots_allowed": 1,
        "credits_included": 10,
        "users_allowed": 1
      },
      "recommended": true,
      "cta_text": "Activate CoPilot",
      "payment_provider_price_id": null
    },
    {
      "plan_id": "pro_all_monthly",
      "name": "PRO ALL",
      "price_usd_monthly": 91.00,
      "price_display": "$91.00 / month",
      "short_tagline": "Unlock everything. All apps. All copilots.",
      "description": "Full ecosystem with unlimited access, credits, and priority onboarding.",
      "features": [
        "Unlimited apps & copilots",
        "500 credits/month included",
        "Priority support & training",
        "Team seats available"
      ],
      "limits": {
        "apps_allowed": "unlimited",
        "copilots_allowed": "unlimited",
        "credits_included": 500,
        "users_allowed": "configurable"
      },
      "recommended": false,
      "cta_text": "Go PRO ALL",
      "payment_provider_price_id": null
    }
  ],
  "addons": [
    {
      "addon_id": "ai_video_presenter",
      "name": "AI Video Presenter",
      "price_usd": 4.66,
      "price_display": "$4.66 / video",
      "type": "pay_per_use",
      "description": "Generate professional AI presenter videos with studio-quality voices.",
      "limits": {
        "unit": "video",
        "per_unit_price": 4.66
      },
      "cta_text": "Create AI Video"
    }
  ],
  "special_rules": {
    "assistant_free_rule": {
      "feature_name": "SellerSuite Assistant",
      "description": "Free unlock when user activates 5+ apps.",
      "unlock_condition": {
        "apps_opened_count": { "min": 5 }
      },
      "value": "Free unlimited Assistant usage",
      "notes": "Acts as engagement reward & upsell path toward PRO ALL."
    }
  },
  "ui_copy": {
    "pricing_section_title": "Choose your plan",
    "pricing_section_subtitle": "No free tier. Pick one app, unlock AI CoPilot, or go PRO ALL.",
    "addon_title": "On-Demand Addons",
    "special_title": "Unlockable Features"
  },
  "firebase_metadata": {
    "collection": "pricing",
    "document_id": "plans_v1",
    "last_updated": "2025-09-21T12:00:00Z",
    "version": "1.1"
  }
}

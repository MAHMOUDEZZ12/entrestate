export const secretCodes = [
    {
        code: 'SUPERLEAD2025',
        reward: 'One free, well-promoted lead generation campaign.',
        action: { type: 'start_lead_gen_campaign' }
    },
    {
        code: '3MONTHSFREE',
        reward: 'Three months of the Super Seller Pro plan for free.',
        action: { type: 'apply_subscription_discount', months: 3 }
    },
    {
        code: 'BRANDBOOST',
        reward: 'A complete branding package including a new logo, color scheme, and 5 social media templates.',
        action: { type: 'generate_full_brand_kit' }
    }
];

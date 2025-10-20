# Instagram Configuration Guide

## 🎯 Instagram Strategy Options

You can easily switch between different Instagram strategies by modifying the `src/config/socialMedia.ts` file.

### Option 1: Portfolio Only (Recommended for Professionals)
```typescript
instagramStrategy: 'portfolio'
```
- Shows only your professional photography Instagram
- Clean, focused presentation
- Best for attracting clients

### Option 2: Both Accounts
```typescript
instagramStrategy: 'both'
```
- Shows both portfolio and personal Instagram
- Portfolio labeled as "Photography" / "Fotografia"
- Personal labeled as "Personal" / "Osobné"
- Good for showing personality while maintaining professionalism

### Option 3: Single Account
```typescript
instagramStrategy: 'single'
```
- Shows only one Instagram account (defaults to portfolio)
- Simple, minimal approach

## 🔧 How to Configure

1. **Edit the configuration file:**
   ```bash
   src/config/socialMedia.ts
   ```

2. **Update your Instagram URLs:**
   ```typescript
   instagram: {
     portfolio: {
       url: 'https://www.instagram.com/your_portfolio_account/',
       username: 'your_portfolio_account',
       type: 'portfolio'
     },
     personal: {
       url: 'https://www.instagram.com/your_personal_account/',
       username: 'your_personal_account', 
       type: 'personal'
     }
   }
   ```

3. **Choose your strategy:**
   ```typescript
   instagramStrategy: 'portfolio' // or 'both' or 'single'
   ```

## 💡 Recommendations

### For Photography Business:
- Use `instagramStrategy: 'portfolio'`
- Focus on your best work only
- Professional, clean presentation

### For Personal Brand:
- Use `instagramStrategy: 'both'`
- Show professional work + personal side
- More relatable to potential clients

### For Flexibility:
- Start with `portfolio` and switch to `both` later
- Easy to change anytime without code modifications

## 🌍 Translations

The system automatically handles translations:
- English: "Photography" / "Personal"
- Slovak: "Fotografia" / "Osobné"

## 🚀 Testing

After making changes:
1. Save the configuration file
2. The changes will appear immediately in development
3. Test both language versions
4. Deploy when ready

## 📱 Current Setup

Currently configured with:
- **Strategy**: Portfolio only
- **Account**: @matko_baran
- **Labels**: "Photography" (EN) / "Fotografia" (SK)

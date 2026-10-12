# 📤 Push Leaf Lightly to GitHub

## **Step 1: Create GitHub Repository**

1. Go to [github.com/new](https://github.com/new)
2. Repository name: **`leaf-lightly`**
3. Description: **"Eco-conscious affiliate discovery platform"**
4. **Public** or **Private** (your choice)
5. **Do NOT** check "Initialize with README" (we have one)
6. Click **"Create repository"**

---

## **Step 2: Copy the Repository URL**

After creating, GitHub shows:
```
https://github.com/YOUR_USERNAME/leaf-lightly.git
```

Copy this URL.

---

## **Step 3: Initialize Git & Push**

Open PowerShell/CMD in `C:\Users\david\projects\leaf-lightly` and run:

```bash
git init
git add .
git commit -m "Initial commit: Leaf Lightly MVP - Production ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/leaf-lightly.git
git push -u origin main
```

**Important**: Replace `YOUR_USERNAME` with your actual GitHub username.

---

## **Step 4: Verify on GitHub**

1. Go to your repository: `https://github.com/YOUR_USERNAME/leaf-lightly`
2. You should see:
   - ✅ All your files uploaded
   - ✅ `src/` folder with code
   - ✅ `package.json`
   - ✅ `vercel.json`
   - ✅ `next.config.ts`

---

## **Step 5: Connect to Vercel**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Click **"Continue with GitHub"** (you already authorized)
4. Find **"leaf-lightly"** in the list
5. Click **"Import"**

Vercel will auto-import from your GitHub repository!

---

## **Troubleshooting Git Push**

### **Error: "Git not found"**
→ You need to install Git: [git-scm.com](https://git-scm.com/download/win)
→ Or use GitHub Desktop: [desktop.github.com](https://desktop.github.com)

### **Error: "Permission denied"**
→ Use GitHub Personal Access Token instead of password
→ Create one: [github.com/settings/tokens](https://github.com/settings/tokens)

### **Error: "Remote already exists"**
→ You already have a remote configured
→ Check with: `git remote -v`
→ Remove with: `git remote remove origin`

---

## **Alternative: Use GitHub Desktop**

If command line is difficult:
1. Download [GitHub Desktop](https://desktop.github.com)
2. File → Clone Repository
3. Create New Repository → Local Path
4. Publish repository
5. Done! ✓

---

**After pushing to GitHub, Vercel will auto-detect and let you import!**

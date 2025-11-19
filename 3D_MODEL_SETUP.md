# 3D Model Setup Guide

## How to Add Your 3D Building Model

The Available Houses page now has a 3D model section ready for your building model. Here's how to add it:

### Option 1: Using Sketchfab (Recommended - Free)

1. **Create/Export Your 3D Model:**
   - Use Blender, SketchUp, or any 3D modeling software
   - Export as .glb, .gltf, or .obj format

2. **Upload to Sketchfab:**
   - Go to https://sketchfab.com
   - Sign up for a free account
   - Click "Upload" and upload your 3D model
   - Wait for processing to complete

3. **Get Embed Code:**
   - Open your model on Sketchfab
   - Click "Embed" button
   - Copy the embed URL (looks like: `https://sketchfab.com/models/YOUR_MODEL_ID/embed`)

4. **Add to Website:**
   - Open `public/join.html`
   - Find the `load3DModel('sketchfab')` function (around line 365)
   - Replace the example URL with your Sketchfab embed URL:
   ```javascript
   iframe.src = 'YOUR_SKETCHFAB_EMBED_URL?autostart=1&ui_controls=1';
   ```

### Option 2: Using YouTube/Vimeo Video

1. **Create a Video Tour:**
   - Record a video walkthrough of your building
   - Or create an animated 3D flythrough

2. **Upload to YouTube:**
   - Upload your video to YouTube
   - Get the video ID from the URL

3. **Add to Website:**
   - Open `public/join.html`
   - Find the `load3DModel('video')` function
   - Replace with your YouTube embed URL:
   ```javascript
   iframe.src = 'https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1';
   ```

### Option 3: Using Matterport (Professional)

1. **Create Matterport Tour:**
   - Use Matterport 3D camera or hire a professional
   - Get your Matterport space URL

2. **Add to Website:**
   - Replace the iframe src with your Matterport embed URL

### Option 4: Self-Hosted 3D Model

If you want to host the 3D model yourself:

1. **Use Three.js:**
   - Add Three.js library to your page
   - Load your .glb/.gltf model
   - Render in a canvas element

2. **Example Code:**
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
   ```

## Current Status

The 3D model section is ready and functional. You just need to:
1. Create/get your 3D model or video
2. Upload to one of the platforms above
3. Update the URLs in `join.html`

The section includes:
- ✅ Interactive 3D viewer placeholder
- ✅ Video tour option
- ✅ Feature highlights (360° view, zoom, walkthrough)
- ✅ Responsive design for mobile and desktop

## Tips

- **For best results:** Use Sketchfab for interactive 3D models
- **For quick setup:** Use YouTube video tour
- **For professional look:** Consider Matterport for full building tours
- **File size:** Keep 3D models under 50MB for fast loading


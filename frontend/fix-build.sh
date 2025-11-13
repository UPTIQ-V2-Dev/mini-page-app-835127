#!/bin/bash

echo "🔧 Fixing pnpm build issue..."

# Check if pnpm exists
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm not found. Installing pnpm..."
    
    # Try to install pnpm via npm
    if command -v npm &> /dev/null; then
        echo "📦 Installing pnpm via npm..."
        npm install -g pnpm
        
        if [ $? -eq 0 ]; then
            echo "✅ pnpm installed successfully!"
        else
            echo "❌ Failed to install pnpm via npm. Trying alternative..."
            
            # Try corepack (if available)
            if command -v corepack &> /dev/null; then
                echo "📦 Enabling pnpm via corepack..."
                corepack enable
                corepack prepare pnpm@latest --activate
            else
                echo "❌ Neither npm nor corepack available. Using npx fallback..."
                echo "#!/bin/bash" > ./pnpm
                echo "npx pnpm@latest \"\$@\"" >> ./pnpm
                chmod +x ./pnpm
                export PATH=".:$PATH"
            fi
        fi
    fi
else
    echo "✅ pnpm is available!"
fi

# Now try to install dependencies
echo "📦 Installing dependencies..."
pnpm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed!"
    
    # Build the project
    echo "🏗️  Building project..."
    pnpm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build completed successfully!"
    else
        echo "❌ Build failed!"
        exit 1
    fi
else
    echo "❌ Failed to install dependencies!"
    exit 1
fi